import { NextResponse } from 'next/server';
import { searchUniversities } from '@/lib/rag/vector-store';
import { buildConsultationPrompt, isCountryExcluded } from '@/lib/rag/chain';
import { queryWithFailover } from '@/lib/llm/failover';

export async function POST(req: Request) {
  try {
    const { query, degreeLevel, maxBudget, preferredRegion, locale } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'A query or question is required.' },
        { status: 400 }
      );
    }

    // 1. Vector Store / Database Retrieval for Relevant University Context
    const matchedUniversities = await searchUniversities({
      query,
      maxBudget: maxBudget ? Number(maxBudget) : undefined,
      preferredRegion,
    });

    // 2. Strict Secondary Excluded Countries Verification
    const sanitizedUniversities = matchedUniversities.filter(
      (uni) => !isCountryExcluded(uni.country)
    );

    // 3. Format Context for RAG Prompt
    const contextString = sanitizedUniversities
      .map(
        (uni, idx) =>
          `[${idx + 1}] ${uni.name} (${uni.country}${uni.city ? `, ${uni.city}` : ''}) | Global Rank: ${uni.ranking || 'Top 500'} | Tuition: ${uni.tuitionMin === 0 ? 'Free (€0)' : `$${uni.tuitionMin}/yr`} | Living Cost: $${uni.livingCost || '10,000'}/yr | Programs: ${uni.programs?.join(', ')}`
      )
      .join('\n');

    // 4. Construct Prompt with Pakistani Student Profile & Strict Country Filter
    const { systemPrompt, userPrompt } = buildConsultationPrompt({
      query,
      context: contextString || 'Verified global destination universities (Europe, UK, USA, Australia, Asia).',
      degreeLevel,
      maxBudget: maxBudget ? Number(maxBudget) : undefined,
      preferredRegion,
      locale,
    });

    // 5. Query AI Failover Pipeline (Gemini 2.5 -> Grok -> Llama -> Local Knowledge Base)
    const result = await queryWithFailover(userPrompt, systemPrompt, locale);

    return NextResponse.json({
      answer: result.text,
      provider: result.provider,
      universities: sanitizedUniversities,
      excludedCheckPassed: true,
    });
  } catch (error: any) {
    console.error('Error handling consultation query:', error);
    return NextResponse.json(
      { error: 'Failed to process consultation request.', details: error.message },
      { status: 500 }
    );
  }
}

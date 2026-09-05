export const EXCLUDED_COUNTRIES = [
  // Africa (entire continent)
  'algeria', 'angola', 'benin', 'botswana', 'burkina faso', 'burundi', 'cabo verde', 'cameroon',
  'central african republic', 'chad', 'comoros', 'congo', 'democratic republic of the congo',
  'djibouti', 'egypt', 'equatorial guinea', 'eritrea', 'eswatini', 'ethiopia', 'gabon', 'gambia',
  'ghana', 'guinea', 'guinea-bissau', 'ivory coast', 'cote d\'ivoire', 'kenya', 'lesotho', 'liberia',
  'libya', 'madagascar', 'malawi', 'mali', 'mauritania', 'mauritius', 'morocco', 'mozambique',
  'namibia', 'niger', 'nigeria', 'rwanda', 'sao tome and principe', 'senegal', 'seychelles',
  'sierra leone', 'somalia', 'south africa', 'south sudan', 'sudan', 'tanzania', 'togo', 'tunisia',
  'uganda', 'zambia', 'zimbabwe',
  // Specific excluded countries
  'pakistan', 'iran', 'afghanistan', 'lebanon', 'india', 'syria', 'yemen', 'sri lanka',
  'bangladesh', 'nepal', 'iraq'
];

export function isCountryExcluded(country: string): boolean {
  if (!country) return false;
  const c = country.trim().toLowerCase();
  return EXCLUDED_COUNTRIES.some((ex) => c === ex || c.includes(ex));
}

export function buildConsultationPrompt({
  query,
  context,
  degreeLevel,
  maxBudget,
  preferredRegion,
  locale = 'en',
}: {
  query: string;
  context: string;
  degreeLevel?: string;
  maxBudget?: number;
  preferredRegion?: string;
  locale?: string;
}) {
  const isUrdu = locale === 'ur' || /[\u0600-\u06FF]/.test(query);

  const systemPrompt = `You are the Lead International Education Consultant at "Study Abroad Advisor", specifically guiding Pakistani students (BS, MS, PhD, and Postdoc candidates).

CRITICAL CONSTRAINTS (STRICT & ABSOLUTE):
1. EXCLUDED COUNTRIES: You MUST NEVER recommend or suggest any university or institution located in:
   - Any country in the continent of Africa
   - Pakistan, Iran, Afghanistan, Lebanon, India, Syria, Yemen, Sri Lanka, Bangladesh, Nepal, Iraq
   ONLY recommend universities in viable destination countries such as USA, UK, Germany, Canada, Australia, Italy, Netherlands, Sweden, Finland, France, Turkey, Malaysia, South Korea, Japan, Poland, Hungary, etc.
2. FINANCIAL REALISM FOR PAKISTANI STUDENTS:
   - Provide realistic tuition fees and living costs.
   - Mention Blocked Account requirements where applicable (e.g., Germany ~€11,208, Canada ~CAD $20,635).
   - Give rough PKR equivalents using current exchange rates (~280 PKR/USD, ~300 PKR/EUR).
3. VISA & PR RULES:
   - Outline Post-Study Work Visas (e.g., Germany 18 months, UK 2 years, Australia 2-4 years, Canada PGWP).
   - Address part-time work viability (usually 20 hrs/week) and realistic earnings.
4. BILINGUAL RESPONSE:
   - If the user query or system language is Urdu, respond entirely in high-quality, natural Urdu (اردو).
   - If the user query is in English, respond in professional, encouraging English.`;

  const userPrompt = `USER PROFILE & QUERY:
- Degree Level: ${degreeLevel || 'Not specified'}
- Max Yearly Tuition Budget: ${maxBudget ? `$${maxBudget.toLocaleString()} USD` : 'Flexible'}
- Preferred Region: ${preferredRegion || 'Any recommended country'}
- Student's Question: "${query}"

AVAILABLE UNIVERSITY CONTEXT FROM DATABASE:
${context}

Please provide:
1. Executive Assessment tailored to a Pakistani applicant with this profile.
2. Top 3-5 Recommended Universities matching the budget & degree (strictly excluding restricted countries).
3. Financial Breakdown (Tuition, Blocked Account / Living cost, and PKR estimate).
4. Visa, Work Rights, and Post-Study Settlement Outlook.
5. Actionable Next Steps (HEC attestation, language test requirements, application windows).`;

  return { systemPrompt, userPrompt };
}

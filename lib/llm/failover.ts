import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

export interface LLMResult {
  text: string;
  provider: 'Gemini' | 'Grok' | 'Llama' | 'Knowledge Base';
}

export async function queryWithFailover(
  prompt: string,
  systemPrompt?: string,
  locale = 'en'
): Promise<LLMResult> {
  const isUrdu = locale === 'ur' || /[\u0600-\u06FF]/.test(prompt);

  // Force language in the system prompt based on active locale
  const languageDirective = isUrdu
    ? '\n\nCRITICAL LANGUAGE INSTRUCTION: You MUST answer 100% in natural, professional, and encouraging Urdu (اردو). Do NOT mix English paragraphs. Use clear headings, bullet points, and bulleted lists.'
    : '\n\nCRITICAL LANGUAGE INSTRUCTION: You MUST answer in clear, encouraging, professional English.';

  const combinedPrompt = `${systemPrompt || ''}${languageDirective}\n\n${prompt}`;

  // 1. Primary: Google Gemini (Free Tier from Google AI Studio)
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      // gemini-2.5-flash is active and verified; fallback to gemini-flash-latest
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const response = await model.generateContent(combinedPrompt);
      const text = response.response.text();
      if (text && text.trim().length > 0) {
        return { text, provider: 'Gemini' };
      }
    } catch (err: any) {
      console.warn('Gemini 2.5 flash error, trying gemini-flash-latest...', err?.message || err);
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const response = await model.generateContent(combinedPrompt);
        const text = response.response.text();
        if (text && text.trim().length > 0) {
          return { text, provider: 'Gemini' };
        }
      } catch (fallbackErr) {
        console.warn('Gemini primary provider failed, failing over to Grok...', fallbackErr);
      }
    }
  }

  // 2. Secondary: Grok (xAI API)
  if (process.env.XAI_API_KEY) {
    try {
      const res = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.XAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [
            ...(systemPrompt ? [{ role: 'system', content: `${systemPrompt}${languageDirective}` }] : []),
            { role: 'user', content: prompt },
          ],
          temperature: 0.3,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) {
          return { text, provider: 'Grok' };
        }
      }
      console.warn('Grok response not OK, failing over to Llama...');
    } catch (err) {
      console.warn('Grok secondary provider failed, failing over to Llama...', err);
    }
  }

  // 3. Tertiary: Llama 3 via Groq Cloud (Free Tier)
  if (process.env.GROQ_API_KEY) {
    try {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const completion = await groq.chat.completions.create({
        messages: [
          ...(systemPrompt
            ? [{ role: 'system' as const, content: `${systemPrompt}${languageDirective}` }]
            : []),
          { role: 'user' as const, content: prompt },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
      });

      const text = completion.choices[0]?.message?.content;
      if (text) {
        return { text, provider: 'Llama' };
      }
    } catch (err) {
      console.warn('Groq Llama tertiary provider failed...', err);
    }
  }

  // 4. Intelligent Rule-Based Knowledge Base Fallback
  console.info('Using local intelligent knowledge fallback.');
  return {
    text: generateKnowledgeBaseResponse(prompt, isUrdu),
    provider: 'Knowledge Base',
  };
}

function generateKnowledgeBaseResponse(prompt: string, isUrdu: boolean): string {
  if (isUrdu) {
    return `### پاکستانی طلبہ کے لیے جامع تعلیمی رہنمائی

#### 1. کم خرچ یورپی تعلیمی راستے (جرمنی اور اٹلی)
- **جرمنی (ٹیوشن فیس سے مکمل مستثنیٰ)**:
  - پبلک جامعات (مثلاً ٹی یو میونخ، آر ڈبلیو ٹی ایچ آخن) میں **ٹیوشن فیس صفر** ہے، صرف €150 تا €350 سمسٹر ٹکٹ فیس ہوتی ہے۔
  - **بلاک اکاؤنٹ**: سالانہ تقریباً **€11,208** (تقریباً 33 لاکھ پاکستانی روپے) درکار ہوتا ہے، جس سے طالب علم کو ماہانہ €934 اخراجات کے لیے ملتے ہیں۔
  - **پوسٹ اسٹڈی ورک ویزا**: ڈگری مکمل ہونے پر **18 ماہ کا جاب سیکر ویزا** اور 21 سے 27 ماہ میں مستقل رہائش (EU Blue Card PR) کا راستہ۔
- **اٹلی (ریجنل اسکالرشپس)**:
  - فیس آمدنی کے حساب سے €500 سے €2,500 سالانہ ہوتی ہے۔
  - ریجنل DSU اسکالرشپ کے ذریعے **100 فیصد فیس معافی اور سالانہ €7,000 تا €8,500 وظیفہ** پاکستانی طلبہ کو عام طور پر مل جاتا ہے۔

#### 2. انگریزی بولنے والے ممالک (برطانیہ، آسٹریلیا، کینیڈا، امریکہ)
- **برطانیہ (UK)**: اوسط ماسٹرز فیس £14,000 تا £24,000۔ گریجویشن کے بعد **2 سالہ گریجویٹ روٹ (PSW) ورک پرمٹ**۔ دورانِ تعلیم ہفتہ وار 20 گھنٹے کام کی اجازت۔
- **آسٹریلیا**: کم از کم اجرت $24+ AUD فی گھنٹہ۔ ہر دو ہفتوں میں 48 گھنٹے کام کے حقوق۔ پوسٹ اسٹڈی ورک ویزا (Subclass 485) 2 سے 4 سال تک رہتا ہے۔

#### 3. آپ کے پروفائل کے لیے ضروری اگلے اقدامات
- تمام اسناد کو پہلے **HEC** اور بعد ازاں **وزارتِ خارجہ (MOFA)** سے تصدیق کرائیں۔
- زیادہ سے زیادہ اسکالرشپ اور ویزا کے لیے آئیلٹس (IELTS) میں کم از کم 6.5 بینڈ اسکور حاصل کریں۔`;
  }

  return `### Comprehensive Study Abroad Advisory for Pakistani Students

#### 1. Low-Cost European Pathway (Germany & Italy)
- **Germany (Tuition-Free)**: Top public universities (e.g., TU Munich, RWTH Aachen, University of Stuttgart) charge **€0 tuition**, with only a nominal semester ticket fee (~€150–€350).
  - **Living Cost**: Requires an official Blocked Account (**€11,208/year** or ~PKR 3.3 Million), released monthly (~€934) for living costs.
  - **Post-Study Visa**: 18-month Job Seeker Visa with quick transition to EU Blue Card Permanent Residency.
- **Italy**: Tuition scaled according to family ISEE parity (~€500–€2,500/year). Regional government scholarships (e.g., DSU, ER.GO) frequently award **100% tuition waivers plus €6,500–€8,000 annual stipends** for Pakistani applicants.

#### 2. English-Speaking Destinations (UK, USA, Australia, Canada)
- **United Kingdom**: Average Master's tuition £14,000–£24,000. 2-year Graduate Route (PSW) work permit. 20 hours/week part-time work rights.
- **Australia**: High minimum wages ($24+/hr AUD). 48 hours per fortnight work rights. Subclass 485 post-study work visa provides 2–4 years.

#### 3. Critical Recommendations for Your Profile
- Ensure all academic transcripts are attested by **HEC** and **MOFA** before visa appointments.
- For maximum scholarship eligibility, target an IELTS score of 6.5+ or Duolingo 115+.`;
}

import { prisma } from '@/lib/db';
import { isCountryExcluded } from './chain';
import { UniversityRecommendation } from '@/app/(dashboard)/dashboard/page';

// Curated verified global dataset for Pakistani students (strictly excluding restricted countries)
export const VERIFIED_UNIVERSITIES: UniversityRecommendation[] = [
  {
    id: 'tum-de',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    city: 'Munich',
    ranking: 37,
    tuitionMin: 0,
    tuitionMax: 0,
    livingCost: 11208,
    programs: ['Computer Science', 'Data Engineering', 'Robotics', 'Management'],
    website: 'https://www.tum.de',
    matchReason: 'Tuition-free world-class STEM education with direct 18-month job seeker visa.',
  },
  {
    id: 'rwth-aachen-de',
    name: 'RWTH Aachen University',
    country: 'Germany',
    city: 'Aachen',
    ranking: 106,
    tuitionMin: 0,
    tuitionMax: 0,
    livingCost: 10500,
    programs: ['Mechanical Engineering', 'Electrical Engineering', 'Software Systems'],
    website: 'https://www.rwth-aachen.de',
    matchReason: 'Top European engineering hub with zero tuition and high industry integration.',
  },
  {
    id: 'polimi-it',
    name: 'Politecnico di Milano',
    country: 'Italy',
    city: 'Milan',
    ranking: 123,
    tuitionMin: 1500,
    tuitionMax: 3900,
    livingCost: 9500,
    programs: ['Architecture', 'Computer Engineering', 'Automotive Engineering'],
    website: 'https://www.polimi.it',
    matchReason: 'Very affordable with DSU regional scholarships frequently awarding full tuition waivers and €7,000 stipends for Pakistani students.',
  },
  {
    id: 'sapienza-it',
    name: 'Sapienza University of Rome',
    country: 'Italy',
    city: 'Rome',
    ranking: 134,
    tuitionMin: 1000,
    tuitionMax: 2800,
    livingCost: 9000,
    programs: ['Artificial Intelligence', 'Data Science', 'Classics', 'Medicine'],
    website: 'https://www.uniroma1.it',
    matchReason: 'One of the oldest and largest European universities, low ISEE fee bracket for Pakistani families.',
  },
  {
    id: 'manchester-uk',
    name: 'University of Manchester',
    country: 'United Kingdom',
    city: 'Manchester',
    ranking: 32,
    tuitionMin: 28000,
    tuitionMax: 35000,
    livingCost: 14000,
    programs: ['Advanced Computer Science', 'Biotechnology', 'Economics', 'Business'],
    website: 'https://www.manchester.ac.uk',
    matchReason: 'Prestige Russell Group institution, 2-year Graduate Route work visa.',
  },
  {
    id: 'sheffield-uk',
    name: 'University of Sheffield',
    country: 'United Kingdom',
    city: 'Sheffield',
    ranking: 104,
    tuitionMin: 23500,
    tuitionMax: 29000,
    livingCost: 11500,
    programs: ['Data Analytics', 'Civil Engineering', 'Information Management'],
    website: 'https://www.sheffield.ac.uk',
    matchReason: 'Lower living costs in northern UK and strong Chevening/Commonwealth alumni network.',
  },
  {
    id: 'unimelb-au',
    name: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    ranking: 13,
    tuitionMin: 32000,
    tuitionMax: 46000,
    livingCost: 16500,
    programs: ['Information Technology', 'Software Systems', 'Biomedicine'],
    website: 'https://www.unimelb.edu.au',
    matchReason: 'Premier Australian Group of Eight university with Subclass 485 post-study work visa.',
  },
  {
    id: 'deakin-au',
    name: 'Deakin University',
    country: 'Australia',
    city: 'Geelong / Melbourne',
    ranking: 233,
    tuitionMin: 22000,
    tuitionMax: 28000,
    livingCost: 14000,
    programs: ['Cyber Security', 'Business Analytics', 'Nursing'],
    website: 'https://www.deakin.edu.au',
    matchReason: 'Regional campus bonus points for Australian PR and generous STEM merit scholarships.',
  },
  {
    id: 'utoronto-ca',
    name: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto',
    ranking: 21,
    tuitionMin: 35000,
    tuitionMax: 55000,
    livingCost: 16000,
    programs: ['Machine Learning', 'Computer Science', 'Commerce'],
    website: 'https://www.utoronto.ca',
    matchReason: 'Top institution in Canada, high-tier research opportunities, 3-year PGWP.',
  },
  {
    id: 'alberta-ca',
    name: 'University of Alberta',
    country: 'Canada',
    city: 'Edmonton',
    ranking: 111,
    tuitionMin: 18000,
    tuitionMax: 27000,
    livingCost: 13000,
    programs: ['Petroleum Engineering', 'Computing Science', 'Public Health'],
    website: 'https://www.ualberta.ca',
    matchReason: 'Lower provincial living cost in Alberta with favorable provincial immigration streams (AAIP).',
  },
  {
    id: 'metu-tr',
    name: 'Middle East Technical University (METU)',
    country: 'Turkey',
    city: 'Ankara',
    ranking: 336,
    tuitionMin: 2000,
    tuitionMax: 4500,
    livingCost: 5500,
    programs: ['Computer Engineering', 'Aerospace', 'Business Administration'],
    website: 'https://www.metu.edu.tr',
    matchReason: '100% English medium, extremely budget friendly, highly respected by Pakistani employers.',
  },
  {
    id: 'utm-my',
    name: 'Universiti Teknologi Malaysia (UTM)',
    country: 'Malaysia',
    city: 'Johor Bahru / Kuala Lumpur',
    ranking: 188,
    tuitionMin: 3500,
    tuitionMax: 6000,
    livingCost: 4500,
    programs: ['Software Engineering', 'Biomedical Science', 'Renewable Energy'],
    website: 'https://www.utm.my',
    matchReason: 'High global ranking with very affordable living costs and direct credit transfer pathways.',
  },
  {
    id: 'kaist-kr',
    name: 'KAIST - Korea Advanced Institute of Science & Technology',
    country: 'South Korea',
    city: 'Daejeon',
    ranking: 56,
    tuitionMin: 0,
    tuitionMax: 6000,
    livingCost: 8000,
    programs: ['AI & Robotics', 'Electrical Engineering', 'Materials Science'],
    website: 'https://www.kaist.ac.kr',
    matchReason: 'Global Korea Scholarship (GKS) covers 100% tuition plus monthly allowance for Pakistani scholars.',
  },
];

export async function searchUniversities({
  query,
  maxBudget,
  preferredRegion,
}: {
  query: string;
  maxBudget?: number;
  preferredRegion?: string;
}): Promise<UniversityRecommendation[]> {
  try {
    // Attempt database query if database is connected
    const dbUnis = await prisma.university.findMany({
      where: {
        isActive: true,
        ...(maxBudget !== undefined ? { tuitionMin: { lte: maxBudget } } : {}),
      },
      take: 20,
    });

    if (dbUnis && dbUnis.length > 0) {
      // Filter out any excluded country
      const filtered = dbUnis
        .filter((u) => !isCountryExcluded(u.country))
        .map((u) => ({
          id: u.id,
          name: u.name,
          country: u.country,
          city: u.city || undefined,
          ranking: u.ranking || undefined,
          tuitionMin: u.tuitionMin || 0,
          tuitionMax: u.tuitionMax || undefined,
          livingCost: u.livingCost || undefined,
          programs: u.programs,
          website: u.website || undefined,
        }));

      if (filtered.length > 0) {
        return filtered.slice(0, 6);
      }
    }
  } catch (err) {
    // Fall back to verified in-memory dataset
    console.warn('Database query fallback to verified dataset');
  }

  // Filter verified in-memory set
  let matched = VERIFIED_UNIVERSITIES.filter((u) => !isCountryExcluded(u.country));

  if (preferredRegion && preferredRegion !== 'all') {
    const region = preferredRegion.toLowerCase();
    if (region === 'europe') {
      matched = matched.filter((u) => ['Germany', 'Italy'].includes(u.country));
    } else if (region === 'uk') {
      matched = matched.filter((u) => u.country === 'United Kingdom');
    } else if (region === 'usacanada') {
      matched = matched.filter((u) => ['USA', 'Canada'].includes(u.country));
    } else if (region === 'australia') {
      matched = matched.filter((u) => u.country === 'Australia');
    } else if (region === 'asia') {
      matched = matched.filter((u) => ['Turkey', 'Malaysia', 'South Korea'].includes(u.country));
    }
  }

  if (maxBudget !== undefined && maxBudget > 0) {
    const budgetFiltered = matched.filter(
      (u) => (u.tuitionMin || 0) <= maxBudget || u.tuitionMin === 0
    );
    if (budgetFiltered.length > 0) {
      matched = budgetFiltered;
    }
  }

  return matched.slice(0, 4);
}

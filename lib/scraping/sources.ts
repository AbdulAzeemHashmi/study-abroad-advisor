import { isCountryExcluded } from '../rag/chain';

export interface RawUniversityData {
  externalId: string;
  name: string;
  country: string;
  city?: string;
  website?: string;
  ranking?: number;
  tuitionMin?: number;
  tuitionMax?: number;
  livingCost?: number;
  programs: string[];
}

/**
 * Fetches university directory data from free open APIs (Hipolabs & OpenAlex)
 * Strictly excludes any university in the restricted country list!
 */
export async function fetchUniversitiesFromHipolabs(limit = 100): Promise<RawUniversityData[]> {
  const allowedCountries = [
    'Germany',
    'Italy',
    'United Kingdom',
    'Canada',
    'Australia',
    'Turkey',
    'Malaysia',
    'South Korea',
    'Sweden',
    'Finland',
    'Netherlands',
    'Japan',
  ];

  const results: RawUniversityData[] = [];

  for (const country of allowedCountries) {
    if (isCountryExcluded(country)) continue;

    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
      );
      if (!response.ok) continue;

      const data = await response.json();
      if (Array.isArray(data)) {
        for (const item of data.slice(0, 15)) {
          if (!item.name || isCountryExcluded(item.country)) continue;

          results.push({
            externalId: `hipo-${item.alpha_two_code}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            name: item.name,
            country: item.country,
            website: item.web_pages?.[0] || undefined,
            tuitionMin: country === 'Germany' ? 0 : 8000,
            livingCost: country === 'Germany' ? 11208 : 12000,
            programs: ['Computer Science', 'Engineering', 'Business & Management'],
          });
        }
      }
    } catch (err) {
      console.warn(`Could not fetch universities for ${country}`, err);
    }

    if (results.length >= limit) break;
  }

  return results;
}

export async function fetchUniversitiesFromOpenAlex(limit = 50): Promise<RawUniversityData[]> {
  try {
    const response = await fetch(
      'https://api.openalex.org/institutions?filter=type:education&per_page=50'
    );
    if (!response.ok) return [];

    const data = await response.json();
    const results: RawUniversityData[] = [];

    if (data.results && Array.isArray(data.results)) {
      for (const inst of data.results) {
        const country = inst.country_code || inst.geo?.country;
        if (!inst.display_name || isCountryExcluded(country)) continue;

        results.push({
          externalId: inst.id || `alex-${inst.display_name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          name: inst.display_name,
          country: inst.geo?.country || 'International',
          city: inst.geo?.city || undefined,
          website: inst.homepage_url || undefined,
          ranking: inst.international_rank || undefined,
          programs: ['Sciences', 'Engineering', 'Technology'],
        });
      }
    }
    return results;
  } catch (err) {
    console.warn('OpenAlex API fetch error', err);
    return [];
  }
}

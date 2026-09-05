import { prisma } from '@/lib/db';
import { fetchUniversitiesFromHipolabs, fetchUniversitiesFromOpenAlex, RawUniversityData } from './sources';
import { isCountryExcluded } from '../rag/chain';

export interface IngestionReport {
  totalFetched: number;
  created: number;
  updated: number;
  excludedCount: number;
  timestamp: string;
}

export async function ingestUniversityData(): Promise<IngestionReport> {
  console.log('Starting dynamic university data ingestion & self-healing pipeline...');

  const [hipoData, alexData] = await Promise.all([
    fetchUniversitiesFromHipolabs(100),
    fetchUniversitiesFromOpenAlex(50),
  ]);

  const allFetched = [...hipoData, ...alexData];
  let created = 0;
  let updated = 0;
  let excludedCount = 0;

  for (const uni of allFetched) {
    // 1. Strict Excluded Country Security Check
    if (isCountryExcluded(uni.country)) {
      excludedCount++;
      continue;
    }

    try {
      // 2. Self-Healing Upsert in PostgreSQL
      const existing = await prisma.university.findUnique({
        where: { externalId: uni.externalId },
      });

      if (existing) {
        // Update if fields have changed
        await prisma.university.update({
          where: { id: existing.id },
          data: {
            name: uni.name,
            country: uni.country,
            city: uni.city || existing.city,
            website: uni.website || existing.website,
            ranking: uni.ranking || existing.ranking,
            tuitionMin: uni.tuitionMin ?? existing.tuitionMin,
            tuitionMax: uni.tuitionMax ?? existing.tuitionMax,
            livingCost: uni.livingCost ?? existing.livingCost,
            isActive: true,
            lastUpdated: new Date(),
          },
        });
        updated++;
      } else {
        await prisma.university.create({
          data: {
            externalId: uni.externalId,
            name: uni.name,
            country: uni.country,
            city: uni.city,
            website: uni.website,
            ranking: uni.ranking,
            tuitionMin: uni.tuitionMin || 0,
            tuitionMax: uni.tuitionMax,
            livingCost: uni.livingCost,
            programs: uni.programs || ['Engineering', 'Computer Science', 'Business'],
            isActive: true,
            lastUpdated: new Date(),
          },
        });
        created++;
      }
    } catch (err) {
      // If DB is offline, log and continue
      console.warn(`Could not save university ${uni.name} to DB (may be offline mode):`, err);
    }
  }

  const report: IngestionReport = {
    totalFetched: allFetched.length,
    created,
    updated,
    excludedCount,
    timestamp: new Date().toISOString(),
  };

  console.log('Ingestion completed successfully:', report);
  return report;
}

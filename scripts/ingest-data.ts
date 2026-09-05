import { ingestUniversityData } from '../lib/scraping/ingester';

async function main() {
  console.log('====================================================');
  console.log('STUDY ABROAD ADVISOR - DATA SEED & INGESTION SCRIPT');
  console.log('Fetching fresh universities from Hipolabs & OpenAlex');
  console.log('Strict quality filter active: Excluding restricted countries');
  console.log('====================================================');

  try {
    const report = await ingestUniversityData();
    console.log('\n[SUCCESS] Ingestion completed:');
    console.table(report);
  } catch (error) {
    console.error('[ERROR] Ingestion failed:', error);
    process.exit(1);
  }
}

main();

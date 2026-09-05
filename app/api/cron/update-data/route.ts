import { NextResponse } from 'next/server';
import { ingestUniversityData } from '@/lib/scraping/ingester';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    // Optional secret check if CRON_SECRET is configured in Vercel
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Vercel Cron Trigger: Updating university data...');
    const report = await ingestUniversityData();

    return NextResponse.json({
      status: 'success',
      message: 'Weekly university dataset updated and self-healed successfully.',
      report,
    });
  } catch (err: any) {
    console.error('Cron job update-data failed:', err);
    return NextResponse.json(
      { error: 'Data ingestion update failed', details: err.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { query, response, degreeLevel } = await req.json();

    if (!query || !response) {
      return NextResponse.json({ error: 'Query and response are required.' }, { status: 400 });
    }

    const userId = (session?.user as any)?.id;

    if (userId) {
      try {
        const saved = await prisma.savedQuery.create({
          data: {
            userId,
            query,
            response,
          },
        });
        return NextResponse.json({ success: true, savedId: saved.id });
      } catch (dbErr) {
        console.warn('Database save error:', dbErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Saved to local state.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}

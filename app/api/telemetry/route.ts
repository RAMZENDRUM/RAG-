import { NextResponse } from 'next/server';
import { getTelemetry } from '@/lib/rag/engine/telemetry_logger';

export async function GET() {
  const data = getTelemetry();
  return NextResponse.json(data);
}

export const dynamic = 'force-dynamic';

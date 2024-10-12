import { NextResponse } from 'next/server';
import { getIssues } from '@/lib/github';

export const runtime = 'edge';

export const GET = async (request: Request) => {
  const data = await getIssues();
  return NextResponse.json(data);
};

export const POST = async (request: Request) => {
  const body = await request.json();
  return NextResponse.json({ message: 'POST request received', body });
};

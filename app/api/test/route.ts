import { NextResponse } from 'next/server';
import { getIssues } from '@/lib/github';

export const GET = async (request: Request) => {
  const issues = await getIssues();
  return NextResponse.json({ issues });
  // return NextResponse.json({ message: 'Hello, world!' });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  return NextResponse.json({ message: 'POST request received', body });
};

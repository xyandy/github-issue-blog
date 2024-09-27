import { NextResponse } from 'next/server';
import { getComments } from '@/lib/github';

export const GET = async (request: Request) => {
  const comments = await getComments(Number(1));
  return NextResponse.json(comments);
};

export const POST = async (request: Request) => {
  const body = await request.json();
  return NextResponse.json({ message: 'POST request received', body });
};

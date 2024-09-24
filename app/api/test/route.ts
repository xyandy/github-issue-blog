import { NextResponse } from 'next/server';

export const GET = (request: Request) => {
  return NextResponse.json({ message: 'Hello, world!' });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  return NextResponse.json({ message: 'POST request received', body });
};

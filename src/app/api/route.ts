import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return new NextResponse("Example", { status: 200 });
}

export async function POST(request: NextRequest) {
  return new NextResponse("Example", { status: 200 });
}

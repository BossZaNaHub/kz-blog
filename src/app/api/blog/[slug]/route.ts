import { Response } from "@/services/common";
import { environmet } from "@/services/environment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.pathname.split("/");
  const slug = path[path.length - 1];

  const response = await fetch(
    `${environmet.api_url}/api/v1/client/blog/${slug}`,
    {
      method: "GET",
    }
  );
  return new NextResponse<Response>(response.body);
}

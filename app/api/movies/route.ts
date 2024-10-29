import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await serverAuth(req);

    // 모든 영화 데이터 가져오기
    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies);
  } catch (error) {
    console.log({ error });

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

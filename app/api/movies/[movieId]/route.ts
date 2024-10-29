import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await serverAuth(req);

    const { pathname } = new URL(req.url);
    const movieId = pathname.split("/").pop(); // URL의 마지막 세그먼트를 가져옴

    if (typeof movieId !== "string" || !movieId) {
      throw new Error("Invalid or missing movie ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

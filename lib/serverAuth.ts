import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // 인증 옵션 경로 수정 필요

export default async function serverAuth(req: NextRequest) {
  // 로그인 유저 정보 세션
  const session = await getServerSession({ req, ...authOptions }); // req와 authOptions 전달

  // 로그인 여부 확인(세션에 이메일이 존재하면 로그인한 상태이므로)
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // DB 유저 정보 조회
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // DB에 유저가 존재하지 않는 경우
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
}

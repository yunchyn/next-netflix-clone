// app/api/register/route.ts
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    // 입력 검증
    if (!email || !name || !password) {
      return NextResponse.json({ error: "Email, name, and password are required." }, { status: 400 });
    }

    // 계정 존재 여부 확인
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email is already taken." }, { status: 422 });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // 새로운 사용자 생성
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    // 민감 정보 제거 (hashedPassword 등)
    const { hashedPassword: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}

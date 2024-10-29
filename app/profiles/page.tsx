"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profiles() {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  // 로그인 여부를 확인하고 로그인하지 않았다면 auth 페이지로 돌려보냄
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (!session) {
        router.push("/auth");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-yxl text-white text-center">Netflix를 시청할 프로필을 선택하세요.</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                    w-44
                    h-44
                    rounded-md
                    flex
                    items-center
                    justify-center
                    border-2
                    border-transparent
                    group-hover:cursor-pointer
                    group-hover:border-white
                    overflow-hidden"
              >
                <img
                  src="/images/default-blue.png"
                  alt="Profile"
                />
              </div>
              <div
                className="
              mt-4
              text-gray-400
              text-2xl
              text-center
              group-hover:text-white"
              >
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

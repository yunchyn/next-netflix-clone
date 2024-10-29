"use client";
import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

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
    <>
      <InfoModal
        visible={isOpen}
        onClose={closeModal}
      />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList
          title="지금 뜨는 콘텐츠"
          data={movies}
        />
        <MovieList
          title="내가 찜한 콘텐츠"
          data={favorites}
        />
      </div>
    </>
  );
}

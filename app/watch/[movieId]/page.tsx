"use client";

import useMovie from "@/hooks/useMovie";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Watch() {
  const router = useRouter();
  const { movieId } = useParams();

  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          onClick={() => router.push("/")}
          size={40}
        />

        <p className="text-white text-1xl md:text-3xl font-bold">{data?.title}</p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
    </div>
  );
}

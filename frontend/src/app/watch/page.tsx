"use client";

import useYouTubePlayer from "@/hooks/useYouTubePlayer";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const video_id = searchParams.get("v") ?? "";
  const url = `https://www.youtube.com/embed/${video_id}`;
  useYouTubePlayer({ video_id });
  return (
    <>
      <h1>Watch : {video_id}</h1>
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default page;

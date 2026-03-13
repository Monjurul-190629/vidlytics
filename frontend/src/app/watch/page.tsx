"use client";

import useYouTubePlayer from "@/hooks/useYouTubePlayer";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const video_id = searchParams.get("v") ?? "";

  useYouTubePlayer({ video_id, elementId: video_id });

  return (
    <div className="w-[50vw] mx-auto h-full px-5">
      <div id="video-container" className="relative w-full">
        <div className="relative w-full pt-[56.25%] bg-black">
          <div id={video_id} className="absolute top-0 left-0 w-full h-full" />
        </div>
      </div>
      <h1>Watch : {video_id}</h1>
    </div>
  );
};

export default page;

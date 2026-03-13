"use client";

import useYouTubePlayer from "@/hooks/useYouTubePlayer";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const video_id = searchParams.get("v") ?? "";

  const startTime = Number(searchParams.get("t")) ?? 0;

  const interval = 1500;

  const playerElementId = "youtube-player";

  const playerState = useYouTubePlayer({
    video_id,
    elementId: playerElementId,
    startTime,
    interval,
  });

  return (
    <div className="w-[50vw] mx-auto h-full px-5">
      <div id="video-container" className="relative w-full">
        <div className="relative w-full pt-[56.25%] bg-black">
          <div
            id={playerElementId}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
      <h1 className="text-xl">{playerState.video_title}</h1>
      <h1>
        Watch : {video_id} - {playerState?.isReady ? "Ready" : "Loading"}
      </h1>
      <div>{playerState && JSON.stringify(playerState)}</div>
    </div>
  );
};

export default page;

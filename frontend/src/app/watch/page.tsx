"use client";

import useYouTubePlayer from "@/hooks/useYouTubePlayer";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const FASTAPI_ENDPOINT = "http://localhost:8002/api/video-events/";

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

  // useCallBack -> fetch -> FastApi -> timeScleDB
  // useEffect
  // useDebouncher

  const updateBackend = useCallback(
    async (currentPlayerState: any) => {
      const headers = {
        "Content-Type": "application/json",
      };
      // console.log(video_id, currentPlayerState)

      try {
        const response = await fetch(FASTAPI_ENDPOINT, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ ...currentPlayerState, video_id: video_id }),
        });
        if (!response.ok) {
          console.log(await response.text());
          console.log("error adding data to the backend");
        } else {
          const responseData = await response.json();
          console.log("db data", responseData);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [video_id],
  );

  useEffect(() => {
    if (!playerState.isReady) return;
    if (playerState.video_state_label === "CUED") return;
    updateBackend(playerState);
  }, [playerState]);

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

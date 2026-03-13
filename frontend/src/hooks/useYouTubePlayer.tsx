import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}
interface props {
  video_id: string;
  elementId: string;
  startTime: number;
  interval: number;
}

function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value);
}

const useYouTubePlayer = ({
  video_id,
  elementId,
  startTime = 200,
  interval = 5000,
}: props) => {
  const playerElementId = elementId ?? "video player";
  // load youtube api script
  // embed youtube video player
  // track changes to video

  // state
  const [playerState, setPlayerState] = useState({
    isReady: false,
    currentTime: 0,
    video_title: "",
    video_state_label: "",
    video_state_value: -10,
  });
  const playerRef = useRef<YT.Player | null>(null);
  useEffect(() => {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      console.log("youtube api is running");
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      const videoOptions = {
        height: "390",
        width: "640",
        videoId: video_id,
        playerVars: {
          playsinline: 1,
          start: startTime,
        },
        events: {
          onReady: handleOnReady,
          onStateChange: handleOnStateChange,
        },
      };
      playerRef.current = new window.YT.Player(playerElementId, videoOptions);
    };
  }, [video_id]);

  useEffect(() => {
    const internvalId = setInterval(() => {
      handleOnStateChange();
    }, Number(interval));

    return () => {
      clearInterval(internvalId);
    };
  }, []);

  const handleOnReady = useCallback((event: any) => {
    setPlayerState((prev) => ({ ...prev, isReady: true }));
    handleOnStateChange();
  }, []);

  const handleOnStateChange = useCallback(() => {
    if (!playerRef.current) return;

    const YTPlayerStateObj = window.YT.PlayerState;
    const videoStateValue = playerRef.current.getPlayerState();
    const videoData = playerRef.current.getVideoData();
    const currentTimeSeconds = playerRef.current.getCurrentTime();
    const videoStateLabel = getKeyByValue(YTPlayerStateObj, videoStateValue);

    setPlayerState((prevState) => ({
      ...prevState,
      video_title: videoData.title,
      currentTime: currentTimeSeconds,
      video_state_label: videoStateLabel ?? "",
      video_state_value: videoStateValue,
    }));
  }, [playerRef]);

  return playerState;
};

export default useYouTubePlayer;

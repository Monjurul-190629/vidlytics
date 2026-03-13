import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}
interface props {
  video_id: string;
  elementId: string;
}

const useYouTubePlayer = ({ video_id, elementId }: props) => {
  const playerElementId = elementId ?? "video player";
  // load youtube api script
  // embed youtube video player
  // track changes to video

  // state
  const [playerState, setPlayerState] = useState({
    isReady: false,
    currentTime: 0,
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
        },
        events: {
          onReady: handleOnReady,
          onStateChange: (event: any) => console.log("on state change", event),
        },
      };
      playerRef.current = new window.YT.Player(playerElementId, videoOptions);
    };
  }, [video_id]);

  const handleOnReady = useCallback((event: any) => {
    setPlayerState((prev) => ({ ...prev, isReady: true }));
  }, []);
  return playerState;
};

export default useYouTubePlayer;

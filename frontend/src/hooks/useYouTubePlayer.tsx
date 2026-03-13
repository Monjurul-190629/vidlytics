import { useEffect } from "react";

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
          onReady: (event: any) => console.log("on ready", event),
          onStateChange: (event: any) => console.log("on state change", event),
        },
      };
      new window.YT.Player(elementId, videoOptions)
    };
  }, [video_id]);
  return <div>useYouTubePlayer</div>;
};

export default useYouTubePlayer;

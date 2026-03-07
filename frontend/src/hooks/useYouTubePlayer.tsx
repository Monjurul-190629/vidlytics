import { useEffect } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}
interface props{
    video_id: string;
}

const useYouTubePlayer = ({video_id} : props) => {
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
        console.log("youtube api is running")
    };

  }, [])
  return (
    <div>useYouTubePlayer</div>
  )
}

export default useYouTubePlayer
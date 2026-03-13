"use client";

import extractYouTubeInfo from "@/lib/extractYoutubeInfo";
import { redirect } from "next/navigation";
import { useState } from "react";

type VideoData = {
  videoId: string;
  time: number;
};

export default function YouTubeUrlForm() {
  const [url, setUrl] = useState<string>("");

  const [videoData, setVideoData] = useState<VideoData>({
    videoId: "",
    time: 0,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!videoData.videoId) {
      alert("Needs a video id");
    } else {
      redirect(`/watch?v=${videoData.videoId}&t=${videoData.time}`);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedUrl = event.target.value ?? "";
    setUrl(changedUrl);

    const { videoId, time } = extractYouTubeInfo(changedUrl);

    setVideoData({
      videoId: videoId ?? "",
      time: time ? Number(time) : 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full">
        <div className="relative w-full">
          <div className="flex items-center w-full rounded-full border border-gray-200 hover:shadow-md focus-within:shadow-md transition-shadow duration-200">
            <input
              id="url"
              name="url"
              onChange={handleUrlChange}
              value={url}
              type="text"
              required
              placeholder="Enter YouTube URL"
              className="block w-full py-4 px-6 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-full"
            />
            <button
              type="submit"
              className="absolute right-2 bg-black hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200"
            >
              Play
            </button>
          </div>

          <div>{videoData && JSON.stringify(videoData)}</div>
        </div>
      </div>
    </form>
  );
}

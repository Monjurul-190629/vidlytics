from typing import List

from fastapi import APIRouter, Request

from .models import (
    YouTubePlayerState, 
    YouTubeWatchEventResponseModel,
)

router = APIRouter()

@router.post("/")  # api/video-events

def create_video_event(
        request: Request, 
        payload: YouTubePlayerState,
    ):
    headers = request.headers
    print()
    referer = headers.get("referer")
    # print(db_session)
    data = payload.model_dump()
    print(data, referer)
    return data
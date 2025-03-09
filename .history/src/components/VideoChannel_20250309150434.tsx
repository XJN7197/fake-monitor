import { useRef, useEffect } from "react";
import "./VideoChannel.scss";
import { Card } from "antd";

const VideoChannel=({channelId}:{channelId:number})=>{
    return(
        <div className="video-channel">
            <video
                src="/video.mp4"
                autoPlay
                loop
                className="video-element"
            />
        </div>
    )
}

export default VideoChannel;
import { useRef, useEffect } from "react";
import "./VideoChannel.scss";

const VideoChannel=({channelId}:{channelId:number})=>{
    const videoRef=useRef<HTMLVideoElement>(null);
    
    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.play().catch(error=>{
                console.log("视频自动播放失败：",error);
            });
        }
    },[]);
    
    return(
        <div className="video-channel" title={`通道${channelId}`}>
            <video
                ref={videoRef}
                src="/video.mp4"
                autoPlay
                playsInline
                loop
                controls
                className="video-element"
            />
        </div>
    )
}

export default VideoChannel;
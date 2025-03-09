import { useRef, useEffect } from "react";
import "./VideoChannel.scss";
import { Card } from "antd";

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
        <Card className="video-channel" title={`通道${channelId}`}>
            <video
                ref={videoRef}
                src="/video.mp4"
                autoPlay
                playsInline
                loop
                controls
                className="video-element"
            />
        </Card>
    )
}

export default VideoChannel;
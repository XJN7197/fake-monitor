import { useRef, useEffect, forwardRef } from "react";
import "./VideoChannel.scss";

interface VideoChannelProps{
    channelId:number;
    onTimeUpdate?:(time:number)=>void;
    onDurationChange?:(duration:number)=>void;
    isPlaying:boolean;  
}

const VideoChannel=forwardRef<HTMLVideoElement,VideoChannelProps>(
    ({channelId,onTimeUpdate,onDurationChange,isPlaying},ref)=>{
        useEffect(()=>{
            const videoElement=ref as React.MutableRefObject<HTMLVideoElement>;
            if(videoElement.current){
                if(isPlaying){
                    videoElement.current.play();
                }else{
                    videoElement.current.pause();
                }
            }
        },[isPlaying]);
        
        return(
            <div className="video-channel">
                <video
                    ref={ref}
                    src="/video.mp4"
                    autoPlay
                    playsInline
                    loop
                    className="video-element"
                    onTimeUpdate={e=>
                        onTimeUpdate?.(e.currentTarget.currentTime)
                    }
                    onLoadedMetadata={e=>
                        onDurationChange?.(e.currentTarget.duration)
                    }
                />
                <div className="channel-number">通道 {channelId}</div>
            </div>
        )
    }
);


export default VideoChannel;
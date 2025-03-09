import { useRef, useEffect, forwardRef } from "react";
import "./VideoChannel.scss";

interface VideoChannelProps{
    channelId:number;
    onTimeUpdate?:(time:number)=>void;
    onDurationChange?:(duration:number)=>void;
}

const VideoChannel=forwardRef<HTMLVideoElement,VideoChannelProps>(
    ({channelId,onTimeUpdate,onDurationChange},ref)=>{
        
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
            </div>
        )
    }
);


export default VideoChannel;
import { Slider } from "antd";
import { useEffect,useState } from "react";

interface VideoControlsProps{
    duration:number;
    currentTime:number;
    onProgressChange:(value:number)=>void;
}

const VideoControls=({duration,currentTime,onProgressChange}:VideoControlsProps)=>{
    const [progress,setProgress]=useState(0);

    useEffect(()=>{
        setProgress((currentTime/duration)*100);
    },[currentTime,duration]);

    const handleProgressChange=(value:number)=>{
        setProgress(value);
        onProgressChange((value/100)*duration);
    };

    return (
        <div className="video-controls">
            <Slider
                value={progress}
                onChange={handleProgressChange}
                tooltip={ { formatter:value=>`${Math.round(value)}%`} }
            />
        </div>
    );
};

export default VideoControls;
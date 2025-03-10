import { Slider, Button } from "antd";
import { useEffect,useState } from "react";
import { PauseOutlined, PlayCircleOutlined } from "@ant-design/icons";

interface VideoControlsProps{
    duration:number;
    currentTime:number;
    onProgressChange:(value:number)=>void;
    isPlaying:boolean;
    onPlayPauseClick:()=>void;
}

const VideoControls=({duration,currentTime,onProgressChange, 
    isPlaying, onPlayPauseClick}:VideoControlsProps)=>{
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
            <Button
                type="primary"
                icon={isPlaying?PauseOutlined:PlayCircleOutlined}
                onClick={onPlayPauseClick}
            />
        </div>

    );
};

export default VideoControls;
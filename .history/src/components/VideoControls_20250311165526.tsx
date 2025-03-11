import { Slider, Button, Space, Popover } from "antd";
import { useEffect,useState } from "react";
import { PauseOutlined, PlayCircleOutlined } from "@ant-design/icons";
import "./VideoControls.scss";
import { TimePoint } from '../pages/FakeMonitor';

interface VideoControlsProps {
    duration:number;
    currentTime:number;
    onProgressChange:(value:number)=>void;
    isPlaying:boolean;
    onPlayPauseClick:()=>void;
    timePoints: TimePoint[];
    onTimePointClick: (timestamp: number) => void;
}

const VideoControls = ({
    duration, currentTime, onProgressChange,
    isPlaying, onPlayPauseClick, timePoints,
    onTimePointClick
}: VideoControlsProps) => {
    const [progress,setProgress]=useState(0);

    useEffect(()=>{
        setProgress((currentTime/duration)*100);
    },[currentTime,duration]);

    // 计算悬浮窗的时间
    const sliderPopoverContent=(value:number)=>{
        return <div>{Math.round(value)}%</div>
    };

    // 处理视频进度改变
    const handleProgressChange=(value:number)=>{
        setProgress(value);
        onProgressChange((value/100)*duration);
    };

    return (
        <div className="video-controls">
            <Popover content={()=>sliderPopoverContent(progress)} open={true} trigger="hover"}>
                <Slider
                value={progress}
                onChange={handleProgressChange}
                tooltip={{ formatter: value => `${Math.round(value)}%` }}
            />
            </Popover>
            <Space className="control-buttons">
                <Button
                    type="primary"
                    icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
                    onClick={onPlayPauseClick}
                />
                {timePoints.map(point => (
                    <Button
                        key={point.id}
                        size="small"
                        onClick={() => onTimePointClick(point.timestamp)}
                    >
                        {point.name}
                    </Button>
                ))}
            </Space>
        </div>
    );
};

export default VideoControls;
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
    startTime:Date;
}

const VideoControls = ({
    duration, currentTime, onProgressChange,
    isPlaying, onPlayPauseClick, timePoints,
    onTimePointClick, startTime
}: VideoControlsProps) => {
    const [progress,setProgress]=useState(0);

    useEffect(()=>{
        setProgress((currentTime/duration)*100);
    },[currentTime,duration]);

    // 计算悬浮窗的时间
    const sliderPopoverContent=(value:number)=> {
        const seconds=(value/100)*duration;
        const currentTime=new Date(startTime.getTime()+seconds*1000);
        return (
            <div>
                {currentTime.toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                })}
            </div>
        );
    }

    // 处理视频进度改变
    const handleProgressChange=(value:number)=>{
        setProgress(value);
        onProgressChange((value/100)*duration);
    };

    return (
        <div className="video-controls">
            <Popover
                content={sliderPopoverContent(progress)}
                open={false}
                trigger="hover"
                overlayClassName="time-popover"
            >
                <Slider
                    value={progress}
                    onChange={handleProgressChange}
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
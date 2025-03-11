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
    const [hoverProgress, setHoverProgress] = useState(0);
    
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
        const currentTime = new Date(startTime.getTime() + (value/100)*duration*1000);
        console.log('currentTime: '+currentTime);
    };

    return (
        <div className="video-controls">
            <Popover
                content={sliderPopoverContent(hoverProgress)}
                trigger="hover"
                mouseEnterDelay={0} 
                mouseLeaveDelay={0} 
                overlayClassName="time-popover"
                destroyTooltipOnHide 
            >
                <div style={{ width: '100%' }}>
                    <Slider
                        value={progress}
                        onChange={handleProgressChange}
                        tooltip={{ formatter: null }} 
                        onMouseMove={(e) => {
                            // 计算鼠标位置对应的进度值
                            const sliderRect = e.currentTarget.getBoundingClientRect();
                            const percentage = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
                            setHoverProgress(Math.min(Math.max(percentage, 0), 100));
                        }}
                    />
                </div>
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
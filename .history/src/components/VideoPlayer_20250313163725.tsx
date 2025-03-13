import './VideoPlayer.scss';
import VideoChannel from './VideoChannel';
import {Card} from 'antd';
import VideoControls from './VideoControls';
import { act, useRef, useState } from 'react';
import { TimePoint } from '../pages/FakeMonitor';

interface VideoPlayerProps {
    timePoints: TimePoint[];
    startTime: Date;
}

const VideoPlayer = ({ timePoints,startTime }: VideoPlayerProps) => {
    const channelCount=4;
    const [duration,setDuration]=useState(0);
    const [currentTime,setCurrentTime]=useState(0);
    const videoRefs=useRef<HTMLVideoElement[]>([]);
    const [isPlaying,setIsPlaying]=useState(false);
    const [activeChannels,setActiveChannels]=useState<boolean[]>(Array(channelCount).fill(true));

    const handleTimePointClick = (timestamp: number) => {
        handleProgressChange(timestamp);
    };

    // 点击开闭视频通道
    const handleClickChannel=(index:number)=>{
        const newActiveChannels=[...activeChannels];
        newActiveChannels[index]=!newActiveChannels[index];
        console.log("通道状态："+newActiveChannels);
        setActiveChannels(newActiveChannels);
    };


    // 处理播放暂停
    const handlePlayPauseClick=()=>{
        setIsPlaying(!isPlaying);
        console.log("播放状态："+isPlaying);
        videoRefs.current.forEach(video=>{
            if(video){
                if(isPlaying) video.pause();
                else video.play();
            }
        });
    };

    // 自动同步视频进度
    const handleTimeUpdate=(time:number)=>{
        setCurrentTime(time);
        videoRefs.current.forEach( video=>{
            if(video && Math.abs(video.currentTime-time)>0.5){
                video.currentTime=time;
            }
        } );
    };

    const handleProgressChange=(time:number)=>{
        videoRefs.current.forEach( video=>{
            if(video){
                video.currentTime=time;
            }
        } );
    };

    // 计算视频布局
    const getLayoutClassName=(count:number)=>{
        switch(count){
            case 1: return 'single-screen';
            case 2: return 'double-screen';
            case 3:
            case 4: return 'quad-screen';
            default: return 'quad-screen';
        }
    }

    return(
        <Card className='video-player'>
            <div className={`video-container ${getLayoutClassName(channelCount)}`}>
                {
                    Array.from({length:channelCount}).map((_,index)=>(
                        <Card key={index} 
                        className='video-item'
                        >
                            <VideoChannel 
                                channelId={index+1}
                                onTimeUpdate={index===0?handleTimeUpdate:undefined}
                                onDurationChange={index===0?setDuration:undefined}
                                ref={el=>videoRefs.current[index]=el}
                                isPlaying={isPlaying}
                            />
                        </Card>
                    ))
                }
            </div>
            <VideoControls
                duration={duration}
                currentTime={currentTime}
                onProgressChange={handleProgressChange}
                isPlaying={isPlaying}
                onPlayPauseClick={handlePlayPauseClick}
                timePoints={timePoints}
                onTimePointClick={handleTimePointClick}
                startTime={startTime}
            />
        </Card>
    )
}

export default VideoPlayer;
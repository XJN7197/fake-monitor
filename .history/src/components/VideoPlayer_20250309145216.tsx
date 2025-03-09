import './VideoPlayer.scss';
import VideoChannel from './VideoChannel';
import {Card} from 'antd';

const VideoPlayer=()=>{
    const channelCount=4;

    const getLayoutClassName=(count:number)=>{
        switch(count){
            case 1:
                return 'single-screen';
            case 2:
                return 'double-screen';
            case 3:
            case 4:
                return 'quad-screen';
            default:
                return 'quad-screen';
        }
    }

    return(
        <div className='video-player'>
            <div className={`video-container ${getLayoutClassName(channelCount)}`}>
                {
                    Array.from({length:channelCount}).map((_,index)=>(
                        <div key={index} className='video-item'>
                            <VideoChannel key={index} channelId={index+1}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoPlayer;
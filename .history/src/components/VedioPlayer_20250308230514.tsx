import { CgCPlusPlus } from 'react-icons/cg';
import './VedioPlayer.scss';

const VedioPlayer=()=>{
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
                            通道{index+1}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
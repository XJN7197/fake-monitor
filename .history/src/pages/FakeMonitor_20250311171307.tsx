import VideoPlayer from '../components/VideoPlayer';
import './FakeMonitor.scss';

// 定义项点数据接口
export interface TimePoint {
    id: number;
    name: string;
    timestamp: number;  // 视频时间点（秒）
    
}

const FakeMonitor = () => {
    // Mock 一些铁路监控项点数据
    const mockTimePoints: TimePoint[] = [
        { id: 1, name: '车辆进站', timestamp: 10 },
        { id: 2, name: '停车检查', timestamp: 30 },
        { id: 3, name: '人员上下', timestamp: 45 },
        { id: 4, name: '车辆出站', timestamp: 60 }
    ];

    const mockStartTime = new Date('2025-03-11T17:09:04');

    return (
        <div className='fake-monitor'>
            <VideoPlayer 
            timePoints={mockTimePoints} 
            startTime={mockStartTime}
            />
        </div>
    )
}

export default FakeMonitor;
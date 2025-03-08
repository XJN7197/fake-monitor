const VideoChannel=({channelId}:{channelId:number})=>{
    return(
        <div className="video-channel">
            <video
                src="/public/video.mp4"
                autoPlay
                loop
                className="video-element"
            />
        </div>
    )
}

export default VideoChannel;
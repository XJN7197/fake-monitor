const VedioChannel=({channelId}:{channelId:number})=>{
    return(
        <div className="vedio-channel">
            <video
                src="/public/vedio.mp4"
                autoPlay
                loop
                className="vedio-element"
            />
        </div>
    )
}

export default VedioChannel;
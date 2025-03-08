const VedioChannel=({channelId}:{channelId:number})=>{
    return(
        <div className="vedio-channel">
            <vedio
                src="/public/vedio.mp4"
                autoPlay
                loop
                className="vedio-element"
            />
        </div>
    )
}

export default VedioPlayer;
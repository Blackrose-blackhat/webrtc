import { useEffect, useRef, useState } from "react";
import Room from "./Room";

const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            const audioTrack = stream.getAudioTracks()[0];
            const videoTrack = stream.getVideoTracks()[0];
            setLocalAudioTrack(audioTrack);
            setLocalVideoTrack(videoTrack);
            if (videoRef.current) {
                videoRef.current.srcObject = new MediaStream([videoTrack]);
                videoRef.current.play();
            }
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            getCam();
        }
    }, [videoRef]);

    if (!joined) {
        return (
            <div>
                <video autoPlay ref={videoRef}></video>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <button onClick={() => setJoined(true)}>Join</button>
            </div>
        );
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />;
};

export default Landing;

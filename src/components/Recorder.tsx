import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import useMediaRecorder from "../hooks/useMediaRecorder";

export default function Recorder() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const realtimeRef = useRef<HTMLVideoElement>(null);

  const {mediaStream, recordedBlob, startRecord, stopRecord} = useMediaRecorder(true);

  const onStopRecord = () => {
    stopRecord();
    videoRef.current?.load();
  };

  useEffect(() => {
    if (mediaStream && realtimeRef.current) {
      realtimeRef.current.srcObject = mediaStream;
      realtimeRef.current.play();
    }
  }, [mediaStream]);

  useEffect(() => {
      videoRef.current?.load();
  }, [recordedBlob])

  return (
    <div>
      <Button onClick={startRecord}>start recording</Button>
      <Button onClick={onStopRecord}>stop recording</Button>
      <video ref={realtimeRef} width="260" height="150" />
      <video ref={videoRef} width="260" height="150" controls>
        <source src={recordedBlob} />
      </video>
    </div>
  );
}

import RecorderUtil from "../util/recorder";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

export default function Recorder() {
  const startRecordRef = useRef<() => void | undefined>();
  const stopRecordRef = useRef<() => void | undefined>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const realtimeRef = useRef<HTMLVideoElement>(null);

  const [videoSrc, setVideoSrc] = useState<string>("");

  const onStopRecord = (url: string) => {
    setVideoSrc(url);
    videoRef.current?.load();
    videoRef.current?.play();
  };

  useEffect(() => {
    (async () => {
      const { startRecord, stopRecord, mediaStream } = await RecorderUtil.createMediaRecorder(onStopRecord);
      startRecordRef.current = startRecord;
      stopRecordRef.current = stopRecord;
      if (realtimeRef.current) {
        realtimeRef.current.srcObject = mediaStream;
        realtimeRef.current.play();
      }
    })();
  }, []);

  return (
    <div>
      <Button onClick={() => startRecordRef.current?.()}>stop recording</Button>
      <Button onClick={() => stopRecordRef.current?.()}>stop recording</Button>
      <video ref={realtimeRef} width="260" height="150" />
      <video ref={videoRef} width="260" height="150" controls>
        <source src={videoSrc} />
      </video>
    </div>
  );
}

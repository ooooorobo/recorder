import { Button } from "@mui/material";
import useMediaRecorder from "../hooks/useMediaRecorder";
import Video from "./Video";

export default function Recorder() {
  const { mediaStream, recordedBlob, startRecord, stopRecord } = useMediaRecorder(true);

  return (
    <div>
      <Button onClick={startRecord}>start recording</Button>
      <Button onClick={stopRecord}>stop recording</Button>
      <Video stream={mediaStream} width={260} height={150} />
      <Video src={recordedBlob} width={260} height={150} controls />
    </div>
  );
}
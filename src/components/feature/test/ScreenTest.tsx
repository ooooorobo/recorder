import RecordedVideo from "../../common/RecordedVideo";
import useMediaRecorder, { RecordingStatus } from "../../../hooks/useMediaRecorder";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import StreamVideo from "../../common/StreamVideo";

export default function ScreenTest() {
  const { status, mediaStream, startRecord, stopRecord, recordedBlob } = useMediaRecorder(true);

  const [showStream, setShowStream] = useState(true);

  useEffect(() => {
    if (status === RecordingStatus.RECORDED) {
      setShowStream(false);
    }
  }, [status]);

  useEffect(() => console.log(showStream), [showStream]);

  return (
    <>
      {showStream ? (
        <StreamVideo stream={mediaStream} width={700} height={400} />
      ) : (
        <RecordedVideo
          src={recordedBlob}
          width={700}
          height={400}
          onEnded={() => {
            setShowStream(true);
          }}
        />
      )}
      <Button onClick={status === RecordingStatus.RECORDING ? stopRecord : startRecord}>
        {status === RecordingStatus.RECORDING ? "녹화 중단" : "녹화 시작"}
      </Button>
    </>
  );
}

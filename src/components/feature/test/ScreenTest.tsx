import RecordedVideo from "../../common/RecordedVideo";
import useMediaRecorder, { RecordingStatus } from "../../../hooks/useMediaRecorder";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import StreamVideo from "../../common/StreamVideo";
import styled from "@emotion/styled";

export default function ScreenTest() {
  const { status, mediaStream, startRecord, stopRecord, recordedBlob } = useMediaRecorder(true);

  const [showStream, setShowStream] = useState(true);

  useEffect(() => {
    if (status === RecordingStatus.RECORDED) {
      setShowStream(false);
    }
  }, [status]);

  return (
    <>
      <VideoWrapper>
        <StreamVideo stream={mediaStream} width={700} height={400} />
        {!showStream && (
          <RecordedVideo
            src={recordedBlob}
            width={700}
            height={400}
            onEnded={() => {
              setShowStream(true);
            }}
          />
        )}
      </VideoWrapper>
      <Button onClick={status === RecordingStatus.RECORDING ? stopRecord : startRecord}>
        {status === RecordingStatus.RECORDING ? "녹화 중단" : "녹화 시작"}
      </Button>
    </>
  );
}

const VideoWrapper = styled.div`
  position: relative;
  video {
    position: absolute;
  }
`;

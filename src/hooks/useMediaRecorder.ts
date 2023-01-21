import { useEffect, useState } from "react";

export const enum RecordingStatus {
  NOT_INITIALIZED,
  READY,
  RECORDING,
  RECORDED,
}

export default function useMediaRecorder(initOnCall = false) {
  const [status, setStatus] = useState(RecordingStatus.NOT_INITIALIZED);
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordedBlob, setRecordedBlob] = useState<string>();

  const initMediaStream = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMediaStream(mediaStream);
    setStatus(RecordingStatus.READY);

    const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: "video/webm" });
    setMediaRecorder(mediaRecorder);

    mediaRecorder.ondataavailable = (e) => {
      const url = window.URL.createObjectURL(e.data);
      setRecordedBlob(url);
    };
  };

  useEffect(() => {
    if (initOnCall) {
      initMediaStream();
    }
  }, []);

  const startRecord = async () => {
    if (!mediaRecorder) {
      await initMediaStream();
    }

    mediaRecorder?.start();
    setStatus(RecordingStatus.RECORDING);
  };

  const stopRecord = () => {
    if (!mediaRecorder) {
      throw new Error("stream not found");
    }
    mediaRecorder.stop();
    setStatus(RecordingStatus.RECORDED);
  };

  return {
    status,
    mediaStream,
    startRecord,
    stopRecord,
    recordedBlob,
  };
}

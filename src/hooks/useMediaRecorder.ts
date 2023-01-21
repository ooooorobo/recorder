import { useEffect, useState } from "react";

export const enum RecordingStatus {
  NOT_INITIALIZED,
  READY,
  RECORDING,
  RECORDED,
  UNREGISTERED,
}

export default function useMediaRecorder(initOnCall = false) {
  const [status, setStatus] = useState(RecordingStatus.NOT_INITIALIZED);
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordedBlob, setRecordedBlob] = useState<string>();

  useEffect(() => {
    if (initOnCall) {
      initMediaStream();
    }
  }, []);

  useEffect(() => {
    return unregister;
  }, [mediaStream]);

  const initMediaStream = async () => {
    const newMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMediaStream(newMediaStream);
    setStatus(RecordingStatus.READY);

    const mediaRecorder = new MediaRecorder(newMediaStream, { mimeType: "video/webm" });
    setMediaRecorder(mediaRecorder);

    mediaRecorder.ondataavailable = (e) => {
      const url = window.URL.createObjectURL(e.data);
      setRecordedBlob(url);
    };
  };

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

  const unregister = () => {
    mediaStream?.getTracks().forEach((track) => track.stop());
    setStatus(RecordingStatus.UNREGISTERED);
  };

  return {
    status,
    mediaStream,
    startRecord,
    stopRecord,
    recordedBlob,
    unregister,
  };
}

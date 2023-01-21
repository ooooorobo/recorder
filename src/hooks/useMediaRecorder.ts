import { useEffect, useState } from "react";

export default function useMediaRecorder(initOnCall = false) {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordedBlob, setRecordedBlob] = useState<string>();

  const initMediaStream = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMediaStream(mediaStream);

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
  };

  const stopRecord = () => {
    if (!mediaRecorder) {
      throw new Error("stream not found");
    }
    mediaRecorder.stop();
  };

  return {
    mediaStream,
    startRecord,
    stopRecord,
    recordedBlob,
  };
}

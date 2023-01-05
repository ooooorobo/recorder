async function createMediaRecorder(onStopRecord: (url: string) => void) {
  const videoData: Blob[] = [];
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: "video/webm" });
  mediaRecorder.addEventListener("dataavailable", (e) => videoData.push(e.data));
  mediaRecorder.addEventListener("stop", () => {
    const videoBlob = new Blob(videoData, { type: "video/webm" });
    const blobUrl = window.URL.createObjectURL(videoBlob);
    onStopRecord(blobUrl);
  });

  return {
    mediaStream,
    startRecord: () => mediaRecorder.start(),
    stopRecord: () => mediaRecorder.stop(),
  };
}

const RecorderUtil = {
  createMediaRecorder,
};

export default RecorderUtil;

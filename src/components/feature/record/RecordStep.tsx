import { useEffect } from "react";
import useMediaRecorder from "../../../hooks/useMediaRecorder";

interface RecordStepProps {
  onRecordEnded: (src: string) => void;
}

export default function RecordStep({ onRecordEnded }: RecordStepProps) {
  const { mediaStream, startRecord, stopRecord } = useMediaRecorder(true, onRecordEnded);

  useEffect(() => {
    if (mediaStream) {
      startRecord();
    } else {
      return;
    }
    return stopRecord;
  }, [mediaStream]);
  return (
    <>
      <h1>03 : 00</h1>
    </>
  );
}

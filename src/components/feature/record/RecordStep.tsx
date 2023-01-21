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

  /**
   * TODO: 타이머 추가
   *  1. 녹화 시작할 때부터 타이머가 시작됨
   *  2. 타이머 끝나면 다음 녹화 종료 && 다음 스텝으로 넘기기
   */
  return (
    <>
      <h1>03 : 00</h1>
    </>
  );
}

import RecordedVideo from "../../common/RecordedVideo";

interface FeedbackStepProps {
  recordedSrc?: string;
}
export default function FeedbackStep({ recordedSrc }: FeedbackStepProps) {
  // TODO: 텍스트박스 추가
  return <RecordedVideo src={recordedSrc} width={300} height={150} controls />;
}

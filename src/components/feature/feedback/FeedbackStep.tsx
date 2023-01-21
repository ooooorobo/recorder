import RecordedVideo from "../../common/RecordedVideo";

interface FeedbackStepProps {
  recordedSrc?: string;
}
export default function FeedbackStep({ recordedSrc }: FeedbackStepProps) {
  return <RecordedVideo src={recordedSrc} width={300} height={150} controls />;
}

import React, { useState } from "react";
import { Button } from "@mui/material";
import ScreenTestStep from "./components/feature/test/ScreenTestStep";
import RecordStep from "./components/feature/record/RecordStep";
import FeedbackStep from "./components/feature/feedback/FeedbackStep";

const enum Step {
  SCREEN_TEST,
  RECORD,
  FEEDBACK,
}

function App() {
  const [step, setStep] = useState(Step.SCREEN_TEST);
  const [recordedSrc, setRecordedSrc] = useState("");

  const onClickNext = () => {
    // TODO: step 범위 안에서만 움직이게 하기
    setStep((prev) => prev + 1);
  };

  const onRecordEnded = (src: string) => {
    setRecordedSrc(src);
  };

  // TODO: 비디오를 화면 사이즈에 맞추기
  return (
    <div className="App">
      {step === Step.SCREEN_TEST && <ScreenTestStep />}
      {step === Step.RECORD && <RecordStep onRecordEnded={onRecordEnded} />}
      {step === Step.FEEDBACK && <FeedbackStep recordedSrc={recordedSrc} />}
      {/* TODO: 각 스텝 안에서 onClickNext 로직 처리 */}
      <Button onClick={onClickNext}>다음</Button>
    </div>
  );
}

export default App;

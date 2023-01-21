import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log("mm");
  }, []);
  const onClickNext = () => {
    setStep((prev) => prev + 1);
  };

  const onRecordEnded = (src: string) => {
    setRecordedSrc(src);
  };

  return (
    <div className="App">
      {step === Step.SCREEN_TEST && <ScreenTestStep />}
      {step === Step.RECORD && <RecordStep onRecordEnded={onRecordEnded} />}
      {step === Step.FEEDBACK && <FeedbackStep recordedSrc={recordedSrc} />}
      <Button onClick={onClickNext}>다음</Button>
    </div>
  );
}

export default App;

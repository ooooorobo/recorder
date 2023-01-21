import { useEffect, useRef } from "react";

interface VideoProps {
  src?: string;
  width: number | string;
  height: number | string;
  controls?: boolean;
  onEnded?: () => void;
}

export default function RecordedVideo({ src, width, height, controls = false, onEnded }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (src) {
      ref.current?.load();
      ref.current?.play();
      if (onEnded) {
        ref.current?.addEventListener("ended", onEnded);
      }
    }
  }, [src]);

  return (
    <video ref={ref} width={width} height={height} controls={controls}>
      {src && <source src={src} />}
    </video>
  );
}

import { useEffect, useRef } from "react";

interface VideoProps {
  stream?: MediaStream;
  width: number | string;
  height: number | string;
}

export default function StreamVideo({ stream, width, height }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && ref.current) {
      ref.current.srcObject = stream;
      ref.current.play();
    }
  }, [stream]);

  return <video ref={ref} width={width} height={height} />;
}

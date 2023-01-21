import { useEffect, useRef } from "react";

interface VideoProps {
  type: "RECORDED" | "STREAM";
  src?: string;
  stream?: MediaStream;
  width: number;
  height: number;
  controls?: boolean;
}

export default function Video({ type, src, stream, width, height, controls = false }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.load();
  }, [src]);

  useEffect(() => {
    if (type === "STREAM" && stream && ref.current) {
      ref.current.srcObject = stream;
      ref.current.play();
    }
  }, [stream]);

  return (
    <video ref={ref} width={width} height={height} controls={controls}>
      {type === "RECORDED" && src && <source src={src} />}
    </video>
  );
}

import { useRef, useState } from "react";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCamera() {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return videoRef.current?.play();
    } catch (error) {
      return setError("Camera access denied");
    } finally {
      setIsLoading(false);
    }
  }
  function stopCamera() {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }
  function captureFrame(): string | null {
    if (!videoRef.current) return null;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);

    // returns base64 string, strip the "data:image/jpeg;base64," prefix
    return canvas.toDataURL("image/jpeg").split(",")[1];
  }

  return { videoRef, startCamera, stopCamera, captureFrame, isLoading, error };
}

import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import type { TabComponentProps } from "@/types/internal-tab.types";
import { useEffect } from "react";

export default function Camera({ ...props }: TabComponentProps) {
  useEffect(() => {
    const video = document.getElementById("vid") as HTMLVideoElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
      });
    }
  }, []);
  return (
    <PoppingWindow {...props}>
      <div className={`w-full h-full overflow-hidden`}>
        <video
          id="vid"
          className="w-full h-full -scale-x-100"
          autoPlay
          playsInline
        />
      </div>
    </PoppingWindow>
  );
}

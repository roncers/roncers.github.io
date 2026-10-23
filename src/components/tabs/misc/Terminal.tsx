import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import type { TabComponentProps } from "@/types/internal-tab.types";
import { useEffect } from "react";

function executeCode() {
  return eval((document.querySelector("textarea") as HTMLTextAreaElement)?.value || "");
}

export default function Terminal({ ...props }: TabComponentProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault();
        executeCode();
        console.log(executeCode());
      }
    }

    addEventListener("keydown", handleKeyDown);

    const textarea = document.querySelector("textarea");
    textarea?.focus();

    return () => {
      removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <PoppingWindow {...props}>
      <div className="w-full h-full overflow-hidden">
        <textarea
          style={{
            color: "var(--color-light)",
          }}
          className="w-full h-full bg-transparent outline-none resize-none"
          rows={10}
        />
      </div>
    </PoppingWindow>
  );
}
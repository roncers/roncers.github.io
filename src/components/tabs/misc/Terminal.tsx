import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import type { TabComponentProps } from "@/types/internal-tab.types";
import { useState, type KeyboardEvent, useEffect, useRef } from "react";

export default function Terminal({ ...props }: TabComponentProps) {
  const [ans, setAns] = useState("");
  const frameRef = useRef<HTMLIFrameElement>(null);

  function executeCode(code: string) {
    frameRef.current?.contentWindow?.postMessage({ type: "run", code }, "*");
  }

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.source !== frameRef.current?.contentWindow) return;

      const data: unknown = event.data;
      if (
        typeof data === "object" &&
        data !== null &&
        "type" in data &&
        data.type === "result" &&
        "value" in data &&
        typeof data.value === "string"
      ) {
        setAns((prev) => `${prev}${prev ? "\n" : ""}${data.value}`);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const code = e.currentTarget.value;
      executeCode(code);
      setAns((prev) => prev + "\n" + code);
      e.currentTarget.value = "";
    }
  }

  const evaluatorHtml = `<!doctype html>
<meta http-equiv="Content-Security-Policy"
  content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; form-action 'none'; base-uri 'none'">
<script>
  addEventListener("message", (event) => {
    if (event.source !== parent) return;

    const message = event.data;
    if (message?.type !== "run" || typeof message.code !== "string") return;

    try {
      const value = eval(message.code);
      parent.postMessage({ type: "result", value: String(value) }, "*");
    } catch (error) {
      parent.postMessage({
        type: "result",
        value: error instanceof Error ? error.message : String(error)
      }, "*");
    }
  });
<\/script>`;

  return (
    <PoppingWindow {...props}>
      <div className="w-full h-full">
        <pre style={{ whiteSpace: "pre-wrap" }}>{ans}</pre>
        <textarea
          autoFocus
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-transparent outline-none resize-none color-light"
          rows={5}
        />
        <iframe
          ref={frameRef}
          title="Code evaluator"
          sandbox="allow-scripts"
          srcDoc={evaluatorHtml}
          style={{ display: "none" }}
        />
      </div>
    </PoppingWindow>
  );
}

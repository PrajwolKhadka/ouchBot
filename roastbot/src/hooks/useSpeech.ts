import { useState } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }
  function stop() {
        window.speechSynthesis.cancel();
  }

  return { speak, stop, isSpeaking };
}

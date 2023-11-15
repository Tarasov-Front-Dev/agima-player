import { useState } from "react";

const audioContextState = {
  SUSPENDED: "suspended",
  RUNNING: "running",
  CLOSED: "closed",
} as const;

export default function useAudioContext(
  audioElementRef: React.RefObject<HTMLAudioElement>
) {
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [gainNode, setGainNode] = useState<GainNode>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const init = () => {
    if (audioElementRef.current) {
      const context = new AudioContext();
      const gainNode = context.createGain();
      const track = context.createMediaElementSource(audioElementRef.current);
      track.connect(gainNode).connect(context.destination);

      setAudioContext(context);
      setGainNode(gainNode);
    }
  };

  const playPause = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!audioContext) init();
    if (audioContext && audioElementRef.current) {
      if (audioContextState.SUSPENDED) {
        audioContext.resume();
      }
      switch (e.currentTarget.dataset.playing) {
        case "false":
          audioElementRef.current.play();
          setIsPlaying(true);
          e.currentTarget.dataset.playing = "true";
          break;
        case "true":
          audioElementRef.current.pause();
          setIsPlaying(false);
          e.currentTarget.dataset.playing = "false";
      }
    }
  };

  return { audioContext, playPause, isPlaying };
}

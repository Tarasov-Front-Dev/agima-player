import { useEffect, useRef, useState } from "react";

const audioContextState = {
  SUSPENDED: "suspended",
  RUNNING: "running",
  CLOSED: "closed",
} as const;

export default function useAudioContext(
  audioElRef: React.RefObject<HTMLAudioElement>
) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext>();
  const gainNodeRef = useRef<GainNode>();
  const connectedRef = useRef<boolean>(false);

  useEffect(() => {
    if (audioElRef.current && !connectedRef.current) {
      connectedRef.current = true; // check for existing AudioContext
      const context = new AudioContext();
      const gainNode = context.createGain();
      const track = context.createMediaElementSource(audioElRef.current);
      track.connect(gainNode).connect(context.destination);

      audioContextRef.current = context;
      gainNodeRef.current = gainNode;
    }
  }, []);

  useEffect(() => {
    const loadedDataHandler = (e: Event) => {
      if (isPlaying) {
        (e.currentTarget as HTMLMediaElement)
          .play()
          .then(() => setIsPlaying(true));
      }
    };
    audioElRef.current?.addEventListener("loadeddata", loadedDataHandler);
    return () => {
      audioElRef.current?.removeEventListener("loadeddata", loadedDataHandler);
    };
  }, [isPlaying]);

  const playPause = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (audioContextRef.current && audioElRef.current) {
      if (audioContextState.SUSPENDED) {
        audioContextRef.current.resume();
      }
      switch (e.currentTarget.dataset.playing) {
        case "false":
          audioElRef.current.play();
          setIsPlaying(true);
          e.currentTarget.dataset.playing = "true";
          break;
        case "true":
          audioElRef.current.pause();
          setIsPlaying(false);
          e.currentTarget.dataset.playing = "false";
      }
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gainNodeRef.current)
      gainNodeRef.current.gain.value = +e.currentTarget.value;
  };

  const playBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioElRef.current)
      audioElRef.current.currentTime = +e.currentTarget.value;
  };

  return {
    playPause,
    isPlaying,
    changeVolume,
    playBack,
  };
}

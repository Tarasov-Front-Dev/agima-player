import { useEffect, useState } from "react";
import { timeUpdate } from "../../shared/utils";

type InputPlaybackProps = {
  audioElRef: React.RefObject<HTMLAudioElement>;
};

export default function InputPlayback(
  props: React.ComponentPropsWithoutRef<"input"> & InputPlaybackProps
) {
  const [value, setValue] = useState<number>(0);
  const { audioElRef: audioElementRef, ...restProps } = props;
  const maxLength = audioElementRef.current?.duration;

  useEffect(() => {
    audioElementRef.current?.addEventListener("timeupdate", (e) =>
      timeUpdate(e, setValue)
    );
    return () => {};
  }, []);

  return (
    <input
      type="range"
      min={0}
      max={maxLength ? maxLength : 0}
      step={0.01}
      value={value}
      onInput={(e) => setValue(+e.currentTarget.value)}
      {...restProps}
    />
  );
}

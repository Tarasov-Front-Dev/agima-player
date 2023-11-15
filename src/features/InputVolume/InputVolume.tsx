import { useState } from "react";

export default function InputVolume(
  props: React.ComponentPropsWithoutRef<"input">
) {
  const [value, setValue] = useState<number>(1);
  return (
    <input
      type="range"
      min={0}
      max={2}
      step={0.01}
      value={value}
      onInput={(e) => setValue(+e.currentTarget.value)}
      {...props}
    />
  );
}

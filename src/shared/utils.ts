export const timeUpdate = (
  e: Event,
  cb: React.Dispatch<React.SetStateAction<number>>
) => {
  if (e.currentTarget) cb(+(e.currentTarget as HTMLAudioElement).currentTime);
};

export const prevTrack = (currentIdx: number, listLength: number) => {
  const targetTrackIdx = currentIdx - 1;
  return targetTrackIdx < 0 ? listLength - 1 : targetTrackIdx;
};

export const nextTrack = (currentIdx: number, listLength: number) => {
  const targetTrackIdx = currentIdx + 1;
  return targetTrackIdx > listLength - 1 ? 0 : targetTrackIdx;
};

export const parseTrackTitle = (str: string | null) => {
  if (!str) return;
  return str
    .slice(0, -4)
    .split("_")
    .map((el, idx) => {
      if (idx === 0) return el[0].toUpperCase() + el.slice(1) + "";
      else return el[0].toUpperCase() + el.slice(1);
    })
    .join(" ");
};

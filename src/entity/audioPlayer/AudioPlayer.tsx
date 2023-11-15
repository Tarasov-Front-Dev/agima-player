import "./AudioPlayer.scss";
import { useEffect, useRef, useState } from "react";
import InputVolume from "../../features/InputVolume/InputVolume";
import InputPlayback from "../../features/InputPlayback/InputPlayback";
import { getAudioListApi } from "./api/getAudioListApi";
import { nextTrack, prevTrack, parseTrackTitle } from "../../shared/utils";
import useAudioContext from "../../shared/hooks/useAudioContext";

export default function AudioPlayer() {
  const audioElRef = useRef<HTMLAudioElement>(null);
  const [trackList, setTrackList] = useState<string[]>();
  const [trackIdx, setTrackIdx] = useState<number>(0);
  const { playPause, isPlaying, changeVolume, playBack } =
    useAudioContext(audioElRef);

  useEffect(() => {
    getAudioListApi().then((response) => {
      if (response) setTrackList(response);
    });
  }, []);

  useEffect(() => {
    const endTrackHandler = () => {
      setTrackIdx(nextTrack(trackIdx, trackList?.length ?? 0));
    };
    if (audioElRef.current) {
      audioElRef.current.addEventListener("ended", endTrackHandler);
    }
    return () => {
      audioElRef.current?.removeEventListener("ended", endTrackHandler);
    };
  }, [trackIdx, trackList]);

  return (
    <section className="audio-player">
      <div className="audio-player__buttons buttons">
        <button
          className="button button_prev-track"
          onClick={() =>
            setTrackIdx(prevTrack(trackIdx, trackList?.length ?? 0))
          }
        ></button>
        <button
          className={
            "button button_play" + (isPlaying ? " button_play-active" : "")
          }
          onClick={playPause}
          data-playing="false"
        ></button>
        <button
          className="button button_next-track"
          onClick={() =>
            setTrackIdx(nextTrack(trackIdx, trackList?.length ?? 0))
          }
        ></button>
      </div>
      <div className="audio-player__song song">
        <InputVolume
          name="volume"
          onChange={changeVolume}
          className="song__input input_volume"
        />
        <span className="song__title">
          {parseTrackTitle(trackList ? trackList[trackIdx] : null)}
        </span>
        <InputPlayback
          name="playback"
          className="song__input input_playback"
          audioElRef={audioElRef}
          style={{ visibility: isPlaying ? "visible" : "hidden" }}
          onChange={playBack}
        />
      </div>
      <div className="image-container">
        {trackList && (
          <img
            className={"cover" + (isPlaying ? " cover_playing" : "")}
            src={`http://localhost:5173/${
              trackList && trackList[trackIdx].slice(0, -4)
            }.webp`}
          />
        )}
      </div>
      <audio ref={audioElRef} src={trackList && trackList[trackIdx]}></audio>
    </section>
  );
}

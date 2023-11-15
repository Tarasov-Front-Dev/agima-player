import { useRef } from "react";
import "./styles/App.scss";
import useAudioContext from "./utils/hooks/useAudioContext";

function App() {
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const { audioContext, playPause, isPlaying } =
    useAudioContext(audioElementRef);
  return (
    <section className="audio-player">
      <div className="audio-player__buttons">
        <button className="button">&lt;&lt;</button>
        <button className="button" onClick={playPause} data-playing="false">
          {isPlaying ? "PAUSE" : "PLAY"}
        </button>
        <button className="button">&gt;&gt;</button>
      </div>
      <div className="audio-player__song song">
        <input type="range" />
        <h2>Song title</h2>
        <input type="range" />
      </div>
      <audio ref={audioElementRef} src="50cent_in_da_club.mp3"></audio>
    </section>
  );
}

export default App;


import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "./socket";

function Join() {
  const { roomId } = useParams();
  const audioRef = useRef();

  useEffect(() => {
    socket.emit("join-room", roomId);
    socket.emit("get-state", roomId);

    socket.on("sync", ({ time, playing }) => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = time;

      if (playing) audioRef.current.play();
      else audioRef.current.pause();
    });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Connected 🎧</h2>
      <audio ref={audioRef} controls />
    </div>
  );
}

export default Join;
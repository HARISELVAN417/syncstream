import { useState } from "react";
import socket from "./socket";
import QRCode from "react-qr-code";

function Host() {
  const [roomId] = useState(Math.random().toString(36).slice(2, 7));
  const [videoSrc, setVideoSrc] = useState(null);

  const startRoom = () => {
    socket.emit("create-room", roomId);
  };

  const handleFile = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setVideoSrc(file);
  };

  const sync = (video) => {
    socket.emit("sync", {
      roomId,
      time: video.currentTime,
      playing: !video.paused
    });
  };
  const QR = QRCode.default;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Room: {roomId}</h2>
      <button onClick={startRoom}>Start</button>

      <input type="file" onChange={handleFile} />

      {videoSrc && (
        <video
          src={videoSrc}
          controls
          width="500"
          onTimeUpdate={(e) => sync(e.target)}
          onPlay={(e) => sync(e.target)}
          onPause={(e) => sync(e.target)}
        />
      )}

      <QR value={`localhost:5173/join/${roomId}`} />
    </div>
  );
}

export default Host;
import { useNavigate, useOutletContext } from "react-router";

import { useEffect, useState } from "react";

interface IOutletContext {
  files: string[];
}

function VideoPage() {
  const [count, setCount] = useState<number>(0);
  const { files } = useOutletContext<IOutletContext>();
  const navigate = useNavigate();

  useEffect(() => {
    if (count >= files.length && files.length > 0) {
      setCount(0);
    }
  }, [count, files]);

  const onEnded = () => {
    setCount((prev) => prev + 1);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onDragOver={handleOver} onDragLeave={handleLeave} onDrop={handleDrop}>
      {files.length > 0 ? (
        <video
          key={count}
          onClick={() => navigate("/smile")}
          autoPlay
          src={files[count]}
          onEnded={onEnded}
          className="object-cover w-screen h-screen"
        ></video>
      ) : (
        "No Video"
      )}
    </div>
  );
}

export default VideoPage;

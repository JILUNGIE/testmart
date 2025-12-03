import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

function VideoPage() {
  const navigate = useNavigate();
  const [videoList, setVideoList] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [index, setIndx] = useState(0);
  const [filePath, setFilePath] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadFiles = async () => {
      const files = await window.electron.reqVideoFiles();
      setVideoList(files);
      console.log(files);
      setIsReady(true);
    };

    loadFiles();
  }, []);

  useEffect(() => {
    if (videoList.length > 0) {
      setFilePath(videoList[index]);
    }
  }, [index, videoList]); // index 또는 videoUrl이 변경될 때마다 filePath 갱신

  const handleEnd = async () => {
    setIsReady(false);
    setIndx((prev) => (prev < videoList.length - 1 ? prev + 1 : 0));
    videoRef.current!.play();
    setIsReady(true);
  };

  return (
    <div>
      {isReady ? (
        <video
          ref={videoRef}
          onClick={() => navigate("/smile")}
          autoPlay
          className="object-cover w-screen h-screen"
          onEnded={handleEnd}
          src={filePath}
        ></video>
      ) : (
        <div>Loading...</div> // 비디오 로딩 중 표시
      )}
    </div>
  );
}

export default VideoPage;

import React, { useEffect, useRef, useState } from "react";
import postApi from "../../api/postApi";
import { useParams } from "react-router";
import SlideBar from "../../component/SlideBar";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import ButtonAdmin from "../../admin/ButtonAdmin";

const MusicDetail = () => {
  const { id } = useParams(); // dùng để lấy id
  const [detailRadio, setDetailRadio] = useState({});
  const [isPlay, setPlay] = useState(false);
  const detail = async (id) => {
    const detailRadio = await postApi.getDetail(id);
    setDetailRadio(detailRadio.data);
  };
  useEffect(() => {
    if (id) {
      detail(id);
    }
  }, [id]);

  const audioRef = useRef();
  const handlePlayPause = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };
  return (
    <div className="test">
      <SlideBar />
      <div>
        <div className="center-container">
          <span className="animation">
            <span className="animation-item"></span>
          </span>
          <>
            <Link to={"/"}>
              <LeftOutlined className="left-detail" />
            </Link>
            <img
              src={detailRadio.image}
              alt="anh"
              width={220}
              height={220}
              className="img-detail"
            />
            <p>đây là {detailRadio.detail}</p>
            <audio controls ref={audioRef} autoPlay={isPlay}>
              {isPlay ? (
                <source src={detailRadio.audio} type="audio/mpeg" />
              ) : null}
            </audio>
            <button onClick={handlePlayPause} className="btnPlayMusic">
              {isPlay ? "Pause" : "Play"}
            </button>
          </>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MusicDetail;

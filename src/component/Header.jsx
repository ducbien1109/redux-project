import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  BellOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ListData from "../store/ListData";
import { useEffect, useState } from "react";
import ButtonAdmin from "../admin/ButtonAdmin";
import getPostApiPopularRadio from "../api/postApiPopularRadio";
import postApi from "../api/postApi";
import { toast } from "react-toastify";
import {
  getDataPopularArtist,
  getDataPopularRadio,
  setDataPopularArtist,
  setDataRadio,
} from "../store/Reducer";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  //api
  const [postsPopularArtist, setPopularArtist] = useState([]);
  const [postsPopularRadio, setPopularRadio] = useState([]);
  const dispatch = useDispatch();
  // nó ra rỗng ă anh thấy không
  const DataMusic = useSelector(getDataPopularArtist); // như v là anh có thể lấy state trong reducer ra được nè
  const dataPopularRadio = useSelector(getDataPopularRadio);
  const navigate = useNavigate()


  const getAllMusic = async () => {
    const response = await postApi.getAll();
    // sử dụng dispatch để thay up data mới vào state
    dispatch(setDataPopularArtist(response.data)); // cái này anh nên để trong call api để cho khi vừa call có dữ liệu mới cái nó tự đẩy lên luôn
    // localStorage.setItem("PopularArtist", JSON.stringify(response.data))
    setPopularArtist(response.data);
  };
  useEffect(() => {
    // JSON.stringify(localStorage.setItem("PopularArtist", []));
    getAllMusic();
  }, []);

  ///
  const getPopularRadio = async () => {
    const response = await getPostApiPopularRadio.getAllRadio();
    dispatch(setDataRadio(response.data));
    // const newData = JSON.parse(localStorage.getItem("musicData"));
    // localStorage.setItem("musicData", JSON.stringify(response.data))
    // dispatch(setPopularRadio(response))
    setPopularRadio(response.data);
    // Sử dụng dispatch để gửi dữ liệu mới vào Redux store
  };
  useEffect(() => {
    // JSON.stringify(localStorage.setItem("musicData", []));
    getPopularRadio();
  }, []);

  //delete ARTISTS
  const deleteMusic = async (id) => {
    try {
      const item = await postApi.delete(id);
      getAllMusic();
      // const del = item.filter((element)=>element.id !== id) sử dụng ở data cứng
      toast.success("bạn đã xóa thành công");
    } catch (error) {
      toast.error("xóa không thành công");
    }
  };

  //DELETE RADIO
  const deleteRadio = async (id) => {
    try {
      const item = await getPostApiPopularRadio.delete(id);
      getPopularRadio();
      toast.success("xóa thành công");
    } catch (error) {
      toast.error("xóa không thành công");
    }
  };

  return (
    // marginLeft: '350px' dẫn đến khó responsive
    <header style={{ marginLeft: "350px", padding: "6px 50px" }}>
      <div className="header-menu">
        <div className="header-menu-icon">
          <LeftOutlined className="header-menu-icon-left" />
          <RightOutlined className="header-menu-icon-right" />
        </div>
        <div className="waviy">
          <span style={{ "--i": 1 }}>S</span>
          <span style={{ "--i": 2 }}>P</span>
          <span style={{ "--i": 3 }}>O</span>
          <span style={{ "--i": 4 }}>T</span>
          <span style={{ "--i": 5 }}>I</span>
          <span style={{ "--i": 6 }}>F</span>
          <span style={{ "--i": 7 }}>Y</span>
        </div>
        <div className="header-menu-item">
          <Button danger>Edit Music</Button>
          <Button type="primary" danger>
            <ArrowDownOutlined />
            Install App
          </Button>
          <BellOutlined
            className="btn"
            style={{ color: "#ffffff", fontSize: "20px", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="Show">
        <h3>Popular radio</h3>
        <p>Show all</p>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {dataPopularRadio.map((item) => {
          return (
            <div key={item.id}>
              <ListData
                text={
                  <ul>
                    <li>
                      <ul>
                        <img
                          src={item.image}
                          alt="ảnh"
                          width={200} height={150}
                          style={{ borderRadius: "10px" }}
                        />
                        <li>{item.nameMusic}</li>
                        <li>{item.author}</li>
                        {/* <audio controls ref={audioRef} autoPlay = {playMusic}>
                            {playMusic ? <source>{item.audio}</source> : null}
                          </audio> */}
                      </ul>
                      <ButtonAdmin name="edit" color="primary" clickBtn={()=>navigate(`/admin/${item.id}`)}/>
                      <ButtonAdmin
                        name="delete"
                        color="primary"
                        clickBtn={() => deleteRadio(item.id)}
                      />
                    </li>
                  </ul>
                }
              />
            </div>
          );
        })}
      </div>
      <div className="popular-artists">
        <h3>Popular artists</h3>
        <p>Show all</p>
      </div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {DataMusic.map((item) => {
          return (
            <div key={item.id}>
              <ListData
                text={
                  <>
                    <ul>
                      <div class="box-zoom-out">
                      <img src={item.image} alt="MTP" width={200} height={150} />
                      </div>
                      <li>{item.nameMusic}</li>
                      <li>{item.author}</li>
                    </ul>
                    <div className="icon-btn-edit">
                      <ButtonAdmin name="edit" color="primary" clickBtn={()=>navigate(`/admin/${item.id}`)}/>
                      <ButtonAdmin
                        name="delete"
                        color="primary"
                        clickBtn={() => deleteMusic(item.id)}
                      />
                      <Link
                        to={`/spotify-popularRadio/${item.id}`}
                        className="icon-right"
                      >
                        <ArrowRightOutlined />
                      </Link>
                    </div>
                  </>
                }
              />
            </div>
          );
        })}
      </div>
    </header>
  );
}
export default Header;

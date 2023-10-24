import {
  HomeOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SlideBar() {
  const navigate = useNavigate();
  const [form, setFormData] = useState({
    id: "",
    name: "",
    singer: "",
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleChange = (e) => {
    setFormData({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleOk = (e) => {
    console.log("Form Data:", form);
    setIsModalOpen(false);
    setFormData("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //image
  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };
  const handleEdit = () => {
    navigate("/admin"); 
  };
  return (
    <div>
      <div className="slide-bar">
        <div>
          <div className="slide-bar-home slide-home-item">
            <HomeOutlined />
            <button onClick={handleEdit} className="btn-home">ADMIN</button>
          </div>
          <div className="slide-bar-home">
            <SearchOutlined />
            <a>SEARCH</a>
          </div>
        </div>
        <div>
          <div>
            <div className="create-library">
              <div className="library">
                <MenuUnfoldOutlined />
                <h3>Your Library</h3>
              </div>
              <div className="library">
                <PlusOutlined />
                <RightOutlined />
              </div>
            </div>
            <div>
              <div className="create-btn create-btn-playlist">
                <h4>Create your first playlist</h4>
                <p>It's easy, well'll you</p>
                <Button type="primary" onClick={showModal}>
                  Create playlist
                </Button>
              </div>
              <div className="create-btn create-btn-playlist">
                <h4>Let's find some podcasts to follow</h4>
                <p>It's easy, well'll you</p>
                <Button type="primary">Browse podcasts</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalOpen} // Sử dụng thuộc tính `visible` để hiển thị modal
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>id</label>
        <TextArea
          placeholder="Autosize height based on content lines"
          autoSize
          name="id" // Sử dụng thuộc tính `name` để xác định trường tương ứng trong state
          value={form.id} // Liên kết giá trị với state
          onChange={handleChange}
        />
        <label>Image</label>
        <br />
        <Upload {...props}>
          <Button
            icon={<UploadOutlined />}
            name="image"
            value={form.image}
            onChange={handleChange}
          >
            Upload png only
          </Button>
        </Upload>

        <label>name</label>
        <TextArea
          placeholder="Autosize height based on content lines"
          autoSize
          name="name" // Sử dụng thuộc tính `name` để xác định trường tương ứng trong state
          value={form.name} // Liên kết giá trị với state
          onChange={handleChange}
        />
        <label>singer</label>
        <TextArea
          placeholder="Autosize height based on content lines"
          autoSize
          name="singer" // Sử dụng thuộc tính `name` để xác định trường tương ứng trong state
          value={form.singer} // Liên kết giá trị với state
          onChange={handleChange}
        />
      </Modal>

    </div>
  );
}
export default SlideBar;

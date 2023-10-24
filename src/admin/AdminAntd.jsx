import { Col, Form, Input, Row, Card, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../component/Loading";
import { Await, useNavigate, useParams } from "react-router";
import postApi from "../api/postApi";
import getPostApiPopularRadio from "../api/postApiPopularRadio";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const AdminAntd = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("popularRadio");
  const { id } = useParams(); //luồng thứ 1 để lấy ra id và value của edit
  console.log(123, id);
  const navigate = useNavigate();
  const clearForm = () => {
    form.resetFields();
  };

  const createMusic = async (value) => {
    value.selectedOption = selectedOption; // Thêm giá trị đã chọn từ Select vào dữ liệu
    console.log(value);
    try {
      setIsLoading(true);
      if (selectedOption === "popularArtist") {
        const res = await postApi.create(value);
      } else if (selectedOption === "popularRadio") {
        const ress = await getPostApiPopularRadio.create(value);
      }
      toast.success("add product music success");
      clearForm();
      navigate("/");
    } catch (error) {
      toast.error("error product");
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMusic = async (value) => {
    value.selectedOption = selectedOption;

    console.log(value);
    try {
      setIsLoading(true);
      if (selectedOption === "popularArtist") {
        await postApi.update(value, id);
        toast.success("thanh cong");
        navigate("/");
      } else if (selectedOption === "popularRadio") {
        await getPostApiPopularRadio.update(value, id);
        toast.success("thanh cong");
        navigate('/')
      }
    } catch (error) {
      toast.error("error...!");
      setIsLoading(false);
    }
  };
  const onsubmit = async (value) => {
    if (id) {
      updateMusic(value);
    } else {
      createMusic(value);
    }
  };

  const getMusicRadio = async () => {
    try {
      setIsLoading(true);
      const { data } = await getPostApiPopularRadio.getDetail(id);
      form.setFieldsValue(data);
      setSelectedOption(data.selectedOption); // Đặt giá trị của selectedOption từ dữ liệu bản ghi
    } catch (error) {
      toast.error("ko");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getMusicRadio();
    } else {
      setSelectedOption("popularArtist");
    }
  }, [id]);

  // ///////////////////////////////
  const getMusicArtist = async () => {
    //luồng 3
    try {
      setIsLoading(true);
      const { data } = await postApi.getDetail(id);
      form.setFieldsValue(data); // lấy values của id
      setSelectedOption(data.selectedOption); // Đặt giá trị của selectedOption từ dữ liệu bản ghi
    } catch (error) {
      toast.error("lỗi");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // luồng thứ 2 chạy ef xem id có tồn tại ko nếu id tồn tại thì sẽ chạy lên luồng 3
    if (id) {
      getMusicArtist();
    } else {
      setSelectedOption("popularRadio");
    }
  }, [id]);

  return (
    <div className="form-container">
      {isLoading && <Loading />}
      <Card
        title={id ? "Edit Music" : "Add new Music"}
        style={{ width: 800, margin: "0 auto" }}
      >
        <Form layout="vertical" form={form} onFinish={onsubmit}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="nameMusic"
                label="name"
                rules={[
                  { required: true, message: "Please input your name music" },
                ]}
              >
                <Input placeholder="Nhập tên bài hát" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="author" label="author">
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="detail" label="detail">
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="image"
                label="image"
                rules={[{ required: true, message: "Please input your img" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="audio"
                label="audio"
                rules={[{ required: true, message: "Please input your audio" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <Select
                  value={selectedOption}
                  style={{ width: 120 }}
                  options={[
                    { value: "popularRadio", label: "popularRadio" },
                    { value: "popularArtist", label: "popularArtist" },
                  ]}
                  onChange={(value) => setSelectedOption(value)}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Link to={"/"} style={{ color: "red" }}>
            <LeftOutlined />
            Quay lại trang home.
          </Link>
        </Form>
      </Card>
    </div>
  );
};

export default AdminAntd;

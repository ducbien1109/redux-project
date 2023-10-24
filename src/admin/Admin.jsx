import { useFormik } from "formik";
import React, { useState } from "react";
import ButtonAdmin from "./ButtonAdmin";
import * as Yup from "yup"; // Fix typo "Yub" to "Yup"
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Admin = () => {
  const styleForm = {
    background: "red",
    border: "none",
    padding: "10px 10px",
    borderRadius: "10px",
    color: "#ffffff",
    fontWeight: "bold",
  };

  const navigate = useNavigate();
  const [form, setForm] = useState("");
  const formik = useFormik({
    initialValues: {
      image: "",
      author: "",
      name: "",
      audio: "",
      date: new Date(),
    },
    validationSchema: Yup.object({
      // Fix typo "Yub" to "Yup"
      name: Yup.string()
        .min(1, "Your name must be at least 5 characters!")
        .max(25, "Your name must be under 25 characters") // Fix max length validation
        .required("You must fill in this section!"), // Fix typo "your" to "You"
      author: Yup.string()
        .min(1, "Your name must be at least 5 characters!")
        .max(25, "Your name must be under 25 characters") // Fix max length validation
        .required("You must fill in this section!"), // Fix typo "your" to "You"
      image: Yup.string().required("You must fill in this image!"), // Fix typo "your" to "You"
      audio: Yup.string().required("You must fill in this audio!"), // Fix typo "your" to "You"
      date: Yup.date().required("You must fill in this date!"), // Fix typo "your" to "You"
    }),
    onSubmit: (values) => {
      setForm(values);
    },
  });
  const handleHome = () => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div>
      <h3>Admin</h3>
      <form onSubmit={formik.handleSubmit}>
        <label>Image</label>
        <input
          type="file"
          name="image"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.image && formik.touched.image && (
          <p>{formik.errors.image}</p>
        )}
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.author && formik.touched.author && (
          <p>{formik.errors.author}</p>
        )}
        <label>Name</label>{" "}
        {/* Updated label text to match the validation field name */}
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <p>{formik.errors.name}</p>
        )}
        <label>Audio</label>
        <input
          type="file"
          name="audio"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.audio && formik.touched.audio && (
          <p>{formik.errors.audio}</p>
        )}
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.date && formik.touched.date && (
          <p>{formik.errors.date}</p>
        )}
        <input type="submit" style={styleForm} />
        <div className="comeBack">
          <p onClick={handleHome} className="come-back">
            <ArrowLeftOutlined />
            Quay lại
          </p>
        </div>
      </form>
      <div>
        {form && (
          <div>
            <h1>dữ liệu</h1>
            <pre>{JSON.stringify(form)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

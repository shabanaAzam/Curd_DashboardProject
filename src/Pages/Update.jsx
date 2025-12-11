import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";

const api_Url = "http://localhost:3000/todo";
function Update() {
  let { id } = useParams();
  const navigate = useNavigate();

  const form = useForm();
  const { register, handleSubmit, reset, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    axiosInstance
      .get(`${api_Url}/${id}`)
      .then((res) => {
        reset(res.data); // pre-fill form with existing data
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id, reset]);

  const submitHandler = (data) => {
    data = { ...data, publishDate: new Date() };
    console.log(data);

    axiosInstance
      .put(`${api_Url}/${id}`, data)
      .then((res) => {
        console.log("Data update succsessfully", res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log("data failed", error);
      });
  };

  return (
    <div className="formDiv">
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Update Blog</h1>
        <label>Title :</label>
        <input
          type="text"
          placeholder="title"
          {...register("title", {
            required: { value: true, message: "*title is required" },
          })}
        />
        <p>{errors.title?.message}</p>

        <label>Author :</label>
        <input
          type="text"
          placeholder="author"
          {...register("author", {
            required: { value: true, message: "*author is required" },
          })}
        />
        <p>{errors.author?.message}</p>
        <label>Content :</label>
        <textarea
          placeholder="content"
          {...register("content", {
            required: { value: true, message: "*content is required" },
          })}
        />
        <p>{errors.content?.message}</p>

        <label>Tags :</label>
        <input
          type="text"
          placeholder="tags"
          {...register("tags", {
            required: { value: true, message: "*tags  is required" },
          })}
        />
        <p>{errors.tags?.message}</p>

        <input type="submit" value="Update Blog" />
      </form>
    </div>
  );
}

export default Update;

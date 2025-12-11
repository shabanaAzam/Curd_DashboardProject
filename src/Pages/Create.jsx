import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../axiosInstance/axiosInstance";
import { useNavigate } from "react-router-dom";

const api_Url = "http://localhost:3000/todo";
function Create() {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  let navigate = useNavigate();

  const submitHandler = (data) => {
    console.log(data);
    data = { ...data, publishDate: new Date() };
    console.log(data);
    axiosInstance
      .post(api_Url, data)
      .then((res) => {
        console.log("Data submited succsessfully", res.data);

        alert("new to do Added");
        navigate("/");
      })
      .catch((error) => {
        console.log("data failed", error);
      });
  };

  return (
    <div className="formDiv">
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>TO-Do List</h1>
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

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Create;

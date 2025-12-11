import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";

function Read() {
  const api_Url = "http://localhost:3000/todo";

  let navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(api_Url)
      .then((res) => {
        // console.log("data fetch succsessfully", res.data);
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`${api_Url}/${id}`)
      .then(() => {
        alert("Blog deleted successfully");
        setBlogs(blogs.filter((b) => b.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f48787ff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
     
      <div class="row row-cols-2 row-cols-md-2 g-3">
        {blogs.map((blog, index) => (
          <Card
            key={`${blog.id}-${index}`}
            border="primary"
            className="m-3"
            style={{
              width: "25rem",
              backgroundColor: "#a2f8e1ff",
              alignItems: "center",
            }}
          >
            <Card.Body>
              <Card.Title>
                <strong>Title: </strong>
                {blog.title}
              </Card.Title>
              <Card.Text>
                <strong>Author: </strong>
                {blog.author}
              </Card.Text>
              <Card.Text>
                <strong>Published:</strong>
                {formatDate(blog.publishDate)}
              </Card.Text>
              <Card.Text>
                <strong>Tag: </strong>
                {blog.tags}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/blog-details/${blog.id}`)}
              >
                View Details
              </Button>{" "}
              <Button variant="danger" onClick={() => handleDelete(blog.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Read;

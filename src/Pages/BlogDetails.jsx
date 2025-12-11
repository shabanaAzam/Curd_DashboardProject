import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axiosInstance from "../axiosInstance/axiosInstance";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const api_Url = "http://localhost:3000/todo";

  useEffect(() => {
    axiosInstance
      .get(`${api_Url}/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!blog) return <h2>Loading...</h2>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`${api_Url}/${id}`)
      .then(() => {
        alert("Blog deleted successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ width: "70%", margin: "30px auto" }}>
      <Card
        border="primary"
        className="m-3"
        style={{
          width: "35rem",
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
            <strong>Published : </strong>
            {formatDate(blog.publishDate)}
          </Card.Text>

          <Card.Text>
            <strong>content: </strong>
            {blog.content}
          </Card.Text>

          <Card.Text>
            <strong>Tags: </strong>{" "}
            <span style={{ color: "#007bff" }}>{blog.tags}</span>
          </Card.Text>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Button
              variant="primary"
              onClick={() => navigate(`/update/${blog.id}`)}
            >
              Edit
            </Button>

            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>

            <Button variant="secondary" onClick={() => navigate("/")}>
              Back
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BlogDetails;

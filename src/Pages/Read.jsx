import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";
import Pagination from "./Pagination";
import BlogSorting from "./BlogSorting";

function Read() {
  const api_Url = "http://localhost:3000/todo";
  let navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  // Filtering and Sorting
  const [author, setAuthor] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortType, setsortType] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const blogsperpage = 6;

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

  const filteredBlogs = blogs
    .filter((blog) => {
      return (
        (author === "" ||
          blog.author.toLowerCase().includes(author.toLowerCase())) &&
        (tagFilter === "" ||
          blog.tags.toLowerCase().includes(tagFilter.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortType === "date-new")
        return new Date(b.publishDate) - new Date(a.publishDate);
      if (sortType === "date-old")
        return new Date(a.publishDate) - new Date(b.publishDate);
      if (sortType === "author-az") return a.author.localeCompare(b.author);
      if (sortType === "author-za") return b.author.localeCompare(a.author);
      return 0;
    });

  const indexOfLastlog = currentPage * blogsperpage;
  const indexOfFirstBlog = indexOfLastlog - blogsperpage;

  const Paginetionlog = filteredBlogs.slice(indexOfFirstBlog, indexOfLastlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsperpage);

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
      <BlogSorting
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        author={author}
        setAuthor={setAuthor}
        sortType={sortType}
        setSortType={setsortType}
        onReset={() => {
          setAuthor("");
          setTagFilter("");
          setsortType("");
        }}
      />

      <div className="row row-cols-2 row-cols-md-2 g-3">
        {Paginetionlog.map((blog, index) => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Read;

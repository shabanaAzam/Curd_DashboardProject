import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Layout/Header";
import Create from "../Pages/Create";
import Read from "../Pages/Read";
import BlogDetails from "../Pages/BlogDetails";
import Update from "../Pages/Update";


function Routing() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Read />} />
           <Route path="/create" element={<Create />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;

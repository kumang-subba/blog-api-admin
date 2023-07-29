import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import Posts from "./Posts";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState({});
  const [errors, setErrors] = useState();
  const [editErrors, setEditErrors] = useState("");
  const handleDelete = async (_id) => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    fetch(`http://localhost:3000/api/posts/${_id}`, {
      method: "delete",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetch("http://localhost:3000/api/posts")
          .then((res) => res.json())
          .then((data) => {
            if (!data.err) {
              setPosts(data.allPosts);
            } else {
              setErrors(data.err);
            }
          });
      });
  };
  const handleEdit = async (_id, editForm) => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    const form = JSON.stringify(editForm);
    try {
      fetch(`http://localhost:3000/api/posts/${_id}`, {
        method: "PUT",
        body: form,
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            console.log(data.errors);
          }
          if (data.msg) {
            setEditErrors("");
            fetch("http://localhost:3000/api/posts")
              .then((res) => res.json())
              .then((data) => {
                if (!data.err) {
                  setPosts(data.allPosts);
                } else {
                  setErrors(data.err);
                }
              });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllPosts = async () => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          setPosts(data.allPosts);
        } else {
          setErrors(data.err);
        }
      });
  };
  useEffect(() => {
    if (!auth.username) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      fetchAllPosts();
    }
  }, [auth]);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
        justifyContent: "center",
        gap: 2,
        mb: 2,
      }}
    >
      <Button variant="contained" component={Link} to="/new-post">
        New Post
      </Button>
      {posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <Posts
              key={index}
              {...post}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              editErrors={editErrors}
              fetchAllPosts={fetchAllPosts}
            />
          );
        })}
      {errors && <Typography>No posts found.</Typography>}
    </Container>
  );
};

export default Home;

import {
  Box,
  Button,
  Container,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const NewPost = () => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    text: "",
    desc: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (!auth.username) {
      navigate("/login");
    }
  }, [auth]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    const form = JSON.stringify(newPost);
    try {
      fetch("http://localhost:3000/api/posts", {
        method: "post",
        body: form,
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data.errors);
          }
          if (data.msg) {
            setMsg(data.msg);
            setOpen(true);
            setErrors({});
            setNewPost({
              title: "",
              text: "",
              desc: "",
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Container maxWidth={"xs"}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {msg.length > 0 && (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={`${msg}!`}
            action={action}
          />
        )}
        <Typography component="h1" variant="h5">
          Add Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            onChange={(e) => handleChange(e)}
            value={newPost.title}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="desc"
            label="Description"
            name="desc"
            autoComplete="desc"
            autoFocus
            onChange={(e) => handleChange(e)}
            value={newPost.desc}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="text"
            label="Text"
            type="text"
            id="text"
            autoComplete="text"
            onChange={(e) => handleChange(e)}
            value={newPost.text}
            multiline
            rows={4}
          />
          {errors.length > 0 &&
            errors.map((err, index) => (
              <Typography color={"error"} key={index}>
                {err.msg}
              </Typography>
            ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Post
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewPost;

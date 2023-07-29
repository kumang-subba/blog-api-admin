/* eslint-disable react/prop-types */
import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const EachComment = ({ commentId, postId, fetchAllPosts }) => {
  const [comment, setComment] = useState({});
  const fetchComment = async () => {
    fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`)
      .then((res) => res.json())
      .then((data) => {
        setComment(data.comment);
      });
  };
  useEffect(() => {
    fetchComment();
  }, []);
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    try {
      fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
        method: "Delete",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(() => fetchAllPosts());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Stack direction={"row"} gap={1}>
      <Typography>{comment.text}</Typography>
      {comment.commenter?.length > 0 && (
        <Typography sx={{ color: (theme) => theme.palette.grey[500] }}>
          Commenter: {comment.commenter}
        </Typography>
      )}
      <Button sx={{ ml: "auto" }} onClick={handleDelete}>
        Delete
      </Button>
    </Stack>
  );
};

export default EachComment;

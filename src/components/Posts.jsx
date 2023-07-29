/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import EditPost from "./EditPost";
import EachComment from "./EachComment";

const style = {
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexDirection: "column",
};
/* eslint-disable react/prop-types */

const Posts = ({
  title,
  text,
  comments,
  desc,
  date,
  _id,
  handleDelete,
  handleEdit,
  editErrors,
  fetchAllPosts,
}) => {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  }));
  const [expanded, setExpanded] = useState(false);
  const postTime = dayjs(date).format("MMM D YYYY hh:mm A");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const deleteSend = () => {
    handleDelete(_id);
    handleClose();
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  return (
    <Card sx={{ minWidth: 500, border: (theme) => theme.shadows[10] }}>
      <CardHeader
        title={title}
        subheader={
          <Typography color="text.secondary" variant="body2">
            {desc} {"//"} {postTime}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Edit">
          <IconButton aria-label="add to favorites" onClick={handleEditOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="share" onClick={handleOpen}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {!comments.length > 0 && "No Comments"}
          {comments.length > 0 &&
            comments.map((comment, index) => {
              return (
                <EachComment
                  key={index}
                  commentId={comment}
                  postId={_id}
                  fetchAllPosts={fetchAllPosts}
                />
              );
            })}
        </CardContent>
      </Collapse>
      {editOpen && (
        <EditPost
          editOpen={editOpen}
          handleEditOpen={handleEditOpen}
          handleEditClose={handleEditClose}
          title={title}
          text={text}
          _id={_id}
          handleEdit={handleEdit}
          editErrors={editErrors}
          desc={desc}
        />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to Delete?
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ alignSelf: "flex-end" }}
            onClick={deleteSend}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default Posts;

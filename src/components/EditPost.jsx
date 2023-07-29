/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const EditPost = ({
  editOpen,
  handleEditClose,
  title,
  text,
  desc,
  _id,
  handleEdit,
  editErrors,
}) => {
  const [editForm, setEditForm] = useState({
    title: title,
    text: text,
    desc: desc,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEdit(_id, editForm);
    handleEditClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };
  return (
    <Modal
      open={editOpen}
      onClose={handleEditClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
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
            value={editForm.title}
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
            value={editForm.desc}
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
            value={editForm.text}
            multiline
            rows={4}
          />
          {editErrors.length > 0 &&
            editErrors.map((err, index) => (
              <Typography color={"error"} key={index}>
                {err.msg}
              </Typography>
            ))}
          <Stack direction={"row"} sx={{ alignSelf: "flex-end", gap: 5 }}>
            <Button
              onClick={handleEditClose}
              type="button"
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth variant="contained">
              Edit Post
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditPost;

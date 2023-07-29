import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loginErr, setLoginErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = JSON.stringify(form);
    try {
      fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
      })
        .then((req) => req.json())
        .then((data) => {
          if (data.user) {
            setAuth(data.user);
            localStorage.setItem("token", data.token);
          } else {
            setLoginErr(data.message);
          }
        });
    } catch (err) {
      setLoginErr(true);
    }
  };
  useEffect(() => {
    if (auth.username) {
      navigate("/");
    }
  }, [auth]);
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginErr && <Typography>Could Not Log in</Typography>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => handleChange(e)}
            value={form.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleChange(e)}
            value={form.password}
          />
          {loginErr.length > 0 && (
            <Typography color={"error"}>{loginErr}</Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Link href="/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

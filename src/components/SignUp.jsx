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
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [response, setResponse] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = JSON.stringify(signUpForm);
    try {
      fetch("http://localhost:3000/api/sign-up", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
        .then((res) => res.json())
        .then((data) => setResponse(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (response?.message) {
      navigate("/login");
    }
  }, [response]);
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
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
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
            value={signUpForm.username}
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
            value={signUpForm.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
            onChange={(e) => handleChange(e)}
            value={signUpForm.confirmPassword}
          />
          {response?.errors &&
            response.errors.map((err, index) => (
              <Typography color={"error"} key={index}>
                {err.msg}
              </Typography>
            ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="success"
          >
            Sign UP
          </Button>
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Link href="/login" variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;

import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const NavBar = () => {
  const { auth, setAuth } = useAuth();
  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("token");
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        {auth.username && <Typography>Welcome back {auth.username}</Typography>}
        <Stack
          sx={{ justifyContent: "center" }}
          display={"flex"}
          flexDirection={"row"}
          flexGrow={1}
          gap={1}
          component={Link}
          to="/"
          style={{ textDecoration: "none" }}
        >
          <img src="../images/admin1.png"></img>
          <Typography variant="h5" color="white">
            Blog API Admin
          </Typography>
        </Stack>
        {auth.username ? (
          <Button
            size="small"
            variant=""
            color={"error"}
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

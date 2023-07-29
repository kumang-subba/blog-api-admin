import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./components/NavBar";
import { indigo } from "@mui/material/colors";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup";
import { AuthProvider } from "./context/AuthProvider";
import Home from "./components/Home";
import NewPost from "./components/NewPost";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[600],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/new-post" element={<NewPost />} />
          </Routes>
        </AuthProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

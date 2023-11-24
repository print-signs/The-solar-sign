import { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../../Components/CustomButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";

const LinkStyle = {
  color: "black",
  fontWeight: "bold",
  textDecoration: "none",
};

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handerInputChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [acceptTnC, setAcceptTnC] = useState(false);

  const handleChange = () => {
    setAcceptTnC(!acceptTnC);
  };

  // form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      if (!user.name || !user.email || !user.password) {
        throw new Error("Fill all fields!");
      }
      // https://solar-sign-backend.onrender.com
      const response = await axios.post("/api/v1/user/register", user);
      if (response.status === 201) {
        localStorage.setItem("jwtToken", response?.data?.token);
        console.log(response);
        navigate("/");
        toast.success("Registration Successfull");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    } finally {
      setIsloading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const Term = () => {
    return (
      <>
        <Typography variant="subtitle1">
          I agree with <Link style={LinkStyle}>Privacy Policy</Link> and{" "}
          <Link style={LinkStyle}>Terms of use</Link>
        </Typography>
      </>
    );
  };
  return (
    <Stack
      // border='solid'
      height="100vh"
      justifyContent={{ xs: "flex-start", sm: "center" }}
      alignItems="center"
    >
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={{ xs: 2, sm: 1 }} width={{ xs: 300, sm: 400 }}>
          <h1 style={{ fontFamily: "Poppins" }}>Sign Up</h1>
          <Typography variant="subtitle1">
            Already have an account?{" "}
            <Link
              to="/signin"
              style={{ color: "#38CB89", textDecoration: "none" }}
            >
              Sign in
            </Link>{" "}
          </Typography>
          {/* <TextField variant="standard" label="Your Name" type="text" name="name" value={user.name} onChange={handerInputChanges} /> */}
          {/* <TextField variant="standard" label="Username" type="text" name="username" value={user.username} onChange={handerInputChanges} /> */}
          {/* <TextField variant="standard" label="Email Address" name="email" type="email" value={user.email} onChange={handerInputChanges} /> */}

          <FormControl variant="standard">
            <InputLabel>Your name</InputLabel>
            <Input
              name="name"
              required
              type="text"
              value={user.name}
              onChange={handerInputChanges}
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel>Email Address</InputLabel>
            <Input
              name="email"
              type="email"
              value={user.email}
              onChange={handerInputChanges}
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handerInputChanges}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box>
            <FormControlLabel
              label={<Term />}
              control={<Checkbox checked={acceptTnC} onChange={handleChange} />}
            />
          </Box>
          <div onClick={handleFormSubmit}>
            <CustomButton type="submit" wdth={"100%"}>
              {isloading ? <p>Loading...</p> : "Sign Up"}
            </CustomButton>
          </div>

          {/* <Button variant='contained' type='submit' >Sign up</Button> */}
        </Stack>
      </form>
    </Stack>
  );
};

export default SignupForm;

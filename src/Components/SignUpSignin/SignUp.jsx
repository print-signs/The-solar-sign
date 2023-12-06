import { Grid, Stack, Typography } from "@mui/material";
import signup1 from "../../assets/images/AuthFormImage.png";
import SignupForm from "./Form/SignupForm.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const SignUp = () => {
  const imageStyle = {
    maxWidth: "100%",
    height: "100%",
    display: "block",
  };
  const [imageLink, setImageLink] = useState("");
  const getImage = async () => {
    const { data } = await axios.get("/api/registerImage/getImage");
    // console.log(data?.image[0]);
    setImageLink(data?.image[0]?.image?.secure_url)
  }
  useEffect(() => {
    getImage();
  }, [])
  return (
    <Stack width="98vw" maxWidth="98vw">
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <div
            style={{
              // backgroundColor: "#F3F5F7",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              fontWeight="bold"
              padding={3}
            >
              {" "}
              3legant.
            </Typography>
            <div style={{ height: "100%" }}>
              <img style={imageStyle} src={signup1} alt="signup1" />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <div style={{ height: '100vh', border: 'solid' }}> */}
          <SignupForm />
          {/* </div> */}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SignUp;

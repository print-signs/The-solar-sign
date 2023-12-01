import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import ServicesCardData from "../../Data/ServicesCardData";
import contactImage from "../../assets/images/contactUsImage.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import mapImage from "../../assets/images/mapImage.png";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const styles = {
  img: {
    width: "100%",
    height: "auto",
  },
  linkStyle: {
    textDecoration: "none",
    fontFamily: "inter",
    fontWeight: "500",
    fontSize: "14px",
    textAlign: "center",
  },
};
const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedBack] = useState("");
  const [sending, setSending] = useState(false);
  const [address, setAddress] = useState();
  const matches = useMediaQuery("(min-width:900px)");

  const handleFeedback = (message) => {
    setFeedBack(message);
    setTimeout(() => {
      setFeedBack(""); // Clear feedback after 1 second
    }, 1000); // 1000 milliseconds = 1 second
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      return;
    }
    setSending(true);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("EmailOrMobile", email);

    formData.set("message", message);

    const res = await axios.post("/api/contact/request/new/", formData, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/formdata",
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (res.status === 201) {
      toast.success("Message sent successfully");
      setSending(false);
      setName("");
      setEmail(""), setMessage("");
      handleFeedback("Message sent successfully");
    } else {
      setSending(false);
      toast.error("Somthing wert wrong");
      handleFeedback("something went worng");
    }
  };

  const getAddress = async () => {
    // console.log(import.meta.env.VITE_BASE_URL);
    const logoData = await axios.get("/api/config");
    setAddress(logoData?.data?.result[0]?.address[0]);
  };

  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div>
      <Container>
        <Box>
          <Typography variant="body2" mb={1}>
            <Link
              style={{
                ...styles.linkStyle,
                color: "#605F5F",
                fontWeight: "bold",
              }}
              to="/"
            >
              Home
            </Link>{" "}
            &nbsp;{`>`}&nbsp;
            <Link
              style={{ ...styles.linkStyle, color: "#000", fontWeight: "bold" }}
              to="/contact"
            >
              Contact Us
            </Link>{" "}
          </Typography>
        </Box>
        {/* <Box maxWidth={834}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              fontSize: matches ? 54 : 30,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "58px", // It's a string value in Material-UI sx prop
              letterSpacing: "-1px",
              my: "1rem",
            }}
          >
            contact us .
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Inter",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "26px",
              my: "1rem",
            }}
          >
            Our features timeless furniture, with natural fabrics, curved lines,
            plenty of mirrors and classic design, which can be incorporated into
            any decor project. The pieces enchant for their sobriety, to last
            for generations, faithful to the shapes of each period, with a touch
            of the present
          </Typography>
        </Box> */}
        {/* <Grid container sx={{ background: "#F3F5F7", my: "2rem" }}>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <img width={"100%"} height={431} src={contactImage} alt="contact" />
          </Grid>
          <Grid
            display={"flex"}
            alignItems={"center"}
            item
            xs={12}
            sm={12}
            md={6}
            xl={6}
          >
            <Box maxWidth={452} sx={{ m: { sm: 3, xs: 3, md: 8 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 40,
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "44px", // It's a string value in Material-UI sx prop
                  letterSpacing: "-0.4px",
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Inter",
                  fontSize: 16,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "26px",
                  my: "0.5rem",
                }}
              >
                3legant is a gift & decorations store based in HCMC, Vietnam.
                Est since 2019. <br /> Our customer service is always prepared
                to support you 24/7
              </Typography>
              <Button
                // variant="contained"
                type="button"
                disableElevation
                endIcon={<ArrowRightAltIcon />}
                sx={{
                  backgroundColor: "#141718",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  fontFamily: "Inter",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#141718", // Set the same color on hover to maintain consistency
                  },
                }}
              >
                Shop
              </Button>
            </Box>
          </Grid>
        </Grid> */}
        <Box my={5}>
          <Typography
            variant="h4"
            mb={5}
            sx={{
              fontFamily: "Poppins",
              fontSize: matches ? 54 : 30,
              fontStyle: "normal",
              fontWeight: 500,
              textAlign: "center",
              lineHeight: "58px", // It's a string value in Material-UI sx prop
              letterSpacing: "-1px",
              my: "1rem",
            }}
          >
            Contact Us
          </Typography>
          <Grid container spacing={4}>
            <Grid item sm={12} xs={12} md={4} xl={4}>
              <Paper
                elevation={0}
                sx={{
                  background: "#F3F5F7",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  //   justifyContent: "center",
                  textAlign: "center",
                  padding: "1rem",
                  height: "120px",
                }}
              >
                <HomeOutlinedIcon />
                <Typography
                  sx={{
                    color: "#6C7275",
                    fontFamily: "Inter",
                    textAlign: "center",
                    m: "0.5rem",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "16px", // It's a string value in Material-UI sx prop
                    textTransform: "uppercase",
                  }}
                >
                  ADDRESS
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "26px",
                    // mx: "1rem",
                    color: "#141718",
                  }}
                >
                  {/* {address?.city}, {address?.state}, {address?.country} */}
                  035 Bengaluru karnataka ,india
                </Typography>
              </Paper>
            </Grid>
            <Grid item sm={12} xs={12} md={4} xl={4}>
              <Paper
                elevation={0}
                sx={{
                  background: "#F3F5F7",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  //   justifyContent: "center",
                  textAlign: "center",
                  padding: "1rem",
                  height: "120px",
                }}
              >
                <CallOutlinedIcon />
                <Typography
                  sx={{
                    color: "#6C7275",
                    fontFamily: "Inter",
                    textAlign: "center",
                    m: "0.5rem",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "16px", // It's a string value in Material-UI sx prop
                    textTransform: "uppercase",
                  }}
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "26px",
                    // mx: "1rem",
                    color: "#141718",
                  }}
                >
                  {/* {address?.contact} */}
                  8516913819
                </Typography>
              </Paper>{" "}
            </Grid>
            <Grid item sm={12} xs={12} md={4} xl={4}>
              <Paper
                elevation={0}
                sx={{
                  background: "#F3F5F7",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  //   justifyContent: "center",
                  textAlign: "center",
                  padding: "1rem",
                  height: "120px",
                }}
              >
                <EmailOutlinedIcon />
                <Typography
                  sx={{
                    color: "#6C7275",
                    fontFamily: "Inter",
                    textAlign: "center",
                    m: "0.5rem",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "16px", // It's a string value in Material-UI sx prop
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "26px",
                    color: "#141718",
                    // mx: "1rem",
                  }}
                >
                  {/* {address?.email} */}
                  roshan@gmail.com
                </Typography>
              </Paper>{" "}
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            mb: 5,
            flexDirection: matches ? "row" : "column-reverse",
          }}
        >
          <Box flexGrow={1} marginRight={!matches ? 0 : 5}>
            <form onSubmit={handelSubmit}>
              <InputLabel htmlFor="name">FULL NAME*</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Your Name"
                label=""
                value={name}
                sx={{ mt: 1, mb: 2 }}
                size="small"
                required
                onChange={(e) => setName(e.target.value)}
                id="name"
              />
              <InputLabel htmlFor="name">EMAIL ADDRESS*</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                type="email"
                required
                placeholder="Your email"
                label=""
                value={email}
                sx={{ mt: 1, mb: 2 }}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
                id="name"
              />
              <InputLabel htmlFor="name">MESSAGE*</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                placeholder="Message"
                label=""
                value={message}
                sx={{ mt: 1, mb: 2 }}
                size="small"
                onChange={(e) => setMessage(e.target.value)}
                id="name"
              />
              <Button
                // variant="contained"
                type="submit"
                disableElevation
                disabled={sending}
                sx={{
                  backgroundColor: "#141718",
                  color: "white",
                  padding: "0.5rem 2rem",
                  border: "none",
                  borderRadius: "8px",
                  fontFamily: "Inter",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#141718", // Set the same color on hover to maintain consistency
                  },
                  "&:disabled": {
                    // Adding specific styling for the disabled state
                    color: "rgba(255, 255, 255, 0.7)", // Adjust the opacity or use a different color for disabled text
                  },
                }}
              >
                {sending ? "Sending..." : "Send message"}
              </Button>
            </form>
          </Box>
          <Box mb={2}>
            <img src={mapImage} width={"100%"} alt="map" />
          </Box>
        </Box>
        {feedback && (
          <Box
            sx={{
              position: "absolute",
              color: "green",
              fontWeight: "bold",
              top: "100vh",
              right: "50px",
              // height: "50px",
              background: "#F3F5F7",
              padding: "1rem",
            }}
          >
            <Typography variant="h6" color={"green"}>
              {feedback}
            </Typography>
          </Box>
        )}
        <Grid
          container
          sx={{ mb: 5 }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {ServicesCardData.map((item, i) => (
            <Grid item xs={6} sm={6} md={3} key={i}>
              <Grid
                container
                alignItems="flex-start"
                justifyContent="center"
                sx={{
                  minHeight: "200px",
                  background: "#F3F5F7",
                  flexDirection: "column",
                  padding: "1rem",
                }}
              >
                <img src={item.logo} alt={item.title} />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#141718",
                    fontFamily: "Poppins",
                    fontSize: "1.25rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "1.75rem",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#6C7275",
                    fontFamily: "Poppins",
                    fontSize: "0.875rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "1.5rem",
                  }}
                >
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ContactUs;

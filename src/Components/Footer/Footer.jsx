import { Box, Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import facebook from "../../assets/svg/facebook.svg";
import twitter from "../../assets/svg/twitter.svg";
import linkedin from "../../assets/svg/linkedinIcon.svg";
import instagram from "../../assets/svg/instagram.svg";
import youtube from "../../assets/svg/youtube.svg";
import React, { useState } from "react";
import axios from "axios";

const mediaIcon = [
  {
    icon: linkedin,
    path: "#",
  },
  {
    icon: twitter,
    path: "#",
  },

  {
    icon: instagram,
    path: "#",
  },

  {
    icon: facebook,
    path: "#",
  },

  {
    icon: youtube,
    path: "#",
  },
];

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/" },
  { name: "Product", path: "/" },
  { name: "Blog", path: "/" },
  { name: "Contact Us", path: "/" },
];
export default function Footer() {
  const match = useMediaQuery("(max-width:840px)");
  const [footerLogo, steFooterLogo] = useState("");
  const getLogo = async () => {
    // console.log(import.meta.env.VITE_BASE_URL);
    const logoData = await axios.get("/api/config");
    console.log(logoData);
    steFooterLogo(logoData?.data?.result[0]?.logo[0]);
  };

  React.useEffect(() => {
    getLogo();
  }, []);

  const renderLogo = () => {
    if (footerLogo) {
      return (
        <img
          src={footerLogo.Footerlogo}
          alt="Logo"
          style={{ height: "40px", width: "auto", marginRight: "10px" }}
        />
      );
    } else {
      return (
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            color: "#141718",
            fontFamily: "Poppins",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          3legant.
        </Typography>
      );
    }
  };
  return (
    <div>
      <Box
        style={{
          background: "#000000",
          color: "white",
          padding: "5rem 0rem",
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",

              flexDirection: match ? "column" : "row",
              alignItems: match ? "center" : "initial",
            }}
          >
            <Box
              sx={{
                display: "flex",

                flexDirection: match ? "column" : "row",
                alignItems: "center",
                gap: match ? 1 : 5,
              }}
              flex={1}
            >
              {/* <Typography
                variant="h5"
                noWrap
                component="div"
                href="/"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                3legant<span style={{ color: "grey" }}>.</span>
              </Typography> */}
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {renderLogo()}
              </Link>
              {!match && (
                <Typography
                  width={"2px"}
                  height={"22px"}
                  sx={{ background: "grey" }}
                ></Typography>
              )}
              {match && (
                <Typography
                  width={"22px"}
                  height={"2px"}
                  sx={{ background: "grey" }}
                ></Typography>
              )}
              <Typography style={{ color: "#E8ECEF", fontSize: "0.9rem" }}>
                Headphone Store
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",

                flexDirection: match ? "column" : "row",
              }}
              alignItems={"center"}
            >
              {footerLinks.map((link, i) => (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#FEFEFE",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontFamily: "Inter",
                    textAlign: "center",
                    margin: "1rem",
                  }}
                  to={link.path}
                  key={i}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Box>
          <hr style={{ color: "grey", marginTop: "3rem" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: match ? "column-reverse" : "row",
              alignItems: match ? "center" : "initial",
              gap: match ? 3 : 5,
            }}
          >
            <Box
              sx={{
                display: "flex",

                flexDirection: match ? "column-reverse" : "row",
                alignItems: "center",
                gap: match ? 3 : 5,
              }}
              flex={1}
            >
              <Typography style={{ color: "#E8ECEF", fontSize: "0.9rem" }}>
                Copyright © 2023 3legant. All rights reserved
              </Typography>
              <Box>
                <Link
                  to={"/privacy-policy"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    marginRight: "1rem",
                  }}
                >
                  Privacy Policy{" "}
                </Link>
                <Link
                  to={"/term-of-use"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    marginRight: "1rem",
                  }}
                >
                  Terms of Use{" "}
                </Link>
                <Link
                  to={"/shipping-policy"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    marginRight: "1rem",
                  }}
                >
                  Shipping Policy{" "}
                </Link>
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              {mediaIcon.map((link, i) => (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#FEFEFE",
                    cursor: "pointer",

                    margin: "0.5rem",
                  }}
                  to={link.path}
                  key={i}
                >
                  <img src={link.icon} alt="media icons" />
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

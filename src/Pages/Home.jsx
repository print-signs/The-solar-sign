import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import InstagramImages from "../Data/InstagramImages";
import BrandData from "../Data/BrandData";
import ServicesCardData from "../Data/ServicesCardData";
import CustomButton from "../Components/CustomButton";
import heroImage from "../assets/images/Hero Image.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Product from "../Components/Product";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = React.useState([]);

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const getCategories = async () => {
    const response = await axios.get(
      "https://printsigns.onrender.com" + "/api/category/getCategories"
    );
    if (response.status === 200) {
      setCategories(response.data.categories);
    }
  };
  React.useEffect(() => {
    getCategories();
  }, []);

  let count = 6;
  let ProductCount = 4;
  if (windowSize.innerWidth <= 473) {
    count = 2;
    ProductCount = 1;
  } else if (windowSize.innerWidth > 473 && windowSize.innerWidth <= 692) {
    count = 3;
    ProductCount = 2;
  } else if (windowSize.innerWidth > 692 && windowSize.innerWidth < 1045) {
    count = 4;
    ProductCount = 3;
  } else {
    count = 6;
    ProductCount = 4;
  }
  return (
    <React.Fragment>
      {/* main hero section  */}
      <Box
        sx={{
          background: "#FFC95C",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <br />
          <br />
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 8 }}
          >
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              sx={{
                display: "flex",
                alignItems: "left",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "4rem" },
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: { xs: "2rem", sm: "3rem", md: "4rem" },
                  textAlign: { xs: "center", sm: "start" },
                }}
                gutterBottom
              >
                Listen to the <span style={{ color: "#377dff" }}>amazing</span>{" "}
                music sound.
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: { xs: "1rem", sm: "1.3rem", md: "1.3rem" },
                  textAlign: { xs: "center", sm: "start" },
                }}
                gutterBottom
              >
                Experience music like never before.
              </Typography>
              <br />

              <Grid
                display="flex"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                alignItems="center"
              >
                <CustomButton type="button">Shopping Now</CustomButton>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <img src={heroImage} alt="heroimage" style={imageStyle} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* brands section  */}
      <Container>
        <Swiper
          slidesPerView={count}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {BrandData.map((item, i) => (
            <SwiperSlide key={i}>
              <img
                src={item.src}
                alt={item.alt}
                style={{
                  width: "auto",
                  margin: "10px 10px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      <Container>
        <h3
          style={{
            fontFamily: "Poppins",
            fontSize: "2.5rem",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "2.75rem",
            letterSpacing: "-0.025rem",
          }}
        >
          Categories
        </h3>
        <Swiper
          slidesPerView={ProductCount}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Product
                src={category.categoryImage.secure_url}
                alt={category.categoryName}
                categoryName={category.categoryName}
                style={{
                  width: "auto",
                  margin: "10px 10px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* services card section */}
      <Container style={{ marginTop: "9px" }}>
        <Grid
          container
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
      {/* instagram section  */}
      <Container>
        <Box margin="3rem 0rem">
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Inter",
              fontWeight: "bold",
              margin: "0.5rem",
              color: "#6C7275",
            }}
          >
            NEWSFEED
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#121212",
              margin: "0.5rem",
            }}
            variant="h4"
          >
            Instagram
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Inter",
              margin: "0.5rem",
              color: "#121212",
            }}
          >
            Follow us on social media for more discounts & promotions
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Inter",
              margin: "0.5rem",
              color: "#6C7275",
            }}
          >
            @3legant_official
          </Typography>
          <Grid container spacing={3}>
            {InstagramImages.map((item, i) => (
              <Grid
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
                item
                key={i}
                xs={12}
                sm={6}
                md={3}
                xl={3}
              >
                <img
                  src={item.name}
                  alt="instagramimages"
                  style={{ margin: "auto" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;

//
import Slider from "react-slick";
// import { Box } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Skeleton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

// const images = [
//   {
//     url: "https://wallpaperaccess.com/full/6925455.jpg",
//     alt: "image1",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//     alt: "image2",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1635399860495-2a2802a6df5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//     alt: "image3",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
//     alt: "image3",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1641391503184-a2131018701b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
//     alt: "image3",
//   },
// ];

const Sliderr = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    // cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    const response = await axios.get(
      "https://printsigns.onrender.com" + "/api/banner/getBanners"
    );
    if (response.status === 200) {
      setBanners(response.data.banners);
    }
  };
  React.useEffect(() => {
    getBanners();
  }, []);
  return (
    <div>
      {banners.length === 0 && (
        <Skeleton variant="rounded" width={"100%"} height={"700px"} />
      )}

      <Slider {...settings} style={{ margin: "" }}>
        {banners.map((item, i) => (
          <Box sx={{ cursor: "pointer" }} key={i}>
            <img
              src={item?.bannerImage?.secure_url}
              alt={item?.bannerName}
              style={{
                width: "100%",
                height: "700px",
                objectFit: "fill",
                // borderRadius: 30,
                // margin: "1rem",
              }}
            />
          </Box>
        ))}
      </Slider>
    </div>
  );
};

export default Sliderr;

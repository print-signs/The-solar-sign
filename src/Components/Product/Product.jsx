import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ src, alt, categoryName }) => {
  const styles = {
    container: {
      position: "relative",
      width: "fit-content",
    },
    img: {
      width: "100%",
      height: "500",
    },
    btn: {
      position: "absolute",
      top: "92%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#141718",
      color: "white",
      fontSize: "12px",
      border: "none",
      width: "76%",
      height: "10%",
      cursor: "pointer",
    },
    newText: {
      position: "absolute",
      top: "3%",
      left: "5%",
      backgroundColor: "white",
      fontSize: "90%",
      fontWeight: "bold",
      width: "20%",
      height: "6%",
      // textAlign: 'center',
      fontFamily: "Poppins",
      borderRadius: "2px",
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      color: "black",
    },
    favorite: {
      position: "absolute",
      top: "3%",
      right: "5%",
      width: "10%",
      height: "5%",
      borderRadius: "50%",
      backgroundColor: "white",
      padding: "2%",
    },
    ratingBox: {
      marginBottom: "8px",
      fontWeight: "bold",
      marginTop: "3px",
    },
  };
  return (
    <Stack mb={5} width={265}>
      <Link
        to={`${
          categoryName
            ? `/product/category/${categoryName.split(" ").join("_")}`
            : "product-details"
        }`}
        style={{ textDecoration: "none" }}
      >
        <Stack style={styles.container}>
          <img src={src} alt={alt} height="150px" />
        </Stack>
        <Stack spacing={1}>
          <h3
            style={{
              fontFamily: "Inter",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "1.625rem",
              width: "80%",
              color: "black",
            }}
          >
            {categoryName}
          </h3>
        </Stack>
      </Link>
    </Stack>
  );
};

ProductCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default ProductCard;

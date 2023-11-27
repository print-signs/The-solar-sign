import { Container, Grid, Paper, Typography } from "@mui/material";
import CustomButton from "../CustomButton";
import redtable from "../../assets/images/table red.png";
import blacktable from "../../assets/images/table black.png";
import tableLamp from "../../assets/images/table black.png";
import PropTypes from "prop-types";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";

const OrderComplete = ({ handlePurchaseClick, orderId, name }) => {
  // console.log("2222222", orderId, name);
  const styles = {
    container: {
      width: { xs: "95vw", sm: "50vw" },
      height: "auto",
      mb: "4rem",
      mt: "3rem",
    },
    tHead: {
      fontFamily: "inter",
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "22px",
      color: "#6C7275",
    },
    orderDetailContainer: {
      width: "100%",
      display: "flex",
      m: "1rem 0",
      flexDirection: { xs: "column", sm: "row", md: "row" },
      borderBottom: { xs: "1px solid #E8ECEF", sm: "none", md: "none" },
    },
    paper: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    thankyou: {
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "28px",
      color: "#6C7275",
      mt: "2rem",
    },
    message: {
      width: "80%",
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: { xs: "20px", sm: "40px", md: "40px" },
      color: "#23262F",
      textAlign: "center",
      mt: "1rem",
    },
    imageBox: { display: "flex", flexWrap: "wrap" },
  };
  return (
    <Container sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
        <Typography sx={styles.thankyou}>Thank you!🎉</Typography>

        <Typography sx={styles.message}>
          {name && name} Your order has been received
        </Typography>

        <Grid
          container
          mt={1}
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item>
            {/* <Grid item sx={styles.imageBox}>
              <img style={{ margin: "0.5rem" }} src={redtable} alt="" />
              <img style={{ margin: "0.5rem" }} src={blacktable} alt="" />
              <img style={{ margin: "0.5rem" }} src={tableLamp} alt="" />
            </Grid> */}
            <CheckIcon sx={{ color: "white" }} />
          </Grid>
          <Grid container mt={1} sx={{ width: "70%" }}>
            {/* <Grid container sx={styles.orderDetailContainer}>
              <Typography sx={{ ...styles.tHead, width: "60%" }}>
                {" "}
                Order code:{" "}
              </Typography>
              <Typography sx={{ ...styles.tHead, color: "#141718" }}>
                {" "}
                {orderId ? orderId : "#0123_45678"}
              </Typography>
            </Grid> */}

            <Grid item sx={styles.orderDetailContainer}>
              <Typography sx={{ ...styles.tHead, width: "60%" }}>
                {" "}
                Date:{" "}
              </Typography>
              <Typography sx={{ ...styles.tHead, color: "#141718" }}>
                {" "}
                {/* October 19, 2023 */}
                {new Date(Date.now()).toLocaleString("en-IN", {
                  // weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })}
              </Typography>
            </Grid>

            <Grid item sx={styles.orderDetailContainer}>
              <Typography
                sx={{ ...styles.tHead, width: { xs: "80%", sm: "60%" } }}
              >
                {" "}
                Payment method:{" "}
              </Typography>
              <Typography sx={{ ...styles.tHead, color: "#141718" }}>
                {" "}
                PayPal
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          mb={2}
          mt={5}
          display="flex"
          justifyContent="center"
          // onClick={handlePurchaseClick}
        >
          <Link to="/account">
            <CustomButton type="button" wdth="100%">
              Pruchase history
            </CustomButton>
          </Link>
        </Grid>
      </Paper>
    </Container>
  );
};

OrderComplete.propTypes = {
  handlePurchaseClick: PropTypes.func.isRequired,
};
export default OrderComplete;

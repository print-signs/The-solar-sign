import { Container, Grid, Paper, Typography } from "@mui/material";
import CustomButton from "../CustomButton";
import redtable from "../../assets/images/table red.png";
import blacktable from "../../assets/images/table black.png";
import tableLamp from "../../assets/images/table black.png";
import PropTypes from "prop-types";

const OrderComplete = ({ handlePurchaseClick }) => {
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
          Your order has been received
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
            <Grid item sx={styles.imageBox}>
              <img style={{ margin: "0.5rem" }} src={redtable} alt="" />
              <img style={{ margin: "0.5rem" }} src={blacktable} alt="" />
              <img style={{ margin: "0.5rem" }} src={tableLamp} alt="" />
            </Grid>
          </Grid>
          <Grid container mt={1} sx={{ width: "70%" }}>
            <Grid container sx={styles.orderDetailContainer}>
              <Typography sx={{ ...styles.tHead, width: "60%" }}>
                {" "}
                Order code:{" "}
              </Typography>
              <Typography sx={{ ...styles.tHead, color: "#141718" }}>
                {" "}
                #0123_45678
              </Typography>
            </Grid>

            <Grid item sx={styles.orderDetailContainer}>
              <Typography sx={{ ...styles.tHead, width: "60%" }}>
                {" "}
                Date:{" "}
              </Typography>
              <Typography sx={{ ...styles.tHead, color: "#141718" }}>
                {" "}
                October 19, 2023
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
                Credit Card
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
          onClick={handlePurchaseClick}
        >
          <CustomButton type="button" wdth="100%">
            Pruchase history
          </CustomButton>
        </Grid>
      </Paper>
    </Container>
  );
};

OrderComplete.propTypes = {
  handlePurchaseClick: PropTypes.func.isRequired,
};
export default OrderComplete;

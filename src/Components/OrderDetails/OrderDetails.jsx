import {
  //   Container,
  Grid,
  Typography,
  Box,
  Divider,
  IconButton,
  Skeleton,
} from "@mui/material";
// import ShoppingCartData from "../../Data/ShoppingCartData/ShoppingCartData";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { useEffect, useState } from "react";
import { isAutheticated } from "../../Auth";
import axios from "axios";
import moment from "moment";
const styles = {
  formStyle: {
    fontWeight: "700",
    fontSize: "12px",
    fontFamily: "inter",
    marginBottom: "3px",
    marginLeft: "0",
  },
};

const boxStyles = {
  p: 3,
  mb: 3,
};

const headingStyles = {
  fontFamily: "Poppins",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "1.75rem",
  mb: 3,
};

const innerText = { fontFamily: "inter", fontWeight: "600", fontSize: "16px" };
const OrderDetails = ({ setAccountId, accountId }) => {
  const [OrderDetails, setOrderDetails] = useState();
  const [orderLoad, setorderLoad] = useState(false);
  const token = isAutheticated();
  const getSingleOrderDetails = async () => {
    try {
      setorderLoad(true);
      const response = await axios.get(`/api/order/getOne/${accountId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setOrderDetails(response?.data?.order);
        setorderLoad(false);
      }
    } catch (error) {
      setorderLoad(false);
    }
  };
  useEffect(() => {
    getSingleOrderDetails();
  }, [accountId]);
  return (
    // <Container></Container>
    <Box>
      {OrderDetails ? (
        <Box>
          <Box sx={{ display: "flex", my: "1rem" }}>
            <Typography
              sx={{
                fontFamily: "inter",
                fontSize: "20px",
                fontWeight: "500",
                color: "#00000",
                flexGrow: 1,
              }}
            >
              Order Id : {accountId}
            </Typography>
            <IconButton
              sx={{ color: "black" }}
              onClick={() => setAccountId("")}
            >
              <KeyboardReturnOutlinedIcon />
            </IconButton>
          </Box>
          <Grid container>
            <Grid item sm={6} md={6} xs={12}>
              <Box sx={boxStyles}>
                <Typography sx={headingStyles}>Order Summary</Typography>

                {OrderDetails?.orderItems.map((item, i) => (
                  <Grid
                    key={i}
                    container
                    spacing={2}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Grid
                      item
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Grid
                          sx={{ width: "95px", height: "90px", mr: "1rem" }}
                        >
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={item.image[0].url}
                            alt="productitem"
                          />
                        </Grid>
                        <Grid>
                          <Typography
                            sx={{
                              fontFamily: "inter",
                              fontWeight: "600",
                              fontSize: "14px",
                              color: "#141718",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Grid>
                      </Box>
                      <Grid item>
                        <Typography
                          sx={{
                            fontFamily: "inter",
                            fontWeight: "600",
                            fontSize: "14px",
                            color: "#141718",
                          }}
                        >
                          ${item.price}.00
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              sm={6}
              md={6}
              xs={12}
              sx={{ backgroundColor: "#F3F5F7" }}
            >
              <Box sx={{ padding: "1rem" }}>
                <Typography
                  sx={{
                    fontFamily: "inter",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#6C7275",
                  }}
                >
                  Shipping Address
                </Typography>

                <Typography
                  mt={2}
                  sx={{
                    fontFamily: "inter",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#141718",
                  }}
                >
                  {" "}
                  {OrderDetails?.shippingInfo.first_name}
                  {OrderDetails?.shippingInfo.last_name}
                </Typography>
                <Typography
                  mt={2}
                  sx={{
                    fontFamily: "inter",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#141718",
                  }}
                >
                  {" "}
                  {OrderDetails?.shippingInfo.phone_Number}
                </Typography>
                <Typography
                  mt={2}
                  sx={{
                    fontFamily: "inter",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#141718",
                  }}
                >
                  {" "}
                  {OrderDetails?.shippingInfo.street},{" "}
                  {OrderDetails?.shippingInfo.country},{" "}
                  {OrderDetails?.shippingInfo.state}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "2rem",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#6C7275",
                    }}
                  >
                    Date
                  </Typography>

                  <Typography
                    mt={3}
                    sx={{
                      fontFamily: "inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#6C7275",
                    }}
                  >
                    {" "}
                    Status
                  </Typography>
                  <Typography
                    mt={3}
                    sx={{
                      fontFamily: "inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#6C7275",
                    }}
                  >
                    {" "}
                    Price
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontFamily: "inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#141718",
                    }}
                  >
                    {moment(OrderDetails?.createdAt).format("MMMM DD, YYYY")}
                  </Typography>

                  <Typography
                    mt={3}
                    sx={{
                      fontFamily: "inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#141718",
                    }}
                  >
                    {" "}
                    {OrderDetails?.orderStatus}
                  </Typography>
                  <Typography
                    mt={3}
                    sx={{
                      fontFamily: "inter",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#141718",
                    }}
                  >
                    {" "}
                    ${OrderDetails?.total_amount}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Skeleton
            width={"100%"}
            height={"500px"}
            variant="rounded"
            animation="wave"
          />
        </Box>
      )}
    </Box>
  );
};

export default OrderDetails;

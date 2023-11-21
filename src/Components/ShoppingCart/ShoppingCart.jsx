import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Radio,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PercentIcon from "@mui/icons-material/Percent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { increaseQuantity } from "../../store/Actions/cartActions";
import { decreaseQuantity } from "../../store/Actions/cartActions";

import { useDispatch, useSelector } from "react-redux";
import { getCartItem, removeItemFromCart } from "../../store/Actions/cartActions";
import { getSubTotalPrice } from "../../store/Actions/priceActions";
// import { removeItemFromCart } from "../../store/Actions/cartActions";
const styles = {
  headingStyle: {
    fontFamily: "inter",
    fontWeight: "600",
    fontSize: "16px",
    color: "#121212",
    width: "70%",
    borderBottom: "1px solid black",
  },
  innerText: { fontFamily: "inter", fontWeight: "400", fontSize: "16px" },
  radioBox: {
    display: "flex",
    border: "1px solid #6C7275",
    borderRadius: "5px",
    margin: "2%",
    marginLeft: "0",
    cursor: "pointer",
  },
};

const ShoppingCart = ({ handelCheckoutClick }) => {



  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  const allSubTotal = useSelector((state) => state.subtotal);

  useEffect(() => {
    dispatch(getCartItem());
    dispatch(getSubTotalPrice())
  }, [dispatch]);

  const matches = useMediaQuery("(min-width:1200px)");

  const handleDecrease = (index) => {

    dispatch(decreaseQuantity(cartItem[index].product._id))
    dispatch(getSubTotalPrice())

  };
  const handleIncrease = (index) => {

    dispatch(increaseQuantity(cartItem[index].product._id));
    dispatch(getSubTotalPrice())

  };


  // remove cart item
  const removeCartItemHandler = (id) => {
    // console.log(id);
    dispatch(removeItemFromCart(id));
    dispatch(getSubTotalPrice());
    alert("removed")
  }

  const [selectedValue, setSelectedValue] = useState("free");




  // Stae for Radio

  // console.log("select value", selectedValue);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <Container>
      <Box my={8}>
        <Grid container spacing={5}>
          <Grid item sm={12} xs={12} md={7} lg={8} xl={8}>
            <Box>
              {matches ? (
                <TableContainer
                  component={Paper}
                  elevation={0}
                  style={{
                    borderBottom: "1.5px solid rgb(207 210 213)",
                    // width: '70%',
                    borderRadius: "0",
                  }}
                >
                  <Table
                    sx={{ minWidth: 650 }}
                    size="large"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell style={styles.headingStyle}>
                          Product
                        </TableCell>
                        <TableCell style={styles.headingStyle}>
                          Quantity
                        </TableCell>
                        <TableCell style={styles.headingStyle}>Price</TableCell>
                        <TableCell style={styles.headingStyle}>
                          Subtotal
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItem.map((row, index) => (
                        <TableRow
                          key={index}
                          style={{ padding: "1rem" }}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {/* {row.product} */}
                            <Box sx={{ display: "flex", width: '50%' }}>
                              <Grid>
                                <img style={{ height: '100%', width: '100%' }} src={row.product.image && row.product.image[0].url} alt="" />
                              </Grid>
                              <Grid>
                                <Typography
                                  sx={{
                                    fontFamily: "inter",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    color: "#141718",
                                    ml: '10px'
                                  }}
                                >
                                  {row.product.name}
                                </Typography>
                                {/* <Typography
                                  sx={{
                                    fontFamily: "inter",
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#6C7275",
                                  }}
                                >
                                  Color : {row.product.color}
                                </Typography> */}
                                <Box onClick={() => removeCartItemHandler(row.product._id)}
                                  sx={{
                                    color: "#6C7275",
                                    width: "105%",
                                    display: "flex",
                                    alignItems: "center",
                                    // justifyContent: "space-between",
                                    cursor: "pointer",
                                    ml: '10px'

                                    // border: 'solid'
                                  }}
                                >
                                  <ClearIcon fontSize="small" />
                                  <Typography
                                    sx={{
                                      fontFamily: "inter",
                                      fontWeight: "600",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Remove
                                  </Typography>
                                </Box>
                              </Grid>
                            </Box>
                          </TableCell>
                          <TableCell >
                            <Box
                              sx={{
                                border: "1px solid #6C7275",
                                borderRadius: "4px",
                                height: "3%",
                                width: "60%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                ml={1}
                                onClick={() => handleDecrease(index)}
                              >
                                -
                              </Typography>

                              {row && row.quantity}
                              <Typography
                                mr={1}
                                onClick={() => handleIncrease(index)}
                              >
                                +
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "inter",
                              fontWeight: "400",
                              fontSize: "18px",
                              color: "#121212",
                            }}
                          >
                            ${row.product.price}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "inter",
                              fontWeight: "600",
                              fontSize: "18px",
                              color: "#121212",
                            }}
                          >
                            {/* ${row.subtotal}${individualSubtotals[index]} */}
                            ${row.subtotal}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                cartItem.map((item, i) => (
                  <Grid
                    key={i}
                    container
                    spacing={2}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Grid item sx={{ width: '50vw' }}>
                      <Box sx={{ display: "flex", }}>
                        <Grid sx={{ height: '15vh', width: '15vw', display: 'flex', justifyContent: 'center', mr: '1rem' }}>
                          <img style={{ height: '60%', width: '100%' }} src={item.product && item.product.image[0].url} alt="" />
                        </Grid>
                        <Grid >
                          <Typography
                            sx={{
                              fontFamily: "inter",
                              fontWeight: "600",
                              fontSize: "14px",
                              color: "#141718",
                              mb: '1rem'
                            }}
                          >
                            {item.product && item.product.name}
                          </Typography>
                          {/* <Typography
                            sx={{
                              fontFamily: "inter",
                              fontWeight: "400",
                              fontSize: "12px",
                              color: "#6C7275",
                            }}
                          >
                            Color : {item.product.color}
                          </Typography> */}
                          <Box
                            sx={{
                              border: "1px solid #6C7275",
                              borderRadius: "4px",
                              height: "30%",
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              ml={1}
                              onClick={() => handleDecrease(i)}
                            >
                              -
                            </Typography>

                            {item.quantity}
                            <Typography
                              mr={1}
                              onClick={() => handleIncrease(i)}
                            >
                              +
                            </Typography>
                          </Box>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography
                        // py={1}
                        sx={{
                          fontFamily: "inter",
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "#121212",
                        }}
                      >
                        {item.price && item.product.price}
                      </Typography>
                      <Box onClick={() => removeCartItemHandler(item.product._id)} display="flex" justifyContent="flex-end">
                        <ClearIcon fontSize="medium" />
                      </Box>
                    </Grid>

                    <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
                  </Grid>
                ))
              )}

              <Box sx={{ width: { xs: "100%", sm: "60%" }, mt: "5%" }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "20px",
                  }}
                >
                  Have a coupon?
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "inter",
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#6C7275",
                    mb: "1rem",
                    mt: "0.5rem",
                  }}
                >
                  Add your code for an instant cart discount
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #6C7275",
                    p: "0.5rem",
                    mt: "2rem",
                    borderRadius: "3px",
                    height: "3rem",
                  }}
                >
                  <PercentIcon sx={{ marginLeft: ".4rem", color: "#6C7275" }} />
                  <TextField
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    placeholder="Coupon Code"
                    type="text"
                    name="coupon"
                    sx={{ marginLeft: ".3rem" }}
                  />
                  <Typography
                    style={{
                      marginLeft: "auto",
                      marginRight: "1rem",
                      fontFamily: "inter",
                      fontWeight: "500",
                      fontSize: "16px",
                    }}
                  >
                    Apply
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item sm={12} xs={12} md={5} lg={4} xl={4}>
            <Paper
              elevation={0}
              style={{
                // background: "#F3F5F7",
                border: "1px solid #6C7275",
                padding: "1rem ",
                borderRadius: "0.5rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "28px",
                }}
              >
                {" "}
                Cart Summary{" "}
              </Typography>

              <Box
                sx={{
                  ...styles.radioBox,
                  backgroundColor:
                    selectedValue === "free" ? "#F3F5F7" : "transparent",
                  "&:hover": {
                    backgroundColor: "#F3F5F7",
                  },
                }}
                onClick={() => setSelectedValue("free")}
              >
                {" "}
                <Radio
                  {...controlProps("free")}
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "5%",
                    paddingLeft: "0",
                  }}
                >
                  <Typography sx={styles.innerText}>Free Shipping</Typography>
                  <Typography sx={styles.innerText}>%0.00</Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  ...styles.radioBox,
                  backgroundColor:
                    selectedValue === "express" ? "#F3F5F7" : "transparent",
                  "&:hover": {
                    backgroundColor: "#F3F5F7",
                  },
                }}
                onClick={() => setSelectedValue("express")}
              >
                {" "}
                <Radio
                  {...controlProps("express")}
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "5%",
                    paddingLeft: "0",
                  }}
                >
                  <Typography sx={styles.innerText}>
                    Express Shipping
                  </Typography>
                  <Typography sx={styles.innerText}>+15.00</Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  ...styles.radioBox,
                  backgroundColor:
                    selectedValue === "pick" ? "#F3F5F7" : "transparent",
                  "&:hover": {
                    backgroundColor: "#F3F5F7",
                  },
                }}
                onClick={() => setSelectedValue("pick")}
              >
                {" "}
                <Radio
                  {...controlProps("pick")}
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "5%",
                    paddingLeft: "0",
                  }}
                >
                  <Typography sx={styles.innerText}>Pick Up</Typography>
                  <Typography sx={styles.innerText}>%21.00</Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "3%",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "inter",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "inter",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {/* ${overallTotal}.00 */}
                  ${allSubTotal}
                  {/* $500 */}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #d9d3d3",
                }}
                mb={4}
                pt={2}
              >
                <Typography
                  sx={{
                    fontFamily: "inter",
                    fontWeight: "600",
                    fontSize: "20px",
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "inter",
                    fontWeight: "600",
                    fontSize: "20px",
                  }}
                >
                  {/* ${totalPrice}.00 */}
                  ${allSubTotal}
                  {/* $550 */}
                </Typography>
              </Box>
              <Box onClick={handelCheckoutClick}>
                <CustomButton type="button" wdth="100%">
                  Check Out
                </CustomButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

ShoppingCart.propTypes = {
  handelCheckoutClick: PropTypes.func,
};

export default ShoppingCart;

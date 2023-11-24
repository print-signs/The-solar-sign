import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
  Radio,
  Typography,
} from "@mui/material";
import CustomButton from "../CustomButton";
// import ShoppingCartData from "../../Data/ShoppingCartData";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, getCartItem, getSubTotalPrice, increaseQuantity } from "../../store/Actions/cartActions";
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
  borderRadius: "0.25rem",
  border: "1px solid #6C7275",
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

const innerText = { fontFamily: "inter", fontWeight: "400", fontSize: "16px" };

const ReusableInputField = ({ label, placeholder, name, type }) => (
  <FormControl variant="outlined" fullWidth>
    <FormHelperText id="outlined-weight-helper-text" sx={styles.formStyle}>
      {label}
    </FormHelperText>
    <OutlinedInput
      size="small"
      id="outlined-adornment-weight"
      placeholder={placeholder}
      aria-describedby="outlined-weight-helper-text"
      name={name}
      required
      type={type}
    />
  </FormControl>
);

const ReusableRadioBox = ({ value, label, selectedValue, onChange }) => (
  <Box
    sx={{
      display: "flex",
      border: "1px solid #6C7275",
      borderRadius: "5px",
      margin: "2%",
      marginLeft: "0",
      cursor: "pointer",
      backgroundColor: selectedValue === value ? "#F3F5F7" : "transparent",
      "&:hover": {
        backgroundColor: "#F3F5F7",
      },
    }}
    onClick={() => onChange(value)}
  >
    <Radio
      checked={selectedValue === value}
      onChange={() => onChange(value)}
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
        p: 2,
        paddingLeft: "0",
      }}
    >
      <Typography sx={innerText}>{label}</Typography>
    </Box>
  </Box>
);

const CheckoutDetails = ({ handleplaceOrderClick }) => {
  const [selectedValue, setSelectedValue] = useState("free");



  const handleDecrease = (index) => {
    dispatch(decreaseQuantity(cartItem[index].product._id))
    dispatch(getSubTotalPrice())
  };

  const handleIncrease = (index) => {
    dispatch(increaseQuantity(cartItem[index].product._id));
    dispatch(getSubTotalPrice())
  };
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cart);
  const allSubTotal = useSelector((state) => state.cart.subtotal);
  // console.log(cartItem);
  useEffect(() => {

    dispatch(getCartItem());

    dispatch(getSubTotalPrice())
  }, [dispatch])
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={boxStyles}>
            <form>
              <Typography sx={headingStyles}>Contact Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          sx={styles.formStyle}
                        >
                          FIRST NAME*
                        </FormHelperText>
                        <OutlinedInput
                          size="small"
                          id="outlined-adornment-weight"
                          placeholder="First name"
                          aria-describedby="outlined-weight-helper-text"
                          name="firstname"
                          required
                          type="text"
                        //   value={accountDetails.firstname}
                        //   onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          sx={styles.formStyle}
                        >
                          LAST NAME*
                        </FormHelperText>
                        <OutlinedInput
                          size="small"
                          id="outlined-adornment-weight"
                          placeholder="Last name"
                          aria-describedby="outlined-weight-helper-text"
                          name="lastname"
                          required
                          type="text"
                        //   value={accountDetails.firstname}
                        //   onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      sx={styles.formStyle}
                    >
                      PHONE NUMBER*
                    </FormHelperText>
                    <OutlinedInput
                      size="small"
                      id="outlined-adornment-weight"
                      placeholder="Phone name"
                      aria-describedby="outlined-weight-helper-text"
                      name="phonenumber"
                      required
                      type="number"
                    //   value={accountDetails.firstname}
                    //   onChange={handerInputChanges}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      sx={styles.formStyle}
                    >
                      EMAIL ADDRESS*
                    </FormHelperText>
                    <OutlinedInput
                      size="small"
                      id="outlined-adornment-weight"
                      placeholder="Your Email"
                      aria-describedby="outlined-weight-helper-text"
                      name="email"
                      required
                      type="email"
                    //   value={accountDetails.email}
                    //   onChange={handerInputChanges}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </Box>

          <Box sx={boxStyles}>
            <form>
              <Typography sx={headingStyles}>Shipping Address</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          sx={styles.formStyle}
                        >
                          STREET ADDRESS*
                        </FormHelperText>
                        <OutlinedInput
                          size="small"
                          id="outlined-adornment-weight"
                          placeholder="Street Address"
                          aria-describedby="outlined-weight-helper-text"
                          name="streetaddress"
                          required
                          type="text"
                        //   value={accountDetails.firstname}
                        //   onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      sx={styles.formStyle}
                    >
                      COUNTRY*
                    </FormHelperText>
                    <OutlinedInput
                      size="small"
                      id="outlined-adornment-weight"
                      placeholder="Country"
                      aria-describedby="outlined-weight-helper-text"
                      name="country"
                      required
                      type="text"
                    //   value={accountDetails.firstname}
                    //   onChange={handerInputChanges}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      sx={styles.formStyle}
                    >
                      TOWN CITY*
                    </FormHelperText>
                    <OutlinedInput
                      size="small"
                      id="outlined-adornment-weight"
                      placeholder="Town City"
                      aria-describedby="outlined-weight-helper-text"
                      name="towncity"
                      required
                      type="text"
                    //   value={accountDetails.firstname}
                    //   onChange={handerInputChanges}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          sx={styles.formStyle}
                        >
                          STATE*
                        </FormHelperText>
                        <OutlinedInput
                          size="small"
                          id="outlined-adornment-weight"
                          placeholder="State"
                          aria-describedby="outlined-weight-helper-text"
                          name="state"
                          required
                          type="text"
                        //   value={accountDetails.firstname}
                        //   onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          sx={styles.formStyle}
                        >
                          ZIP CODE*
                        </FormHelperText>
                        <OutlinedInput
                          size="small"
                          id="outlined-adornment-weight"
                          placeholder="Zip Code"
                          aria-describedby="outlined-weight-helper-text"
                          name="zipcode"
                          required
                          type="number"
                        //   value={accountDetails.firstname}
                        //   onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>

          <Box sx={boxStyles}>
            <form>
              <Typography sx={headingStyles}>Payment Method</Typography>
              <ReusableRadioBox
                value="free"
                label="Free Shipping"
                selectedValue={selectedValue}
                onChange={setSelectedValue}
              />
              <ReusableRadioBox
                value="paypal"
                label="Paypal"
                selectedValue={selectedValue}
                onChange={setSelectedValue}
              />
              <Box sx={{ color: "#6C7275", mb: 2 }}>
                <Divider />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          sx={styles.formStyle}
                        >
                          CARD NUMBER*
                        </FormHelperText>
                        <OutlinedInput
                          size="small"
                          id="outlined-adornment-weight"
                          placeholder="Card Number"
                          aria-describedby="outlined-weight-helper-text"
                          name="cardnumber"
                          required
                          type="number"
                        //   value={accountDetails.firstname}
                        //   onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          sx={styles.formStyle}
                        >
                          EXPIRATION DATE*
                        </FormHelperText>
                        <OutlinedInput
                          size="small"
                          id="outlined-adornment-weight"
                          placeholder="MM/YY"
                          aria-describedby="outlined-weight-helper-text"
                          name="expirationdate"
                          required
                          type="number"
                        //   value={accountDetails.firstname}
                        //   onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          sx={styles.formStyle}
                        >
                          CVC*
                        </FormHelperText>
                        <OutlinedInput
                          size="small"
                          id="outlined-adornment-weight"
                          placeholder="CVC Code"
                          aria-describedby="outlined-weight-helper-text"
                          name="cvccode"
                          required
                          type="number"
                        //   value={accountDetails.firstname}
                        //   onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box sx={{ mb: 5 }} onClick={handleplaceOrderClick}>
            <CustomButton wdth="100%">Place Order</CustomButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={boxStyles}>
            <Typography sx={headingStyles}>Order Summary</Typography>
            {cartItem.map((item, i) => (
              <Grid
                key={i}
                container
                spacing={2}
                display="flex"
                justifyContent="space-between"
              >
                <Grid item>
                  <Box sx={{ display: "flex", alignItems: 'center' }}>
                    <Grid sx={{ width: '95px', height: "90px", mr: '1rem' }}>
                      <img style={{ width: '100%', height: '100%' }} src={item.product.image[0].url} alt="" />
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
                        {item.product.name}
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
                          height: "35px",
                          width: "100px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          my: '1rem'
                        }}
                      >
                        <Typography ml={1} onClick={() => handleDecrease(i)}>
                          -
                        </Typography>

                        {item.quantity}
                        <Typography mr={1} onClick={() => handleIncrease(i)}>
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
                    {item.product.price}
                  </Typography>
                </Grid>
                <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
              </Grid>
            ))}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    size="small"
                    id="outlined-adornment-weight"
                    placeholder="Input"
                    aria-describedby="outlined-weight-helper-text"
                    name="input"
                    required
                    type="text"
                  //   value={accountDetails.firstname}
                  //   onChange={handerInputChanges}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomButton>Apply</CustomButton>
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography sx={{ fontFamily: "Inter" }}>JenkateMW</Typography>
              <Typography sx={{ color: "#38CB89" }}>
                -$25.00 [Remove]
              </Typography>
            </Box>
            <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography sx={{ fontFamily: "Inter" }}>Shipping</Typography>
              <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                Free
              </Typography>
            </Box>
            <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography sx={{ fontFamily: "Inter" }}>Subtotal</Typography>
              <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                ${allSubTotal}
              </Typography>
            </Box>
            <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                fontFamily: "Inter",
                fontWeight: 600,
              }}
            >
              <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                Total
              </Typography>
              <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                ${allSubTotal}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

ReusableInputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ReusableRadioBox.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

CheckoutDetails.propTypes = {
  handleplaceOrderClick: PropTypes.func,
};

export default CheckoutDetails;

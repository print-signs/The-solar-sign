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
import ShoppingCartData from "../../Data/ShoppingCartData";
import PaypalPayment from "../Paypalpatment/PaypalPayment.jsx";
import toast from "react-hot-toast";
import { isAutheticated } from "../../Auth";
import DeleteIcon from "@mui/icons-material/Delete";

import swal from "sweetalert";
import axios from "axios";
import { red } from "@mui/material/colors";

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

const ReusableRadioBox = ({
  value,
  label,
  selectedValue,
  onChangeCheck,
  handleDelete,
}) => (
  <Box
    sx={{
      display: "flex",
      border: "1px solid #6C7275",
      borderRadius: "5px",
      margin: "2%",
      marginLeft: "0",
      // cursor: "pointer",
      backgroundColor: selectedValue === value ? "#F3F5F7" : "transparent",
      "&:hover": {
        backgroundColor: "#F3F5F7",
      },
    }}
  >
    <Radio
      checked={selectedValue === value}
      onChange={() => onChangeCheck(value)}
      sx={{
        color: "black",
        "&.Mui-checked": {
          color: "black",
        },
        cursor: "pointer",
      }}
      //  onClick={() => onChange(value)}
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

    <Box
      sx={{
        display: "flex",

        p: 3,
        color: red[600],
        cursor: "pointer",
      }}
    >
      <DeleteIcon onClick={() => handleDelete(value)} />
    </Box>
  </Box>
);

const CheckoutDetails = ({ handleplaceOrderClick }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  console.log("selectedValue", selectedValue);
  const [userAllAddress, setUserAllAddress] = useState([]);
  const [successs, setSuccess] = useState(true);

  const token = isAutheticated();
  //get user Address if exist
  const getUserAddress = () => {
    // setLoading(true);
    axios
      .get(`/api/shipping/address/user/address`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserAllAddress(res.data?.UserShippingAddress || []);
        // toast.success(res.data.message ? res.data.message : "Address fetch!");

        // setLoading(false);
      })
      .catch((error) => {
        // setLoading(false);
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : "Something went wrong!"
        );
      });
  };
  useEffect(() => {
    getUserAddress();
  }, [successs]);
  //
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    first_Name: "",
    last_Name: "",
    phone_Number: Number,
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  console.log(data);
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //delete self  Address
  const handleDelete = (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      icon: "error",
      buttons: {
        Yes: { text: "Yes", value: true },
        Cancel: { text: "Cancel", value: "cancel" },
      },
    }).then((value) => {
      if (value === true) {
        axios
          .delete(`/api/shipping/address/delete/${id}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setSuccess((prev) => !prev);
            toast.success(
              res.data.message ? res.data.message : "Address Added!"
            );
          })
          .catch((error) => {
            toast.error(
              error.response.data.message
                ? error.response.data.message
                : "Something went wrong!"
            );
          });
      }
    });
  };

  ///
  //add address
  function handleAddressSubmit() {
    if (
      data.first_Name === "" ||
      data.last_Name === "" ||
      data.phone_Number === null ||
      data.street === "" ||
      data.city === "" ||
      data.state === "" ||
      data.postalCode === "" ||
      data.country === ""
    ) {
      swal({
        title: "Warning",
        text: "Please fill All mendetory fields ",
        icon: "warning",
        button: "ok",
        dangerMode: true,
      });
      return;
    }
    setLoading(true);
    axios
      .post(
        `/api/shipping/address/new`,
        {
          ...data,
        },

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setSuccess((prev) => !prev);
        toast.success(res.data.message ? res.data.message : "Address Added!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : "Something went wrong!"
        );
      });
  }

  //
  const [quantities, setQuantities] = useState(
    ShoppingCartData.map((item) => item.quantity)
  );
  const [individualSubtotals, setIndividualSubtotals] = useState(
    ShoppingCartData.map((item) => item.price * item.quantity)
  );

  const handleDecrease = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = Math.max(1, updatedQuantities[index] - 1);
    setQuantities(updatedQuantities);

    const updatedIndividualSubtotals = [...individualSubtotals];
    updatedIndividualSubtotals[index] =
      updatedQuantities[index] * ShoppingCartData[index].price;
    setIndividualSubtotals(updatedIndividualSubtotals);
  };

  const handleIncrease = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = updatedQuantities[index] + 1;
    setQuantities(updatedQuantities);

    const updatedIndividualSubtotals = [...individualSubtotals];
    updatedIndividualSubtotals[index] =
      updatedQuantities[index] * ShoppingCartData[index].price;
    setIndividualSubtotals(updatedIndividualSubtotals);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {userAllAddress.length > 0 && (
            <Box sx={boxStyles}>
              <form>
                <Typography sx={headingStyles}>Use This Address</Typography>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12}>
                  <Grid container spacing={2}></Grid>
                </Grid> */}

                  {userAllAddress.length > 0 && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        {userAllAddress.map((i, id) => (
                          <>
                            <ReusableRadioBox
                              value={i?._id}
                              label={`${i?.first_Name} ${i?.last_Name},${i?.postalCode},
                            ${i?.street},
                            ${i?.city},
                            ${i?.state},
                            ${i?.country} \n\n Phone:${i?.phone_Number} `}
                              selectedValue={selectedValue}
                              onChangeCheck={setSelectedValue}
                              handleDelete={handleDelete}
                            />
                          </>
                        ))}
                        {/* <ReusableRadioBox
                        value="free"
                        label="Free Shipping"
                        selectedValue={selectedValue}
                        onChange={setSelectedValue}
                      />
                      <ReusableRadioBox
                        value="free"
                        label="Free Shipping"
                        selectedValue={selectedValue}
                        onChange={setSelectedValue}
                      /> */}
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Box>
          )}
          {userAllAddress.length < 3 && (
            <Box sx={boxStyles}>
              <form>
                <Typography sx={headingStyles}>
                  {userAllAddress.length > 0
                    ? "Add New Shipping Address"
                    : "Shipping Address"}
                </Typography>
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
                            name="first_Name"
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}

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
                            name="last_Name"
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}
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
                            PHONE NUMBER*
                          </FormHelperText>
                          <OutlinedInput
                            size="small"
                            id="outlined-adornment-weight"
                            placeholder="Phone name"
                            aria-describedby="outlined-weight-helper-text"
                            name="phone_Number"
                            required
                            type="number"
                            onChange={(e) => handleChange(e)}
                            //   value={accountDetails.firstname}
                            //   onChange={handerInputChanges}
                          />
                        </FormControl>
                      </Grid>
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
                            name="street"
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
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
                        name="city"
                        required
                        type="text"
                        onChange={(e) => handleChange(e)}
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
                            onChange={(e) => handleChange(e)}
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
                            name="postalCode"
                            required
                            type="number"
                            onChange={(e) => handleChange(e)}
                            //   value={accountDetails.firstname}
                            //   onChange={handerInputChanges}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{ my: 1 }}
                          onClick={(e) => handleAddressSubmit(e)}
                        >
                          <CustomButton wdth="100% ">
                            {loading ? "Loading..." : "Add"}
                          </CustomButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Box>
          )}
          {/* <Box sx={boxStyles}>
            <form>
              <Typography sx={headingStyles}>Payment Method</Typography>
              <ReusableRadioBox
                value="free"
                label="Free Shipping"
                selectedValue={selectedValue}
                onChange={setSelectedValue}
              />
              
              <Box sx={{ color: "#6C7275", mr: 1 }}>
                <PaypalPayment handleplaceOrderClick={handleplaceOrderClick} />
              </Box>
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
                            value={accountDetails.firstname}
                            onChange={handerInputChanges}
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
                            value={accountDetails.firstname}
                            onChange={handerInputChanges}
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
                            value={accountDetails.firstname}
                            onChange={handerInputChanges}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box> */}
          {/* <Box sx={{ mb: 5 }} onClick={handleplaceOrderClick}>

            <CustomButton wdth="100%">Place Order</CustomButton>
          </Box> */}
          {userAllAddress.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <PaypalPayment
                handleplaceOrderClick={handleplaceOrderClick}
                selectedAddress={selectedValue}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={4} mb={4}>
          <Box sx={boxStyles}>
            <Typography sx={headingStyles}>Order Summary</Typography>
            {ShoppingCartData.map((item, i) => (
              <Grid
                key={i}
                container
                spacing={2}
                display="flex"
                justifyContent="space-between"
              >
                <Grid item>
                  <Box sx={{ display: "flex" }}>
                    <Grid>
                      <img src={item.product.src} alt="" />
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
                      <Typography
                        sx={{
                          fontFamily: "inter",
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "#6C7275",
                        }}
                      >
                        Color : {item.product.color}
                      </Typography>
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
                        <Typography ml={1} onClick={() => handleDecrease(i)}>
                          -
                        </Typography>

                        {quantities[i]}
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
                    {item.price}
                  </Typography>
                </Grid>
                <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
              </Grid>
            ))}
            {/* <Grid container spacing={2}>
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
            </Box> */}
            {/* <Divider style={{ width: "100%", margin: "1rem  0rem" }} /> */}
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
                $99.00
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
                $234.00
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

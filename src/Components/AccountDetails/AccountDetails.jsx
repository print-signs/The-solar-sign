import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import CustomButton from "../CustomButton";
import { useEffect, useState } from "react";
import { isAutheticated } from "../../Auth";
import axios from "axios";
import toast from "react-hot-toast";

const styles = {
  formStyle: {
    fontWeight: "700",
    fontSize: "12px",
    fontFamily: "inter",
    marginBottom: "3px",
    marginLeft: "0",
  },
};

const AccountDetails = () => {
  const token = isAutheticated();
  const [accountDetails, setAccountDetails] = useState({
    name: "",

    email: "",
  });
  const [passworDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  console.log(token);
  const getUserBasicDetails = async () => {
    try {
      const res = await axios.get("/api/v1/user/details", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res);
        setAccountDetails({
          ...accountDetails,
          name: res?.data?.user?.name, // Assuming 'name' is one of the fields you receive
          email: res?.data?.user?.email, // Assuming 'email' is one of the fields you receive
        });
      }
    } catch (error) {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong!"
      );
    }
  };

  const handelPasswordInputChange = (e) => {
    setPasswordDetails({ ...passworDetails, [e.target.name]: e.target.value });
  };
  const handerInputChanges = (e) => {
    setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
  };
  const handelSaveBasicDetails = async (e) => {
    e.preventDefault();
    if (!accountDetails.name || !accountDetails.email) {
      alert("fill mandatory fields ");
      return;
    }

    try {
      const response = await axios.put(
        "/api/v1/user/update/profile",
        accountDetails,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("updated basic details  successfully ");
        return;
      }
    } catch (error) {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong!"
      );
    }
  };

  console.log(passworDetails);
  const handelUpdatePassword = async () => {
    if (
      !passworDetails.oldPassword ||
      !passworDetails.newPassword ||
      !passworDetails.confirmPassword
    ) {
      alert("fill mandatory fields ");
      return;
    }
    if (passworDetails.newPassword !== passworDetails.confirmPassword) {
      alert("New password and Confirm password must be same");
      return;
    }

    try {
      const response = await axios.put(
        "/api/v1/user/password/update",
        passworDetails,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Password updated successfully");
        return;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : "Something went wrong!"
      );
    }
  };
  useEffect(() => {
    getUserBasicDetails();
  }, []);
  // console.log(accountDetails);
  return (
    <Container>
      <form autoComplete="off" onSubmit={handelSaveBasicDetails}>
        <Stack spacing={{ xs: 2, sm: 1 }} width={{ xs: 300, sm: 700 }}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "inter", fontWeight: "600", fontSize: "20px" }}
          >
            Account Details
          </Typography>

          <FormControl id="fullWidth" variant="outlined">
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={styles.formStyle}
            >
              NAME*
            </FormHelperText>
            <OutlinedInput
              size="small"
              id="outlined-adornment-weight"
              placeholder="Name"
              label=""
              aria-describedby="outlined-weight-helper-text"
              name="name"
              required
              type="text"
              value={accountDetails.name}
              onChange={handerInputChanges}
            />
          </FormControl>

          <FormControl id="fullWidth" variant="outlined">
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={styles.formStyle}
            >
              EMAIL*
            </FormHelperText>
            <OutlinedInput
              size="small"
              id="outlined-adornment-weight"
              placeholder="Email"
              label=""
              readOnly={true}
              aria-describedby="outlined-weight-helper-text"
              name="email"
              required
              type="email"
              value={accountDetails.email}
              onChange={handerInputChanges}
            />
          </FormControl>
          <Box
            onClick={handelSaveBasicDetails}
            width={{ xs: "60%", sm: "40%" }}
            pt={1}
          >
            <CustomButton type="submit" wdth="100%">
              Save Basic Details
            </CustomButton>
          </Box>
        </Stack>
      </form>
      <form autoComplete="off" onSubmit={handelUpdatePassword}>
        <Stack spacing={{ xs: 2, sm: 1 }} width={{ xs: 300, sm: 700 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "inter",
              fontWeight: "600",
              fontSize: "20px",
              paddingTop: "4%",
              paddingBottom: "2%",
            }}
          >
            Password
          </Typography>

          <FormControl id="fullWidth" variant="outlined">
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={styles.formStyle}
            >
              OLD PASSWORD
            </FormHelperText>
            <OutlinedInput
              size="small"
              id="outlined-adornment-weight"
              placeholder="Old password"
              aria-describedby="outlined-weight-helper-text"
              name="oldPassword"
              value={accountDetails.oldPassword}
              onChange={handelPasswordInputChange}
            />
          </FormControl>
          <FormControl id="fullWidth" variant="outlined">
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={styles.formStyle}
            >
              NEW PASSWORD
            </FormHelperText>
            <OutlinedInput
              size="small"
              id="outlined-adornment-weight"
              placeholder="New password"
              aria-describedby="outlined-weight-helper-text"
              name="newPassword"
              value={accountDetails.newPassword}
              onChange={handelPasswordInputChange}
            />
          </FormControl>
          <FormControl id="fullWidth" variant="outlined">
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={styles.formStyle}
            >
              REPEAT NEW PASSWORD
            </FormHelperText>
            <OutlinedInput
              size="small"
              id="outlined-adornment-weight"
              placeholder="Repeat new password"
              aria-describedby="outlined-weight-helper-text"
              name="confirmPassword"
              value={accountDetails.confirmPassword}
              onChange={handelPasswordInputChange}
            />
          </FormControl>

          <Box
            onClick={handelUpdatePassword}
            width={{ xs: "60%", sm: "40%" }}
            pt={1}
          >
            <CustomButton type="submit" wdth="100%">
              Save Password
            </CustomButton>
          </Box>

          {/* <Button variant='contained' type='submit' >Sign up</Button> */}
        </Stack>
      </form>
    </Container>
  );
};

export default AccountDetails;

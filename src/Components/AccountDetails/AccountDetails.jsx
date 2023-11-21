import { Box, Container, FormControl, FormHelperText, OutlinedInput, Stack, Typography } from "@mui/material"
import CustomButton from "../CustomButton"
import { useState } from "react"

const styles = {
  formStyle: { fontWeight: '700', fontSize: '12px', fontFamily: 'inter', marginBottom: '3px', marginLeft: '0' }
}

const AccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState({
    firstname: "",
    lastname: "",
    displayname: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: ""
  })
  const handerInputChanges = (e) => {
    setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
  }
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!accountDetails.firstname || !accountDetails.lastname || !accountDetails.displayname || !accountDetails.email) {

      alert('fill mandatory fields ');
      return;
    }
    alert('Details Updated')
  }
  // console.log(accountDetails);
  return (
    <Container>
      <form autoComplete="off" onSubmit={handleInputSubmit}>
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
              value={accountDetails.firstname}
              onChange={handerInputChanges}
            />
          </FormControl>

          <FormControl id="fullWidth" variant="outlined">
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
              value={accountDetails.lastname}
              onChange={handerInputChanges}
            />
          </FormControl>

          <FormControl id="fullWidth" variant="outlined">
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={styles.formStyle}
            >
              DISPLAY NAME*
            </FormHelperText>
            <OutlinedInput
              size="small"
              id="outlined-adornment-weight"
              placeholder="Display name"
              aria-describedby="outlined-weight-helper-text"
              name="displayname"
              required
              type="text"
              value={accountDetails.displayname}
              onChange={handerInputChanges}
            />
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={{
                fontFamily: "inter",
                fontWeight: "400",
                fontStyle: "italic",
                fontSize: "12px",
                marginLeft: "0",
              }}
            >
              This will be how your name will be displayed in the account
              section and in reviews
            </FormHelperText>
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
              aria-describedby="outlined-weight-helper-text"
              name="email"
              required
              type="email"
              value={accountDetails.email}
              onChange={handerInputChanges}
            />
          </FormControl>

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
              onChange={handerInputChanges}
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
              onChange={handerInputChanges}
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
              name="repeatNewPassword"
              value={accountDetails.repeatNewPassword}
              onChange={handerInputChanges}
            />
          </FormControl>

          <Box width={{ xs: "60%", sm: "40%" }} pt={1}>
            <CustomButton type="submit" wdth="100%">
              Save Changes
            </CustomButton>
          </Box>

          {/* <Button variant='contained' type='submit' >Sign up</Button> */}
        </Stack>
      </form>
    </Container>
  )
}

export default AccountDetails
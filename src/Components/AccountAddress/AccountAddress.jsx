import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const EditIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
  >
    <path
      d="M2 14.5H14M9.18961 4.04114C9.18961 4.04114 9.18961 5.13089 10.2794 6.22064C11.3691 7.31039 12.4589 7.31039 12.4589 7.31039M4.87975 12.492L7.16823 12.1651C7.49833 12.118 7.80424 11.965 8.04003 11.7292L13.5486 6.22064C14.1505 5.61879 14.1505 4.64299 13.5486 4.04114L12.4589 2.95139C11.857 2.34954 10.8812 2.34954 10.2794 2.95139L4.77078 8.45997C4.53499 8.69576 4.38203 9.00167 4.33488 9.33177L4.00795 11.6202C3.9353 12.1288 4.3712 12.5647 4.87975 12.492Z"
      stroke="#6C7275"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const addressStyle = {
  fontFamily: "Inter",
  fontSize: "0.875rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "1.375rem",
};

const AccountAddress = ({ address1, phoneNumber, address2 }) => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #6C7275",
          borderRadius: "0.5rem",
          padding: "1rem",
          position: "relative",
        }}
      >
        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 1,
            fontFamily: "Inter",
            color: "#6C7275",
            "&:hover": {
              textDecoration: "underline",
            },
            cursor: "pointer",
          }}
        >
          {EditIcon}
          Edit
        </Box> */}

        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "1.625rem",
          }}
        >
          Billing Address
        </Typography>
        <Typography sx={addressStyle}>{address1}</Typography>
        <Typography sx={addressStyle}>{phoneNumber}</Typography>
        <Typography sx={addressStyle}>{address2}</Typography>
      </Box>
    </Container>
  );
};

AccountAddress.propTypes = {
  address1: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
};

export default AccountAddress;

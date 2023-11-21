import {
  Avatar,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import avatar from "../../assets/images/Avatar.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AccountDetails from "../../Components/AccountDetails/AccountDetails";
import OrderHistory from "../../Components/OrderHistory/OrderHistory";
import { useState } from "react";
import AccountAddress from "../../Components/AccountAddress/AccountAddress.jsx";


const activeStyle = {
  color: "black",
  fontWeight: "bold",
  padding: "0.5rem 0rem",
  borderBottom: "1px solid black",
};
const inActive = {
  padding: "0.5rem 0rem",
  color: "#6C7275",
  fontWeight: "bold",
};

const Account = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const matches = useMediaQuery("(min-width:900px)");
  const handleChange = (event) => {
    setActiveTab(event.target.value);
  };
  return (
    <Container>
      <Box>
        <Typography
          variant="h3"
          style={{
            fontFamily: "Poppins",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          My Account
        </Typography>
      </Box>
      <Box my={8}>
        <Grid container spacing={5}>
          <Grid item sm={12} xs={12} md={4} lg={4} xl={4}>
            <Paper
              elevation={0}
              style={{
                background: "#F3F5F7",
                padding: "1rem ",
                borderRadius: "0.5rem",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  style={{
                    position: "relative",
                  }}
                >
                  <Avatar src={avatar} sx={{ width: 76, height: 76 }} />
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      color: "black",
                      background: "black",
                    }}
                  >
                    <CameraAltOutlinedIcon
                      fontSize="small"
                      sx={{ color: "white" }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box my={1}>
                <Typography
                  variant="body1"
                  style={{
                    fontFamily: "Inter",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Sofia Havertz
                </Typography>
              </Box>
              {!matches && (
                <Box>
                  <FormControl fullWidth>
                    <Select value={activeTab} onChange={handleChange}>
                      <MenuItem value={"Account"}>Account</MenuItem>
                      <MenuItem value={"Address"}>Address</MenuItem>
                      <MenuItem value={"Orders"}>Orders</MenuItem>
                      <MenuItem value={"Wishlist"}>Wishlist</MenuItem>
                      <MenuItem
                        value="Logout"
                        onClick={() => console.log("logout")}
                      >
                        Logout
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
              {matches && (
                <Box>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        style={activeTab === "Account" ? activeStyle : inActive}
                        onClick={() => setActiveTab("Account")}
                      >
                        <ListItemText primary={"Account"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        style={activeTab === "Address" ? activeStyle : inActive}
                        onClick={() => setActiveTab("Address")}
                      >
                        <ListItemText primary={"Address"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        style={activeTab === "Orders" ? activeStyle : inActive}
                        onClick={() => setActiveTab("Orders")}
                      >
                        <ListItemText primary={"Orders"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        style={
                          activeTab === "Wishlist" ? activeStyle : inActive
                        }
                        onClick={() => setActiveTab("Wishlist")}
                      >
                        <ListItemText padding={0} primary={"Wishlist"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        style={{ padding: "0.5rem 0rem" }}
                        onClick={() => console.log("Logout")}
                      >
                        <ListItemText
                          style={{ color: "#6C7275" }}
                          primary={"Logout"}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>
          <Grid item sm={12} xs={12} md={8} lg={8} xl={8}>
            {activeTab === "Account" && (
              <Box>
                <AccountDetails />
              </Box>
            )}
            {activeTab === "Address" && (
              <Box sx={{ display: "flex" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <AccountAddress
                      address1="Sofia Havertz"
                      phoneNumber="(+1) 234 567 890"
                      address2="345 Long Island, New York, United States"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AccountAddress
                      address1="Sofia Havertz"
                      phoneNumber="(+1) 234 567 890"
                      address2="345 Long Island, New York, United States"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            {activeTab === "Orders" && (
              <Box>
                <OrderHistory />

              </Box>
            )}
            {activeTab === "Wishlist" && (
              <Box>wishlist section goes her create an component for this </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Account;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import OrderHistoryData from "../../Data/OrderHistoryData";
import axios from "axios";
import { isAutheticated } from "../../Auth";
import { useEffect, useState } from "react";
const styles = {
  headingStyle: {
    fontFamily: "inter",
    fontWeight: "400",
    fontSize: "14px",
    color: "#6C7275",
  },
};
const OrderHistory = ({ setAccountId }) => {
  const matches = useMediaQuery("(min-width:900px)");
  const [AllselfOrder, setAllselfOrder] = useState([]);
  const [orderLoad, setorderLoad] = useState(false);

  const token = isAutheticated();
  const getAllselfOrder = async () => {
    try {
      setorderLoad(true);
      const response = await axios.get(`/api/order/user/self`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        // console.log(response.data);
        setAllselfOrder(response.data?.order);
        setorderLoad(false);
      }
    } catch (error) {
      console.error("Error get data:", error.message);
      setorderLoad(false);
    }
  };
  useEffect(() => {
    getAllselfOrder();
  }, []);
  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "inter",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "2rem",
        }}
      >
        Orders History
      </Typography>
      {matches && (
        <TableContainer
          component={Paper}
          elevation={0}
          style={{
            borderBottom: "1.5px solid rgb(207 210 213)",
            borderRadius: "0",
          }}
        >
          <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.headingStyle}>Order ID</TableCell>
                <TableCell style={styles.headingStyle}>Dates</TableCell>
                <TableCell style={styles.headingStyle}>Status</TableCell>
                <TableCell style={styles.headingStyle}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderLoad ? (
                <>
                  {" "}
                  <Typography
                    // variant="h4"
                    sx={{
                      // fontFamily: "inter",
                      textAlign: "center",
                      fontWeight: "500",
                      fontSize: "15px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    p={2}
                  >
                    Loading...
                  </Typography>
                </>
              ) : AllselfOrder.length > 0 ? (
                AllselfOrder.map((row, idx) => (
                  <TableRow
                    key={idx}
                    style={{ padding: "1rem" }}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => setAccountId(row?.orderID)}
                  >
                    <TableCell component="th" scope="row">
                      {row?.orderID}
                    </TableCell>
                    <TableCell>
                      {new Date(row?.paidAt).toLocaleString("en-IN", {
                        // weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      })}
                    </TableCell>
                    <TableCell>{row?.orderStatus}</TableCell>
                    <TableCell>${row?.total_amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <>
                  {" "}
                  <Typography
                    // variant="h4"
                    sx={{
                      display: "flex",
                      textAlign: "center",

                      justifyContent: "center",
                      alignItems: "center",
                      // textAlign: "center",
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                    p={2}
                  >
                    No Order PLaced till Now !
                  </Typography>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!matches &&
        AllselfOrder.map((item, i) => (
          <Grid key={i} container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography
                py={1}
                style={{
                  fontWeight: "bold",
                  fontFamily: "inter",
                  fontSize: "0.8rem",
                  color: "#6C7275",
                }}
              >
                Order ID
              </Typography>
              <Typography
                py={1}
                style={{
                  fontWeight: "bold",
                  fontFamily: "inter",
                  fontSize: "0.8rem",
                  color: "#6C7275",
                }}
              >
                Dates
              </Typography>
              <Typography
                py={1}
                style={{
                  fontWeight: "bold",
                  fontFamily: "inter",
                  fontSize: "0.8rem",
                  color: "#6C7275",
                }}
              >
                Status
              </Typography>
              <Typography
                py={1}
                style={{
                  fontWeight: "bold",
                  fontFamily: "inter",
                  fontSize: "0.8rem",
                  color: "#6C7275",
                }}
              >
                Price
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography
                py={1}
                style={{
                  fontFamily: "inter",
                  fontSize: "0.8rem",
                }}
              >
                {item?.orderID}
              </Typography>
              <Typography
                py={1}
                style={{
                  fontFamily: "inter",
                  fontSize: "0.8rem",
                }}
              >
                {/* {item.Date} */}
                {new Date(item?.paidAt).toLocaleString("en-IN", {
                  // weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })}
              </Typography>
              <Typography
                py={1}
                style={{
                  fontFamily: "inter",
                  fontSize: "0.8rem",
                }}
              >
                {item?.orderStatus}
              </Typography>
              <Typography
                py={1}
                style={{
                  fontFamily: "inter",
                  fontSize: "0.8rem",
                }}
              >
                ${item?.total_amount}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
          </Grid>
        ))}
    </div>
  );
};

export default OrderHistory;

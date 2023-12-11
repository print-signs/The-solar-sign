import { Box, Typography, Container, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Height } from "@mui/icons-material";

const ShoppingPolicy = () => {
  const [shippingPolicy, setshippingPolicy] = useState();
  const [Loading, setLoading] = useState(false);
  const getPrivacyPolicy = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/content/shipping-and-policy`);
      if (response.data) {
        // console.log(response.data.shipping[0].shippingContent);
        setshippingPolicy(response?.data?.shipping[0]?.shippingContent);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  return (
    <Box>
      <Typography
        variant="body2"
        mt={2}
        style={{
          fontFamily: "inter",
          fontSize: "45px",
          textAlign: "center",
          color: "#000",
          fontWeight: "500",
        }}
      >
        Shipping Policy
      </Typography>

      <Container sx={{ minHeight: "420px" }}>
        {Loading ? (
          <Skeleton
            width={"100%"}
            height={"420px"}
            animation="wave"
            variant="rounded"
            sx={{ marginBottom: "2rem" }}
          />
        ) : (
          <Typography dangerouslySetInnerHTML={{ __html: shippingPolicy }} />
          // privacyPolicy
        )}
      </Container>
    </Box>
  );
};

export default ShoppingPolicy;

import { Box, Typography, Container, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const PrivacePolicy = () => {
  const [privacyPolicy, setprivacyPolicy] = useState();
  const [Loading, setLoading] = useState(false);
  const getPrivacyPolicy = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/content/privacy-and-policy`);
      if (response.data) {
        // console.log(response.data.privacyAndPolicy[0].privacyAndPolicyContent);
        setprivacyPolicy(
          response?.data?.privacyAndPolicy[0]?.privacyAndPolicyContent
        );
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
        Privacy Policy
      </Typography>
      {/* <Divider /> */}
      <Container sx={{ minHeight: "440px" }}>
        {Loading ? (
          <Skeleton
            width={"100%"}
            height={"420px"}
            animation="wave"
            variant="rounded"
            sx={{ marginBottom: "2rem" }}
          />
        ) : (
          <Typography dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
          // privacyPolicy
        )}
      </Container>
    </Box>
  );
};

export default PrivacePolicy;

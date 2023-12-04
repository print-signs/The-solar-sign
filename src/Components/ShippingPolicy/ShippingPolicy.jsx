import {
    Box, Typography, Container
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

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
            <Typography variant="body2" mt={2} style={{
                fontFamily: "inter",
                fontSize: "45px",
                textAlign: "center", color: "#000",
                fontWeight: '500'
            }}>
                Shipping Policy
            </Typography>

            <Container>

                {Loading ? (
                    <p>Loading...</p>
                ) : (
                    <Typography dangerouslySetInnerHTML={{ __html: shippingPolicy }} />
                    // privacyPolicy
                )}
            </Container>
        </Box>
    )
}

export default ShoppingPolicy
import {
    Box, Typography, Container
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const TermAndCondition = () => {
    const [term, setTerm] = useState();
    const [Loading, setLoading] = useState(false);
    const getPrivacyPolicy = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/content/terms-and-conditions`);
            if (response.data) {
                // console.log(response.data.termsAndCondition[0].termsAndContionContent);
                setTerm(response?.data?.termsAndCondition[0]?.termsAndContionContent);
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
                Terms of Use
            </Typography>

            <Container>

                {Loading ? (
                    <p>Loading...</p>
                ) : (
                    <Typography dangerouslySetInnerHTML={{ __html: term }} />
                    // privacyPolicy
                )}
            </Container>
        </Box>
    )
}

export default TermAndCondition
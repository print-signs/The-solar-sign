
import { Container, Grid, Typography, Box, Divider } from "@mui/material";
import ShoppingCartData from "../../Data/ShoppingCartData/ShoppingCartData";
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

const innerText = { fontFamily: "inter", fontWeight: "600", fontSize: "16px" };
const OrderDetails = () => {
    return (
        // <Container></Container>
        <Container sx={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start' }}>
            <Grid width='30%' >
                <Typography sx={{ fontFamily: 'inter', fontSize: '20px', fontWeight: "500", color: '#00000' }}>
                    Order Id : #3456_768
                </Typography>
            </Grid>
            <Grid container width='55vw' justifyContent='space-between'>
                <Grid item width='25vw'>
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
                                <Grid item display='flex' justifyContent='space-between' width='100%'>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Grid sx={{ width: "95px", height: "90px", mr: "1rem" }}>
                                            <img
                                                style={{ width: "100%", height: "100%" }}
                                                src={item.product.src}
                                                alt=""
                                            />
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

                                        </Grid>

                                    </Box>
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontFamily: "inter",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                color: "#141718",
                                            }}
                                        >
                                            ${item.price}.00
                                        </Typography>

                                    </Grid>
                                </Grid>

                                <Divider style={{ width: "100%", margin: "1rem  0rem" }} />
                            </Grid>
                        ))}


                    </Box>
                </Grid >
                <Grid item width='25vw' sx={{ backgroundColor: '#F3F5F7', height: '65vh' }}>
                    <Box sx={{ padding: "2rem" }}>

                        <Typography sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#6C7275' }}>Shipping Address</Typography>

                        <Typography mt={2} sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#141718' }}> Sofia Havertz</Typography>
                        <Typography mt={2} sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#141718' }}> (+1) 234 567 890</Typography>
                        <Typography mt={2} sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#141718' }}> 345 Long island, NewYork, United States</Typography>

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '2rem' }}>

                        <Box>
                            <Typography sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#6C7275' }} >Date</Typography>

                            <Typography mt={3} sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#6C7275' }}> Status</Typography>
                            <Typography mt={3} sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#6C7275' }}> Price</Typography>

                        </Box>

                        <Box>
                            <Typography sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#141718' }}>October 17, 2023</Typography>

                            <Typography mt={3} sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "400", color: '#141718' }}> Delivered</Typography>
                            <Typography mt={3} sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: "700", color: '#141718' }}> $1234.00</Typography>
                        </Box>
                    </Box>
                </Grid >
            </Grid>

        </Container >
    )
}

export default OrderDetails
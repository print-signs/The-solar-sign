import React from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingCart from "../../Components/ShoppingCart";
import CheckoutDetails from "../../Components/CheckoutDetails";
import OrderComplete from "../../Components/OrderComplete";
import PropTypes from "prop-types";

const TabItem = ({
  label,
  active,
  complete,
  onClick,
  reference,
  stepNumber,
}) => (
  <Box
    ref={reference}
    onClick={onClick}
    sx={{
      minWidth: "256px",
      display: "flex",
      alignItems: "center",
      pb: "1rem",
      cursor: "pointer",
      borderBottom: complete
        ? "2px solid #45B26B"
        : active
        ? "2px solid black"
        : "",
    }}
  >
    <IconButton
      sx={{
        background: complete ? "#45B26B" : active ? "#000" : "#B1B5C3",
        marginRight: "1rem",
      }}
    >
      {complete ? (
        <CheckIcon sx={{ color: "white" }} />
      ) : (
        <Typography
          color={active ? "white" : complete ? "#45B26B" : "#FCFCFD"}
          width={30}
          height={30}
          borderRadius={"50%"}
        >
          {stepNumber}
        </Typography>
      )}
    </IconButton>
    <Typography
      sx={{
        fontFamily: "inter",
        fontSize: "1rem",
        fontWeight: "bold",
        color: complete ? "#45B26B" : active ? "black" : "#B1B5C3",
      }}
    >
      {label}
    </Typography>
  </Box>
);

TabItem.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  reference: PropTypes.object.isRequired,
  stepNumber: PropTypes.number.isRequired,
};

const Cart = () => {
  const [activeTab, setActiveTab] = React.useState("1");
  const [isShoppingComplete, setIsShoppingComplete] = React.useState(false);
  const [isCheckoutComplete, setIsCheckoutComplete] = React.useState(false);
  const [cartComplete, setCartComplete] = React.useState(false);
  const tab1Ref = React.useRef(null);
  const tab2Ref = React.useRef(null);
  const tab3Ref = React.useRef(null);

  const handlePurchaseClick = () => {
    setCartComplete(true);
    tab3Ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheckoutClick = () => {
    setIsShoppingComplete(true);
    setActiveTab("2");
    tab2Ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlaceOrderClick = () => {
    setIsCheckoutComplete(true);
    setActiveTab("3");
    tab3Ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container>
      <Box>
        <Typography
          variant="h3"
          style={{
            fontFamily: "Poppins",
            textAlign: "center",
            margin: "2rem",
          }}
        >
          {activeTab === "1" && "Cart"}
          {activeTab === "2" && "Check Out"}
          {activeTab === "3" && "Complete!"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: { sm: "none", md: "center" },
          gap: "40px",
          overflowX: { xs: "scroll", md: "hidden" },
          margin: "1rem",
        }}
      >
        <TabItem
          label="Shopping cart"
          active={activeTab === "1"}
          complete={isShoppingComplete}
          // onClick={() => {
          //   setActiveTab("1");
          //   setIsShoppingComplete(false);
          // }}
          reference={tab1Ref}
          stepNumber={1}
        />
        <TabItem
          label="Checkout details"
          active={activeTab === "2"}
          complete={isCheckoutComplete}
          // onClick={() => {
          //   setActiveTab("2");
          //   setIsCheckoutComplete(false);
          // }}
          reference={tab2Ref}
          stepNumber={2}
        />
        <TabItem
          label="Order Complete"
          active={activeTab === "3"}
          complete={cartComplete}
          // onClick={() => {
          //   setActiveTab("3");
          //   setCartComplete(false);
          // }}
          reference={tab3Ref}
          stepNumber={3}
        />
      </Box>

      {activeTab === "1" && (
        <Box>
          <ShoppingCart handelCheckoutClick={handleCheckoutClick} />
        </Box>
      )}
      {activeTab === "2" && (
        <Box>
          <CheckoutDetails handleplaceOrderClick={handlePlaceOrderClick} />
        </Box>
      )}
      {activeTab === "3" && (
        <Box>
          {/* <Button onClick={handlePurchaseClick} width="100%">
            Purchase history
          </Button> */}
          <OrderComplete handlePlaceOrderClick={handlePlaceOrderClick} />
        </Box>
      )}
    </Container>
  );
};

export default Cart;

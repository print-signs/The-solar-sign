import {
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import shopImage from "../../assets/images/shopImage.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShopPageProduct from "../../Components/ShopPageProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/Actions/productsActions";

const styles = {
  img: {
    width: "100%",
    height: "auto",
  },
  linkStyle: {
    textDecoration: "none",
    fontFamily: "inter",
    fontWeight: "500",
    fontSize: "14px",
    textAlign: "center",
  },
  selectHeading: {
    fontFamily: "inter",
    fontWeight: "600",
    fontSize: "16px",
    color: "#6C7275",
    marginBottom: ".5rem",
  },
  imageBox: {
    backgroundImage: `url('${shopImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newText: {
    position: "absolute",
    top: "7%",
    left: "8%",
    backgroundColor: "white",
    fontSize: "90%",
    fontWeight: "bold",
    width: "10%",
    height: "4%",
    fontFamily: "Poppins",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    color: "black",
  },
  discountText: {
    position: "absolute",
    top: "12%",
    left: "8%",
    backgroundColor: "green",
    color: "white",
    fontSize: "90%",
    fontWeight: "bold",
    width: "11%",
    height: "4%",
    fontFamily: "Poppins",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
};
const Shop = () => {
  const [categoryValue, setCategoryValue] = useState("All");
  const [priceValue, setPriceValue] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.product);
  // console.log(productData);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      setCategoryValue(value);
      setSelectedCategories((prevCategories) => {
        if (prevCategories.includes(value)) {
          return prevCategories.filter((category) => category !== value);
        } else {
          return [...prevCategories, value];
        }
      });
    } else if (name === "price") {
      setPriceValue(value);
    }
  };
  let filteredItems = productData?.filter((item) => {
    const categoryMatch =
      categoryValue === "All" || item.category === categoryValue;

    const priceMatch =
      priceValue === "All" ||
      (parseFloat(item.price) >= parseFloat(priceValue.split("-")[0]) &&
        parseFloat(item.price) <= parseFloat(priceValue.split("-")[1]));

    return categoryMatch && priceMatch;
  });
  // console.log("product data", filteredItems)
  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Container>
      <Grid item margin={0}>
        <Grid item sx={styles.imageBox}>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            direction="column"
          >
            <Grid item>
              <Typography variant="body2" mb={1}>
                <Link style={{ ...styles.linkStyle, color: "#605F5F" }} to="/">
                  Home
                </Link>{" "}
                &nbsp;{`>`}&nbsp;
                <Link
                  style={{ ...styles.linkStyle, color: "#121212" }}
                  to="/shop"
                >
                  Shop
                </Link>{" "}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "54px",
                }}
              >
                {" "}
                Shop Page
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontFamily: "inter",
                  fontWeight: "400",
                  fontSize: "20px",
                  color: "#121212",
                }}
              >
                {" "}
                Let’s design the place you always imagined.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: "2rem", display: "flex" }} spacing={4}>
          <Grid item sx={{ width: { xs: "100%", sm: "25%" } }}>
            <Typography sx={styles.selectHeading}>CATEGORIES</Typography>
            <FormControl sx={{ width: "100%" }}>
              <Select
                name="category"
                value={categoryValue}
                onChange={handleChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Holiday Season">Holiday Season</MenuItem>
                <MenuItem value="Spare Parts">Spare Parts</MenuItem>
                <MenuItem value="RealEstate Signs">RealEstate Signs</MenuItem>
                <MenuItem value="Political Signs">Political Signs</MenuItem>
                <MenuItem value="Hollo catregory 2">Hollo catregory 2</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ width: { xs: "100%", sm: "25%" } }}>
            <Typography sx={styles.selectHeading}>PRICE</Typography>

            <FormControl sx={{ width: "100%" }}>
              <Select name="price" value={priceValue} onChange={handleChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value={"0-100"}>0-100</MenuItem>
                <MenuItem value={"100-1000"}>100-1000</MenuItem>
                <MenuItem value={"1000-5000"}>1000-5000</MenuItem>
                <MenuItem value={"5000-10000"}>5000-10000</MenuItem>
                <MenuItem value={"10000-100000"}>10000-100000</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: "4rem" }}>
          <Grid
            item
            sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
            gap={2}
          >
            {filteredItems && filteredItems.length !== 0 ? (
              filteredItems?.slice(startIndex, endIndex).map((item, index) => (
                <Grid
                  key={index}
                  sx={{ width: { xs: "46%", md: "23%", sm: "30%" } }}
                >
                  <ShopPageProduct
                    src={item.image[0].url}
                    // alt={item.alt}
                    alt="image"
                    name={item.name}
                    price={item.price}
                    categories={item.category}
                    id={item._id}
                    product={item}
                  />
                </Grid>
              ))
            ) : (
              <Grid
                container
                sx={{
                  mt: "3rem",
                  mb: "8rem",
                  textAlign: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                Product Not Found!
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          {filteredItems && (
            <Pagination
              count={Math.ceil(filteredItems?.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shop;

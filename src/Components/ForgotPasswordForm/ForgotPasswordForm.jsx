import { useState } from "react";
import {
    Stack,
    FormControl,
    Input,
    InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import CustomButton from "../../../Components/CustomButton";
import CustomButton from "../CustomButton";
import axios from "axios";
import toast from "react-hot-toast";

// const LinkStyle = {
//     color: "black",
//     fontWeight: "bold",
//     textDecoration: "none",
// };

const ForgotPasswordForm = () => {
    const [isLoading, setIsloading] = useState(false);
    const [email, setEmail] = useState();
    const handerInputChanges = (e) => {
        setEmail(e.target.value);
    };


    const navigate = useNavigate();

    // form submit
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsloading(true)

            const res = await axios.post(`/api/v1/user/password/forgot`, { email: email })
            // console.log(res);
            if (res.data.success === true) {
                setIsloading(false)
                // alert("Email Send Successfully! please check your mail for reset password")
                toast.success("Email Send Successfully! please check your Email for new password");
                navigate("/signin");

            }
        } catch (e) {
            toast.error('Wrong Email ID. Enter valid email to get the password')
            setIsloading(false)


        } finally {
            setIsloading(false);
        }
    };

    return (
        <Stack
            // border='solid'
            height="100vh"
            justifyContent={{ xs: "flex-start", sm: "center" }}
            alignItems="center"
        >
            <form>
                <Stack spacing={{ xs: 2, sm: 1 }} width={{ xs: 300, sm: 400 }}>
                    <h1 style={{ fontFamily: "Poppins", }}>Forgot Password</h1>
                    {/* <Typography variant="subtitle1">
                        {" "}
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            style={{ color: "#38CB89", textDecoration: "none" }}
                        >
                            Sign Up
                        </Link>{" "}
                    </Typography> */}

                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">
                            Enter your email, we will send you password in your Email
                        </InputLabel>
                        <Input
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={handerInputChanges}
                        />
                    </FormControl>

                    {/* <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">
                            Password
                        </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={user.password}
                            onChange={handerInputChanges}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl> */}
                    {/* <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack>
                            <FormControlLabel
                                label="Remember me"
                                control={
                                    <Checkbox checked={rememberMe} onChange={handleChange} />
                                }
                            />
                        </Stack>
                        <Stack>
                            <Link to='/forgot-password' style={LinkStyle}>Forgot Password</Link>
                        </Stack>
                    </Stack> */}
                    {/* <CustomButton>Sign in</CustomButton> */}
                    <div style={{ marginTop: '2rem' }} onClick={handleLoginSubmit}>
                        <CustomButton type="submit" wdth={"100%"}>
                            {isLoading ? "Loading..." : "Generate Password"}
                        </CustomButton>
                    </div>

                    {/* <Button variant='contained' type='submit' >Sign in</Button> */}
                </Stack>
            </form>
        </Stack>
    );
}

export default ForgotPasswordForm
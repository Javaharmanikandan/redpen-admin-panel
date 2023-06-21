// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
// Data
import Grid from "@mui/material/Grid";
import SoftInput from "components/SoftInput";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AuthApi from "api/auth";


function CreatePassCode() {

    const [load, setLoad] = useState(false);


    const {
        register: registerSub,
        handleSubmit: handleSubmitSub,
        reset: resetSub,
        formState: { errors },
        setValue:setValue,
    } = useForm();


    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        const codeLength = 8;

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        setValue("pass_code", code);

    };

    //After Submit  Category

    const onSubmitSub = async (data) => {
        setLoad(true);
        const payLoad = {
            pass_code: data.pass_code,
        };

        const dataPost = await AuthApi.Postmethod(
            "/create-pass-code",
            payLoad
        );

        if (dataPost.data.status) {
            toast.success(dataPost.data.message);
            resetSub();
        } else {
            toast.error(dataPost.data.message);
        }
        setLoad(false);
    };







    return (
        <>
            {load ?
                <div className="loader-container">
                    <img style={{ width: 100, height: 100 }} src="https://cdn.dribbble.com/users/255512/screenshots/2235810/sa.gif"></img>
                </div> :
                <DashboardLayout>
                    <DashboardNavbar />


                    <SoftBox py={3}>
                        <SoftBox mb={3}>
                            <Card>
                                <SoftBox
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    p={3}
                                >
                                    <SoftTypography variant="h6">Create pass code </SoftTypography>
                                </SoftBox>
                                <form
                                    key={2}
                                    style={{ padding: "20px" }}
                                    onSubmit={handleSubmitSub(onSubmitSub)}
                                >
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Pass Code *
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...registerSub("pass_code", { required: 'Pass code is required',  minLength: { value: 8, message: 'Pass code must be at least 8 characters long' }, maxLength: { value: 8, message: 'Pass code must be less than or equal to 8 characters long' } })}
                                                    type="text"
                                                    name="pass_code"
                                                    minLength={8}
                                                    maxLength={8}
                                                    placeholder=" Pass Code"
                                                />
                                                {errors.pass_code && (
                                                    <span className="Errorspan">
                                                        {errors.pass_code.message}
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={2} lg={2}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Generate
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftButton
                                                    onClick={generateCode}
                                                    type="button"
                                                    variant="gradient"
                                                    color="dark"
                                                    fullWidth
                                                >
                                                    Clcik
                                                </SoftButton>
                                            </SoftBox>
                                        </Grid>


                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Box
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent="center"
                                                pt={4.7}
                                            >
                                                <SoftBox>
                                                    <SoftButton
                                                        type="submit"
                                                        variant="gradient"
                                                        color="dark"
                                                        fullWidth
                                                    >
                                                        Add  pass code
                                                    </SoftButton>

                                                </SoftBox>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Card>
                        </SoftBox>
                    </SoftBox>


                    <Footer />
                </DashboardLayout>
            }</>);
}

export default CreatePassCode;

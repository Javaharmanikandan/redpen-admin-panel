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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
// Data
import Grid from "@mui/material/Grid";
import SoftInput from "components/SoftInput";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AuthApi from "api/auth";


function CreateBlogDesImage() {
    const [load, setLoad] = useState(false);


    const {
        register: registerSub,
        handleSubmit: handleSubmitSub,
        reset: resetSub,
        formState: { errors },
    } = useForm();



    //After Submit Sub Category

    const onSubmitSub = async (data) => {
        setLoad(true);
        let formData = new FormData(); //formdata object
        formData.append("image", data.image[0]);

        const dataPost = await AuthApi.PostmethodWithFile(
            "/create-blog-description-image",
            formData
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
                                    <SoftTypography variant="h6">Create Blog Description Image </SoftTypography>
                                </SoftBox>
                                <form
                                    key={2}
                                    style={{ padding: "20px" }}
                                    onSubmit={handleSubmitSub(onSubmitSub)}
                                >
                                    <Grid container spacing={2}>


            

                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Image
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...registerSub("image", { required: true })}
                                                    type="file"
                                                    name="image"
                                                    placeholder="Image"
                                                />
                                                {errors.image && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
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
                                                        Add Image
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

export default CreateBlogDesImage;

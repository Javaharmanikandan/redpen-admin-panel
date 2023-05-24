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
import { useParams } from "react-router-dom";


function UpdateVideo() {
    const { id } = useParams();
    const [categoryData, setcategoryData] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getcategoryData();
        getDetails();
    }, []);

    const getDetails = async () => {
        const dataGet = await AuthApi.GetMethod(
            "/get-video/" + id,
        );
        console.log(dataGet.data.data);
        setValue("youtube_url", dataGet.data.data.youtube_url);
        setValue("category_id", dataGet.data.data.category_id);
        setValue("post_by", dataGet.data.data.post_by);
        setValue("video_type", dataGet.data.data.video_type);
  };

    const getcategoryData = async () => {

        const dataGet = await AuthApi.GetMethod(
            "/get-video-category",
        );

        setcategoryData(dataGet.data.data);
    };

    //To Insert All Data

    const onSubmit = async (data) => {

        const payLoad = {
            youtube_url: data.youtube_url,
            category_id: data.category_id,
            post_by: data.post_by,
            video_type: data.video_type,
        };

        const dataPost = await AuthApi.Postmethod("/update-video/"+id, payLoad);
        if (dataPost.data.status) {
            toast.success(dataPost.data.message);
        } else {
            toast.error(dataPost.data.message);
        }
    };

    return (
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
                            <SoftTypography variant="h6">
                                Update Video
                            </SoftTypography>
                        </SoftBox>
                        <form
                            key={3}
                            style={{ padding: "20px" }}
                            onSubmit={handleSubmit(onSubmit)}
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
                                                Video Category <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>

                                        <select
                                            className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                                            name="category_id"
                                            {...register("category_id", { required: true })}
                                        >
                                            <option value="" selected>
                                                Select Category
                                            </option>
                                            {categoryData &&
                                                categoryData.map((result, index) => {
                                                    return (
                                                        <option value={result.id}>
                                                            {result.category_name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        {errors.category_id && (
                                            <span className="Errorspan">
                                                * Please fill this field!
                                            </span>
                                        )}
                                    </SoftBox>
                                </Grid>

                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography
                                                component="label"
                                                variant="caption"
                                                fontWeight="bold"
                                            >
                                                Post BY <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            {...register("post_by", { required: true })}
                                            type="text"
                                            name="post_by"
                                            placeholder="Post BY "
                                        />
                                        {errors.post_by && (
                                            <span className="Errorspan">
                                                * Please fill this field!
                                            </span>
                                        )}
                                    </SoftBox>
                                </Grid>

                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography
                                                component="label"
                                                variant="caption"
                                                fontWeight="bold"
                                            >
                                                Video Type <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>

                                        <select
                                            className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                                            name="video_type"
                                            {...register("video_type", { required: true })}
                                        >
                                            <option value="" selected>
                                                Select Category
                                            </option>
                                            <option value="recent">
                                                Recent Video
                                            </option>
                                            <option value="feature">
                                                Feature Video
                                            </option>
                                        </select>
                                        {errors.video_type && (
                                            <span className="Errorspan">
                                                * Please fill this field!
                                            </span>
                                        )}
                                    </SoftBox>
                                </Grid>

                            

                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography
                                                component="label"
                                                variant="caption"
                                                fontWeight="bold"
                                            >
                                                Youtube URL <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            {...register("youtube_url", { required: true })}
                                            type="text"
                                            name="youtube_url"
                                            placeholder="Youtube URL "
                                        />
                                        {errors.youtube_url && (
                                            <span className="Errorspan">
                                                * Please fill this field!
                                            </span>
                                        )}
                                    </SoftBox>
                                </Grid>

                           

                            
                            </Grid>

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
                                        Update Video
                                    </SoftButton>
                                </SoftBox>
                            </Box>
                        </form>
                    </Card>
                </SoftBox>
            </SoftBox>

            <Footer />
        </DashboardLayout>
    );
}

export default UpdateVideo;

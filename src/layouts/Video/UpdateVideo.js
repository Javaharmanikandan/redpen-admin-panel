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
    const [load, setLoad] = useState(false);
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
        setLoad(true);
        const dataGet = await AuthApi.GetMethod(
            "/get-video/" + id,
        );
        setValue("youtube_url", dataGet.data.data.youtube_url);
        setValue("title", dataGet.data.data.title);
        setValue("duration", dataGet.data.data.duration);
        setValue("post_by", dataGet.data.data.post_by);
        setValue("video_type", dataGet.data.data.video_type);
        setTimeout(() => {
            setValue("category_id", dataGet.data.data.category_id);

        }, 1000);
        setLoad(false);
  };

    const getcategoryData = async () => {
        setLoad(true);
        const dataGet = await AuthApi.GetMethod(
            "/get-video-category",
        );

        setcategoryData(dataGet.data.data);
        setLoad(false);
    };

    //To Insert All Data

    const onSubmit = async (data) => {
        setLoad(true);

        let formData = new FormData(); //formdata object
        formData.append("thumbnail_image", data.thumbnail_image[0]);
        formData.append("youtube_url", data.youtube_url);
        formData.append("category_id", data.category_id);
        formData.append("title", data.title);
        formData.append("post_by", data.post_by);
        formData.append("video_type", data.video_type);


        const dataPost = await AuthApi.PostmethodWithFile("/update-video/" + id, formData);
        if (dataPost.data.status) {
            toast.success(dataPost.data.message);
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
                                                    <option value="" >
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
                                                        Post Type <span className="Errorspan">*</span>
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
                                                        Select Type
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
                                                        Youtube Title <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("title", { required: true })}
                                                    type="text"
                                                    name="title"
                                                    placeholder="Youtube Title"
                                                />
                                                {errors.title && (
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

                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Duration <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("duration", { required: true })}
                                                    type="text"
                                                    name="duration"
                                                    placeholder="Video Duration"
                                                />
                                                {errors.duration && (
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
                                                        Thumbnail Image <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("thumbnail_image")}
                                                    type="file"
                                                    name="thumbnail_image"
                                                    placeholder="Thumbnail Image"
                                                />
                                          
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
            }</>);
}

export default UpdateVideo;

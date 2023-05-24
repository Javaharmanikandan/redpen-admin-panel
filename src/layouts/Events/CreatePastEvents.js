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

function CreatePastEvents() {

  const [load, setLoad] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getsubCategoryData();
  }, []);

  const getsubCategoryData = async () => {
    const payload = {
      main_category: 2,
    };

    const dataGet = await AuthApi.Postmethod(
      "/get-events-sub-category",
      payload
    );

    setSubCategoryData(dataGet.data.data);
  };

  //To Insert All Data

  const onSubmit = async (data) => {

    setLoad(true);
    const payLoad = {
      event_category: data.event_category,
      event_date: data.event_date,
      event_youtube_url: data.event_youtube_url,
    };

    const dataPost = await AuthApi.Postmethod("/create-past-events", payLoad);
    if (dataPost.data.status) {
      toast.success(dataPost.data.message);
    } else {
      toast.error(dataPost.data.message);
    }
    reset();
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
                Create New Past Event
              </SoftTypography>
            </SoftBox>
            <form
              key={3}
              style={{ padding: "20px" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Event Category <span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>

                    <select
                      className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                      name="event_category"
                      {...register("event_category", { required: true })}
                    >
                      <option value="" selected>
                        Select Event Category
                      </option>
                      {subCategoryData &&
                        subCategoryData.map((result, index) => {
                          return (
                            <option value={result.id}>
                              {result.sub_category_name}
                            </option>
                          );
                        })}
                    </select>
                    {errors.event_category && (
                      <span className="Errorspan">
                        * Please fill this field!
                      </span>
                    )}
                  </SoftBox>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Event Date <span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("event_date", { required: true })}
                      type="date"
                      name="event_date"
                      placeholder="Event Date"
                    />
                    {errors.event_date && (
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
                        Event link <span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("event_youtube_url", { required: true })}
                      type="text"
                      name="event_youtube_url"
                      placeholder="Event Youtube Link"
                    />
                    {errors.event_youtube_url && (
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
                    Add Past Event
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

export default CreatePastEvents;

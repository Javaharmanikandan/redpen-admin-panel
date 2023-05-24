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
import Select from "react-select";

function backupEvent() {
  const [selectedOptions, setSelectedOptions] = useState();
  const [rawData, setRawdata] = useState([]);

  const [mainCategoryData,setMainCategoryData] =useState([]);
  const [subCategoryData,setSubCategoryData] =useState([]);


  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerMain,
    handleSubmit: handleSubmitMain,
    reset: resetMain,
    formState: { errors: errorsMain },
  } = useForm();

  const {
    register: registerSub,
    handleSubmit: handleSubmitSub,
    reset: resetSub,
    formState: { errors: errorsSub },
  } = useForm();

  useEffect(() => {
    
    getMainCategoryData();

  }, []);

  //To Fetch Data Main Category 

  const getMainCategoryData = async () => {

    const dataGet = await AuthApi.GetMethod("/get-events-main-category");
   
    setMainCategoryData(dataGet.data.data);

  }

  const getsubCategoryData = async (id) => {

   const payload={
    main_category:id
    }

    const dataGet = await AuthApi.Postmethod("/get-events-sub-category",payload);
   
    setSubCategoryData(dataGet.data.data);

    console.log(dataGet.data.data)

  }

  //To Fetch Data Main Category 
  //After Sumbit Area

  const onSubmitMain = async (data) => {
    const payLoad = {
      main_category_name: data.MainCategory,
    };

    const dataPost = await AuthApi.Postmethod(
      "/create-events-main-category",
      payLoad
    );

    if (dataPost.data.status) {

      toast.success(dataPost.data.message);

      getMainCategoryData()
    } else {
      toast.error(dataPost.data.message);
    }
    resetMain();
  };


  //After Submit Sub Category

  const onSubmitSub = async (data) => {

    const payLoad = {
      main_category: data.MainCategory,
      sub_category_name: data.SubCategory,
    };

    const dataPost = await AuthApi.Postmethod(
      "/create-events-sub-category",
      payLoad
    );

    if (dataPost.data.status) {
      toast.success(dataPost.data.message);
    } else {
      toast.error(dataPost.data.message);
    }
    resetSub();
  };

  //To Insert All Data

  const onSubmit = async (data) => {



    console.log(data,"Selected");

    const payLoad = {
      main_category: data.mainCate,
      sub_category: data.sub,
      youtube_url: data.url,
      event_title:data.title,
      //event_image:data.image,
      event_description:data.description,
      event_date:data.date,

    };

    const dataPost = await AuthApi.Postmethod("/create-events", payLoad);
    console.log(dataPost.data);
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
              <SoftTypography variant="h6">Create Main Category</SoftTypography>
              <Link to={"/events"}>
                {" "}
                <SoftButton
                  onclickvariant="outlined"
                  color="primary"
                  size="small"
                >
                  Manage Events
                </SoftButton>
              </Link>
            </SoftBox>
            <form
              key={1}
              style={{ padding: "20px" }}
              onSubmit={handleSubmitMain(onSubmitMain)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Main Category *
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...registerMain("MainCategory", { required: true })}
                      type="text"
                      name="MainCategory"
                      placeholder="Main Category Name"
                    />
                    {errorsMain.MainCategory && (
                      <span className="Errorspan">
                        * Please fill this field!
                      </span>
                    )}
                  </SoftBox>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
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
                        Add Main Category
                      </SoftButton>
                      
                    </SoftBox>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Card>
        </SoftBox>
      </SoftBox>

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftTypography variant="h6">Create Sub Category</SoftTypography>
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
                        Main Category Category *
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                      name="gender"
                      {...registerSub("MainCategory", { required: true })}
                    >
                      <option value="" selected disabled hidden>
                        Select Main Category
                      </option>

                      {mainCategoryData && mainCategoryData.map((result,index) => {
            return ( 
                      <option value={result.id}>{result.main_category_name}</option>
                    
            )})}
                    </select>

                    {errors.MainCategory && (
                      <span className="Errorspan">
                        * Please fill this field!
                      </span>)}
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
                        Sub Category Category *
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...registerSub("SubCategory", { required: true })}
                      type="text"
                      name="SubCategory"
                      placeholder="Sub Category Name"
                    />
                    {errors.SubCategory && (
                      <span className="Errorspan">
                        * Please fill this field!
                      </span>
                    )}
                  </SoftBox>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
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
                        Add Sub Category
                      </SoftButton>
                     
                    </SoftBox>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Card>
        </SoftBox>
      </SoftBox>

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftTypography variant="h6">Create New Event</SoftTypography>
            </SoftBox>
            <form
              key={3}
              style={{ padding: "20px" }}
              onSubmit={handleSubmit(onSubmit)}
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
                        Main Category * 
                      </SoftTypography>
                    </SoftBox>

                    <select
                      className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                      name="mainCate"
                      {...register("mainCate", { required: true })}
                      onChange={(event)=>{getsubCategoryData(event.target.value)}}
                     
                    >
                      <option value="" selected disabled hidden>
                        Select Main Category
                      </option>

                      {mainCategoryData && mainCategoryData.map((result,index) => {
            return ( 
                      <option value={result.id}>{result.main_category_name}</option>
                    
            )})}
                    </select>

                    {errors.mainCate && (
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
                        Sub Category *
                      </SoftTypography>
                    </SoftBox>

                    <select
                      className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                      name="gender"
                      {...register("sub", { required: true })}
                    >
                      <option value="" selected>
                        Select Sub Category
                      </option>
                      {subCategoryData && subCategoryData.map((result,index) => {
            return ( 
                      <option value={result.id}>{result.sub_category_name}</option>
                    
            )})}
                    </select>

                    {/* <SoftInput
                        {...register("gender", { required: true })}
                        type="text"
                        name="gender"
                        placeholder="Gender"
                      /> */}
                    {errors.sub && (
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
                        Event Title *
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("title", { required: true })}
                      type="text"
                      name="title"
                      placeholder="Event Title "
                    />
                    {errors.title && (
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
                        Event Date *
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("date", { required: true })}
                      type="date"
                      name="date"
                      placeholder="Event Youtube Link"
                    />
                    {errors.date && (
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
                        Event link (If Past Events)
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("url")}
                      type="text"
                      name="url"
                      placeholder="Event Youtube Link"
                    />
                  
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
                        Event Image (If Upcoming Events) 
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("image")}
                      type="file"
                      name="image"
                      placeholder="Event Youtube Link"
                    />
                  
                  </SoftBox>
                </Grid>





                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Event Description *
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("description", { required: true })}
                      type="textarea"
                      name="description"
                      placeholder="Event description Details"
                    />
                    {errors.description && (
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
                    Add New Event
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

export default backupEvent;

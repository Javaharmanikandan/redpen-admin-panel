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
import { useParams } from "react-router-dom";
import { IMG_URL } from "config/constant";

function EditTherapist() {
    const { id } = useParams();
    console.log(id)
  const [selectedOptions, setSelectedOptions] = useState();
  const [rawData,setRawdata] =useState([]);
  const [rawSp,setRawsp] =useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //to submit to data base
  const onSubmit = (data) => {

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.emailAddress);
    formData.append("gender", data.gender);
    formData.append("experience", data.experience);
    formData.append("password", data.password);
    formData.append("specialistArray", JSON.stringify(selectedOptions));


   //  To call Api
    AuthApi.CreateTherapist(formData)
      .then((response) => {
        reset();
        toast.success("Therapist Created!");
      })
      .catch((error) => {
        if (error.response) {
          toast.error("There has been an error.");
        }
        toast.error("There has been an error.");
      });
  };
 // React state to manage selected options

 // Array of all options
//  const optionList = [
//    { value: "red", label: "Red" },
//    { value: "green", label: "Green" },
//    { value: "yellow", label: "Yellow" },
//    { value: "blue", label: "Blue" },
//    { value: "white", label: "White" }
//  ];

 // Function triggered on selection
 function handleSelect(data) {
   setSelectedOptions(data);
 }


 useEffect(()=>{
  getDataSpecialist()
 },[]);

 const getDataSpecialist= async () => 
 {
   let payload ={
        therapistId:id
    }
     const response = await AuthApi.TherapistDetails(payload);
      console.log(response)
      setRawdata(response.data.data)

      const resback = await AuthApi.SpecialistData();
      const data = await resback.data.data.map(({id, specialist_title})=>{ 
        return{id:id,value:id,label:specialist_title}   
      });
      setRawsp(data)   

      const dataOld = await AuthApi.SpecialTherapist(payload);
      const dataRollback = await dataOld.data.data.map((item)=>{ 
     
        return{id:item.Specialist.id,value:item.Specialist.id,label:item.Specialist.specialist_title}   
      });
    //   Specialist
    //   console.log(dataOld.data.data)
       setSelectedOptions(dataRollback)
      
 }


  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
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
                Edit Therapist Details
              </SoftTypography>
              {/* <Link to={"/therapists"}>
                {" "}
                <SoftButton
                  onclickvariant="outlined"
                  color="primary"
                  size="small"
                >
                  Manage Therapist
                </SoftButton>
              </Link> */}
            </SoftBox>
            <form style={{ padding: "20px" }} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                    
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Specialist In
                        </SoftTypography>
                      </SoftBox>
                      
                      <Select
                      {...register("speciallist")}
          className="dataTables_info"
          options={rawSp}
          placeholder="Select Specialist"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
       
                    </SoftBox>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    
                    <SoftBox mb={2}>
                    {rawData.profile ? <center><img src={IMG_URL+rawData.profile}  style={{width:"50px"}}/></center>:"Not Updated"}

                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          New Profile Image
                        </SoftTypography>
                      </SoftBox>


                      <SoftInput
                        {...register("image", { required: true })}
                        type="file"
                        name="image"
                        placeholder="First Name"
                      />
                      {errors.image && (
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
                        First Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("firstName", { required: true })}
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={rawData.first_name}
                    />
                    {errors.firstName && (
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
                        Last Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("lastName", { required: true })}
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={rawData.last_name}
                    />
                    {errors.lastName && (
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
                        Email Address
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("emailAddress", { required: true })}
                      type="email"
                      name="emailAddress"
                      placeholder="Email Address"
                      value={rawData.email}
                    />
                    {errors.emailAddress && (
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
                        Gender
                      </SoftTypography>
                    </SoftBox>

                    <select className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root" name="gender" 
  {...register("gender", { required: true })} >

      <option value={rawData.gender} selected>{rawData.gender}</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Others">Others</option>
</select>


                    {/* <SoftInput
                      {...register("gender", { required: true })}
                      type="text"
                      name="gender"
                      placeholder="Gender"
                    /> */}
                    {errors.gender && (
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
                        Year of Experience
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("experience", { required: true })}
                      type="text"
                      name="experience"
                      placeholder="Year of Experience"
                      value={rawData.experience}
                    />
                    {errors.experience && (
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
                          Password
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        {...register("password", { required: true, maxLength: 15,minLength:6 })}
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={rawData.password}
                      />
                      {errors.password  && errors.password.type === "required" && (
                        <span className="Errorspan">
                          * Please fill this field!
                        </span>
                      )}

                     {errors.password && errors.password.type === "minLength" && (
                        <span className="Errorspan">
                          * Min length atleast 6 charecters!
                        </span>
                      ) }

                    </SoftBox>
                  </Grid>





              </Grid>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent="center"
                pt={3}
              >
                <SoftBox>
                  <SoftButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    fullWidth
                  >
                    Create
                  </SoftButton>
                  <ToastContainer />
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

export default EditTherapist;

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
import { TbGitPullRequestClosed } from "react-icons/tb";
import Select from 'react-select';

function CreateProducts() {
  const [MainCategoryData, setMainCategoryData] = useState([]);
  const [productName, setProductName] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [inputList, setInputList] = useState([
    { also_content: "" },
  ]);

  const [inputListFaq, setInputListFaq] = useState([{ question: "" ,answer:"" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);


    console.log(inputList,"e")
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { also_content: "" }]);
  };






  // handle input change
  const handleInputChangeFaq = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListFaq];
    list[index][name] = value;
    setInputListFaq(list);


  };

  // handle click event of the Remove button
  const handleRemoveClickFaq = (index) => {
    const list = [...inputListFaq];
    list.splice(index, 1);
    setInputListFaq(list);
  };

  // handle click event of the Add button
  const handleAddClickFaq = () => {
    setInputListFaq([...inputListFaq, { question: "" ,answer:""}]);
  };


  function handleInputChangeRelated(data) {
    setRelatedProducts(data);
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getmainCategoryData();
    getProductName();
  }, []);

  const getmainCategoryData = async () => {
    // const payload = {
    //   main_category_id: 1,
    // };
    setLoad(true);
    const dataGet = await AuthApi.GetMethod(
      "/get-shop-category"
    );

    setMainCategoryData(dataGet.data.data);
    setLoad(false);
  };

  const getProductName = async () => {

    setLoad(true);
    const dataGet = await AuthApi.GetMethod(
      "/get-products-name"
    );
    setProductName(dataGet.data.data);
    setLoad(false);
  };


  //To Insert All Data

  const onSubmit = async (data) => {
    setLoad(true);
    let formData = new FormData(); //formdata object
    formData.append("product_image", data.product_image[0]);
    formData.append("product_category", data.product_category);
    formData.append("product_name", data.product_title);
    formData.append("payment_link_inr", data.payment_link_inr);
    formData.append("payment_link_usd", data.payment_link_usd);
    formData.append("product_price_inr", data.product_price_inr);
    formData.append("product_price_usd", data.product_price_usd);
    formData.append("product_short_description", data.product_short_description);
    formData.append("product_description", data.product_description);
    formData.append("product_url", data.product_url);
    formData.append("related_products", JSON.stringify(relatedProducts));
    formData.append("also_receive", JSON.stringify(inputList));
    formData.append("faq", JSON.stringify(inputListFaq));

    console.log(inputListFaq)
    const dataPost = await AuthApi.PostmethodWithFile(
      "/create-products",
      formData
    );
    if (dataPost.data.status) {
      toast.success(dataPost.data.message);
      reset();
    } else {
      toast.error(dataPost.data.message);
    }
   
    setInputList([{ also_content: "" }]);
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
                Create New Product
              </SoftTypography>
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
                        Product  Category <span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>

                    <select
                      className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                      name="product_category"
                     
                      {...register("product_category", {  onChange: (e) => {onChangeHandler(e)},required: true })}
                    >
                      <option value="" selected>
                        Select Product  Category
                      </option>
                      {MainCategoryData &&
                        MainCategoryData.map((result, index) => {
                          return (
                            <option value={result.id}>
                              {result.category_name}
                            </option>
                          );
                        })}
                    </select>
                    {errors.main_category_name && (
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
                        Product Title <span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("product_title", { required: true })}
                      type="text"
                      name="product_title"
                      placeholder="Product Title or Name "
                    />
                    {errors.product_title && (
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
                        Product Image <span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("product_image", { required: true })}
                      type="file"
                      name="product_image"
                      placeholder="ProductImage"
                    />
                    {errors.product_image && (
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
                        Product URL<span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...register("product_url", { required: true })}
                      type="text"
                      name="product_url"
                      placeholder="Product URL"
                    />
                    {errors.event_location && (
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
                             Payment link (INR)<span className="Errorspan">*</span>
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          {...register("payment_link_inr", { required: true })}
                          type="text"
                          name="payment_link_inr"
                          placeholder="Payment link (INR)"
                        />
                        {errors.payment_link_inr && (
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
                            Payment link (USD)<span className="Errorspan">*</span>
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          {...register("payment_link_usd", { required: true })}
                          type="text"
                          name="payment_link_usd"
                          placeholder="Payment link (USD)"
                        />
                        {errors.payment_link_usd && (
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
                            Product Price (INR)<span className="Errorspan">*</span>
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          {...register("product_price_inr", { required: true })}
                          type="text"
                          name="product_price_inr"
                          placeholder="Product Price (INR)"
                        />
                        {errors.product_price_inr && (
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
                            Product Price (USD)<span className="Errorspan">*</span>
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          {...register("product_price_usd", { required: true })}
                          type="text"
                          name="product_price_usd"
                          placeholder="Product Price (USD)"
                        />
                        {errors.product_price_usd && (
                          <span className="Errorspan">
                            * Please fill this field!
                          </span>
                        )}
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                          >
                            Product Short Description <span className="Errorspan">*</span>
                          </SoftTypography>
                        </SoftBox>

                        <textarea
                          placeholder="Short description."
                          style={{
                            width: "100%",
                            height: 120,
                            border: "0.0625rem solid #d2d6da",
                            padding: "12px 20px",
                            fontSize: "16px",
                            borderRadius: 10,
                          }}
                          maxLength={200}
                          name="product_short_description"
                          {...register("product_short_description", { required: true })}
                        ></textarea>
                        {errors.product_short_description && (
                          <span className="Errorspan">
                            * Please fill this field!
                          </span>
                        )}
                      </SoftBox>
                    </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Product Description <span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>

                    <textarea
                      placeholder="About the Product.."
                      style={{
                        width: "100%",
                        height: 120,
                        border: "0.0625rem solid #d2d6da",
                        padding: "12px 20px",
                        fontSize: "16px",
                        borderRadius: 10,
                      }}
                      name="product_description"
                      {...register("product_description", { required: true })}
                    ></textarea>
                    {errors.product_description && (
                      <span className="Errorspan">
                        * Please fill this field!
                      </span>
                    )}
                  </SoftBox>
                </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                          >
                            Related Products 
                          </SoftTypography>
                        </SoftBox>

                        <Select
                        name="related_products"
                          isMulti
                          onChange={handleInputChangeRelated}
                          options={productName}
                          isSearchable={true}
                        />
                    
                      </SoftBox>
                    </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Also Receive Content{" "}
                      </SoftTypography>
                    </SoftBox>

                    {inputList.map((x, i) => {
                      return (
                        <div style={{ display: "flex", padding: 10 }}>
                          <SoftInput
                            type="text"
                            name="also_content"
                            placeholder="Content"
                            value={x.also_content}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          
                          <div style={{ display: "flex" }}>
                            {inputList.length !== 1 && (
                              <button
                                style={{
                                  marginLeft: 10,
                                  width: 40,
                                  background: "#da353b",
                                  color: "white",
                                  padding: 5,
                                  border: "none",
                                  borderRadius: 5,
                                }}
                                onClick={() => handleRemoveClick(i)}
                              >
                                -
                              </button>
                            )}
                            {inputList.length - 1 === i && (
                              <button
                                style={{
                                  marginLeft: 10,
                                  width: 40,
                                  background: "green",
                                  color: "white",
                                  padding: 5,
                                  border: "none",
                                  borderRadius: 5,
                                }}
                                onClick={handleAddClick}
                              >
                                +
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </SoftBox>
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Product Faq Section{" "}
                        <span className="Errorspan">*</span>
                      </SoftTypography>
                    </SoftBox>

                {inputListFaq.map((x, i) => {
                      return (
                        <div style={{ display: "flex", padding: 10 }}>
                          <SoftInput
                            type="text"
                            name="question"
                            placeholder="Faq Question"
                            value={x.question}
                            onChange={(e) => handleInputChangeFaq(e, i)}
                          />
                          <SoftInput
                            style={{ marginLeft: 10 }}
                            name="answer"
                            placeholder="Faq Answer "
                            value={x.answer}
                            onChange={(e) => handleInputChangeFaq(e, i)}
                          />
                          <div style={{ display: "flex" }}>
                            {inputListFaq.length !== 1 && (
                              <button
                                style={{
                                  marginLeft: 10,
                                  width: 40,
                                  background: "#da353b",
                                  color: "white",
                                  padding: 5,
                                  border: "none",
                                  borderRadius: 5,
                                }}
                                onClick={() => handleRemoveClickFaq(i)}
                              >
                                -
                              </button>
                            )}
                            {inputListFaq.length - 1 === i && (
                              <button
                                style={{
                                  marginLeft: 10,
                                  width: 40,
                                  background: "green",
                                  color: "white",
                                  padding: 5,
                                  border: "none",
                                  borderRadius: 5,
                                }}
                                onClick={handleAddClickFaq}
                              >
                                +
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                    Add New Product
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

export default CreateProducts;

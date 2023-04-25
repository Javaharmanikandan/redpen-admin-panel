
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import SoftButton from "components/SoftButton";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from 'react-router-dom'
import { IMG_URL } from "config/constant";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import AuthApi from "api/auth";
import SoftAvatar from "components/SoftAvatar";
import { API_SERVER } from "config/constant";
import axios from "axios";
import { TbEdit,TbTrash } from "react-icons/tb";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "specialist_image",
    headerName: "Specialist Image",
    width: 300,
    editable: true,
    renderCell: (params)=>{
        return (
          <SoftBox>
            <SoftAvatar
              src={IMG_URL+params.row.specialist_image} alt={params.row.specialist_title} size="sm" variant="rounded"  />
          </SoftBox>
        )}
  },
  {
    field: "specialist_title",
    headerName: "Specialist Title ",
    width: 300,
    editable: true,
  },
  {
    headerName: "Delete",
    width: 150,
    editable: true,
    renderCell: (params)=>{
        return (
            <SoftTypography sx={{fontSize:"12px",color:"red"}}>
              Delete
          </SoftTypography>
        )}},
];



function Events() {
  //   const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [eventData,setEventData]=useState([]);
  const [UpcomingEventData,setUpcomingEventData]=useState([]);
  const[load,setLoad]=useState(false)
  useEffect(()=>{

  dataGet();
  Triger();

  },[])
  const dataGet= async () => 
  {
   const response = await AuthApi.GetMethod('/get-past-events');
   setEventData(response.data.data)
   const responseUp = await AuthApi.GetMethod('/get-upcoming-events');
   setUpcomingEventData(responseUp.data.data)
  
  }

  const Triger=()=>{
    $(document).ready(function () {
      setTimeout(function(){
      $('#example').DataTable();
      $('#example1').DataTable();
       } ,1000);
  });

  
  }


//   const deleteDynamic = async(id)=>{
//     if (confirm("are you sure to delete?") == true) {
//     const payload={
//       id:id,
//       tableName:"therapist_details"
//     }
//      await AuthApi.deleteDynamic(payload)
//       .then((response) => {
//         toast.success("Data Removed!")
//         dataGet()
       
//       })
//       .catch((error) => {
//         if (error.response) {
//           return setError(error.response.data.msg);
//         }
//         return setError("There has been an error.");
//       });
//   }
// }
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
              <SoftTypography variant="h6">Past Events List</SoftTypography>
             
            </SoftBox>
            <SoftBox sx={{padding:5,alignItems:"center"}}>
             <div className="table-responsive">
              <table id="example" className="table table-striped table-bordered " style={{width:"100%",fontSize: "14px",alignItems:"center"}}>
        <thead>
            <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Event Date </th>
                <th className="text-center">Event Category</th>
                <th className="text-center">Event Title </th>
                <th className="text-center">Event Url </th> 
                {/* <th className="text-center">Event Url </th> */}
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
               
            </tr>
        </thead>
        <tbody>
          
									{eventData.map((result,index) => {
            return ( <tr key={index}>
                <td>{index+1}</td>
                <td>{result.event_date}</td>
                <td>{result.event_categories ? result.event_categories.sub_category_name:null}</td>
                <td>{result.event_title}</td>
                <td><a href={result.event_youtube_url} target="_blank"><img src={result.event_thumbnail_image} width={75} height={75} /></a></td>
               
                {/* <td>{result.youtube_url}</td> */}
                <td>     <Link to={'/edit-therapist/'+result.id}> 
                <TbEdit size={20} color={"blue"}/>
              </Link></td>
                <td><TbTrash size={20} color={"red"} onClick={()=>{deleteDynamic(result.id)}}/></td>
            </tr>)})}
            
        </tbody>
    </table>
    <ToastContainer />
    </div>
    </SoftBox>
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
              <SoftTypography variant="h6">Upcoming Events List</SoftTypography>
             
            </SoftBox>
            <SoftBox sx={{padding:5,alignItems:"center"}}>
             <div className="table-responsive">
              <table id="example1" className="table table-striped table-bordered" style={{width:"100%",fontSize: "14px",alignItems:"center"}}>
        <thead>
            <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Event Date </th>
                <th className="text-center">Event Time </th>
                <th className="text-center">Event Category</th>
                <th className="text-center">Event Title </th>     
                <th className="text-center">Event Image </th> 
                <th className="text-center">Event Location </th>            
                {/* <th className="text-center">Event Url </th> */}
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
               
            </tr>
        </thead>
        <tbody>
          
									{UpcomingEventData.map((result,index) => {
            return ( <tr key={index}>
                <td>{index+1}</td>
                <td>{result.event_date}</td>
                <td>{result.event_time}</td>
                <td>{result.event_categories ? result.event_categories.sub_category_name:null}</td>
                <td>{result.event_title}</td>
                <td><img src={IMG_URL+result.event_thumbnail_image} width={75} height={75} /></td>
                <td>{result.event_location}</td>
                {/* <td>{result.youtube_url}</td> */}
                <td>     <Link to={'/edit-therapist/'+result.id}> 
                <TbEdit size={20} color={"blue"}/>
              </Link></td>
                <td><TbTrash size={20} color={"red"} onClick={()=>{deleteDynamic(result.id)}}/></td>
            </tr>)})}
            
        </tbody>
    </table>
    <ToastContainer />
    </div>
    </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Events;

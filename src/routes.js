/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts




// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Events from "layouts/Events";
import CreatePastEvents from "layouts/Events/CreatePastEvents";
import CreateUpcomingEvents from "layouts/Events/CreateUpcomingEvents";
import UpdateUpcomigEvents from "layouts/Events/UpdateUpcomigEvents";

import CreateProducts from "layouts/Shops/CreateProducts";
import CreateShopMainCategory from "layouts/Shops/CreateShopMainCategory";
import UpdateShopMainCategory from "layouts/Shops/UpdateShopMainCategory";

import CreateBlogCategory from "layouts/Blog/CreateBlogCategory";
import UpdateBlogCategory from "layouts/Blog/UpdateBlogCategory";
import CreateBlog from "layouts/Blog/CreateBlog";
import ViewBlog from "layouts/Blog/ViewBlog";
import CreateVideoCategory from "layouts/Video/CreateVideoCategory";
import UpdateVideoCategory from "layouts/Video/UpdateVideoCategory";
import CreateVideo from "layouts/Video/CreateVideo";
import UpdateVideo from "layouts/Video/UpdateVideo";



import SignIn from "layouts/authentication/sign-in";
import ViewShopMainCategory from "layouts/Shops/ViewShopMainCategory";
import ViewVideoCategory from "layouts/Video/ViewVideoCategory";
import ViewBlogCategory from "layouts/Blog/ViewBlogCategory";
import ViewVideo from "layouts/Video/ViewVideo";
import UpdateBlog from "layouts/Blog/UpdateBlog";
import UpdateProducts from "layouts/Shops/UpdateProducts";
import ViewProducts from "layouts/Shops/ViewProducts";
import ViewEventCategory from "layouts/Events/ViewEventCategory";
import CreateEventCategory from "layouts/Events/CreateEventCategory";
import UpdateEventCategory from "layouts/Events/UpdateEventCategory";
import UpdatePastEvents from "layouts/Events/UpdatePastEvents";
import ViewPastEvents from "layouts/Events/ViewPastEvents";
import ViewUpcomingEvents from "layouts/Events/ViewUpcomingEvents";
import ViewEventBanner from "layouts/Events/ViewEventBanner";
import CreateEventBanner from "layouts/Events/CreateEventBanner";
import UpdateEventBanner from "layouts/Events/UpdateEventBanner";
import ViewSem from "layouts/Sem/ViewSem";
import CreateSem from "layouts/Sem/CreateSem";
import UpdateSem from "layouts/Sem/UpdateSem";
import CreateBlogDesImage from "layouts/Blog/CreateBlogDesImage";
import ViewBlogDesImage from "layouts/Blog/ViewBlogDesImage";
import ViewPassCode from "layouts/Passcode/ViewPassCode";
import CreatePassCode from "layouts/Passcode/CreatePassCode";
import UpdatePassCodeProducts from "layouts/Passcode/UpdatePassCodeProducts";
import CreatePassCodeProducts from "layouts/Passcode/CreatePassCodeProducts";
import ViewPassCodeProducts from "layouts/Passcode/ViewPassCodeProducts";


const routes = [
  {
    type: "title",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Events />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Event sub category ",
    key: "event-sub-category",
    route: "/event-category",
    icon: <Shop size="18px" />,
    component: <ViewEventCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Event sub category ",
    key: "create event-category",
    route: "/create-event-category",
    icon: <Shop size="18px" />,
    component: <CreateEventCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Update sub category ",
    key: "update-event-category",
    route: "/update-event-category/:id",
    icon: <Shop size="18px" />,
    component: <UpdateEventCategory />,
    noCollapse: true,
    protected: true,
  }, {
    type: "collapse",
    name: "Event banner",
    key: "event-banner",
    route: "/event-banner",
    icon: <Shop size="18px" />,
    component: <ViewEventBanner />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Event banner ",
    key: "create event-banner",
    route: "/create-event-banner",
    icon: <Shop size="18px" />,
    component: <CreateEventBanner />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Event banner",
    key: "update-event-banner",
    route: "/update-event-banner/:id",
    icon: <Shop size="18px" />,
    component: <UpdateEventBanner />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Past events",
    key: "past-events",
    route: "/past-events",
    icon: <Shop size="18px" />,
    component: <ViewPastEvents />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Past events",
    key: "create-past-events",
    route: "/create-past-events",
    icon: <Shop size="18px" />,
    component: <CreatePastEvents />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Past events",
    key: "update-past-events",
    route: "/update-past-events/:id",
    icon: <Shop size="18px" />,
    component: <UpdatePastEvents />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Upcoming events",
    key: "upcoming-events",
    route: "/upcoming-events",
    icon: <Shop size="18px" />,
    component: <ViewUpcomingEvents />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Upcoming events",
    key: "create-upcoming-events",
    route: "/create-upcoming-events",
    icon: <Shop size="18px" />,
    component: <CreateUpcomingEvents />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Upcoming events",
    key: "update-upcoming-events",
    route: "/update-upcoming-events/:id",
    icon: <Shop size="18px" />,
    component: <UpdateUpcomigEvents />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Shop category",
    key: "shop-category",
    route: "/shop-category",
    icon: <Shop size="18px" />,
    component: <ViewShopMainCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Shop category",
    key: "create-shop-category",
    route: "/create-shop-category",
    icon: <Shop size="18px" />,
    component: <CreateShopMainCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Update Shop Category",
    key: "update-shop-category",
    route: "/update-shop-category/:id",
    icon: <Shop size="18px" />,
    component: <UpdateShopMainCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Shop",
    key: "products",
    route: "/products",
    icon: <Shop size="18px" />,
    component: <ViewProducts />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Shop",
    key: "create-products",
    route: "/create-products",
    icon: <Shop size="18px" />,
    component: <CreateProducts />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Shop",
    key: "update-products",
    route: "/update-products/:id",
    icon: <Shop size="18px" />,
    component: <UpdateProducts />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Pass code products",
    key: "pass code products",
    route: "/pass-code-products",
    icon: <Shop size="18px" />,
    component: <ViewPassCodeProducts />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Pass code products",
    key: "create-pass-code-products",
    route: "/create-pass-code-products",
    icon: <Shop size="18px" />,
    component: <CreatePassCodeProducts />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Pass code products",
    key: "update-pass-code-products",
    route: "/update-pass-code-products/:id",
    icon: <Shop size="18px" />,
    component: <UpdatePassCodeProducts />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Video Category",
    key: "video category",
    route: "/video-Category",
    icon: <Shop size="18px" />,
    component: <ViewVideoCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Create Video Category",
    key: "Create video category",
    route: "/create-video-Category",
    icon: <Shop size="18px" />,
    component: <CreateVideoCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Update Video Category",
    key: "Update video category",
    route: "/update-video-Category/:id",
    icon: <Shop size="18px" />,
    component: <UpdateVideoCategory />,
    noCollapse: true,
    protected: true,
  },
    {
    type: "collapse",
    name: "Videos",
    key: "Videos",
    route: "/videos",
    icon: <Shop size="18px" />,
    component: <ViewVideo />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Create Video",
    key: "Create video",
    route: "/create-video",
    icon: <Shop size="18px" />,
    component: <CreateVideo />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Videos",
    key: "update-video",
    route: "/update-video/:id",
    icon: <Shop size="18px" />,
    component: <UpdateVideo />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Blog Category",
    key: "blog-category",
    route: "/blog-category",
    icon: <Shop size="18px" />,
    component: <ViewBlogCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Blog Category",
    key: "create-blog-category",
    route: "/create-blog-category",
    icon: <Shop size="18px" />,
    component: <CreateBlogCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Update Category",
    key: "update-blog-category",
    route: "/update-blog-category/:id",
    icon: <Shop size="18px" />,
    component: <UpdateBlogCategory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Blog Description Image",
    key: "blog-description-image",
    route: "/blog-description-image",
    icon: <Shop size="18px" />,
    component: <ViewBlogDesImage />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Blog Description Image",
    key: "create-blog-description-image",
    route: "/create-blog-description-image",
    icon: <Shop size="18px" />,
    component: <CreateBlogDesImage />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Blogs",
    key: "blogs",
    route: "/blog",
    icon: <Shop size="18px" />,
    component: <ViewBlog />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Create Blogs",
    key: "create-blog",
    route: "/create-blog",
    icon: <Shop size="18px" />,
    component: <CreateBlog />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Update Blogs",
    key: "update-blog",
    route: "/update-blog/:id",
    icon: <Shop size="18px" />,
    component: <UpdateBlog/>,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Sem",
    key: "sem",
    route: "/sem",
    icon: <Shop size="18px" />,
    component: <ViewSem />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Create Sem",
    key: "create-sem",
    route: "/create-sem",
    icon: <Shop size="18px" />,
    component: <CreateSem />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Update Sem",
    key: "update-sem",
    route: "/update-sem/:id",
    icon: <Shop size="18px" />,
    component: <UpdateSem />,
    noCollapse: true,
    protected: true,
  },

  {
    type: "collapse",
    name: "Pass code",
    key: "pass_code",
    route: "/pass_code",
    icon: <Shop size="18px" />,
    component: <ViewPassCode />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    name: "Create Pass Code",
    key: "create-pass-code",
    route: "/create-pass-code",
    icon: <Shop size="18px" />,
    component: <CreatePassCode />,
    noCollapse: true,
    protected: true,
  },
  // {
  //   type: "collapse",
  //   name: "Blogs",
  //   key: "blogs",
  //   route: "/blogs",
  //   icon: <Shop size="18px" />,
  //   component: <Events />,
  //   noCollapse: false,
  //   protected: true,
  //   child: [
  //     {
  //       path: "/create/product",
  //       element: <CreateProducts />,
  //       state: "dashboard.default",
  //       sidebarProps: {
  //         displayText: "Create Shop"
  //       },
  //     },]
  // },
  
  // {
  //   type: "title",
  //   name: "Create Events",
  //   key: "events",
  //   route: "/create-events",
  //   icon: <Shop size="18px" />,
  //   component: <CreateEvents />,
  //   noCollapse: true,
  //   protected: true,
  // },


  
  {
    type: "title",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Shop size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },

  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <Profile />,
  //   noCollapse: true,
  //   protected: true,
  // },
  
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Logout",
  //   key: "sign-out",
  //   route: "/authentication/sign-out",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignOut />,
  //   noCollapse: true,
  // },
];

export default routes;

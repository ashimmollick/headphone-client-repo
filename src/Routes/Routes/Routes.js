import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import CatagoryCard from "../../pages/Home/Catagory/Catagory.js/CatagoryCard";
import Home from "../../pages/Home/Home/Home";

import Login from "../../pages/Home/Login/Login";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/catagories/:id',
                element: <CatagoryCard></CatagoryCard>,
                loader: ({ params }) => fetch(`http://localhost:5000/catagories/${params.id}`)
            }
        ]
    }
])
export default router;

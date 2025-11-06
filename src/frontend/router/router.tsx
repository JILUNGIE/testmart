import { createHashRouter } from "react-router";
import Layout from "../layout/Layout";
import VideoPage from "../pages/VideoPage";
import SmilePage from "../pages/SmilePage";

const Router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path :"/",
                element : <VideoPage/>
            },
            {
                path:"/smile",
                element : <SmilePage/>
            }
        ]
    }
]);

export default Router;
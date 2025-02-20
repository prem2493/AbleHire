import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Jobs from './Components/Job'
import Community from './Components/community';
import Jobpage from './Components/jobpage';
import Courses from './Components/courses';
import Jobpost from './Components/jobpost';
import Settings from './Components/settings';
import Profile from './Components/profile';
import Resume from './Components/resume';
import Chatbot from './Components/chatbot';
import {AnimatePresence} from 'framer-motion';
import Landing from './Components/landing';
import Login from './Components/Login';
import Register from './Components/Register';
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:
      <>
      <Landing/>
      </>
    },
    {
      path:"/login",
      element:
      <>
      <Login/>
      </>
    },
    {
      path:"/signup",
      element:
      <>
      <Register/>
      </>
    },
    {
      path:"/community",
      element:
      <>
      <NavBar/>
      <Community/>
      </>
    },
    {
      path:"/courses",
      element:
      <>
      <NavBar/>
      <Courses/>
      {/* <Profile/> */}
      </>
    },
    {
      path:"/jobpost",
      element:
      <>
      <NavBar/>
      <Jobpost/>
      {/* <Profile/> */}
      </>
    },
    {
      path:"/profile",
      element:
      <>
      <NavBar/>
      <Profile/>
      {/* <Profile/> */}
      </>
    },
    {
      path:"/resume",
      element:
      <>
      <NavBar/>
      <Resume/>
      {/* <Chatbot/> */}
      {/* <Profile/> */}
      </>
    },
    {
      path:"/settings",
      element:
      <>
      <NavBar/>
      <Settings/>
      {/* <Profile/> */}
      </>
    },
    {
      path:"/chatbot",
      element:
      <>
      <NavBar/>
      <Chatbot/>
      {/* <Profile/> */}
      </>
    },
    {
      path:"/main",
      element:
      <>
      <NavBar/>
      <Jobpage/>
      {/* <Profile/> */}
      </>
    },
  ])
  return (
    <>
    <AnimatePresence exitBeforeEnter>
      <RouterProvider router={router}/>
    </AnimatePresence>
    </>
  )
}

export default App

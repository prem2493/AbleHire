import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import NavBar from './Components/NavBar';
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
      path:"/main",
      element:
      <>
      <NavBar/>
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

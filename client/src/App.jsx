import ContentWrapper from "./components/ContentWrapper"

import Login from "./components/Login"

import {Routes,Route} from 'react-router-dom'
import Layout from "./components/Layout"
import Test from "./components/Test"
import SignUp from "./components/SignUp"
import SinglePost from "./components/SinglePost"
import UserContextProvider from "./context/UserContextProvider"
import CreatePost from "./components/CreatePost"
import EditPost from "./components/EditPost"

import { ToastContainer} from 'react-toastify';


function App() {

  return (
    <ContentWrapper>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Test/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/create" element={<CreatePost/>}/>
            <Route path="/post/:id" element={<SinglePost/>}/>
            <Route path="/edit/:id" element={<EditPost/>}/>
          </Route>
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce
        />
      </UserContextProvider> 
      
    </ContentWrapper>
  )
}

export default App;

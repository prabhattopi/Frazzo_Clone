import React, { useEffect, useState } from "react";
import "./Navbar.css";
import navbarLogo from "../../Images/fraazo-logo.svg";
import { MdLocationOn, MdPerson, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosWallet } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import { API_URL } from "../../utils/config";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../Redux/user/action";
import SearchResults from "./SearchResults";
import axios from "axios";
import { PrivateRoute } from "../../App";
axios.defaults.withCredentials=true


const Navbar = () => {
  
  const [openCart, setOpenCart] = useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userData = useSelector((state) => state.user);
  const user = userData.user;

  const dispatch = useDispatch();
  const [queryText,setQueryText]=useState("")
  const [searchResult,setSearchResult]=useState([])

  const handleChange=(e)=>setQueryText(e.target.value)
  
  
  const getData=async(text)=>{
      let res= await axios.get(`${API_URL}/search?name=${text}`)
      setSearchResult(res.data)
  }
  useEffect(()=>{
      if(!queryText){
          setSearchResult([])
          return
         
    
        
      }
      getData(queryText)
      console.log(searchResult)

  },[queryText])

  const handlAllo=()=>{
    setQueryText("")
  }

  return (
    <>
    <div className="navbar_wrapper">
      <div className="navbar_logo">
        <Link to="/" className="linkTag">
          <img src={navbarLogo} alt="" className="navbar_logo_img" />
        </Link>
      </div>
      <div className="navbar_location_wrapper">
        <MdLocationOn />
        Pune
      </div>
      <div className="navbar_search_bar">
        <input
          className="navbar_search_input"
          placeholder="Find fresh vegetables, fruits and dairy..."
         style={{transition:"0.4s ease-in"}}
                 value={queryText}
                 onChange={handleChange}
        />
       
        <FaSearch className="navbar_search-icon" />
      </div>
     {/* <PrivateRoute isLogin={userData.token}> */}
      <div className="navbar_cart" onClick={() => setOpenCart(true)}>
        <HiShoppingCart className="navbar_icon" />
        Cart
        <div className="cart_item_count">{cartItems.length}</div>
      </div>
      {/* </PrivateRoute> */}
      <div className="navbar_credit">
        <IoIosWallet className="navbar_icon" />
        Credit
      </div>
      {userData.token ? (
        <div className="navbar_logoutWrapper">
          <div
            className="navbar_login"
            onClick={() => setOpenLogout(!openLogout)}
          >
            <MdPerson className="navbar_icon" />
            {user.first}
          </div>
          {openLogout && (
            <div className="navbar_logout" onClick={() =>{
              dispatch(logout())

              dispatch(reset())
        
              
              }}>
              <MdLogout
                className="navbar_icon"
              
              />
              <div className="navbar_logout_btn">Logout</div>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar_login" onClick={() => setOpenLogin(true)}>
          <MdPerson className="navbar_icon" />
          Login/Register
        </div>
      )}
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <Login open={openLogin} setOpen={setOpenLogin} />
     
    </div>
    {queryText && (
<div style={{maxHeight:'30vh',padding:"0",overflow:"scroll",marginTop:"20px"}}>
<div style={{paddingTop:"20px"}}>
<div style={{borderTopWidth:'1px',paddingTop:"20px" ,paddingBottom:"20px",height:"300px",overflow:"scroll"}}>
<SearchResults searchResult={searchResult} handlAllo={handlAllo} />
</div>
</div>
</div>
)} 
    </>
  );
};

export default Navbar;

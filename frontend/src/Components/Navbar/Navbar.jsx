import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {

  const [menu,setMenu] = useState("shop")

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src = {logo} alt=''/>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:'none'}} to='/'>חנות</Link>{menu === "shop" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to ='/mens'>גברים</Link>{menu === "mens" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to ='/womens'>נשים</Link>{menu === "womens" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to = '/kids'>ילדים</Link>{menu  === "kids" ? <hr/> :<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to ='/login'><button>התחברות</button></Link>
            <Link to = '/card'><img src={cart_icon} alt="" className='logo-img'/></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

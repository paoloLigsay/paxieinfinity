import { memo, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from "react-router-dom"

const Nav = memo(({auth, setAuth}) => {

  const logout = () => {
    Cookies.remove('paxie-access-token')
    localStorage.removeItem('paxieUserID')
    localStorage.removeItem('paxieUserPercent')
    setAuth(false)
  }

  console.log(auth)

  return (
    <>
      <nav className="paxie-nav">
        { auth ?  '' : <Redirect to="/login"/> }
        <div className="paxie-nav__title">
          <h1> Paolo </h1>
          <h2> Scholar </h2>
        </div>
        <button onClick={logout} className="paxie-button"> Logout </button>
      </nav>
    </>
  )
})

export default Nav
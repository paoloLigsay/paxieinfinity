import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import Cookies from 'js-cookie'

const Login = React.memo(() => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [authBreaker, setAuthBreaker] = useState(false)
  const [auth, setAuth] = useState(false)

  const isAuthorized = () => {
    const user = Cookies.get('paxie-access-token')
    user ? setAuth(true) : setAuth(false)
  }

  const login = async () => {
    try {
      console.log('accessing login')
      const res = await axios.post('http://localhost:3001/login', {
          username: username,
          password: password
        },
        {withCredentials: true}
      )

      const loginSuccess = (data) => {
        console.log(data)
        setAuthBreaker(true)
        localStorage.setItem('paxieUserID', data._id)
        localStorage.setItem('paxieUserPercent', data.percent)
      }

      console.log(res)

      res.data === 'wrong' ? alert('Wrong Password')
        : res.data === 'no user' ? alert('Username not Found')
        : res.data === 'empty' ? alert('Please Fill up all fields')
        : res.data._id !== undefined && res.data._id !== '' ? loginSuccess(res.data)
        : alert('Unexpected Error: ' + res.data.Error)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
     isAuthorized()
  }, [authBreaker])

  return (
    <div className="paxie-form">
      { auth && <Redirect to="/"/> }
      <h1> <span>Paxie</span>Infinity </h1>
      <h3> An Axie Infinity SLP Tracker </h3>
      <input type="text" onChange={e => setUsername(e.target.value)} className="paxie-form__input"/>
      <input type="password"  onChange={e => setPassword(e.target.value)} className="paxie-form__input"/>
      <button onClick={login} className="paxie-form__button"> Login </button>
    </div>
  )
})

export default Login
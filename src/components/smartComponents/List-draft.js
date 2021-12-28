import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from "react-router-dom"
import Cookies from 'js-cookie'

const List = React.memo(() => {

  const [transactions, setTransactions] = useState([])
  const [auth, setAuth] = useState(true)
  const history = useHistory()

  const isAuthorized = () => {
    const user = Cookies.get('paxie-access-token')
    user ? setAuth(true) : setAuth(false)
  }

  const get_transactions = async () => {
    const response = await axios.get('https://hidden-bastion-54706.herokuapp.com/gettransactions/'+null, {
      withCredentials: true
    })

    const serverError = () => {
      console.log('Server Error: You are unauthorized. Please Login.')
      setAuth(false)
      Cookies.remove('paxie-access-token')
    }

    if(response.data.code === '_servererror')
      serverError()

    if(response.data.length !== undefined)
      setTransactions(response.data)
  }

  const logout = async () => {
    await axios.post('https://hidden-bastion-54706.herokuapp.com/logout', {
      withCredentials: true
    })
    Cookies.remove('paxie-access-token')
    localStorage.removeItem('paxieUserID')
    localStorage.removeItem('paxieUserPercent')
    setAuth(false)
  }

  useEffect(() => {
     get_transactions()
     isAuthorized()
  }, [auth])

  return (
    <div className="pml-scholar pml-scholar--column">
      { auth ? '' : <Redirect to="/login"/> }
      <button onClick={logout}> Logout </button>
        {
          transactions.map(t =>
            <li key={t._id} className={t.type === 'Withdrawed' ? 'pml-scholar-item pml-scholar-item--red' : 'pml-scholar-item'}>
              <div className="pml-scholar-item-part"> 
              <span> DATE </span>
              <p> { t.month }/{ t.day }/{ t.year } </p>
              </div>
              <div className="pml-scholar-item-part">
              <span> SLP </span>
              <p> { t.slp } SLP </p>
              </div>
              <div className="pml-scholar-item-part">
              <span> MMR </span>
              <p> { t.mmr } MMR </p>
              </div>
              <div className="pml-scholar-item-part">
              <span> TYPE </span>
              <p> { t.type } </p>
              </div>
            </li>
          )
        }
    </div>
  )
})

export default List
import { memo, useState, useEffect } from 'react'
import Nav from '../dumbComponents/NavUI'
import TransactionList from './TransactionList'
import AddModal from './AddModal'
import { Redirect } from "react-router-dom"
import Cookies from 'js-cookie'
import axios from 'axios'

const Transactions = memo(() => {

  const [auth, setAuth] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [transactions, setTransactions] = useState([])

  const get_initial_data = async() => {
    const response = await axios.get(`https://hidden-bastion-54706.herokuapp.com/gettransactions/${localStorage.getItem('paxieUserID')}`, {
      withCredentials: true
    })

    setTransactions(response.data)
  }

  const isAuthorized = () => {
    const setAuthorized = () => {
      get_initial_data()
      setAuth(true)
    }

    const user = Cookies.get('paxie-access-token')
    user ? setAuthorized() : setAuth(false)
  }

  useEffect(() => {
    isAuthorized()
  }, [auth])

  return (
    <>
      { auth ? '' : <Redirect to="/login"/> }
      <div className="paxie-wrapper">
        <Nav auth={auth} setAuth={setAuth}/>

        <AddModal openModal={openModal} setOpenModal={setOpenModal} getTransactions={get_initial_data}/>

        <div className="paxie-button-wrapper">
          <button className="paxie-button" onClick={() => setOpenModal(true)}> Add </button>
        </div>

        <TransactionList transactions={transactions} getTransactions={get_initial_data}/>
      </div>
    </>
  )
})

export default Transactions
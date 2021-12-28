import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DashboardUI from '../dumbComponents/DashboardUI'
import 'font-awesome/css/font-awesome.min.css';
import Cookies from 'js-cookie'
import { Redirect } from "react-router-dom"
import UserInfoContext from '../contexts/UserInfo'

const Dashboard = () => {

  const [auth, setAuth] = useState(true)

  const initialData = {
    Last3Gains: [],
    Last3Withdrawals: [],
    averagePerDay: 0,
    userTotal: 0,
    highest: {
      slp: 0,
      month: 0,
      day: 0,
      year: 0
    },
    totalWithdrawed: 0,
    available: 0
  }

  const initialDataOverall = {
    highestMMR: {
      name: '',
      mmr: 0
    },
    highestSLP: {
      name: '',
      slp: 0
    }
  }

  /* Specific User Data */
  const [currentUserData, setCurrentUserData] = useState(initialData)

  /* Overall Data */
  const [highestUserData, setHighestUserData] = useState(initialDataOverall)

  const get_initial_data = async () => {
    const response = await axios.get(`http://localhost:3001/gettransactions/${localStorage.getItem('paxieUserID')}`, {
      withCredentials: true
    })

    const gainedTransactions = response.data.filter(t => t.type === 'Gained')
    const withdrawedTransactions = response.data.filter(t => t.type === 'Withdrawed')

    /* Total SLP Information */
    const totalSLP = (gainedTransactions
      .map(t => t.slp)
      .reduce((a,b) => a + b, 0))

    const totalSLPUser = ((gainedTransactions
      .map(t => t.slp)
      .reduce((a,b) => a + b, 0))
      * (localStorage.getItem('paxieUserPercent')/100)
      )

    /* Average SLP Information */
    const averageSLP = Math.round(totalSLP/gainedTransactions.length)

    /* Available SLP Information */
    const totalWithdrawed = withdrawedTransactions
    .map(t => t.slp)
    .reduce((a,b) => a + b, 0)

    const availableSlp = Math.round(totalSLPUser - totalWithdrawed)

    /* Highest Record Information */
    const highestRecord = gainedTransactions
    .reduce((a,b) => a.slp > b.slp ? a : b)

    setCurrentUserData({
      ...currentUserData,
      Last3Gains: gainedTransactions.slice(-3),
      Last3Withdrawals: withdrawedTransactions.slice(-3),
      userTotal: totalSLPUser,
      averagePerDay: averageSLP,
      totalWithdrawed: totalWithdrawed,
      available: availableSlp,
      highest: {
        slp: highestRecord.slp,
        day: highestRecord.day,
        month: highestRecord.month,
        year: highestRecord.year
      }
    })

    /* Highest MMR Overall */
    const response2 = await axios.get(`http://localhost:3001/gettransactions/${null}`, {
      withCredentials: true
    })

    const gainedTransactionsOverall = response2.data.filter(t => t.type === 'Gained')
    const currentDate = new Date().toLocaleDateString()
    const transactionsToday = gainedTransactionsOverall
      .filter(t => `${t.month}/${t.day}/${t.year}` === currentDate)

    if(transactionsToday !== null && transactionsToday.length > 0) {
      let highestMMROverall = {},
        highestSLPOverall = {}

      highestMMROverall = transactionsToday
        .reduce((a,b) => a.mmr > b.mmr ? a : b)

      highestSLPOverall = transactionsToday
        .reduce((a,b) => a.slp > b.slp ? a : b)

      const userInformationHighestSLP = await axios.get(`http://localhost:3001/getUserHighestOverall/${highestSLPOverall.user_id}`, {
        withCredentials: true
      })

      const userInformationHighestMMR = await axios.get(`http://localhost:3001/getUserHighestOverall/${highestMMROverall.user_id}`, {
        withCredentials: true
      })

      const highestMMRInfo = {
        name: userInformationHighestMMR.data.name,
        mmr: highestMMROverall.mmr
      }

      const highestSLPInfo = {
        name: userInformationHighestSLP.data.name,
        slp: highestSLPOverall.slp
      }

      setHighestUserData({
        ...highestUserData,
        highestMMR: {
          name: highestMMRInfo.name,
          mmr: highestMMRInfo.mmr
        },
        highestSLP: {
          name: highestSLPInfo.name,
          slp: highestSLPInfo.slp
        }
      })
    }
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
      <UserInfoContext.Provider value={{ currentUserData: currentUserData, overallData: highestUserData, auth: [auth, setAuth] }}>
        <DashboardUI />
      </UserInfoContext.Provider>
    </>
  )
}

export default Dashboard
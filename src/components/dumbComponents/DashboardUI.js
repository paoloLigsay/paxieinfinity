import { memo, useContext } from 'react'
import UserInfoContext from '../contexts/UserInfo'
import Nav from './NavUI'
import DashboardListUI from './DashboardListUI'

const Login = memo(() => {

  const userInfo = useContext(UserInfoContext),
        uData = userInfo.currentUserData,
        overallData = userInfo.overallData,
        uPercent = localStorage.getItem('paxieUserPercent'),
        auth = userInfo.auth

  return (
    <>
      <div className="paxie-wrapper">
        <Nav auth={auth[0]} setAuth={auth[1]}/>

        <section>
          <ul className="paxie-main-list" id="general-information">
            <li className="paxie-main-item paxie-main-item--30">
              <i className="fa fa-trophy"></i>
              <h3 className="paxie-main-item__title"> My Highest Record </h3>
              <p className="paxie-main-item__text paxie-main-item__text--mini"> { Math.round(uData.userTotal) } SLP, { `${uData.highest.month}/${uData.highest.day}/${uData.highest.year}` } </p>
            </li>

            <li className="paxie-main-item">
              <i className="fa fa-bank"></i>
              <h3 className="paxie-main-item__title"> Withdrawable SLP </h3>
              <p className="paxie-main-item__text"> { uData.available } SLP </p>
            </li>

            <li className="paxie-main-item">
              <i className="fa fa-gamepad"></i>
              <h3 className="paxie-main-item__title"> Average SLP/Day </h3>
              <p className="paxie-main-item__text"> { uData.averagePerDay } SLP </p>
            </li>

            <li className="paxie-main-item">
              <i className="fa fa-money"></i>
              <h3 className="paxie-main-item__title"> Total Withdrawed </h3>
              <p className="paxie-main-item__text"> { uData.totalWithdrawed } SLP </p>
            </li>
          </ul>
        </section>

        <section className="paxie-flex" id="gain-list">
            <div className="paxie-flex__item paxie-flex__item--70">
              <DashboardListUI transactionType={'widthdrawal'} transactions={uData.Last3Withdrawals}/>
            </div>
            <div className="paxie-flex__item">
              <h2 className="paxie-subtitle"> SLP </h2>
              <p className="paxie-subtitle-description"> Total SLP Gained </p>
              <div className="paxie-flex__item-box">
                <h2> { Math.round(uData.userTotal) } </h2>
                <p> { uPercent }% of total gained SLP </p>
              </div>
            </div>
        </section>

        <section id="overall-list">
          <ul className="paxie-main-list">
            <li className="paxie-main-item paxie-main-item--50">
              <i className="fa fa-gamepad"></i>
              <h3 className="paxie-main-item__title"> Highest MMR Gainer today </h3>
              <p className="paxie-main-item__text"> 
                {
                  overallData.highestMMR.name === '' ?
                    'No Scholar inputs for today.'
                    :
                    `${overallData.highestMMR.mmr } MMR by ${overallData.highestMMR.name}`
                }
              </p>
            </li>

            <li className="paxie-main-item paxie-main-item--50">
              <i className="fa fa-gavel"></i>
              <h3 className="paxie-main-item__title"> Highest SLP Gainer today </h3>
              <p className="paxie-main-item__text"> 
                {
                  overallData.highestMMR.name === '' ?
                    'No Scholar inputs for today.'
                    :
                    `${overallData.highestMMR.slp } SLP by ${overallData.highestMMR.name}`
                }
              </p>
            </li>
          </ul>
        </section>

        <DashboardListUI transactionType={'gains'} transactions={uData.Last3Gains}/>
      </div>
    </>
  )
})

export default Login
import { memo } from 'react'
import { Link } from "react-router-dom"

const DashboardListUI = memo(({transactionType, transactions}) => {

  return (
    <div className="paxie-dashboard-transactions-container">
      <h2 className="paxie-subtitle"> { transactionType === 'gains' ? 'Gains' : 'Withdrawals' }  </h2>
      <p className="paxie-subtitle-description"> Last 3 { transactionType === 'gains' ? 'gained' : 'withdrawed' } transactions</p>

      <ul className="paxie-dashboard-transactions">
        { transactions.slice(0).reverse().map((t, i) => 
          <li key={i} className="paxie-dashboard-transactions__item">
            <div className="paxie-dashboard-transactions__item-part">
              <span> Date </span>
              <p> {t.month}/{t.day}/{t.year} </p>
            </div>

            <div className="paxie-dashboard-transactions__item-part">
              <span> SLP </span>
              <p> {t.slp} </p>
            </div>

            <div className="paxie-dashboard-transactions__item-part">
              <span> MMR </span>
              <p> {t.mmr} </p>
            </div>

            {
              transactionType === 'gains' && (
                <div className="paxie-dashboard-transactions__item-part">
                  <span> Quota Reached </span>
                  <p className={ (t.slp < 148) ? 'red' : '' }> { t.slp > 148 ? 'Yes' : 'No' } </p>
                </div>
              )
            }

          </li>
        )}

      </ul>

      {
        transactionType !== 'gains' && (
          <Link to="/transactions">
            <button className="paxie-button"> View all transactions </button>
          </Link>
        )
      }

    </div>
  )
})

export default DashboardListUI
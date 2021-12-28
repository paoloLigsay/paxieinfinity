import { memo, useState, useEffect } from 'react'
import axios from 'axios'

const TransactionList = memo(({transactions, getTransactions}) => {
  const deleteTransaction = async (id) => {
    const res = await axios.delete(`http://localhost:3001/deletetransactions/${id}`)
    alert(res.data)
    getTransactions()
  }

  return (
    <ul className="paxie-dashboard-transactions">
          { transactions.slice(0).reverse().map((t, i) => 
          <li key={i} className="paxie-dashboard-transactions__item paxie-dashboard-transactions__item--flex-start">
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
              t.type === 'Gained' && (
                <div className="paxie-dashboard-transactions__item-part">
                  <span> Quota Reached </span>
                  <p className={ (t.slp < 148) ? 'red' : '' }> { t.slp > 148 ? 'Yes' : 'No' } </p>
                </div>
              )
            }

            <p className="paxie-dashboard-transactions__delete" onClick={() => deleteTransaction(t._id)}> delete </p>

          </li>
        )}
      </ul>
  )
})

export default TransactionList
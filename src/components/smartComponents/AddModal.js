import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddModal = React.memo(({openModal, setOpenModal, getTransactions}) => {
  
  const [slp, setSlp] = useState(0)
  const [mmr, setMmr] = useState(0)
  const [month, setMonth] = useState(0)
  const [day, setDay] = useState(0)
  const [year, setYear] = useState(0)
  const [type, setType] = useState('Gained')

  const addTransaction = () => {
    const add = async () => {
      const resp = await axios.post('https://hidden-bastion-54706.herokuapp.com/addtransaction', {
        month: month,
        day: day,
        year: year,
        mmr: mmr,
        slp: slp,
        type: type,
        uid: localStorage.getItem('paxieUserID')
      })

      getTransactions()
      setOpenModal(false)
      alert(resp.data)
    }

    month === 0   || month === ''
    || day  === 0 || day === ''
    || year === 0 || year === ''
    || mmr  === 0 || mmr === ''
    || slp  === 0 || slp === '' ? alert('Fill out important fields') 
    : add()
  }

  return (
    <div className={openModal ? 'paxie-modal paxie-modal--active' : 'paxie-modal'}>
      <div className="paxie-modal__container">
        <p className="paxie-modal__close" onClick={() => setOpenModal(false)}> Close </p>
        <div className="paxie-modal__flex">
          <input onChange={e => setSlp(e.target.value)} type="number" placeholder="SLP" className="paxie-modal__input"/>
          <input onChange={e => setMmr(e.target.value)} type="number" placeholder="MMR" className="paxie-modal__input"/>
        </div>
        <div className="paxie-modal__flex paxie-modal__flex--input-30">
          <input onChange={e => setMonth(e.target.value)} type="number" placeholder="Month" className="paxie-modal__input"/>
          <input onChange={e => setDay(e.target.value)} type="number" placeholder="Day" className="paxie-modal__input"/>
          <input onChange={e => setYear(e.target.value)} type="number" placeholder="Year" className="paxie-modal__input"/>
        </div>
        <div className="paxie-modal__flex">
          <div onClick={() => setType('Gained')} className={type === 'Gained'? 'paxie-form__option paxie-form__option--active' : 'paxie-form__option'}> Gain </div>
          <div onClick={() => setType('Withdrawed')} className={type !== 'Gained'? 'paxie-form__option paxie-form__option--active' : 'paxie-form__option'}> Withdraw </div>
        </div>

        <button className="paxie-form__button paxie-form__button--full" onClick={addTransaction}> Submit </button>
      </div>
    </div>
  )
})

export default AddModal
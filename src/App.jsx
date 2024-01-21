import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const goalDate = new Date('2024-04-01');
  const goalAmount = 7250

  const [daysLeft, setDaysLeft] = useState(0);
  const [dailyAmount, setDailyAmount] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [receivedToday, setReceivedToday] = useState(0);

  useEffect(() => {
    const today = new Date();
    const differenceInMilliseconds = goalDate - today;
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const amountLeft = goalAmount - totalReceived

    const dailyTarget = Math.round(amountLeft / differenceInDays)

    setDaysLeft(differenceInDays);
    setDailyAmount(dailyTarget)
  }, [totalReceived]);

  useEffect(() => {
    const preveiousAmount = Number(localStorage.getItem('total_received_amount'))
    setTotalReceived(preveiousAmount)
  }, []);

  const amountReceived = (e) => {
    const todayAmount = Number(e.target.value)
    if (todayAmount > 0 && e.key === 'Enter'){
      const preveiousAmount = Number(localStorage.getItem('total_received_amount'))
      const totalAmount= todayAmount + preveiousAmount
      localStorage.setItem('total_received_amount', totalAmount)
      setTotalReceived(totalAmount)
    }
  }


  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-96 h-96 rounded-full bg-blue-500 flex justify-center items-center border-black'>
      <button className='w-72 h-72 rounded-full bg-green-500 border-2 border-black shadow-lg text-9xl  flex justify-center items-center'>{daysLeft}</button>
      </div>
      <div className='relative h-96 w-10 m-1'>
        <div className="w-96 absolute -top-2 -left-28  ">
          <label className='text-white border-none'>Amount Received: </label>
          <div className='border-white border-dashed border-2 '></div>
          <span className='text-7xl text-sky-500 flex justify-end'>{totalReceived}</span>
        </div>
        <div className="w-96 absolute top-1/2 left-0 ">
          <label className='text-white border-none'>To Receive Daily: </label>
          <div className='border-white border-dashed border-2 '></div>
          <span className='text-7xl text-sky-500 flex justify-end'>{dailyAmount}</span>
        </div>
        <div className="w-96 absolute -bottom-20 -left-32">
          <label className='text-white border-none'>To be Received: </label>
          <div className='border-white border-dashed border-2 '></div>
          <span className='text-7xl text-sky-500 flex justify-end'>{goalAmount}</span>
        </div>
      </div>

      <div className='fixed bottom-2 right-0 flex flex-col'>
      <label htmlFor="">Received today: </label>
      <input type="number" value={receivedToday} onChange={e => setReceivedToday(e.target.value)} onKeyDown={amountReceived}  className=''/>
      </div>
    </div>
  )
}

export default App

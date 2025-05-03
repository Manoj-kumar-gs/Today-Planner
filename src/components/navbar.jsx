import React from 'react'
import { useState, useEffect } from 'react';


const navbar = () => {
    const now = new Date(); 
    const [time, setTime] = useState(new Date())

    useEffect(() => {
      let interval =setInterval(() => {
        setTime(new Date())
      }, 1000);
    
      return () => {clearInterval(interval)}
    }, [])

    function getMonthName() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date();
        const monthIndex = currentMonth.getMonth();
        return months[monthIndex];
      }
      
    const todayDate = `${getDayName()} ${now.getDate()} ${getMonthName()} ${now.getFullYear()}`;
    const currentTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;


    return (
    <nav className='w-full h-[10vh] bg-gray-800 flex justify-between items-center'>
      <div className="logo w-[10%] flex justify-center items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ93Zq-ZQuKe4H_FWM0c_EYUIqpEn7AWCgIgA&s" className='w-9 h-9 rounded-full' alt="logo" srcSet="" />
      </div>
      <div className='dateTime text-white font-bold min-w-[10%] flex flex-col justify-between items-start'>
      <div>{todayDate}</div>
      <div>{currentTime}</div>
      </div>
    </nav>
  )
}
export function getDayName() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = new Date()
  const dayIndex = currentDay.getDay();
  return days[dayIndex];
}

export default navbar

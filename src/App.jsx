import { useState } from 'react'
import moon from './assets/desktop/icon-moon.svg'
import sun from './assets/desktop/icon-sun.svg'
import down from './assets/desktop/icon-arrow-down.svg'
import up from './assets/desktop/icon-arrow-up.svg'



function App() {

  const [mode, setMode] = useState(true)

  const [time, setTime] = useState();
  const [dayOfYear, setDayOFYear] = useState()
  const [dayOfWeek, setDayOfWeek] = useState()


  function getDate() {
    setInterval(() => {
      const date = new Date();
      if (date.getHours() > 12) {
        setMode(false)
      } else {
        setMode(true)
      }
      let minut = date.getMinutes()
      let hours = date.getHours()
      let start = new Date(date.getFullYear(), 0, 0);
      let diff = date - start;
      let oneDay = 1000 * 60 * 60 * 24;
      let day = Math.floor(diff / oneDay);
      setDayOFYear(day)
      setDayOfWeek(date.getDay() + 1)
      return setTime(`${hours < 10 ? `0${hours}` : hours} : ${minut < 10 ? `0${minut}` : minut}`)
    }, 1000)
  }
  getDate()

  let currentDate = new Date();
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) /
    (24 * 60 * 60 * 1000));
  let weekNumber = Math.ceil(days / 7);



  const [more, setMore] = useState(false)

  function moreF(e) {
    e.preventDefault()
    setMore(!more)
  }

  return (
    <div className={`w-full  h-screen sm:h-[100vh] pt-[51px] text-white  bg-no-repeat bg-cover bg-top ${mode ? `bg-[url('./assets/desktop/bg-image-daytime.png')] ` : `bg-[url('./assets/desktop/bg-image-nighttime.png')]`}`}>
      {!more && <h2 className='md:text-xl px-3 md:px-[165px] w-[80%] '>“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”</h2>}
      <div className={`sticky top-[${!more && '70%'}]`}>
        <div className='px-6 sm:px-[165px]'>
          <div className='flex items-center gap-5'>
            <img src={mode ? sun : moon} alt="" />
            <p>GOOD {mode ? 'MORNING' : "EVENING"} , IT’S CURRENTLY</p>
          </div>
          <div className='flex items-baseline mb-4'>
            <h1 className='text-8xl font-bold   md:text-10xl'>{time}</h1>
            <p className='text-2xl'>BST</p>
          </div>
          <div className='block md:flex justify-between'>
            <h2 className='text-xl sm:text-3xl font-bold'>{Intl.DateTimeFormat().resolvedOptions().timeZone}</h2>
            <button onClick={(e) => moreF(e)} className='bg-white rounded-full text-sm text-black font-bold md:w-[146px] p-1 md:p-[8px_9px] flex items-center justify-center gap-2 md:gap-[14px]'><a href="more">{more ? `LESS ` : "MORE"}</a><img src={more ? up : down} alt="" /> </button>
          </div>
        </div>
        {more && <div className={`${mode ? 'bg-[rgba(189,183,183,0.93)] fixed left-0 w-full bottom-0 z-40 text-black font-bold' : `bg-[rgba(0,0,0,0.8)] `} z-50 p-[20px_15px] sm:p-[74px_165px]  mt-[56px] grid gap-9 md:gap-[200px] grid-cols-1 sm:grid-cols-2`}>
          <div>
            <div className='flex h-[50%] justify-between sm:block'>
              <p className='1xl md:text-2xl'>CURRENT TIMEZONE</p>
              <h1 className='text-2xl sm:text-3xl md:text-5xl mb-[42px]'>{Intl.DateTimeFormat().resolvedOptions().timeZone}</h1>
            </div>
            <div className='flex h-[50%] justify-between sm:block'>
              <p className='md:text-2xl'>Day of the year</p>
              <h1 className=' text-2xl sm:text-3xl md:text-5xl'>{dayOfYear}</h1>
            </div>
          </div>
          <div>
            <div className='flex h-[50%] justify-between sm:block'>
              <p className='md:text-2xl'>Day of the week</p>
              <h1 className='text-3xl  md:text-5xl mb-[42px]'>{dayOfWeek}</h1>
            </div>
            <div className='flex h-[50%] justify-between sm:block'>
              <p className='md:text-2xl'>WEEK NUMBER</p>
              <h1 className='text-3xl md:text-5xl'>{weekNumber + 1}</h1>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default App
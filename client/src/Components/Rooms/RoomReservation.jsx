import React from 'react'
import Calender from './Calender'
import Button from '../Button/Button'

const RoomReservation = () => {
  return (
    <>
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className='flex items-center gap-1 p-4'>
          <div className="text-2xl font-semibold">$200</div>
          <div className="font-light text-neutral-600">night</div>
        </div>
        <hr />
        <Calender />
        <hr />
        <div className='p-4'><Button label={`Reserve`} /></div>
        <div className="p-4 flex items-center justify-between font-semibold text-lg">
          <div>total</div>
          <div>$ 300</div>
        </div>
      </div>
    </>
  )
}

export default RoomReservation

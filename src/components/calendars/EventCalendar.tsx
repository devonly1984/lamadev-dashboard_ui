"use client"

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import {EventCard} from "../cards";
type ValuePiece = Date|null;
  type Value = ValuePiece| [ValuePiece,ValuePiece]
const EventCalendar = () =>{
  const [value, onChange] = useState<Value>(new Date())
  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="Events" width={20} height={20} />
      </div>
        <EventCard/>
    </div>
  );
}
export default EventCalendar
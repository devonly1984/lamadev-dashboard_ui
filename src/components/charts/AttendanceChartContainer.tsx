import Image from "next/image"
import AttendanceChart from "./AttendanceChart"
import prisma from "@/app/lib/prisma";
import { preinit } from "react-dom";

const AttendanceChartContainer = async () => {
    const today = new Date();
    const dayofWeek = today.getDay()
    const daysSinceMonday = dayofWeek === 0 ? 6 : dayofWeek - 1;
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate()-daysSinceMonday)
    const resData = await prisma.attendance.findMany({
      where: {
        date: {
          gte: lastMonday,
        },
      },
      select: {
        date: true,
        present: true,
      },
    });
    const daysOfWeek = ["Mon",'Tue','Wed','Thu','Fri'];
    const attendanceMap: {
      [key: string]: { present: number; absent: number };
    } = {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };
resData.forEach(item=>{
    const itemDate = new Date(item.date);
    if (dayofWeek>=1 && dayofWeek<=5) {
        const dayName = daysOfWeek[dayofWeek - 1];
        if (item.present) {
            attendanceMap[dayName].present+=1;

        } else {
            attendanceMap[dayName].absent+=1
        }
    }
})
const data = daysOfWeek.map((day) => ({
  name: day,
  present: attendanceMap[day].present,
  absent: attendanceMap[day].absent,
}));
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
}
export default AttendanceChartContainer
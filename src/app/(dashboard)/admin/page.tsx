import Announcements from "@/components/Announcements";
import {EventCalendar} from "@/components/calendars";
import {UserCard} from "@/components/cards";
import { AttendanceChart, CountChart, FinanceChart } from "@/components/charts";

const AdminPage = () => {
  return (
    <div className="flex p-4 gap-4 flex-col md:flex-row">
      {/**Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8 ">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          {/**Middle Charts */}
          <div className="w-full lg:w-1/3 h-[450px]">
            {/**Count Chart */}
            <CountChart />
          </div>

          <div className="w-full lg:w-2/3 h-[450px]">
            {/**Attendance Chart*/}
            <AttendanceChart />
          </div>
        </div>
        <div className="w-full h-[500px]">
          {/**BottomCharts */}
          <FinanceChart />
        </div>
      </div>
      {/**Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};
export default AdminPage;

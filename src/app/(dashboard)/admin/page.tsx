import Announcements from "@/components/Announcements";
import EventCalendarContainer from "@/components/calendars/EventCalendarContainer";
import {UserCard} from "@/components/cards";
import {   FinanceChart } from "@/components/charts";
import AttendanceChartContainer from "@/components/charts/AttendanceChartContainer";
import CountChartContainer from "@/components/charts/CountChartContainer";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
})=>{
  return (
    <div className="flex p-4 gap-4 flex-col md:flex-row">
      {/**Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8 ">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="admin" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          {/**Middle Charts */}
          <div className="w-full lg:w-1/3 h-[450px]">
            {/**Count Chart */}
            <CountChartContainer />
          </div>

          <div className="w-full lg:w-2/3 h-[450px]">
            {/**Attendance Chart*/}
            <AttendanceChartContainer />
          </div>
        </div>
        <div className="w-full h-[500px]">
          {/**BottomCharts */}
          <FinanceChart />
        </div>
      </div>
      {/**Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};
export default AdminPage;

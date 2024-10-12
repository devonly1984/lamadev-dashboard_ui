import Announcements from "@/components/Announcements"
import { BigCalendar } from "@/components/calendars"
import StatCards from "@/components/cards/StatCards"
import UserInfoCard from "@/components/cards/UserInfoCard"
import PerformanceChart from "@/components/charts/PerformanceChart"
import Shortcuts from "@/components/shared/Shortcuts"


const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/**Left */}
      <div className="w-full xl:w-2/3">
        {/**Top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/**User Info Card */}
          <UserInfoCard
            image="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
            name="Cameron Moran"
          />
          <StatCards grade="6th" lessons={18} attendance="90%" classes="6A" />
        </div>
        {/**Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Shortcuts name="student" />
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
}
export default SingleStudentPage
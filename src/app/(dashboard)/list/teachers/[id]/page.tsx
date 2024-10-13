import Announcements from "@/components/Announcements";
import { BigCalendar } from "@/components/calendars";
import StatCards from "@/components/cards/StatCards";
import UserInfoCard from "@/components/cards/UserInfoCard";
import PerformanceChart from "@/components/charts/PerformanceChart";
import FormModal from "@/components/modals/FormModal";
import Shortcuts from "@/components/shared/Shortcuts";



const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/**Left */}
      <div className="w-full xl:w-2/3">
        {/**Top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/**User Info Card */}
          <UserInfoCard
            image="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
            name="Leonard Synder"
          />
        
          <StatCards attendance="90%" lessons={2} branches="2" classes="6" />
        </div>
        {/**Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Shortcuts name="Teacher's" />
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
};
export default SingleTeacherPage;

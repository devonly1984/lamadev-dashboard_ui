import UserCard from "@/components/cards/UserCard";
import CountChart from "@/components/charts/CountChart";

const AdminPage = () => {
  return (
    <div className="flex p-4 gap-4 flex-col md:flex-row">
      {/**Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
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
          </div>
        </div>
        <div className="">{/**BottomCharts */}</div>
      </div>
      {/**Right */}
      <div className="w-full lg:w-1/3">r</div>
    </div>
  );
};
export default AdminPage;

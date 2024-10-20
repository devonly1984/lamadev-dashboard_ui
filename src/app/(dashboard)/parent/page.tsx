import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/calendars/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";

const ParentPage = () => {
  const {userId} = auth();
  return (
    <div className="p-4 flex flex-1 gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (John Doe)</h1>
          <BigCalendarContainer type="classId" id={userId!}/>        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
}
export default ParentPage;
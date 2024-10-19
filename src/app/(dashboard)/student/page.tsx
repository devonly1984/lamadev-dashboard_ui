import Announcements from "@/components/Announcements";
import {  EventCalendar } from "@/components/calendars";
import BigCalendarContainer from "@/components/calendars/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";
import { getStudents } from "../../../../prisma/queries/lessonQueries";

const StudentPage = async (
) => {
  const {userId} = auth();
  const classes = await getStudents(userId);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendarContainer type="classId" id={classes[0].id!} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
export default StudentPage

import BigCalendar from "./BigCalendar";
import { getCalendar } from "../../../prisma/queries/lessonQueries";
import { adjustScheduleToCurrentWeek } from "@/app/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
    const data = await getCalendar(type,id);
    const adjustSchedule = adjustScheduleToCurrentWeek(data);

  return (
    <div>
      <BigCalendar data={adjustSchedule} />
    </div>
  );
};
export default BigCalendarContainer;

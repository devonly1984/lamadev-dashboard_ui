import prisma from "@/app/lib/prisma";
import BigCalendar from "./BigCalendar";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
    const datares = await prisma.lesson.findMany({
      where: {
        ...(type === "teacherId"
          ? { teacherId: id as string }
          : { classId: id as number }),
      },
    });
    const data = datares.map((lesson) => ({
      title: lesson.name,
      start: lesson.startTime,
      end: lesson.endTime,
    }));
  return (
    <div>
      <BigCalendar data={data} />
    </div>
  );
};
export default BigCalendarContainer;

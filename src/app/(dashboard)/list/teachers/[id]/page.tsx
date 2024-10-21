import prisma from "@/app/lib/prisma";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/calendars/BigCalendarContainer";
import { UserInfoCard,StatCards } from "@/components/cards";
import {PerformanceChart} from "@/components/charts/"
import Shortcuts from "@/components/shared/Shortcuts";
import { auth } from "@clerk/nextjs/server";
import { Teacher } from "@prisma/client";
import { notFound } from "next/navigation";



const SingleTeacherPage = async ({ params:{id} }: { params: { id: string } }) => {

  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });
  if (!teacher) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/**Left */}
      <div className="w-full xl:w-2/3">
        {/**Top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/**User Info Card */}
          <UserInfoCard teacher={teacher} />

          <StatCards
            attendance="90%"
            lessons={teacher._count.lessons}
            branches={teacher._count.subjects.toString()}
            classes={teacher._count.classes.toString()}
          />
        </div>
        {/**Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type="teacherId" id={teacher.id} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Shortcuts name="teacher" />
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
};
export default SingleTeacherPage;

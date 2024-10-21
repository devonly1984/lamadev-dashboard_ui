import prisma from "@/app/lib/prisma";
import Announcements from "@/components/Announcements"
import BigCalendarContainer from "@/components/calendars/BigCalendarContainer";
import { StatCards, UserInfoCard } from "@/components/cards";
import {PerformanceChart} from "@/components/charts/"
import Shortcuts from "@/components/shared/Shortcuts"
import { auth } from "@clerk/nextjs/server";
import { Class,  Student } from "@prisma/client";
import { notFound } from "next/navigation";


const SingleStudentPage = async({params:{id}}:{params:{id:string}}) => {


  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: {
        include: {
          _count: { select: { lessons: true } },
        },
      },
    },
  });
  if (!student) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/**Left */}
      <div className="w-full xl:w-2/3">
        {/**Top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/**User Info Card */}
          <UserInfoCard student={student} />
          <StatCards
            grade={student.class.name.charAt(0)}
            lessons={student.class._count.lessons}
            attendance="90%"
            classes={student.class.name}
          />
        </div>
        {/**Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendarContainer type="classId" id={student.id} />
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
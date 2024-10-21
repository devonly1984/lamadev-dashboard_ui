import prisma from "@/app/lib/prisma";

import AnnouncementCard from "./cards/AnnouncementCard";
import { auth } from "@clerk/nextjs/server";


const Announcements = async() => {
  const {userId,sessionClaims} = auth();
  const role = (sessionClaims?.metadata as {role:string})?.role;
  const isAdmin = role === "admin";

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };
  const announcements = await prisma.announcement.findMany({
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          {
            class: roleConditions[(role as keyof typeof roleConditions) || {}],
          },
        ],
      }),
    },
    take: 3,
    orderBy: { date: "desc" },
  });
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <AnnouncementCard announcements={announcements} />
      </div>
    </div>
  );
};

export default Announcements;
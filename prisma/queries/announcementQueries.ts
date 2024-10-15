import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllAnnouncements = async (p: number, query: Prisma.AnnouncementWhereInput) => {
  if (query !== undefined) {
    const [announcements, count] = await prisma.$transaction([
      prisma.announcement.findMany({
        where: query,
        include: { class: true },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),

      prisma.announcement.count({ where: query }),
    ]);
    return [announcements, count];
  } else {
    return [{}, 0];
  }
};
import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/shared/Pagination";
import TableSearch from "@/components/shared/TableSearch";
import Table from "@/components/Table";
import { announcementColumns } from "@/constants/columns";


import Image from "next/image";
import { AnnouncementList } from "@/types/listindex";
import { getAllAnnouncements } from "../../../../../prisma/queries/announcementQueries";
import { Prisma } from "@prisma/client";
import { currentUserId, isAdmin, role } from "@/app/lib/data";
const renderRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td className="hidden md:table-cell">{item.class?.name || "-"}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>

    <td>
      <div className="flex items-center gap-2">
        {isAdmin && (
          <>
            <FormContainer table="announcement" type="update" data={item} />
            <FormContainer table="announcement" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const AnnouncementsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query:Prisma.AnnouncementWhereInput = {}

  if (queryParams !==undefined) {
    for (const [key,value] of Object.entries(queryParams)) {
      if (value !==undefined){
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
            
          default:
            break;
        }
      }
    }
  }
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: {
      students: {
        some: { parentId: currentUserId! },
      },
    },
  };
  query.OR = [
    { classId: null },
    {
      class: roleConditions[role as keyof typeof roleConditions] || {},
    },
  ];
  const [announcements, count] = await getAllAnnouncements(p, query);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**Top */}
      <div className="flex justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">
          All Announcements
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" height={14} width={14} />
            </button>
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" height={14} width={14} />
            </button>
            {isAdmin && (
              <FormContainer table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      {/**List */}
      <Table
        columns={announcementColumns}
        renderRow={renderRow}
        data={announcements}
      />
      {/**Pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
}
export default AnnouncementsListPage
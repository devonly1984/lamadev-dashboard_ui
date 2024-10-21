import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/shared/Pagination";
import TableSearch from "@/components/shared/TableSearch";
import Table from "@/components/Table";


import Image from "next/image";
import { LessonList } from "@/types/listindex";
import { getAllLessons } from "../../../../../prisma/queries/lessonQueries";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
const { sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role: string })?.role;
const isAdmin = role === "admin";
export const lessonsColumns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },

  ...(isAdmin
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];
const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
    <td className="hidden md:table-cell">{item.class.name}</td>
    <td className="hidden md:table-cell">{item.teacher.name + " "+ item.teacher.surname}</td>

    <td>
      <div className="flex items-center gap-2">
        {isAdmin && (
          <>
            <FormContainer table="lesson" type="update" data={item} />
            <FormContainer table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query:Prisma.LessonWhereInput = {}

  if (queryParams !==undefined) {
    for (const [key,value] of Object.entries(queryParams)) {
      if (value !==undefined){
        switch(key) {
          case 'classId': 
          query.classId =parseInt(value);
          break;
          case 'teacherId':
            query.teacherId=value;
            break;
             case 'search': 
            query.OR = [
              {subject: {name:{contains:value,mode:'insensitive'}}},
              {teacher: {name:{contains:value,mode:'insensitive'}}}
            ]
            break;
          default:
            break;
        }
      }
    }
  }
  const [lessons, count] = await getAllLessons(p, query);
  
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**Top */}
      <div className="flex justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" height={14} width={14} />
            </button>
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" height={14} width={14} />
            </button>
            {isAdmin && <FormContainer table="lesson" type="create" />}
          </div>
        </div>
      </div>
      {/**List */}
      <Table
        columns={lessonsColumns}
        renderRow={renderRow}
        data={lessons}
      />
      {/**Pagination */}

      <Pagination page={p} count={count}/>
    </div>
  );
}
export default LessonsListPage
import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/shared/Pagination";
import TableSearch from "@/components/shared/TableSearch";
import Table from "@/components/Table";


import Image from "next/image";
import { Prisma } from "@prisma/client";
import { getAllExams } from "../../../../../prisma/queries/examQueries";
import { ExamList } from "@/types/listindex";
import { auth } from "@clerk/nextjs/server";
const { userId,sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role: string })?.role;
const isAdmin = role === "admin";
const isTeacher = role === "teacher";
const currentUserId = userId;
export const examColumns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },

  ...(isAdmin || isTeacher
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];
const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td className="hidden md:table-cell">{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>

    <td>
      <div className="flex items-center gap-2">
        {(isAdmin || isTeacher) && (
          <>
            <FormContainer table="exam" type="update" data={item} />
            <FormContainer table="exam" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const ExamsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query:Prisma.ExamWhereInput = {}
  query.lesson = {}
  if (queryParams !==undefined) {
    for (const [key,value] of Object.entries(queryParams)) {
      if (value !==undefined){
        switch(key) {
          case 'classId': 
          query.lesson.classId= parseInt(value)
          break;
          case 'teacherId':
            query.lesson.teacherId= value 

            break;
             case 'search': 
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };           
            break;
          default:
            break;
        }
      }
    }
  }
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = currentUserId!;
      break;
    case 'student':
      query.lesson.class = {
        students: {
          some: {
            id: currentUserId!
          }
        }
      }

      break;
      case 'parent' :
        query.lesson.class = {
          students: {
            some: {
              parentId: currentUserId!,
            },
          },
        };
        break;
    default:
      break;
  }
  const [exams, count] = await getAllExams(p, query);
  
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**Top */}
      <div className="flex justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" height={14} width={14} />
            </button>
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" height={14} width={14} />
            </button>
            {isAdmin && <FormContainer table="exam" type="create" />}
          </div>
        </div>
      </div>
      {/**List */}
      <Table columns={examColumns} renderRow={renderRow} data={exams} />
      {/**Pagination */}

      <Pagination page={p} count={count}/>
    </div>
  );
}
export default ExamsListPage
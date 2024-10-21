import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/shared/Pagination";
import TableSearch from "@/components/shared/TableSearch";
import Table from "@/components/Table";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { getAllResults } from "../../../../../prisma/queries/resultQueries";
import { ResultList } from "@/types/listindex";
import { auth } from "@clerk/nextjs/server";
const { userId, sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role: string })?.role;
const isAdmin = role === "admin";
const isTeacher = role === "teacher";
const currentUserId = userId;
export const resultsColumns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Student",
    accessor: "student",
    className: "hidden md:table-cell",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
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
const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>

    <td>{item.studentName + " " + item.studentSurname}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">
      {item.teacherName + " " + item.teacherSurname}
    </td>
    <td className="hidden md:table-cell">{item.className}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>

    <td>
      <div className="flex items-center gap-2">
        {(isAdmin || isTeacher) && (
          <>
            <FormContainer table="result" type="update" data={item} />
            <FormContainer table="result" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query:Prisma.ResultWhereInput = {}

  if (queryParams !==undefined) {
    for (const [key,value] of Object.entries(queryParams)) {
      if (value !==undefined){
        switch (key) {
          case "studentId":
            query.studentId = value;

            break;

          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { student: { name: { contains: value, mode: "insensitive" } } },
            ];

            break;
          default:
            break;
        }
      }
    }
  }
  //Role Conditions

  switch(role) {
    case 'admin':
      break;
      case 'teacher':
        query.OR = [
          { exam: { lesson: { teacherId: currentUserId! } } },
          { assignment: { lesson: { teacherId: currentUserId! } } },
        ];
        break;
        case 'student':
          query.studentId = currentUserId!;
          break;
          case 'parent':
            query.student = {
              parentId: currentUserId!,
            };
            break;
    default:
      break;
  }
  const [results, count] = await getAllResults(p, query);
  
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**Top */}
      <div className="flex justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" height={14} width={14} />
            </button>
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" height={14} width={14} />
            </button>
            {(isAdmin || isTeacher) && (
              <FormContainer table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/**List */}
      <Table columns={resultsColumns} renderRow={renderRow} data={results} />
      {/**Pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
}
export default ResultsListPage
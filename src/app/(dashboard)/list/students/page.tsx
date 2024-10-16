import FormModal from "@/components/modals/FormModal";
import Pagination from "@/components/shared/Pagination";
import TableSearch from "@/components/shared/TableSearch";
import Table from "@/components/Table";
import { studentColumns,  } from "@/constants/columns";
import { role } from "@/app/lib/auth";

import Image from "next/image";
import Link from "next/link";
import { getAllStudents } from "../../../../../prisma/queries/studentQueries";
import { Prisma } from "@prisma/client";
import { StudentList } from "@/types/listindex";

const renderRow = (item: StudentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 texxt-sm hover:bg-lamaPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img?.toString() || "/avatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.name}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.class.name[0]}</td>

    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/students/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" width={16} height={16} alt="" />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal table="student" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);
const StudentListPage = async({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const query: Prisma.StudentWhereInput = {};
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
    const [students,count] = await getAllStudents(p,query)
    if (queryParams) {
      for (const[key,value] of Object.entries(queryParams)) {
        if (value !==undefined) {
          switch(key) {
            case 'teacherId':
              query.class = {
                lessons: {
                  some:{
                    teacherId:value
                  }
                }
              }
              break;
              case 'search': 
          query.name = { contains: value, mode: "insensitive" };
          break;
              default: 
              break;
          }
        }
      }
    }
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**Top */}
      <div className="flex justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" height={14} width={14} />
            </button>
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" height={14} width={14} />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/**List */}
      <Table
        columns={studentColumns}
        renderRow={renderRow}
        data={students}
      />
      {/**Pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
}
export default StudentListPage;
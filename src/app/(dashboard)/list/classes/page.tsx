import FormModal from "@/components/modals/FormModal";
import Pagination from "@/components/shared/Pagination";
import TableSearch from "@/components/shared/TableSearch";
import Table from "@/components/Table";
import { classesColumns } from "@/constants/columns";
import { isAdmin, role } from "@/app/lib/auth";
import Image from "next/image";
import { ClassList } from "@/types/listindex";

import { Prisma } from "@prisma/client";
import { getAllClasses } from "../../../../../prisma/queries/classQueries";

const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    <td className="hidden md:table-cell">{item.name[0]}</td>
    <td className="hidden md:table-cell">{item.supervisor.name + " " + item.supervisor.surname}</td>

    <td>
      <div className="flex items-center gap-2">
   
        {isAdmin && (
           <>
           <FormModal table="class" type="update" data={item} />
           <FormModal table="class" type="delete" id={item.id} />
         </>
        )}
      </div>
    </td>
  </tr>
);
const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query:Prisma.ClassWhereInput = {}

  if (queryParams !==undefined) {
    for (const [key,value] of Object.entries(queryParams)) {
      if (value !==undefined){
        switch(key) {
          case 'supervisorId': 
          query.supervisorId = { contains: value, mode: "insensitive" };
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
  const [classes, count] = await getAllClasses(p, query);
 
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**Top */}
      <div className="flex justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" height={14} width={14} />
            </button>
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" height={14} width={14} />
            </button>
            {isAdmin && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>
      {/**List */}
      <Table columns={classesColumns} renderRow={renderRow} data={classes} />
      {/**Pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
}
export default ClassesListPage
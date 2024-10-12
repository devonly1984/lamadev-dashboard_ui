import FormModal from "@/components/modals/FormModal";
import Pagination from "@/components/shared/Pagination";
import TableSearch from "@/components/shared/TableSearch";
import Table from "@/components/Table";
import { lessonsColumns,  } from "@/constants/columns";
import { examsData,  role,  } from "@/lib/data";
import { Exams, } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ExamsListPage = () => {
  const renderRow = (item: Exams) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight "
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.date}</td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
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
            {role === "admin" && <FormModal table="exam" type="create" />}
          </div>
        </div>
      </div>
      {/**List */}
      <Table columns={lessonsColumns} renderRow={renderRow} data={examsData} />
      {/**Pagination */}

      <Pagination />
    </div>
  );
}
export default ExamsListPage
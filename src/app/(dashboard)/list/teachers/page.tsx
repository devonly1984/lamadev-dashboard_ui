import FormModal from "@/components/modals/FormModal";
import Pagination from "@/components/shared/Pagination";
import TableSearch from "@/components/shared/TableSearch";
import Table from "@/components/Table";
import { teacherColumns } from "@/constants/columns";
import Image from "next/image";
import Link from "next/link";
import { Prisma, Subject } from "@prisma/client";
import { getTeachers } from "../../../../../prisma/queries/teacherQueries";
import { TeacherList } from "@/types/listindex";
import { role } from "@/app/lib/auth";

const renderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/avatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">
      {item.subjects?.map((subject: Subject) => subject.name).join(",")}
    </td>
    <td className="hidden md:table-cell">
      {item.classes.map((classItem) => classItem.name).join(",")}
    </td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" width={16} height={16} alt="" />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal table="teacher" type="delete" id={parseInt(item.id)} />
        )}
      </div>
    </td>
  </tr>
);
const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
const query: Prisma.TeacherWhereInput={}
  //URL PARAMS CONDITIONS
  if (queryParams) {
    for (const [key,value] of Object.entries(queryParams)) {
      if (value !==undefined) {
      switch (key) {
        case "classId":
          query.lessons = {
            some: { classId: parseInt(value) },
          };

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
  const [data, count] = await getTeachers(p, query);
 
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**Top */}
      <div className="flex justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" height={14} width={14} />
            </button>
            <button className="w-8 h-8  flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" height={14} width={14} />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>
      {/**List */}
      <Table columns={teacherColumns} renderRow={renderRow} data={data} />
      {/**Pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
};
export default TeacherListPage
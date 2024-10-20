import { ReactNode } from "react";
import {SubjectList,ParentList,StudentList, TeacherList, ClassList, LessonList} from '@/types/listindex'
type TableProps = {
  columns: {
    header: string;
    accessor: string;
    className?: string;
  }[];
  renderRow: (item: any) => ReactNode;
  data: any;
};
const Table = ({ columns,renderRow,data }: TableProps) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item: any) => renderRow(item))}</tbody>
    </table>
  );
};
export default Table
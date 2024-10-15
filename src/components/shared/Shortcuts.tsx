import Link from "next/link";
interface ShortcutsProps {
  name:'teacher'|'student';
}
const Shortcuts = ({name}:ShortcutsProps) => {
  const isTeacher = name==='teacher';
  return (
    <div className="bg-white p-4 rounded-md">
      <h1 className="text-xl font-semibold">Shortcuts</h1>
      <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
        <Link
          href={
            isTeacher
              ? `/list/classes?supervisorId=${"teacher2"}`
              : `/list/lessons?classId=${2}`
          }
          className="p-3 rounded-md bg-lamaSkyLight"
        >
          {isTeacher ? `${name} Classes` : `${name} Lessons`}
        </Link>
        <Link
          href={
            isTeacher
              ? `/list/students?teacherId=${"teacher12"}`
              : `/list/teachers?classId=${2}`
          }
          className="p-3 rounded-md bg-lamaPurpleLight"
        >
          {isTeacher ? `${name} Students` : ` ${name} Teachers`}
        </Link>
        <Link
          href={
            isTeacher
              ? `/list/lessons?teacherId=${2}`
              : `/list/results?studentId=${"student2"}`
          }
          className="p-3 rounded-md bg-lamaYellowLight"
        >
          {isTeacher ? `${name} Lessons` : `${name} Results`}
        </Link>
        <Link
          href={
            isTeacher
              ? `/list/exams?teacherId=${2}`
              : `/list/exams?classId=${2}`
          }
          className="p-3 rounded-md bg-pink-50"
        >
          {name} Exams
        </Link>
        <Link
          href={
            isTeacher
              ? `/list/assignments?teacherId=${2}`
              : `/list/assignments?classId=${2}`
          }
          className="p-3 rounded-md bg-lamaSkyLight"
        >
          {name} Assignments
        </Link>
      </div>
    </div>
  );
};

export default Shortcuts;
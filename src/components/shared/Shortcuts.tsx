import Link from "next/link";
interface ShortcutsProps {
  name:string;
}
const Shortcuts = ({name}:ShortcutsProps) => {
  const isTeacher = name==='teacher';
  return (
    <div className="bg-white p-4 rounded-md">
      <h1 className="text-xl font-semibold">Shortcuts</h1>
      <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
        <Link href="/" className="p-3 rounded-md bg-lamaSkyLight">
          {isTeacher ? { name } + "Classes" : { name } + "Lessons"}
        </Link>
        <Link
          href={
            isTeacher
              ? `/list/students?teacherId=${2}`
              : `/list/teachers?classId=${2}`
          }
          className="p-3 rounded-md bg-lamaPurpleLight"
        >
          {isTeacher ? { name } + "Students" : { name } + "Teachers"}
        </Link>
        <Link href="/" className="p-3 rounded-md bg-lamaYellowLight">
          {isTeacher ? { name } + "Lessons" : { name } + "Results"}
        </Link>
        <Link href="/" className="p-3 rounded-md bg-pink-50">
          {name} + Exams
        </Link>
        <Link href="/" className="p-3 rounded-md bg-lamaSkyLight">
          {name} Assignments
        </Link>
      </div>
    </div>
  );
};

export default Shortcuts;
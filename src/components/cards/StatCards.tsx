import Image from "next/image"
interface StatCardsProps {
  attendance?: string;
  lessons?: number;
  classes?: string;
  grade?: string;
  branches?: string;
}
const StatCards = ({ attendance, lessons, classes, grade,branches }: StatCardsProps) => {
  return (
    <div className="flex-1 flex gap-4 justify-between flex-wrap">
      <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
        <Image
          src="/singleAttendance.png"
          width={24}
          height={24}
          className="w-6 h-6"
          alt=""
        />
        <div className="">
          <h1 className="text-xl font-semibold">{attendance}</h1>
          <span className="text-sm text-gray-400">Attendance</span>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
        <Image
          src="/singleBranch.png"
          width={24}
          height={24}
          className="w-6 h-6"
          alt=""
        />
        <div className="">
          <h1 className="text-xl font-semibold">
            {branches ? branches : grade}
          </h1>
          <span className="text-sm text-gray-400">
            {grade ? "Branches" : "Grade"}
          </span>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
        <Image
          src="/singleLesson.png"
          width={24}
          height={24}
          className="w-6 h-6"
          alt=""
        />
        <div className="">
          <h1 className="text-xl font-semibold">{lessons}</h1>
          <span className="text-sm text-gray-400">Lessons</span>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
        <Image
          src="/singleClass.png"
          width={24}
          height={24}
          className="w-6 h-6"
          alt=""
        />
        <div className="">
          <h1 className="text-xl font-semibold">{classes}</h1>
          <span className="text-sm text-gray-400">Classes</span>
        </div>
      </div>
    </div>
  );
};
export default StatCards
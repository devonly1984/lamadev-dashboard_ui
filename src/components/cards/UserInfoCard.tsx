import Image from "next/image"
import FormContainer from "@/components/forms/FormContainer";
import { Student, Teacher } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";


interface UserInfoCardProps  {
 teacher?: Teacher 
 student?:Student

 
}
const UserInfoCard = ({teacher,student}:UserInfoCardProps) => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as {role:string})?.role;
  const isAdmin = role === "admin";
  return (
    <div className="bg-lamaSky py-6 rounded-md flex-1 flex gap-4 ">
      <div className="w-1/3">
        <Image
          src={teacher?.img || student?.img || "/avatar.png"}
          alt=""
          width={144}
          height={144}
          className=" w-36 h-36 rounded-full object-cover"
        />
      </div>
      <div className="w-2/3 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              {teacher?.name || student?.name}
            </h1>
            {isAdmin && (
              <FormContainer
                table="teacher"
                type="update"
                data={teacher || student}
              />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Proident id nisi occaecat elit commodo{" "}
        </p>

        <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
          <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
            <Image src="/blood.png" width={14} height={14} alt="type" />
            <span>{teacher?.bloodType || student?.bloodType}</span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
            <Image src="/date.png" width={14} height={14} alt="type" />
            <span>
              {new Intl.DateTimeFormat("en-us").format(
                teacher?.birthday || student?.birthday
              )}
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
            <Image src="/mail.png" width={14} height={14} alt="type" />
            {teacher ? (
              <span>{teacher?.email || "-"}</span>
            ) : (
              <span>{student?.email || "-"}</span>
            )}
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
            <Image src="/phone.png" width={14} height={14} alt="type" />

            {teacher ? (
              <span>{teacher?.phone || "-"}</span>
            ) : (
              <span>{student?.phone || "-"}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserInfoCard
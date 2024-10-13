import Image from "next/image"
import FormModal from "../modals/FormModal";
interface UserInfoCardProps  {
    image:string;
    name:string;
}
const UserInfoCard = ({image,name}:UserInfoCardProps) => {
  return (
    <div className="bg-lamaSky py-6 rounded-md flex-1 flex gap-4 ">
      <div className="w-1/3">
        <Image
          src={image}
          alt=""
          width={144}
          height={144}
          className=" w-36 h-36 rounded-full object-cover"
        />
      </div>
      <div className="w-2/3 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{name}</h1>
            <FormModal
              table="teacher"
              type="update"
              data={{
                id: 1,
                teacherId: "1234567890",
                name: "John Doe",
                email: "john@doe.com",
                photo:
                  "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
                phone: "1234567890",
                subjects: ["Math", "Geometry"],
                classes: ["1B", "2A", "3C"],
                address: "123 Main St, Anytown, USA",
              }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Proident id nisi occaecat elit commodo{" "}
        </p>

        <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
          <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
            <Image src="/blood.png" width={14} height={14} alt="type" />
            <span>A+</span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
            <Image src="/date.png" width={14} height={14} alt="type" />
            <span>January 2025</span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
            <Image src="/mail.png" width={14} height={14} alt="type" />
            <span>john@doe.com</span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
            <Image src="/phone.png" width={14} height={14} alt="type" />
            <span>555 555 5555</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserInfoCard
import Image from "next/image"
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
          <h1 className="text-xl font-semibold">{name}</h1>
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
"use client";
import { genderData } from '@/constants';
import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full">
      {/**Title */}
      <div className="flex justify-between items-center">
        <h1 className='text-lg font-semibold'>Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/**Chart */}
      <div className="w-full h-[75vh]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={genderData}
          >
            <RadialBar
             
              label={{ position: "insideStart", fill: "#fff" }}
              background
             
              dataKey="count"
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-16">
          <div className="flex flex-col gap-1">
            <div className="w-5 h-5 bg-lamaSky rounded-full" />
            <h1 className="font-bold">1234</h1>
            <h2 className="text-xs text-gray-300">Boys (55%)</h2>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-5 h-5 bg-lamaYellow rounded-full" />
            <h1 className="font-bold">1234</h1>
            <h2 className="text-xs text-gray-300">Girls (45%)</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CountChart
import { iAnalyticsData } from "../home/page";

const AnalyticsCard = ({ data }: { data: iAnalyticsData }) => {
  return (
    <div className="w-80 h-30 border-dotted border-1 flex justify-center items-center">
      <div className=" w-60 h-20 ">
        <div className="flex ">
          <div>
            <h1 className="text-xl text-zinc-500 ">{data.title}</h1>
          </div>
          <div className="ml-5 flex items-end">
            <div className="flex ">
              <data.icon
                className={`${data.type === "down" ? "text-red-600" : "text-green-600"} h-5 pb-1`}
              />{" "}
            </div>
            <p
              className={`text-xl ${data.type === "down" ? "text-red-600" : "text-green-600"} ml-1 `}
            >
              {data.value}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-4xl font-bold">{data.value}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;

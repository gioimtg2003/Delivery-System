import { LineChart, BarChart } from "../Chart";

interface CardProps {
  title: string;
  description: string;
  metric: string;
  link: React.ReactNode;
  metricType?: string;
  typeChart: string;
}

function LineChartAndContent({
  metric,
  link,
  metricType,
}: Readonly<CardProps>): JSX.Element {
  return (
    <div className="w-full flex flex-row justify-center mt-2 h-40">
      <div className="w-7/12 h-full flex flex-col justify-around">
        <div
          className={`w-full  text-primary-1-color ml-4 hover:cursor-pointer ${metricType == "money" ? "text-xl font-bold" : "text-5xl font-semibold"}`}
        >
          <p>{metric}</p>
        </div>
        <div className="">{link}</div>
      </div>
      <div className="w-5/12 h-full md:w-5/12 md:h-auto md:block hidden">
        <LineChart datasets={[60, 40, 39, 45, 50, 60, 65]} />
      </div>
    </div>
  );
}

function VerticalBarChartAndContent({}): JSX.Element {
  return (
    <div className="w-full p-0 m-0">
      <BarChart datasets={[500000, 425000, 523000, 489000, 579000, 0, 0]} />
    </div>
  );
}
export function Card({
  title,
  description,
  metric,
  link,
  metricType,
  typeChart,
}: Readonly<CardProps>): JSX.Element {
  return (
    <div className="py-4 px-6 text-gray-600">
      <div className="w-full font-sans ">
        <div className="text-xl font-normal">{title}</div>
        <div className="text-sm">
          <p>{description}</p>
        </div>
        {typeChart === "line" && (
          <LineChartAndContent
            title=""
            description=""
            typeChart=""
            metric={metric}
            link={link}
            metricType={metricType}
          />
        )}
        {typeChart === "column" && <VerticalBarChartAndContent />}
      </div>
    </div>
  );
}

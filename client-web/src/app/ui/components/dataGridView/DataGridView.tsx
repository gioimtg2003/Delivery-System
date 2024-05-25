import { DataGridViewProps } from "./DataGridViewProps";
import type { DatagridViewColumn, Employee } from "@/app/lib/Types";
import { EmployeeStatus, OrderStatus } from "@/components/Tag";

export function DataGridView({
  dataSources,
  columns,
  options,
}: Readonly<DataGridViewProps<Employee>>): JSX.Element {
  return (
    <table
      className={` w-full table-auto border-separate border-spacing-0 max-md:border-spacing-1 mt-6 rounded-md`}
    >
      <thead className={`${options?.style?.header?.bgColor} `}>
        <tr
          className={`${options?.style?.header?.textHeaderColor} h-${options?.style?.header?.height}`}
        >
          <th
            className={`text-center ${options?.style?.column?.width && "w-1/12"}`}
          >
            STT
          </th>
          {columns.map((column: DatagridViewColumn, index: number) => (
            <th key={index} className={`${column?.style?.width ?? ""}`}>
              {column["title"]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {dataSources?.map((dataSource: any, index: number) => {
          let tag: any;
          return (
            <tr
              key={index}
              className={
                options?.row?.height
                  ? "h-" + options?.row?.height + " text-center"
                  : "h-20 text-center"
              }
            >
              <td className="border-b-2 border-blue-200">{index}</td>
              {columns.map((column: any, index: number) => {
                if (column["dataIndex"] === "Status") {
                  if (options?.gridType == "employee") {
                    tag = EmployeeStatus(dataSource[column["dataIndex"]]);
                  } else {
                    tag = OrderStatus(dataSource[column["dataIndex"]]);
                  }
                }

                return (
                  <td key={index} className="border-b-2 border-blue-200">
                    {column["dataIndex"] == "Status"
                      ? tag
                      : dataSource[column["dataIndex"]]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

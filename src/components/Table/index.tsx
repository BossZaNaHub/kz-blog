import { FC, ReactNode, TableHTMLAttributes } from "react";

export interface TableHeader {
  key: string;
  name: string;
}

export interface TableBody {
  value: any;
}

interface TableHeaderProps {
  children: ReactNode;
  // headers?: TableHeader[];
}

interface TableBodyProps {
  // data?: TableBody[];
  children: ReactNode;
}

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  striped?: boolean;
  headers?: TableHeader[];
  body?: TableBody[];
};

const Thead: FC<TableHeaderProps> = (props) => {
  // const headers = props.headers;
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      {props.children}
      {/* <tr>
        {headers.map((v) => (
          <th className="p-4" key={v.key}>
            {v.name}
          </th>
        ))}
      </tr> */}
    </thead>
  );
};

const TBody: FC<TableBodyProps> = (props) => {
  return <tbody>{props.children}</tbody>;
};

const Table: FC<TableProps> = (props) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="mx-auto w-full table-fixed  bg-white shadow-lg dark:bg-slate-600" {...props}>
        {props.children}
      </table>
    </div>
  );
};

export { Table, TBody, Thead };

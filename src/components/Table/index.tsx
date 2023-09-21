import { FC, TableHTMLAttributes } from "react";

export interface TableHeader {
  key: string;
  name: string;
}

export interface TableBody {
  value: any;
}

type TableHeaderProps = {
  headers: TableHeader[];
};

type TableBodyProps = TableHTMLAttributes<HTMLTableElement> & {
  data?: TableBody[];
};

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  striped: boolean;
  headers: TableHeader[];
  body?: TableBody[];
};

const Thead: FC<TableHeaderProps> = (props) => {
  const headers = props.headers;
  return (
    <thead className="border-b dark:border-slate-400">
      <tr>
        {headers.map((v) => (
          <th className="p-4" key={v.key}>
            {v.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TBody: FC<TableBodyProps> = (props) => {
  if (props.data) {
    return (
      <tbody>
        <tr>
          {props.data.map((v: TableBody, i: number) => (
            <td className="p-2" key={i}>
              {v.value}
            </td>
          ))}
        </tr>
      </tbody>
    );
  } else {
    return <tbody>{props.children}</tbody>;
  }
};

const Table: FC<TableProps> = (props) => {
  return (
    <>
      <table
        className="mx-auto w-full table-fixed rounded-lg border bg-transparent bg-white shadow-lg dark:bg-slate-600"
        {...props}
      >
        <Thead headers={props.headers} />
        {props.body ? <TBody data={props.body} /> : <TBody>{props.children}</TBody>}
      </table>
    </>
  );
};

export default Table;

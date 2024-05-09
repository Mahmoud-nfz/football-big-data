import Link from "next/link";

interface TableProps {
  columns: string[];
  rows: (string | number | undefined)[][];
  hrefs?: string[];
  ordered?: boolean;
}

export default function Table(props: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg bg-white p-3">
      <table className="min-w-full bg-white p-3">
        <thead>
          <tr>
              {props.ordered && <td className="font-bold">Rank</td>}

            {props.columns.map((column, idx) => (
              <th key={idx} className="whitespace-nowrap px-2 py-1">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-h-32 overflow-y-auto">
          {props.rows.map((row, ridx) => (
            <tr key={ridx}>
              {props.ordered && <td className="font-bold text-center">{ridx+1}</td>}
              {row.map((cell, idx) => (
                <td
                  key={idx}
                  className={`${idx == 0 && "font-semibold capitalize text-blue-700"} text-center whitespace-nowrap px-2 py-1`}
                >
                  <Link href={(props.hrefs && props.hrefs[ridx]) ?? "#"}>
                    {cell}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

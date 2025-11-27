import React,{ useState } from "react";
import StatusSelect from "./StatusSelect";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ja} from 'date-fns/locale/ja';

type Props = {
  task: any;
  showExtraColumn: boolean;
};

export default function TaskRow({ task, showExtraColumn }: Props) {
  const [expanded, setExpanded] = useState(true);
    const Today = new Date();
    const [date,setDate] = React.useState(Today);
    registerLocale('ja', ja);
  return (
    <>
      <tr className="border-b">
        <td className="p-2">
          {task.subtasks && (
            <button onClick={() => setExpanded(!expanded)} className="mr-2">
              {expanded ? "▼" : "▶"}
            </button>
          )}
          {task.name}
        </td>
        <td className="p-2">{task.assignee}</td>
        <td className="p-2"><StatusSelect value={task.status} /></td>
        <td className="p-2"><DatePicker
                    dateFormat="yyyy/MM/dd"
                    locale='ja'
                    selected={date}
                    minDate={Today}
                    onChange={(selectedDate) => {setDate(selectedDate || Today)}}
                  /></td>
        <td className="p-2"><DatePicker
                    dateFormat="yyyy/MM/dd"
                    locale='ja'
                    selected={date}
                    minDate={Today}
                    onChange={(selectedDate) => {setDate(selectedDate || Today)}}
                  /></td>
        {showExtraColumn && <td className="p-2">{task.priority || "-"}</td>}
        <td className="p-2">＋</td>
      </tr>
      {expanded && task.subtasks && task.subtasks.map((sub: any) => (
        <tr key={sub.id} className="border-b bg-gray-50">
          <td className="p-2 pl-8">{sub.name}</td>
          <td className="p-2">{sub.assignee}</td>
          <td className="p-2"><StatusSelect value={sub.status} /></td>
          <td className="p-2">-</td>
          <td className="p-2">-</td>
          {showExtraColumn && <td className="p-2">{sub.priority || "-"}</td>}
          <td className="p-2">＋</td>
        </tr>
      ))}
    </>
  );
}
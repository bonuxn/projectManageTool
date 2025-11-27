import  { useState } from "react";
import TaskRow from "./TaskRow";

type Task = {
  id: string;
  name: string;
  assignee: string;
  status: "未着手" | "処理中" | "完了";
  startDate?: string;
  dueDate?: string;
  priority?: string;
  subtasks?: Task[];
};

const initialTasks: Task[] = [
  {
    id: "1",
    name: "1st",
    assignee: "丸田 龍",
    status: "未着手",
    startDate: "2025-11-27",
    dueDate: "2025-12-10",
    subtasks: [
      { id: "1-1", name: "リリース完了", assignee: "丸田 龍", status: "完了" },
      { id: "1-2", name: "ユニットテスト完了", assignee: "丸田 龍", status: "処理中" },
    ],
  },
];

export default function TaskTable() {
  const [tasks] = useState<Task[]>(initialTasks);
  const [showExtraColumn, setShowExtraColumn] = useState(false);

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">名前</th>
            <th className="p-2">担当者</th>
            <th className="p-2">ステータス</th>
            <th className="p-2">開始日</th>
            <th className="p-2">期限</th>
            {showExtraColumn && <th className="p-2">優先度</th>}
            <th className="p-2 cursor-pointer" onClick={() => setShowExtraColumn(!showExtraColumn)}>＋</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskRow key={task.id} task={task} showExtraColumn={showExtraColumn} />
          ))}
        </tbody>
      </table>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">タスクを追加</button>
    </div>
  );
}
// import React from "react";

type Props = {
  value: "未着手" | "処理中" | "完了";
};

export default function StatusSelect({ value }: Props) {
  return (
    <select className="border rounded p-1" defaultValue={value}>
      <option value="未着手">未着手</option>
      <option value="処理中">処理中</option>
      <option value="完了">完了</option>
    </select>
  );
}
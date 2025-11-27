import "./Project.css"
import React, { useState } from "react";
import TaskTable from "../components/taskTable/TaskTable";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
type ModalType = "task" | "milestone" | null;

const Project: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleAddTaskClick = () => {
    setModalType("task");
  };

  const handleDropdownClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelect = (type: ModalType) => {
    setModalType(type);
    setShowDropdown(false);
  };

  const closeModal = () => setModalType(null);

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      {/* タスクを追加ボタン */}
      <button onClick={handleAddTaskClick}>＋ タスクを追加</button>

      {/* ドロップダウンボタン */}
      <button onClick={handleDropdownClick} style={{ marginLeft: "10px" }}>
        ▼
      </button>
      <div className="taskTable">
        <TaskTable/>
      </div>
      {/* ドロップダウンメニュー */}
      {showDropdown && (
        <ul
          style={{
            position: "absolute",
            top: "40px",
            left: "100px",
            border: "1px solid #ccc",
            background: "#fff",
            listStyle: "none",
            padding: "10px",
            width: "150px",
          }}
        >
          <li
            style={{ padding: "5px", cursor: "pointer" }}
            onClick={() => handleSelect("task")}
          >
            タスク
          </li>
          <li
            style={{ padding: "5px", cursor: "pointer" }}
            onClick={() => handleSelect("milestone")}
          >
            マイルストーン
          </li>
        </ul>
      )}

      {/* モーダル */}
      {modalType && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
            }}
          >
            <h2>
              {modalType === "task" ? "タスク追加画面" : "マイルストーン追加画面"}
            </h2>
            <button onClick={closeModal}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Project;

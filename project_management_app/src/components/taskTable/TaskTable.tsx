
import React, { useEffect, useMemo, useState } from "react";
import "./TaskTable.css"

// ----- Types -----
type Assignee = "" | "A" | "B";

interface SubTask {
  id: string;
  title: string;
  done: boolean;
}

interface Task {
  id: string;
  name: string;
  assignee: Assignee;
  dueDate?: string; // ISO-8601 (YYYY-MM-DD)
  subtasks: SubTask[];
  expanded?: boolean; // ← 追加：ツリー展開状態
}

// ----- Utils -----
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

// ----- Components -----
const TaskList: React.FC<{
  tasks: Task[];
  onOpenDetail: (id: string) => void;
  onUpdateTask: (id: string, partial: Partial<Task>) => void;
  onAddTask: (name: string) => void;
}> = ({ tasks, onOpenDetail, onUpdateTask, onAddTask }) => {
  const [newTaskName, setNewTaskName] = useState("");

  const handleAddNewTaskKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    (e) => {
      if (e.key === "Enter") {
        const name = newTaskName.trim();
        if (!name) return;
        onAddTask(name);
        setNewTaskName("");
      }
    };

  const toggleExpand = (t: Task) => {
    if (t.subtasks.length === 0) return;
    onUpdateTask(t.id, { expanded: !t.expanded });
  };

  const toggleSubDone = (parent: Task, subId: string) => {
    const next = parent.subtasks.map((s) =>
      s.id === subId ? { ...s, done: !s.done } : s
    );
    onUpdateTask(parent.id, { subtasks: next });
  };

  return (
    <div className="card">
      <div className="header">
        <h2>リスト</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>名前</th>
            <th style={{ width: "20%" }}>担当者</th>
            <th style={{ width: "30%" }}>期日</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => {
            const hasSubs = t.subtasks.length > 0;
            const isExpanded = !!t.expanded;

            return (
              <React.Fragment key={t.id}>
                {/* 親タスク行 */}
                <tr>
                  <td>
                    <div className="row-with-caret">
                      <button
                        className={`caret ${hasSubs ? "" : "disabled"}`}
                        title={hasSubs ? (isExpanded ? "折りたたむ" : "展開") : "サブタスクなし"}
                        onClick={() => toggleExpand(t)}
                        disabled={!hasSubs}
                        aria-label={hasSubs ? (isExpanded ? "折りたたむ" : "展開") : "サブタスクなし"}
                      >
                        {hasSubs ? (isExpanded ? "▼" : "▶") : "・"}
                      </button>

                      <button
                        className="link-like"
                        onClick={() => onOpenDetail(t.id)}
                        title="詳細を開く"
                      >
                        {t.name || "（無題のタスク）"}
                      </button>
                    </div>
                  </td>

                  <td>
                    <select
                      value={t.assignee}
                      onChange={(e) =>
                        onUpdateTask(t.id, { assignee: e.target.value as Assignee })
                      }
                    >
                      <option value="">未設定</option>
                      <option value="A">Aさん</option>
                      <option value="B">Bさん</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="date"
                      value={t.dueDate ?? ""}
                      onChange={(e) =>
                        onUpdateTask(t.id, { dueDate: e.target.value })
                      }
                    />
                  </td>
                </tr>

                {/* サブタスク行（展開時） */}
                {hasSubs && isExpanded &&
                  t.subtasks.map((s, idx) => (
                    <tr key={s.id} className="sub-row">
                      <td>
                        <div className="sub-indent">
                          {/* ツリーの視覚ガイド */}
                          <span
                            className={`tree-connector ${idx === t.subtasks.length - 1 ? "last" : ""}`}
                            aria-hidden="true"
                          />
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              checked={s.done}
                              onChange={() => toggleSubDone(t, s.id)}
                            />
                            <span className={s.done ? "done" : ""}>{s.title}</span>
                          </label>
                        </div>
                      </td>
                      {/* サブタスクは列を持たないので空セルで埋める */}
                      <td colSpan={2} />
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}

          {/* Add row */}
          <tr>
            <td colSpan={3}>
              <input
                className="add-input"
                placeholder="タスクを追加…（Enterで追加）"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={handleAddNewTaskKeyDown}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TaskDetailModal: React.FC<{
  task: Task | null;
  onClose: () => void;
  onUpdateTask: (id: string, partial: Partial<Task>) => void;
}> = ({ task, onClose, onUpdateTask }) => {
  const [subInput, setSubInput] = useState("");

  React.useEffect(() => {
    setSubInput("");
  }, [task?.id]);

  if (!task) return null;

  const update = (partial: Partial<Task>) => onUpdateTask(task.id, partial);

  const addSubTask = () => {
    const title = subInput.trim();
    if (!title) return;
    const sub: SubTask = { id: uid(), title, done: false };
    update({ subtasks: [...task.subtasks, sub], expanded: true });
    setSubInput("");
  };

  const onSubKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") addSubTask();
  };

  const toggleSubDone = (subId: string) => {
    const next = task.subtasks.map((s) =>
      s.id === subId ? { ...s, done: !s.done } : s
    );
    update({ subtasks: next });
  };

  const removeSub = (subId: string) => {
    const next = task.subtasks.filter((s) => s.id !== subId);
    update({ subtasks: next, expanded: next.length > 0 ? task.expanded : false });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>タスク詳細</h3>
          <button className="ghost" onClick={onClose} aria-label="閉じる">✕</button>
        </div>

        <div className="modal-body">
          <label className="field">
            <span>名前</span>
            <input
              value={task.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </label>

          <div className="grid">
            <label className="field">
              <span>担当者</span>
              <select
                value={task.assignee}
                onChange={(e) =>
                  update({ assignee: e.target.value as Assignee })
                }
              >
                <option value="">未設定</option>
                <option value="A">Aさん</option>
                <option value="B">Bさん</option>
              </select>
            </label>

            <label className="field">
              <span>期日</span>
              <input
                type="date"
                value={task.dueDate ?? ""}
                onChange={(e) => update({ dueDate: e.target.value })}
              />
            </label>
          </div>

          <div className="subtasks">
            <h4>サブタスク</h4>
            <ul>
              {task.subtasks.map((s) => (
                <li key={s.id} className="subtask-item">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={s.done}
                      onChange={() => toggleSubDone(s.id)}
                    />
                    <span className={s.done ? "done" : ""}>{s.title}</span>
                  </label>
                  <button className="ghost small" onClick={() => removeSub(s.id)}>
                    削除
                  </button>
                </li>
              ))}
            </ul>

            <div className="subtask-add">
              <input
                placeholder="サブタスクを追加…（Enterで追加）"
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                onKeyDown={onSubKeyDown}
              />
              <button onClick={addSubTask}>追加</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----- App -----
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("tasks-demo");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Task[];
        setTasks(parsed);
      } catch {
        // ignore
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks-demo", JSON.stringify(tasks));
  }, [tasks]);

  const currentTask = useMemo(
    () => tasks.find((t) => t.id === currentId) ?? null,
    [tasks, currentId]
  );

  const addTask = (name: string) => {
    const newTask: Task = {
      id: uid(),
      name,
      assignee: "",
      dueDate: "",
      subtasks: [],
      expanded: false, // 追加直後は閉じる。サブタスク追加で自動展開にするなら true に変更可
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, partial: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...partial } : t)));
  };

  const openDetail = (id: string) => setCurrentId(id);
  const closeDetail = () => setCurrentId(null);

  return (
    <main className="container">
      <TaskList
        tasks={tasks}
        onOpenDetail={openDetail}
        onUpdateTask={updateTask}
        onAddTask={addTask}
      />
      <TaskDetailModal
        task={currentTask}
        onClose={closeDetail}
        onUpdateTask={updateTask}
      />
    </main>
  );
};

export default App;

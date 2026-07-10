import { useMemo, useState } from "react";

import Button from "../components/common/Button/Button";

import DashboardLayout from "../components/layout/DashboardLayout/DashboardLayout";
import StatsCard from "../components/dashboard/StatsCard/StatsCard";

import TaskList from "../features/tasks/TaskList/TaskList";
import TaskSearch from "../features/tasks/TaskSearch/TaskSearch";
import TaskFilters from "../features/tasks/TaskFilters/TaskFilters";
import CreateTaskModal from "../features/tasks/CreateTaskModal/CreateTaskModal";

import useTasks from "../hooks/useTasks";
import useToast from "../hooks/useToast";

import "./DashboardPage.css";

const DashboardPage = () => {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTasks();

  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  // ===========================
  // Filter + Search + Sort
  // ===========================

  const filteredTasks = useMemo(() => {
    let data = [...tasks];

    data = data.filter((task) =>
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (filter === "active") {
      data = data.filter(
        (task) => !task.completed
      );
    }

    if (filter === "completed") {
      data = data.filter(
        (task) => task.completed
      );
    }

    switch (sort) {
      case "az":
        data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "za":
        data.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;

      case "oldest":
        data.sort((a, b) => a.id - b.id);
        break;

      default:
        data.sort((a, b) => b.id - a.id);
    }

    return data;
  }, [tasks, searchTerm, filter, sort]);

  // ===========================
  // Dashboard Statistics
  // ===========================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks =
    totalTasks - completedTasks;

  // ===========================
  // Create Task
  // ===========================

  const handleCreateClick = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  // ===========================
  // Edit Task
  // ===========================

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  // ===========================
  // Toggle Complete
  // ===========================

  const handleToggleComplete = async (
    task
  ) => {
    const result =
      await toggleTaskCompletion(task);

    if (result.success) {
      showToast(
        task.completed
          ? "Task marked as active."
          : "Task completed.",
        "success"
      );
    } else {
      showToast(result.message, "error");
    }
  };

  // ===========================
  // Delete Task
  // ===========================

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    const result = await deleteTask(taskId);

    if (result.success) {
      showToast(
        "Task deleted successfully.",
        "success"
      );
    } else {
      showToast(result.message, "error");
    }
  };

  // ===========================
  // Create / Update Task
  // ===========================

  const handleSubmit = async (
    taskData
  ) => {
    let result;

    if (selectedTask) {
      result = await updateTask(
        selectedTask.id,
        {
          ...taskData,
          completed:
            selectedTask.completed,
        }
      );

      if (result.success) {
        showToast(
          "Task updated successfully.",
          "success"
        );
      }
    } else {
      result = await createTask(taskData);

      if (result.success) {
        showToast(
          "Task created successfully.",
          "success"
        );
      }
    }

    if (result.success) {
      setModalOpen(false);
      setSelectedTask(null);
    } else {
      showToast(result.message, "error");
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <section className="stats-grid">
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            icon="📋"
            color="primary"
          />

          <StatsCard
            title="Showing"
            value={filteredTasks.length}
            icon="🔍"
            color="warning"
          />

          <StatsCard
            title="Completed"
            value={completedTasks}
            icon="✅"
            color="success"
          />

          <StatsCard
            title="Active"
            value={activeTasks}
            icon="⏳"
            color="danger"
          />
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Tasks</h2>

            <Button onClick={handleCreateClick}>
              + New Task
            </Button>
          </div>

          <TaskSearch
            value={searchTerm}
            onChange={setSearchTerm}
          />

          <TaskFilters
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
          />

          <TaskList
            tasks={filteredTasks}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleComplete={
              handleToggleComplete
            }
          />
        </section>
      </div>

      <CreateTaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedTask}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
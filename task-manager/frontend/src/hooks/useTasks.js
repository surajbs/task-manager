import { useCallback, useEffect, useState } from "react";

import {
  getTasks,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../api/taskApi";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ===========================
  // Fetch Tasks
  // ===========================

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Failed to fetch tasks."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ===========================
  // Create Task
  // ===========================

  const createTask = async (taskData) => {
    try {
      const newTask = await createTaskApi(taskData);

      setTasks((prev) => [newTask, ...prev]);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.detail ||
          "Failed to create task.",
      };
    }
  };

  // ===========================
  // Update Task
  // ===========================

  const updateTask = async (
    taskId,
    taskData
  ) => {
    try {
      const updatedTask =
        await updateTaskApi(taskId, taskData);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? updatedTask
            : task
        )
      );

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.detail ||
          "Failed to update task.",
      };
    }
  };

  // ===========================
  // Toggle Task Completion
  // ===========================

  const toggleTaskCompletion = async (
    task
  ) => {
    return await updateTask(task.id, {
      title: task.title,
      completed: !task.completed,
    });
  };

  // ===========================
  // Delete Task
  // ===========================

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskApi(taskId);

      setTasks((prev) =>
        prev.filter(
          (task) => task.id !== taskId
        )
      );

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.detail ||
          "Failed to delete task.",
      };
    }
  };

  // ===========================
  // Initial Load
  // ===========================

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,

    loading,

    error,

    fetchTasks,

    createTask,

    updateTask,

    toggleTaskCompletion,

    deleteTask,
  };
};

export default useTasks;
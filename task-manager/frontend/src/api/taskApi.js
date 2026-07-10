import axiosInstance from "./axios";

/**
 * Get all tasks
 */
export const getTasks = async () => {
  const response = await axiosInstance.get("/tasks");

  return response.data;
};

/**
 * Create task
 */
export const createTask = async (taskData) => {
  const response = await axiosInstance.post(
    "/tasks",
    taskData
  );

  return response.data;
};

/**
 * Update task
 */
export const updateTask = async (
  taskId,
  taskData
) => {
  const response = await axiosInstance.put(
    `/tasks/${taskId}`,
    taskData
  );

  return response.data;
};

/**
 * Delete task
 */
export const deleteTask = async (taskId) => {
  const response = await axiosInstance.delete(
    `/tasks/${taskId}`
  );

  return response.data;
};
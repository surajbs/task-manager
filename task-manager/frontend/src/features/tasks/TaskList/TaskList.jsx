import EmptyState from "../../../components/common/EmptyState/EmptyState";

import TaskCard from "../TaskCard/TaskCard";
import TaskSkeleton from "../TaskSkeleton/TaskSkeleton";

import "./TaskList.css";

const TaskList = ({
  tasks,
  loading,
  error,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {

  if (loading) {
    return (
      <div className="task-list">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-error">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No Tasks Found"
        description="Create your first task to get started."
      />
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleting={loading}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
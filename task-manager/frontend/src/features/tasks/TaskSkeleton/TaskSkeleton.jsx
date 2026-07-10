import "./TaskSkeleton.css";

const TaskSkeleton = () => {
  return (
    <div className="task-skeleton">

      <div className="skeleton-header">

        <div className="skeleton-title"></div>

        <div className="skeleton-badge"></div>

      </div>

      <div className="skeleton-id"></div>

      <div className="skeleton-divider"></div>

      <div className="skeleton-footer">

        <div className="skeleton-button"></div>

        <div className="skeleton-button"></div>

      </div>

    </div>
  );
};

export default TaskSkeleton;
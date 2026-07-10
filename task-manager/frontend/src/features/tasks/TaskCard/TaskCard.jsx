import Button from "../../../components/common/Button/Button";
import Badge from "../../../components/common/Badge/Badge";

import "./TaskCard.css";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  deleting = false,
}) => {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <div>
          <h3
            className="task-title"
            style={{
              textDecoration: task.completed
                ? "line-through"
                : "none",
              opacity: task.completed ? 0.7 : 1,
            }}
          >
            {task.title}
          </h3>

          <p className="task-id">
            Task #{task.id}
          </p>
        </div>

        <Badge
          variant={
            task.completed
              ? "success"
              : "primary"
          }
        >
          {task.completed
            ? "Completed"
            : "Active"}
        </Badge>
      </div>

      <div className="task-divider"></div>

      <div className="task-footer">
        <Button
          variant={
            task.completed
              ? "secondary"
              : "success"
          }
          disabled={deleting}
          onClick={() =>
            onToggleComplete(task)
          }
        >
          {task.completed
            ? "Mark Active"
            : "Complete"}
        </Button>

        <Button
          variant="secondary"
          disabled={deleting}
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          disabled={deleting}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
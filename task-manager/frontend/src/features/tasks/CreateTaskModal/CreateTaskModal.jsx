import { useEffect, useState } from "react";

import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";

import "./CreateTaskModal.css";

const CreateTaskModal = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setTitle(initialData.title);
    } else {
      setTitle("");
    }

    setError("");
    setSaving(false);
  }, [initialData, open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !saving) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, saving, onClose]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    setSaving(true);

    await onSubmit({
      title: title.trim(),
    });

    setSaving(false);
  };

  return (
    <div
      className="modal-overlay"
      onClick={!saving ? onClose : undefined}
    >
      <div
        className="task-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            {initialData
              ? "Edit Task"
              : "Create Task"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Task Title"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            error={error}
            autoFocus
          />

          <div className="modal-actions">
            <Button
              type="button"
              variant="secondary"
              disabled={saving}
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                saving ||
                !title.trim() ||
                title === initialData?.title
              }
            >
              {saving
                ? "Saving..."
                : initialData
                ? "Save Changes"
                : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
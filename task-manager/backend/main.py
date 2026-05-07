from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

tasks = []

# Request schema (input validation)
class Task(BaseModel):
    id: int
    title: str

class TaskUpdate(BaseModel):
    title: str

# Create task
@app.post("/tasks")
def create_task(task: Task):
    task_dict = task.model_dump()

    # Check duplicate ID
    if any(t["id"] == task_dict["id"] for t in tasks):
        return {"error": "Task with this ID already exists"}

    tasks.append(task_dict)
    return {"message": "Task added", "task": task_dict}


# Get all tasks
@app.get("/tasks")
def get_tasks():
    return tasks


# Update task
@app.put("/tasks/{task_id}")
def update_task(task_id: int, update_data: TaskUpdate):
    for task in tasks:
        if task["id"] == task_id:
            task["title"] = update_data.title
            return {"message": "Task updated", "task": task}
    return {"error": "Task not found"}


# Delete task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for index, task in enumerate(tasks):
        if task["id"] == task_id:
            deleted = tasks.pop(index)
            return {"message": "Task deleted", "task": deleted}
    return {"error": "Task not found"}
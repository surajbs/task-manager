from fastapi import FastAPI

app = FastAPI()

tasks = []

@app.post("/tasks")
def create_task(task: dict):
    if any(t["id"] == task["id"] for t in tasks):
        return {"error": "Task with this ID already exists"}
    
    tasks.append(task)
    return {"message": "Task added", "task": task}

@app.get("/tasks")
def get_tasks():
    return tasks

@app.put("/tasks/{task_id}")
def update_task(task_id: int, update_data: dict):
    for task in tasks:
        if task["id"] == task_id:
            task["title"] = update_data.get("title", task["title"])
            return {"message": "Task updated", "task": task}
    return {"error": "Task not found"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for index, task in enumerate(tasks):
        if task["id"] == task_id:
            deleted = tasks.pop(index)
            return {"message": "Task deleted", "task": deleted}
    return {"error": "Task not found"}
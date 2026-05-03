from fastapi import FastAPI
app = FastAPI()
tasks = []

@app.post("/tasks")
def create_task(task: dict):
    # Check if task with this ID already exists
    if not any(t["id"] == task["id"] for t in tasks):
        tasks.append(task)
    return {"message": "Task added", "task": task}

@app.get("/tasks")
def get_tasks():
    return tasks
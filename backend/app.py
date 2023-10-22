from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []

@app.route('/')
def index():
    return jsonify({"message": "API is working!"})

@app.route('/add-task', methods=['POST'])
def add_task():
    task_data = request.json
    tasks.append(task_data)
    return jsonify({"success": True, "task": task_data})

@app.route('/get-tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/update-task', methods=['PUT'])
def update_task():
    task_data = request.json
    for task in tasks:
        if task['id'] == task_data['id']:
            task['completed'] = task_data['completed']
            task['text'] = task_data['text']
            return jsonify({"success": True, "message": "Task updated successfully"})
    return jsonify({"success": False, "message": "Task not found"})

@app.route('/delete-task', methods=['DELETE'])
def delete_task():
    task_id = request.json['id']
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"success": True, "message": "Task deleted successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username == "admin" and password == "1234":
        return jsonify({"success": True, "message": "Logged in successfully"})
    else:
        return jsonify({"success": False, "message": "Invalid username or password"})

if __name__ == "__main__":
    app.run(debug=True)



























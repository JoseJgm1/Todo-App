from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esto permite las solicitudes CORS de cualquier origen.

tasks = []  # Esta es una lista temporal para guardar tareas. En una aplicación real, usarías una base de datos.

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

if __name__ == "__main__":
    app.run(debug=True)



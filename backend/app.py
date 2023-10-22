from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
CORS(app)  # Esto permite las solicitudes CORS de cualquier origen.
auth = HTTPBasicAuth()

users = {
    "admin": "1234"
}

tasks = []  # Esta es una lista temporal para guardar tareas.
logged_in = False  # Variable global para rastrear el estado de inicio de sesión

@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username

@app.route('/')
@auth.login_required
def index():
    return jsonify({"message": "API is working!"})

@app.route('/add-task', methods=['POST'])
@auth.login_required
def add_task():
    task_data = request.json
    tasks.append(task_data)
    return jsonify({"success": True, "task": task_data})

@app.route('/get-tasks', methods=['GET'])
@auth.login_required
def get_tasks():
    return jsonify(tasks)

@app.route('/delete-task/<task_id>', methods=['DELETE'])
@auth.login_required
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return jsonify({"success": True, "message": "Task deleted successfully"})

@app.route('/login', methods=['POST'])
def login():
    global logged_in
    data = request.json
    if data['username'] == 'admin' and data['password'] == '1234':
        logged_in = True
        return jsonify({"success": True, "message": "Logged in successfully"})
    return jsonify({"success": False, "message": "Invalid credentials"})

@app.route('/logout', methods=['POST'])
@auth.login_required
def logout():
    global logged_in
    logged_in = False
    return jsonify({"success": True, "message": "Logged out successfully"})

@app.before_request
def before_request():
    if not logged_in and request.endpoint not in ['login', 'static']:
        abort(401, "You are not logged in.")

if __name__ == "__main__":
    app.run(debug=True)



























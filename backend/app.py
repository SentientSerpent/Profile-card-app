from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage
profiles = {}
current_id = 1

def calculate_overall_fit(strengths, weaknesses):
    strength_score = len(strengths)
    weakness_score = len(weaknesses)

    if strength_score >= 3 and weakness_score <= 1:
        return "Excellent"
    elif strength_score >= 2 and weakness_score <= 2:
        return "Good"
    elif strength_score >= 1:
        return "Average"
    else:
        return "Needs Improvement"

@app.route('/profile', methods=['POST'])
def add_profile():
    global current_id
    data = request.get_json()
    
    strengths = data.get("strengths", [])
    weaknesses = data.get("weaknesses", [])
    overall_fit = calculate_overall_fit(strengths, weaknesses)

    profiles[str(current_id)] = {
        "name": data.get("name"),
        "strengths": strengths,
        "weaknesses": weaknesses,
        "overall_fit": overall_fit
    }

    response = {"message": "Profile added", "user_id": current_id}
    current_id += 1
    return jsonify(response), 201

@app.route('/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    return jsonify(profiles.get(user_id, {"error": "User not found"}))

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv('key.env')

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)

def fitness_evaluation(data):
    # Your gym check recommendation code
    messages = []
    messages.append({"role": "system", "content": "A fitness AI dedicated to giving very specific fitness and diet plans to people with different demographics. Split up the fitness and diet plan and display the gym plan in a grid with each day's workouts defined."})

    # Extract variables from request data
    age = data['age']
    height_meters = data['height_meters']
    weight_kg = data['weight_kg']
    gender = data['gender']
    activity_levels_1highest = data['activity_levels_1highest']
    free_time_daily_hours = data['free_time_daily_hours']
    a_pwd = data['a_pwd']
    additional_info = data['additional_info'] if 'additional_info' in data else 'null'
    user_goals = data['user_goals']
    target_muscles = data['target_muscles']
    available_days = data['available_days']
    existing_workout_plan = data['existing_workout_plan']

    message = f"Give a person with age of {age}, height of {height_meters} meters, weight of {weight_kg} kg, activity levels of {activity_levels_1highest} with 1 being the highest activity level, free time daily of {free_time_daily_hours} in hours, is {a_pwd}, and has additional info of {additional_info}. User goals: {user_goals}. Target muscles: {', '.join(target_muscles)}. Available days: {', '.join(available_days)}. Existing workout plan: {existing_workout_plan}"
    messages.append({"role": "user", "content": message})

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Change this according to the model name available.
        messages=messages)

    reply = response["choices"][0]["message"]["content"]
    return reply

@app.route("/", methods=["POST"])
def main():
    data = request.get_json()  # Get data from POST request

    if data is not None:
        fitness_advice = fitness_evaluation(data)

        # Return response as JSON
        return jsonify({'fitness_advice': fitness_advice})
    else:
        # Handle the case when data is None (or not in the expected format)
        return jsonify({'error': 'Invalid data format'})

if __name__ == "__main__":
    app.run(debug=True)

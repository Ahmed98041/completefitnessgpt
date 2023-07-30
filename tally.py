from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv('key.env')

# Set up your OpenAI API key
openai.api_key = os.getenv('OPEN_API_KEY')

app = Flask(__name__)

# Define the fitness evaluation function
def fitness_evaluation(data):
    pwd = "a pwd" if data.get("a_pwd") else "not a pwd"
    additional_info = data.get("additional_info", "nothing")

    message = f"Give a person with age of {data.get('age')}, height of {data.get('height_meters')} meters, weight of {data.get('weight_kg')} kg, activity levels of {data.get('activity_levels_1highest')} with 1 being the highest activity level, free time daily of {data.get('free_time_daily_hours')} in hours, is {pwd}, and has additional info of {additional_info}. User goals: {data.get('user_goals')}. Target muscles: {', '.join(data.get('target_muscles', []))}. Available days: {', '.join(data.get('available_days', []))}. Existing workout plan: {data.get('existing_workout_plan')}"
    messages = [{"role": "system", "content": "A fitness AI dedicated to giving very specific fitness and diet plans to people with different demographics"}, {"role": "user", "content": message}]

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages)
    reply = response["choices"][0]["message"]["content"]
    fitness_advice = reply
    
    return fitness_advice


# Route to handle incoming Tally webhook requests
@app.route('/webhook', methods=['POST'])
def handle_webhook():
    data = request.get_json()
    fitness_advice = fitness_evaluation(data)

    return jsonify({'fitness_advice': fitness_advice})

if __name__ == '__main__':
    app.run(debug=True)

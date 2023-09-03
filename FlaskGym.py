from flask import Flask, render_template, request
import openai
import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv('key.env')

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__, static_folder='/Users/walidahmed/Documents/Documents/DataScience/static')

def fitness_evaluation(age, height_meters, weight_kg, gender, activity_levels_1highest, free_time_daily_hours, a_pwd, additional_info, user_goals, target_muscles, available_days, existing_workout_plan):
    messages = []
    messages.append({"role": "system", "content": "A fitness AI dedicated to giving very specific fitness and diet plans to people with different demographics. Split up the fitness and diet plan and display the gym plan in a grid with each days workouts defined."})
    pwd = "a pwd" if a_pwd else "not a pwd"
    additional_info = additional_info if additional_info else "nothing"

    message = f"Give a person with age of {age}, height of {height_meters} meters, weight of {weight_kg} kg, activity levels of {activity_levels_1highest} with 1 being the highest activity level, free time daily of {free_time_daily_hours} in hours, is {pwd}, and has additional info of {additional_info}. User goals: {user_goals}. Target muscles: {', '.join(target_muscles)}. Available days: {', '.join(available_days)}. Existing workout plan: {existing_workout_plan}"
    messages.append({"role": "user", "content": message})
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages)
    reply = response["choices"][0]["message"]["content"]
    fitness_advice = [{"title": "Fitness Advice", "content": reply}]
    
    return fitness_advice

@app.route("/", methods=["GET", "POST"])
def main():
    if request.method == "POST":
        # Get user inputs from the form
        age = request.form["age"]
        height_meters = float(request.form["height_meters"])
        weight_kg = int(request.form["weight_kg"])
        gender = request.form["gender"]
        activity_levels_1highest = request.form["activity_levels_1highest"]
        free_time_daily_hours = float(request.form["free_time_daily_hours"])
        a_pwd = True if request.form.get("a_pwd") else False
        additional_info = request.form["additional_info"]
        user_goals = request.form["user_goals"]
        target_muscles = request.form.getlist("target_muscles")
        available_days = request.form.getlist("available_days")
        existing_workout_plan = request.form["existing_workout_plan"]

        # Call the fitness_evaluation function and get the results
        fitness_advice = fitness_evaluation(age, height_meters, weight_kg, gender, activity_levels_1highest, free_time_daily_hours, a_pwd, additional_info, user_goals, target_muscles, available_days, existing_workout_plan)

        return render_template("result.html", fitness_advice=fitness_advice)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

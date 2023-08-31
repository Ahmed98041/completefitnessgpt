import streamlit as st
import openai
import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv('key.env')

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def fitness_evaluation(age, height_meters, weight_kg, gender, activity_levels_1highest, free_time_daily_hours, a_pwd, additional_info, user_goals, target_muscles, available_days, existing_workout_plan):
    messages = []
    messages.append({"role": "system", "content": "A fitness AI dedicated to giving very specific fitness and diet plans to people with different demographics"})
    pwd = "a pwd" if a_pwd else "not a pwd"
    additional_info = additional_info if additional_info else "nothing"

    message = f"Give a person with age of {age}, height of {height_meters} meters, weight of {weight_kg} kg, activity levels of {activity_levels_1highest} with 1 being the highest activity level, free time daily of {free_time_daily_hours} in hours, is {pwd}, and has additional info of {additional_info}. User goals: {user_goals}. Target muscles: {', '.join(target_muscles)}. Available days: {', '.join(available_days)}. Existing workout plan: {existing_workout_plan}"
    messages.append({"role": "user", "content": message})
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages)
    reply = response["choices"][0]["message"]["content"]
    fitness_advice = reply
    
    return fitness_advice

def main():
    st.title("FitnessGPT")
    st.markdown("A mini project dedicated to helping people with their fitness goals.")
    st.markdown("Check out my GitHub account at [https://github.com/WalidAhmed0](https://github.com/WalidAhmed0)")

    age = st.text_input("Age")
    height_meters = st.slider("Height (meters)", 0.0, 2.5)
    weight_kg = st.slider("Weight (kg)", 0, 200)
    gender = st.radio("Gender", ["Male", "Female"])
    activity_levels_1highest = st.radio("Activity Levels", ["1", "2", "3", "4", "5"])
    free_time_daily_hours = st.slider("Free Time Daily (hours)", 0, 24)
    a_pwd = st.checkbox("A Person with Disability (PWD)")
    additional_info = st.text_input("Additional Information")

    user_goals = st.text_input("User Goals")
    target_muscles = st.multiselect("Target Muscles", ["Abdominals", "Abductors", "Biceps", "Calves", "Chest", "Forearms", "Glutes", "Hamstrings", "Lats", "Lower back", "Middle Back", "Traps", "Neck", "Quadriceps", "Shoulders", "Triceps"])
    available_days = st.multiselect("Available Days", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    existing_workout_plan = st.text_area("Existing Workout Plan")

    if st.button("Evaluate"):
        fitness_advice = fitness_evaluation(age, height_meters, weight_kg, gender, activity_levels_1highest, free_time_daily_hours, a_pwd, additional_info, user_goals, target_muscles, available_days, existing_workout_plan)
        
        st.write("Fitness Advice:")
        st.write(fitness_advice)

if __name__ == "__main__":
    main()

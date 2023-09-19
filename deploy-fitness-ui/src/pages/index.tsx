import { useState } from 'react';
import { useRouter } from 'next/router'; 
import RootLayout from '../app/layout';  
import { RadioGroup } from '@/components/ui/radio-group';  
import { Textarea } from '@/components/ui/textarea';  
import { Button } from '@/components/ui/button';

function HomePage() {
  const [formData, setFormData] = useState<{
    age: number | null;
    height_meters: number | null;
    weight_kg: number | null;
    gender: string;
    activity_levels_1highest: string;
    free_time_daily_hours: string;
    a_pwd: boolean;
    additional_info: string;
    user_goals: string;
    target_muscles: string[];
    available_days: string[];
    existing_workout_plan: string;
    [key: string]: any; 
  }>({
    age: null,
    height_meters: null,
    weight_kg: null,
    gender: '',
    activity_levels_1highest: 'Not Active',
    free_time_daily_hours: '',
    a_pwd: false,
    additional_info: '',
    user_goals: '',
    target_muscles: [],
    available_days: [],
    existing_workout_plan: ''
  });

  const router = useRouter(); // Initializing useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };

  const handleRadioChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    if(name && value) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: checked ? [...prevState[name], value] : prevState[name].filter((item: string) => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Sending a POST request to the Flask backend with the form data
    const response = await fetch('http://localhost:5000/fitness_advice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Getting the JSON response from the backend
    const result = await response.json();

    // Redirecting to the results page with the response data
    router.push({
      pathname: '/results',
      query: { data: JSON.stringify(result) }
    });
  };

  return (
    <RootLayout>
      <form onSubmit={handleSubmit} style={{ padding: '40px', paddingTop: '60px', marginTop: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <label htmlFor="age">Age:</label>
          <input type="number" className="form-control" id="age" name="age" min="1" max="100" value={formData.age || ''} onChange={handleChange} required style={{ border: '1px solid black' }} />
        </div>
  
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <label htmlFor="height_meters">Height (meters):</label>
          <input type="number" className="form-control" id="height_meters" name="height_meters" step="0.01" min="1.524" max="2.4384" value={formData.height_meters || ''} onChange={handleChange} required style={{ border: '1px solid black' }} />
        </div>
  
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <label htmlFor="weight_kg">Weight (kg):</label>
          <input type="number" className="form-control" id="weight_kg" name="weight_kg" min="15" max="300" value={formData.weight_kg || ''} onChange={handleChange} required style={{ border: '1px solid black' }} />
        </div>
  
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <label>Gender:</label><br />
          <RadioGroup name="gender" value={formData.gender} onChange={handleRadioChange} style={{ display: 'flex', gap: '20px' }}>
            <label>
              <input type="radio" value="Male" name="gender" /> Male
            </label>
            <label>
              <input type="radio" value="Female" name="gender" /> Female
            </label>
            <label>
              <input type="radio" value="Prefer not to say" name="gender" /> Prefer not to say
            </label>
          </RadioGroup>
        </div>
  
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <label htmlFor="activity_levels_1highest">Activity Levels:</label>
          <select id="activity_levels_1highest" className="form-control" name="activity_levels_1highest" value={formData.activity_levels_1highest} onChange={handleChange} required style={{ border: '1px solid black' }}>
            <option value="Not Active">Not Active</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
  
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <label>Available Days:</label><br />
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input type="checkbox" id={day.toLowerCase()} name="available_days" value={day} onChange={handleCheckboxChange} />
              <label htmlFor={day.toLowerCase()}>{day}</label><br />
            </div>
          ))}
        </div>
  
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <label>Target Muscles:</label><br />
          {['Abdominals', 'Abductors', 'Biceps', 'Calves', 'Chest', 'Forearms', 'Glutes', 'Hamstrings', 'Lats', 'Lower Back', 'Middle Back', 'Neck', 'Quadriceps', 'Shoulders', 'Triceps', 'Traps'].map((muscle, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input type="checkbox" id={muscle.toLowerCase().replace(' ', '_')} name="target_muscles" value={muscle} onChange={handleCheckboxChange} />
              <label htmlFor={muscle.toLowerCase().replace(' ', '_')}>{muscle}</label><br />
            </div>
          ))}
        </div>
  
        <div className="form-group" style={{ marginBottom: '50px' }}>
          <label htmlFor="existing_workout_plan">Existing Workout Plan:</label>
          <Textarea className="form-control" id="existing_workout_plan" name="existing_workout_plan" value={formData.existing_workout_plan} onChange={handleChange} style={{ border: '1px solid black' }} />
        </div>
  
        {/* Adding a "See Results" button at the end of the form */}
        <Button type="submit">See Results</Button>
      </form>
    </RootLayout>
  );
}

export default HomePage;

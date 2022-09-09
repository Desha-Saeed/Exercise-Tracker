import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <form
      className='create'
      onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label htmlFor='title'>Exercise Title:</label>
      <input
        type='text'
        id='title'
        name='title'
        className={emptyFields.includes('title') ? 'error' : ''}
        onChange={(e) => handleChange(e, setTitle)}
        value={title}
      />
      <label htmlFor='Load'>Loads in kg:</label>
      <input
        type='number'
        id='Load'
        name='Load'
        className={emptyFields.includes('load') ? 'error' : ''}
        onChange={(e) => handleChange(e, setLoad)}
        value={load}
      />
      <label htmlFor='reps'>number of reps:</label>
      <input
        type='number'
        id='reps'
        name='reps'
        className={emptyFields.includes('reps') ? 'error' : ''}
        onChange={(e) => handleChange(e, setReps)}
        value={reps}
      />

      <button type='submit'>Add Workout</button>

      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;

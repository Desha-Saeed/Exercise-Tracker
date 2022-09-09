import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutContext';

export const useLogout = () => {
  const { dispatch: dispatchAuth } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const logout = () => {
    //remove token
    localStorage.removeItem('user');

    //update auth context

    dispatchAuth({ type: 'LOGOUT' });
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};

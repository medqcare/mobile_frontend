import { instance } from '../../config';
import { LOADING_SPECIALISTS, SET_SPECIALISTS } from '../keys/specialists';

export function getSpecialists(param = {}) {
  const query = new URLSearchParams(param)
  return async (dispatch) => {
    dispatch({
      type: LOADING_SPECIALISTS,
      payload: true,
    });
    try {
      const { data } = await instance({
        url: `specialists?${query.toString()}`,
        method: 'GET',
      });

      const { specialists } = data;

      dispatch({
        type: SET_SPECIALISTS,
        payload: specialists,
      });
    } catch (error) {
      console.log(error.message, 'error get specialists');
    } finally {
      dispatch({
        type: LOADING_SPECIALISTS,
        payload: false,
      });
    }
  };
}

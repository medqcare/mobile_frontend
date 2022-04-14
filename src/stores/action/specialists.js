import { instance } from '../../config';
import getToken from '../../helpers/localStorage/token';
import keys from '../keys';

const {
  SET_SPECIALISTS,
  SET_SPECIALISTS_LOADING,
  SET_SPECIALISTS_ERROR
} = keys.specialistKeys

export function getSpecialists(param = {}) {
  const query = new URLSearchParams(param)
  return async (dispatch) => {
    dispatch({
      type: SET_SPECIALISTS_LOADING,
      payload: true,
    });
    try {
      const token = await getToken()
      const { data } = await instance({
        method: 'GET',
        url: `specialists?${query.toString()}`,
        headers: {
          Authorization: token
        }
      });

      const { specialists } = data;

      dispatch({
        type: SET_SPECIALISTS,
        payload: specialists,
      });
    } catch (error) {
      // console.log(error.message, 'error get specialists');
      console.log(error.response.data, 'error get specialists');
      await dispatch({
        type: SET_SPECIALISTS_ERROR,
        payload: error.response.data
      })
    } finally {
      dispatch({
        type: SET_SPECIALISTS_LOADING,
        payload: false,
      });
    }
  };
}

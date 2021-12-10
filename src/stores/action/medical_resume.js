import axios from 'axios';
import { baseURL } from '../../config';

const instance = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

export function getDocumentByPatient(token, patientid) {
  return (
    instance({
      url: '/members/getDocumentByPatient',
      method: 'GET',
      headers: {
        Authorization: token,
        patientid
      },
    })
  )
}

export function uploadDocument(token, patientid, data) {
  return (
    instance({
      url: '/members/addDokumen',
      method: 'POST',
      headers: {
        Authorization: token,
        patientid
      },
      data
    })
  )
}

export function renameDocument(token, patientid, data) {
  return (
    instance({
      url: '/members/renameDocument',
      method: 'PATCH',
      headers: {
        Authorization: token,
        patientid
      },
      data
    })
  )
}

export function deleteDocument(token, patientid, data) {
  return (
    instance({
      url: '/members/deleteDocument',
      method: 'DELETE',
      headers: {
        Authorization: token,
        patientid
      },
      data
    })
  )
}

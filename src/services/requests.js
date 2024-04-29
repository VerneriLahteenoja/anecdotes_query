import axios from "axios"


const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const createOne = (newAnecdote) => {
  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const updateOne = (updatedAnecdote) => {
  return axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
}

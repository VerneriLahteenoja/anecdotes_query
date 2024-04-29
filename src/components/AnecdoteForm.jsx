import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOne } from '../services/requests'
import { useContext } from 'react'
import NotificationContext from './Notification'


const AnecdoteForm = () => {
  const [message, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      dispatch({ type: "CREATE", payload: "Created!"})
      setTimeout(() => {
        dispatch({ })
      }, 5000)
    },
    onError: () => {
      dispatch({ type: "ERROR", payload: "Failed to create"})
      setTimeout(() => {
        dispatch({ })
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

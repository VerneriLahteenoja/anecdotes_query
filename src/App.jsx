import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateOne } from './services/requests'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'


const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: updateOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })
  const handleVote = async (anecdote) => {
    newAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes+1})
    console.log('vote')
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

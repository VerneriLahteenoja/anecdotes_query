import { createContext, useReducer } from "react"


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return action.payload
    case "CREATE":
      return action.payload
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, '')

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {message && <div style={style}>
        {message}
      </div>}
        {props.children}
    </NotificationContext.Provider>
    
  )
}

export default NotificationContext

import React from 'react'

const Logout = ({setUser}) => {

    const [message, setMessage] = React.useState("Click below to confirm")

    const logout = () => {
        setUser("");
        setMessage("Successfully logged out");
    }

  return (
    <div>
        <p>{message}</p>
        <button onClick={logout}>Logout</button></div>
  )
}

export default Logout
import { useState } from "react";
import OneUser from "./OneUser";

export default function FetchUserOnClick({ id }) {
  const
    [user, setUser] = useState(null),
    [error, setError] = useState(null),
    onClick = async () => {
      try {
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
        if (!response.ok) throw new Error('fetch ' + response.status);
        setUser(await response.json());
        //setError(null)
      } catch (err) {
        setError(err);
      }
    };


  if (error)
    return <h3>Error={error.message}</h3>;
  if (user)
    return <OneUser user={user} />

  return <fieldset><button onClick={onClick}>click to fetch user #{id}</button></fieldset>;
}
import { useEffect, useState } from "react";
import OneUser from "./OneUser";

export default function FetchUser({ id }) {
  const
    [user, setUser] = useState(null),
    [error, setError] = useState(null);

  // useEffect(
  //   () => {
  //     fetch('https://jsonplaceholder.typicode.com/users/' + id)
  //       .then(response => response.json())
  //       .then(u => setUser(u))
  //       .catch(err => setError(err));
  //   },
  //   []
  // );

  useEffect(() => {
    async function f() {
      try {
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
        if (!response.ok) throw new Error('fetch ' + response.status);
        setUser(await response.json());
        //setError(null)
      } catch (err) {
        setError(err);
      }
    }
    f();
  }, []);


  if (error)
    return <>Error={error.message}</>;
  if (user)
    return <OneUser user={user} />

  return <>loading...</>;
}
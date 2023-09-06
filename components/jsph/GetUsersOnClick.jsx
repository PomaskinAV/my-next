import { useState } from "react";
import FetchUserOnClick from "./FetchUserOnClick";

export default function GetUsersOnClick() {
  const [ids, setIds] = useState([1,2]);
  return <>
    {ids.map(id => <FetchUserOnClick id={id} key={id} />)}
    <button onClick={()=>setIds(ids.concat(ids.length + 1))}>add user</button>
  </>
}
import { useAuth } from "../context/AuthContext"

export default function Home(){
  const { session, logout } = useAuth();

  return(
    <>
      <div className="flex flex-col">

          <h1>hello {session?.username}</h1>

        <div >
          <button className="cursor-pointer hover:text-red-500" onClick={logout}>logout</button>
        </div >
      </div>
    </>
  )
}

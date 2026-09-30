import {useAuth} from "../hooks/fetchUser";

const HomePage = () => {
const {user} = useAuth();


  return (
    <div>
      <h1>{user?.name}</h1>
    </div>
  )
}

export default HomePage;
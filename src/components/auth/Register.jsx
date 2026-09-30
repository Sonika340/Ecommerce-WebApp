import {useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../state-mangement/contextApi";
import Styles from "./auth.module.css";
import toast from "react-hot-toast";

const Register = () => {
  let {register} = useContext(AuthContext);
  let [mailUrl , setMailUrl] = useState(localStorage.getItem("mailUrl"))
  let navigate = useNavigate();
  let [state , setState] = useState({
    name:"",
    email:"",
    password:"",
    isLoading:false,
    avatar:"https://i.pravatar.cc/150?img=3"
  });
let {name , email , password , isLoading , avatar} = state;



let handleChange = e =>{
  const {name , value} = e.target;
  setState({...state , [name]:value})
}

let handleSubmit = async(e) =>{
  e.preventDefault();
  try {
      let payload = {name , email , password};
      setState({isLoading:true});
      await register(payload);
   toast.success(`successfully email has been send to ${email}`);
      navigate("/auth/activate");
      // window.location.assign(mailUrl)

  } catch (error) {
    console.log(err);
      toast.error("something went wrong")
  }finally {
     setState({isLoading:false , name:"" , email:"" , password:""})
     
  }
 
}

  return (
    <section id={Styles.auth}>
      <article className={Styles.auth_block}>
        <header>
          <h1>Register</h1>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="enter name"
                required
                value={name}
                id="name"
                onChange={handleChange}
              />
            </div>
             <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="enter email"
                required
                value={email}
                id="email"
                 onChange={handleChange}
              />
            </div>

               <div className="form-group">
              <label htmlFor="email">password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="enter password"
                required
                value={password}
                id="password"
                 onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button>{isLoading ? 'loading ' : "Register"}</button>
            </div>
          </form>
        </main>
      </article>
    </section>
  );
};

export default Register;

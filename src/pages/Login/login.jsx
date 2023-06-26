import { useState } from "react";
import { useDispatch } from "react-redux"
import { login } from "../../redux-toolkit/auth/authThunks";

export default function Login(){
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
      email: "",
      password: "",
    });

    const isLogin = false;
    const handleEmail = (e) =>{
      console.log(e.target.value)
        setAccount((preV) => {
          return{...preV, email: e.target.value}
      })
    }

    const handlePassword = (e) =>{
      setAccount((preV) => {
          return{...preV, password: e.target.value}
      })
    }

    console.log(account)
    const handleLogin = async(e) =>{
      e.preventDefault();
        dispatch(login(account));
      
    }

    // const renderForm =(
 
    // )
    return(
      <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" >
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={account.email}
              onChange={handleEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={setAccount.password}
              onChange={handlePassword}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
    )
}

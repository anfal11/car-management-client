import { Link } from "react-router-dom";
import login from '../assets/images/login/login.svg'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { BsFacebook, BsGithub } from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";

const Register = () => {

    const {createUser} = useContext(AuthContext);


    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            name: form.get('name'),
            email: form.get('email'),
            password: form.get('password'),
        }
        console.log(data);
        e.target.reset();

        createUser(data.email, data.password)
        .then((res) => {
            const user = res.user;
            // console.log(user);
        })
        .catch((error) => {
            console.log(error.message);
        })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="mr-12">
      <img src={login} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleRegister}>
      <h1 className="text-3xl font-bold text-center">Register</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="you name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <input className="btn bg-[#FF3811] text-white hover:bg-[#FF3811] hover:text-white" type="submit" value="Register" />
        </div>
      </form>
      <div className="space-y-3">
        <p className='text-center'>Or Sign In with</p>  
        <div className="flex gap-5 text-2xl justify-center cursor-pointer">
        <BsFacebook></BsFacebook>
        <FcGoogle></FcGoogle>
        <BsGithub></BsGithub>
        </div>
        <div className='text-center'>
        Already have an account? <Link to='/login'><span className='text-[#FF3811]'>Sign in</span></Link>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;
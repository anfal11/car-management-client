import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import axios from 'axios';
const Login = () => {

    const {signInWithEmail, signInFacebook, signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleFacebookLogin = () => {
      signInFacebook()
          .then((res) => {
            // const accessToken = res.credential.accessToken;
              toast.success("User successfully logged in");
              navigate(location?.state ? location?.state : "/");
              // get access token Facebook
        //       axios.post('https://car-management-server-nine.vercel.app/jwt', {accessToken} )
        // .then((res) => {
        //     console.log(res.data.accessToken);
        // })
          })
          .catch((error) => {
              console.log(error.message);
        
          });
  }

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        // const idToken = res.credential.idToken;
        toast.success("User successfully logged in");
        navigate(location?.state ? location?.state : "/");
        // get access token google
        // axios.post('https://car-management-server-nine.vercel.app/jwt', {idToken} )
        // .then((res) => {
        //     console.log(res.data.token);
        // })
        
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            email: form.get('email'),
            password: form.get('password'),
        }
        // console.log(data);
        e.target.reset();

        signInWithEmail(data.email, data.password)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
            toast.success("User successfully logged in");
            // get access token for mail
            // axios.post('https://car-management-server-nine.vercel.app/jwt', data.email, {withCredentials: true})
            // .then((res) => {
              // console.log(res.data);
            //     if(res.data.success){
            //       navigate(location?.state ? location?.state : "/");
            //     }
            // })
            navigate(location?.state ? location?.state : "/");
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
      <form className="card-body" onSubmit={handleLogin}>
      <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input className="btn bg-[#FF3811] text-white hover:bg-[#FF3811] hover:text-white" type="submit" value="Login" />
        </div>
      </form>
      <div className='space-y-3'>
        <p className='text-center'>Or Sign In with</p>
        <div className="flex gap-5 text-2xl justify-center cursor-pointer">
        <BsFacebook onClick={handleFacebookLogin}></BsFacebook>
        <FcGoogle onClick={handleGoogleLogin}></FcGoogle>
        <BsGithub></BsGithub>
        </div>
        <div className='text-center'>
        New Here? <Link to='/register'><span className='text-[#FF3811]'>Sign up</span></Link>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;
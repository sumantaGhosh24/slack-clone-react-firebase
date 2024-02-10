import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {Alert, Spinner} from "../components";
import {login} from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const {isMessage, isLoading, message} = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="min-h-screen flex justify-center items-center">
        <div className="p-5 rounded-lg shadow-lg w-[90%] mx-auto my-20">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          {isMessage && <Alert message={message} />}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-500 text-white focus:border-none focus:outline-none placeholder:text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded bg-gray-500 text-white focus:border-none focus:outline-none placeholder:text-white"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-pink-600 mx-auto"
              >
                Login
              </button>
            </div>
            <p className="text-center mt-5">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-pink-500 font-bold">
                register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

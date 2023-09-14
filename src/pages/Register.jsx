import {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Alert, Spinner} from "../components";
import {register} from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const dispatch = useDispatch();

  const {isMessage, isLoading, message} = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const {name, value, type} = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(formData));
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="min-h-screen flex justify-center items-center">
        <div className="p-5 rounded-lg shadow-lg w-[90%] mx-auto my-20">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          {isMessage && <Alert message={message} />}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="profileImage" className="block mb-1 font-medium">
                Profile Image
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept=".png, .jpg, .jpeg"
                onChange={handleChange}
                className="w-full p-2 bg-gray-500 rounded text-white"
                required
              />
            </div>
            {formData.profileImage && (
              <div className="mb-6">
                <img
                  src={
                    formData.profileImage
                      ? URL.createObjectURL(formData.profileImage)
                      : ""
                  }
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full mx-auto bg-gray-500"
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-1 font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 rounded bg-gray-500 text-white focus:border-none focus:outline-none placeholder:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-1 font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 rounded bg-gray-500 text-white focus:border-none focus:outline-none placeholder:text-white"
                required
              />
            </div>
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
                required
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
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirm password"
                className="w-full px-4 py-2 rounded bg-gray-500 text-white focus:border-none focus:outline-none placeholder:text-white"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-pink-600 mx-auto"
              >
                Register
              </button>
            </div>
            <p className="text-center mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-pink-500 font-bold">
                login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

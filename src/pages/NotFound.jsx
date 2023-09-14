import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col p-5 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">404 - Not Found</h1>
        <p className="text-lg mb-8 text-center">
          The page you are looking for not exists.
        </p>
        <Link
          to="/"
          className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-pink-600 mx-auto"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

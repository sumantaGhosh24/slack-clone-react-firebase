import {Triangle} from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black bg-opacity-50 z-50 fixed top-0 left-0 w-full">
      <Triangle
        height="80"
        width="80"
        color="#BE123C"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;

import {Header, Sidebar} from "../components";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <h1 className="mt-5 ml-5 font-bold text-2xl">Welcome to slack clone</h1>
      </div>
    </>
  );
};

export default Home;

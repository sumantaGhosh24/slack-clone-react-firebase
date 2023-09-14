import {Route} from "react-router-dom";

import {Chat, Header, Sidebar} from "../components";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <Route path="/room/:roomId">
          <Chat />
        </Route>
        <Route path="/">
          <h1>Welcome</h1>
        </Route>
      </div>
    </>
  );
};

export default Home;

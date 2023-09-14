import {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";

import {auth} from "./firebase";
import {setUser} from "./features/auth/authSlice";
import {Home, Login, NotFound, Register} from "./pages";

function App() {
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.uid));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // eslint-disable-next-line react/prop-types
  const RequireAuth = ({children}) => {
    return user ? children : <Navigate to="/login" />;
  };

  // eslint-disable-next-line react/prop-types
  const GuestAuth = ({children}) => {
    return user ? <Navigate to="/" /> : children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <GuestAuth>
                <Login />
              </GuestAuth>
            }
          />
          <Route
            path="/register"
            element={
              <GuestAuth>
                <Register />
              </GuestAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

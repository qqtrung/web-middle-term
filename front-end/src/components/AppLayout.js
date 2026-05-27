import { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./Home";
import PostLists from "./PostLists";
import Post from "./Posts";
import About from "./About";
import Login from "./Login";
import Stats from "./Stats";
import NoMatch from "./NoMatch";
import NewPosts from "./NewPosts";
import ProtectedRoute from "./ProtectedRoute";
import url from "./Url";
import "../styles.css";

export default function AppLayout() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  async function logOut() {
    const response = await fetch(`${url}/api/logout`, {
      method: "post",
      credentials: "include",
    });

    if (response.ok) {
      localStorage.setItem("token", null);
      setUser(null);
      navigate("/");
    }
  }

  return (
    <>
      <nav className="nav">
        <Link to="/"> Home </Link>
        <Link to="/posts"> Posts </Link>
        <Link to="/about"> About </Link>
        <span>|</span>
        {user && <Link to="/stats"> Stats </Link>}
        {user && <Link to="/newpost"> New Post </Link>}
        {!user && <Link to="/login"> Login </Link>}
        {user && <span onClick={logOut}>Logout</span>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostLists />} />
        <Route path="/posts/:slug" element={<Post user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/stats"
          element={
            <ProtectedRoute user={user}>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newpost"
          element={
            <ProtectedRoute user={user}>
              <NewPosts user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

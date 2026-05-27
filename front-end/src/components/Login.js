import { useNavigate } from "react-router-dom";
import { useState } from "react";
import url from "./Url";

export default function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch(`${url}/api/login`, {
        method: "post",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        onLogin && onLogin({ username: creds.username });
        navigate("/stats");
      } else {
        setError("Invalid username or password!");
      }
    } catch (error) {
      setError("Login failed!");
    }
  };

  return (
    <div>
      <br />
      <span>Username:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import url from "./Url";

export default function Post({ user }) {
  const { slug } = useParams();
  const [ok, setOk] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState({
    post: {},
    commentOfPost: []
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`${url}/api/post/${slug}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        // alert("Error fetching data");
      }
    };

    if (!user)
      navigate("/login");

    fetchData();
  }, [slug, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const comment = {
      username: user.username,
      content: e.target.content.value,
    };

    const response = await fetch(`${url}/api/post/${slug}/comment`, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(comment)
    });

    if (response.ok) {
      setOk(1);
    }
  };

  return (
    <div>
      {/* <h3>username</h3>
      <h3>{user?.username}</h3>
      <h3>Post</h3> */}
      <h3>{data.post.title || "Loading"}</h3>
      <p>{data.post.description || "Loading"}</p>
      <form onSubmit={handleSubmit}>
        <button>Comment</button>
        <br />
        <textarea name="content" />
        {ok && <h4>Comment success</h4>}
      </form>
      <ol>
        {data.commentOfPost.map((cmt) => (
          <li>
            <h4>"Username:" {cmt.username}, "Content:" {cmt.content}</h4>
          </li>
        ))}
      </ol>
    </div>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import url from "./Url";
import { useNavigate } from "react-router-dom";

export default function NewPost({ user }) {

  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    if (!user) {
      navigate("/login");
      return;
    }

    try {

      const response = await fetch(`${url}/api/newpost`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          slug: data.slug,
          title: data.title,
          description: data.description,
          username: user.username
        }),

      });

      if (response.ok) {
        setNewPost("Post created successfully!");
      } else {
        setNewPost("Post creation failed!");
      }
    } catch (error) {
      console.error("Error creating data:", error);
      setNewPost("Post creation failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <br />
        <span>Slug:</span>
        <br />
        <input type="text" {...register("slug", { required: true })} />
        <br />
        {errors.slug && <div style={{ color: "red" }}>Slug is required</div>}
        <span>Title:</span>
        <br />
        <input type="text" {...register("title", { required: true })} />
        <br />
        {errors.title && <div style={{ color: "red" }}>Title is required</div>}
        <span>Description:</span>
        <br />
        <input type="text" {...register("description", { required: true })} />
        <br />
        {errors.description && (
          <div style={{ color: "red" }}>Description is required</div>
        )}
        <br />
        <button type="submit">Add New</button>
        <p>{newPost}</p>
      </div>
    </form>
  );
}

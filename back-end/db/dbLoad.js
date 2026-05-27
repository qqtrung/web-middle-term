const dbConnect = require("../db/dbConnect.js");

const User = require("../db/model").User;
const Post = require("../db/model").Post;
const Comment = require("../db/model").Comment;

async function dbLoad() {
    try {

        await dbConnect();
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});

        console.log("Cleared existing data.");

        const users = [
            new User({ username: "1", password: "1" }),
            new User({ username: "2", password: "2" }),
            new User({ username: "3", password: "3" }),
        ];

        const posts = [
            new Post({ slug: "post-1", title: "Post 1", description: "Description for Post 1", username: "1" }),
            new Post({ slug: "post-2", title: "Post 2", description: "Description for Post 2", username: "2" }),
            new Post({ slug: "post-3", title: "Post 3", description: "Description for Post 3", username: "2" }),
            new Post({ slug: "post-4", title: "Post 4", description: "Description for Post 4", username: "3" }),
            new Post({ slug: "post-5", title: "Post 5", description: "Description for Post 5", username: "3" }),
            new Post({ slug: "post-6", title: "Post 6", description: "Description for Post 6", username: "3" }),
        ];

        const comments = [
            new Comment({ username: "1", slug: "post-1", content: "Comment from User 1 on Post 1" }),
            new Comment({ username: "2", slug: "post-1", content: "Comment from User 2 on Post 1" }),
            new Comment({ username: "2", slug: "post-2", content: "Comment from User 2 on Post 2" }),
            new Comment({ username: "3", slug: "post-1", content: "Comment from User 3 on Post 1" }),
            new Comment({ username: "3", slug: "post-2", content: "Comment from User 3 on Post 2" }),
            new Comment({ username: "3", slug: "post-3", content: "Comment from User 3 on Post 3" }),
        ];

        await User.insertMany(users);
        await Post.insertMany(posts);
        await Comment.insertMany(comments);

        console.log("Database loading completed successfully!");
    } catch (error) {
        console.error("Error occurred while loading data:", error);
    }
}

dbLoad();

module.exports = dbLoad;


/*
user 
    + username 
    + password 

post 
    + slug
    + title
    + description
    + {username}

comment
    + {username}
    + {slug}
    + content
*/

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username!"],
        unique: [true, "username exists"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
    },
});

const PostSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, "Please provide a slug!"],
        unique: [true, "slug exists"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title!"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description!"],
    },
    username: {
        type: String,
        required: [true, "Please provide an author!"],
    },
});

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an author!"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a post!"],
    },
    content: {
        type: String,
        required: [true, "Please provide content!"],
    }
})

module.exports = {
    User: mongoose.model.Users || mongoose.model("Users", UserSchema),
    Post: mongoose.model.Posts || mongoose.model("Posts", PostSchema),
    Comment: mongoose.model.Comments || mongoose.model("Comments", CommentSchema)
};


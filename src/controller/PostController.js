const Post = require("../model/Post");

const postController = {
    addPost: async (req, res) => {
        try {

            const {
                description,
                image_path,
                user_id,
                username,
                profile_picture_path,

            } = req.body;

            const newPost = new Post({
                description,
                image_path,
                user_id,
                username,
                profile_picture_path,
            });
            await newPost.save();

            const formated = {
                _id: newPost.id,
                description: newPost.description,
                image_path: newPost.image_path,
                user_id: newPost.user_id,
                profile_picture_path: newPost.profile_picture_path,
                username: newPost.username,
                like: newPost.like.length,
                createdAt: newPost.createdAt,
            }

            res.status(201).json(formated);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }


    },
    likeUnLike: async (req, res) => {
        try {

            const { post_id, user_id } = req.body;
            const post = await Post.findById(post_id);
            if (post.like.includes(user_id)) {
                post.like = post.like.filter(id => id !== user_id);
            } else {
                post.like.push(user_id);
            }
            await post.save();
            res.status(201).json(post);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getAllPost: async (req, res) => {
        try {

            const user_id = req.user._id;

            const posts = await Post.find().sort('-createdAt');
            const formatPost = [];

            posts.map(post => {

                let isLiked = post.like.includes(user_id);

                const formated = {
                    _id: post.id,
                    description: post.description,
                    image_path: post.image_path,
                    user_id: post.user_id,
                    profile_picture_path: post.profile_picture_path,
                    username: post.username,
                    like: post.like.length,
                    createdAt: post.createdAt,
                    isLiked: isLiked,
                }
                formatPost.push(formated);
            })

            return res.json(formatPost);

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    deletPost: async (req, res) => {
        await Post.deleteMany();
        res.json({message : "delete"})
    }

}

module.exports = postController;

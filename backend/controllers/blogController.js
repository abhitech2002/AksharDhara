import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
    const { title, content, author } = req.body;

    try {
        const newBlog = new Blog({
            title,
            content,
            author,
        });

        await newBlog.save();
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            data: blog,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    try {
        const blogId = await Blog.findById(id);
        if (!blogId) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content, author },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blogId = await Blog.findById(id);
        if (!blogId) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
    const { title, content, tags, coverImage, isPublished } = req.body;
    const author = req.user._id;

    try {
        const newBlog = new Blog({
            title,
            content,
            author,
            tags,
            coverImage,
            isPublished
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
        const blogs = await Blog.find()
            .populate("author", "username email") 
            .sort({ createdAt: -1 }); res.status(200).json({
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
        const blog = await Blog.findById(id).populate("author", "name email");
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
    const { title, content, tags, coverImage, isPublished } = req.body; 

    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Not found" });

        if (blog.author.toString() !== req.user._id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, tags, coverImage, isPublished },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Not found" });

        if (blog.author.toString() !== req.user._id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Blog.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

import Blog from "../models/Blog.js";
import { buildQueryOptions } from "../utils/paginationSearch.js"

export const createBlog = async (req, res) => {
    const { title, content, tags, coverImage, isPublished } = req.body;
    const author = req.user.id;

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
    const { query, pagination, sort } = buildQueryOptions(req.query, [
      "title",
      "content",
      "tags",
    ]);

    const blogs = await Blog.find(query)
      .populate("author", "username email")
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
      totalPages: Math.ceil(total / pagination.limit),
      currentPage: pagination.page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserDrafts = async (req, res) => {
    try {
        const drafts = await Blog.find({
            author: req.user.id,
            isPublished: false,
            isDeleted: false,
        })
            .sort({ createdAt: -1 })
            .populate("author", "username");

        res.status(200).json({
            success: true,
            message: "User drafts fetched successfully",
            data: drafts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById({ _id: id, isDeleted: false }).populate("author", "username email");
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

        if (blog.author.toString() !== req.user.id) {
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
        if (!blog || blog.isDeleted) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        if (blog.author.toString() !== req.user._id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        blog.isDeleted = true;
        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog soft-deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const restoreBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog || !blog.isDeleted) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        if (blog.author.toString() !== req.user._id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        blog.isDeleted = false;
        blog.deletedAt = new Date();
        await blog.save();
        res.status(200).json({
            success: true,
            message: "Blog restored successfully",
            data: blog,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

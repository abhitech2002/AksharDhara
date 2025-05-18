import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/blogs/';

const getBlogs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

export { getBlogs };
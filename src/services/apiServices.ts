import type { Post } from '@/types';
import axios, { type AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Define types for API responses if known

export const Projects = (): Promise<AxiosResponse<Post[]>> => api.get('/projects');

export const BlogPosts = (): Promise<AxiosResponse<Post[]>> => api.get('/blogPosts');

export const fetchBlogPosts = async (): Promise<Post[]> => {
  try {
    const response = await BlogPosts();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
};

export const fetchBlogPostById = async (id: string): Promise<Post> => {
  try {
    const response = await api.get(`/blogPosts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch blog post by ID:', error);
    throw error;
  }
};

export const createPost = async (formData: FormData): Promise<Post> => {
  try {
    const response = await api.post('/blogPosts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, formData: FormData): Promise<Post> => {
  try {
    const response = await api.put(`/blogPosts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    await api.delete(`/blogPosts/${id}`);
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    throw error;
  }
};

export const fetchProjects = async (): Promise<Post[]> => {
  try {
    const response = await Projects();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
};

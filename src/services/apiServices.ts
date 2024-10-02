import type { Post } from '@/types'
import axios, { type AxiosResponse } from 'axios'
import { API_URL } from '@/utils'

const api = axios.create({
  baseURL: `${API_URL}/api`
})


// Blog posts endpoints
export const BlogPosts = (): Promise<AxiosResponse<Post[]>> => api.get('/blogPosts')

export const fetchBlogPosts = async (): Promise<Post[]> => {
  try {
    const response = await BlogPosts()
    return response.data
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

export const fetchBlogPostById = async (id: string): Promise<Post> => {
  try {
    const response = await api.get(`/blogPosts/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch blog post by ID:', error)
    throw error
  }
}

export const createBlogPost = async (formData: FormData): Promise<Post> => {
  try {
    const response = await api.post('/blogPosts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to create blog post:', error)
    throw error
  }
}

export const updateBlogPost = async (id: string, formData: FormData): Promise<Post> => {
  try {
    const response = await api.put(`/blogPosts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to update blog post:', error)
    throw error
  }
}

export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    await api.delete(`/blogPosts/${id}`)
  } catch (error) {
    console.error('Failed to delete blog post:', error)
    throw error
  }
}

// Projects endpoints
export const Projects = (): Promise<AxiosResponse<Post[]>> => api.get('/projects')

export const fetchProjects = async (): Promise<Post[]> => {
  try {
    const response = await Projects()
    return response.data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export const fetchProjectById = async (id: string): Promise<Post> => {
  try {
    const response = await api.get(`/projects/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch project by ID:', error)
    throw error
  }
}

export const createProject = async (formData: FormData): Promise<Post> => {
  try {
    const response = await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to create project:', error)
    throw error
  }
}

export const updateProject = async (id: string, formData: FormData): Promise<Post> => {
  try {
    const response = await api.put(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error)   {
    console.error('Failed to update project:', error)
    throw error
  }
}

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await api.delete(`/projects/${id}`)
  } catch (error) {
    console.error('Failed to delete project:', error)
    throw error
  }
}

export const Tags = (): Promise<AxiosResponse<Post[]>> => api.get('/tags')

export const fetchTags = async (): Promise<Post[]> => {
  try {
    const response = await Tags();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
};

// New CRUD operations for tags
export const fetchTagById = async (id: string): Promise<Post> => {
  try {
    const response = await api.get(`/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tag by ID:', error);
    throw error;
  }
};

export const createTag = async (tagData: { tag: string }): Promise<Post> => {
  try {
    const response = await api.post('/tags', tagData);
    return response.data;
  } catch (error) {
    console.error('Failed to create tag:', error);
    throw error;
  }
};

export const updateTag = async (id: string, tagData: { tag: string }): Promise<Post> => {
  try {
    const response = await api.put(`/tags/${id}`, tagData);
    return response.data;
  } catch (error) {
    console.error('Failed to update tag:', error);
    throw error;
  }
};

export const deleteTag = async (id: string): Promise<void> => {
  try {
    await api.delete(`/tags/${id}`);
  } catch (error) {
    console.error('Failed to delete tag:', error);
    throw error;
  }
};

export interface NewsletterSubscription {
  email: string;
}

// New function to subscribe to the newsletter
export const subscribeToNewsletter = async (email: string): Promise<NewsletterSubscription> => {
  try {
    const response = await api.post('/newsletter/subscribe', { email })
    return response.data
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error)
    throw error
  }
}

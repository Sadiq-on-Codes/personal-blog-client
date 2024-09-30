import type { Post } from '@/types'
import axios, { type AxiosResponse } from 'axios'
import { API_URL } from '@/utils'

const api = axios.create({
  baseURL: API_URL
})

// Define types for API responses if known

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

// export const fetchTags = async (): Promise<Post[]> => {
//   try {
//     const response = await Tags();
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch blog posts:', error);
//     return [];
//   }
// };

export const fetchTags = () => {
  return Promise.resolve(Tags())
}

// const onSuccess = (response: any) => {
//   console.log(response.data)
//   return response.data
// }

// const onError = (error: any) => {
//   console.log(error.message)
//   return []
// }

// const onFinally = () => {
//   console.log('Done')
// }

// fetchTags().then(onSuccess).catch(onError).finally(onFinally)

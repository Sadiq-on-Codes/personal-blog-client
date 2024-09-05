import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export const Projects = (): any => api.get('/projects')
export const BlogPosts = (): any => api.get('/blogPosts')

export const fetchBlogPosts = async () => {
  try {
    const response = await BlogPosts()
    return response.data
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return [];
  }
}

export const fetchProjects = async () => {
  try {
    const response = await Projects()
    return response.data
  } catch (error) {
    console.error('Failed to fetch projects posts:', error)
    return [];
  }
}

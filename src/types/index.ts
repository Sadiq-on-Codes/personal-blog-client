export interface Pin {
  pin: string
  textColor: string
  bgColor: string
}

export interface Post {
  _id?: string
  author: string
  date: string
  image: File | null 
  title: string
  description: string
  tags: Pin[]
}

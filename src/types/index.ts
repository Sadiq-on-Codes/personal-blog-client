export interface Pin {
    pin: string;
    textColor: string;
    bgColor: string;
  }
  
  export interface BlogPost {
    id: number;
    author: string;
    date: string;
    image: string;
    title: string;
    description: string;
    pins: Pin[];
  }
  
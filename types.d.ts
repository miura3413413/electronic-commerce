interface Item {
  _id: string,
  name: string,
  price: number,
  category: string,
  url: string,
  text: string,
  review: Review[],
  createdAt: string,
  updatedAt: string,
  __v: number,
}

interface Review {
  userName: string | null | undefined,
  userImage: string | null | undefined,
  rate: number,
  title: string,
  text: string
}

interface User {
  _id: string,
  name: string,
  image?: string,
  mailaddress: string,
  password: number
  createdAt: string,
  updatedAt: string,
  __v: number,
}
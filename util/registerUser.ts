import axios from "axios"

interface registerUser {
  name: string,
  email: string,
  password: string
}

export const registerUser = async (data: registerUser) => {
  axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/registerUser`, data)
}

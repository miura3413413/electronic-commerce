import axios from "axios"

interface Review {
  _id: string,
  userName: string | null | undefined,
  userImage: string | null | undefined,
  rate: number,
  title: string,
  text: string
}

export const putReview = async (data: Review) => {
  axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/putReview`, data, { withCredentials: true })
}
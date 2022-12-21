import axios from "axios"

interface Clicked {
  _id?: string,
  clicked?: number
}

export const putClicked = async (data: Clicked[]) => {
  axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/putClicked`, data, { withCredentials: true })
}
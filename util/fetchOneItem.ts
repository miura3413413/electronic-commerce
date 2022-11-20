export const fetchOneItem = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getOneItem?_id=${id}`)
  const data = await res.json()
  const item: Item = data.item
  return item
}

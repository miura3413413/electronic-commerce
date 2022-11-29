export const fetchCategory = async (category: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategory?category=${category}`)
  const data = await res.json()
  const items: Item[] = data.items
  return items
}
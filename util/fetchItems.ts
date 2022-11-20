export const fetchItems = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getItems`)
  const data = await res.json()
  const items: Item[] = data.items
  return items
}

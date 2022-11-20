import type { NextApiRequest, NextApiResponse } from 'next'
import { Item } from '../../models/ItemModel'
import db from '../../util/connect'

type Data = {
  items?: Item[]
  err?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connectMongo()
  try {
    const newItem = await new Item(req.body)
    const item = await newItem.save()
    return res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
  db.disconnectMongo()

}
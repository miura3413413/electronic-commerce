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
    const items = await Item.find({ category: req.query.category })
    return res.status(200).json({ items });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
  await db.disconnectMongo()

}
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
    const item = await Item.findByIdAndUpdate({ _id: req.body._id }, { $push: { review: [req.body] } })
    return res.status(200).json(item.review)
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
  db.disconnectMongo()

}
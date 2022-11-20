import type { NextApiRequest, NextApiResponse } from 'next'
import { Item } from '../../models/ItemModel'
import db from '../../util/connect'

type Data = {
  item?: Item[]
  err?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connectMongo()
  try {
    const item = await Item.findOne({ _id: req.query._id })
    return res.status(200).json({ item });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
  await db.disconnectMongo()

}
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
    const items = req.body.map(async (data: any) => {
      const item = await Item.findById({ _id: data._id })
      await item.updateOne({ clicked: item.clicked + data.clicked })
      return item
    })
    return res.status(200).json(items);

  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
  db.disconnectMongo()

}
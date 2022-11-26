import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../models/UserModel'
import db from '../../util/connect'

type Data = {
  user?: User
  err?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connectMongo()
  try {
    res.setHeader('Access-Control-Allow-Origin', "process.env.NEXT_PUBLIC_BASE_URL")
    const newUser = await new User(req.body)
    const user = await newUser.save()
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
  db.disconnectMongo()

}
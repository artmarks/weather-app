// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

type Data = {
  name: string
  test: string | undefined | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  let testValue = allUsers.at(0)?.mail;
  res.status(200).json({ name: 'John Doe2', test: testValue })

}


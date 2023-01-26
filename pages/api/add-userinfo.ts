// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../firebase/initFirebase'
import { collection, addDoc } from 'firebase/firestore'

async function sentToFirebase(first: string, last: string) {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      first: first,
      last: last,
      timestamp: new Date(),
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { first, last } = JSON.parse(req.body)

  if (first == null || last == null) {
    res.status(400).json({ message: 'no name' })
    return
  }
  try {
    const users = await sentToFirebase(first, last)
    res.status(200).json({ items: users, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}

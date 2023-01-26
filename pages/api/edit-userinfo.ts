// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../firebase/initFirebase'
import { collection, doc, updateDoc } from 'firebase/firestore'

async function updateToFirebase(first: string, last: string, id: string) {
  try {
    const docRef = doc(db, 'users', id)
    const result = await updateDoc(docRef, {
      first: first,
      last: last,
      timestamp: new Date(),
    })
    return result
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
  const { first, last, id } = JSON.parse(req.body)

  if (first == null || last == null) {
    res.status(400).json({ message: 'no name' })
    return
  }
  try {
    await updateToFirebase(first, last, id)
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}

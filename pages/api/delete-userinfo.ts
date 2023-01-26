// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/initFirebase'

async function deleteUserinfo(id: string) {
  try {
    const docRef = doc(db, 'users', id)
    const result = await deleteDoc(docRef)
    return result
  } catch (error) {
    console.error(error)
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
  const { id } = req.query

  if (id == null) {
    res.status(400).json({ message: 'Failed' })
  }
  try {
    const deleteUser = await deleteUserinfo(String(id))
    res.status(200).json({ items: deleteUser, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}

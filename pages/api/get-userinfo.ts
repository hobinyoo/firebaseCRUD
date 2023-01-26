// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase/initFirebase'

interface UserProps {
  id: string
  surname: string
  lastname: string
}

async function fetchFirebase() {
  try {
    const userinfo: UserProps[] = []
    const board = collection(db, 'users')
    const querySnapshot = await getDocs(
      query(board, orderBy('timestamp', 'desc'))
    )
    querySnapshot.forEach((doc) => {
      userinfo.push({
        id: doc.id,
        surname: doc.data().first,
        lastname: doc.data().last,
      })
    })
    return userinfo
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
  try {
    const users = await fetchFirebase()
    res.status(200).json({ items: users, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}

import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useAppSelector } from '../store' // 스토어에서 state를 불러오기 위한 hook
import { RootState } from '../store' // 스토어에 저장된 state의 type

const Container = styled.div`
  width: 80%;
  min-height: 100vh;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
`

const Edit = () => {
  const [surname, setSurname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')

  const UserId = useAppSelector((state: RootState) => {
    return state.user.userId
  })

  useEffect(() => {
    if (UserId != '') {
      fetch(`http://localhost:3000/api/getone-userinfo?id=${UserId}`)
        .then((res) => res.json())
        .then((data) => {
          setSurname(data.items.first)
          setLastname(data.items.last)
        })
        .catch((error) => console.error(error))
    }
  }, [UserId])

  const sentToFirebase = async () => {
    fetch('http://localhost:3000/api/edit-userinfo', {
      method: 'POST',
      body: JSON.stringify({
        id: UserId,
        first: surname,
        last: lastname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items)
        alert(data.message)
      })
      .catch((error) => console.error(error))
  }

  return (
    <Container>
      <input
        name="surname"
        value={surname}
        placeholder="성"
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        name="lastname"
        value={lastname}
        placeholder="이름"
        onChange={(e) => setLastname(e.target.value)}
      />
      <button onClick={sentToFirebase}>Edit Data To Cloud FireStore</button>
    </Container>
  )
}

export default Edit

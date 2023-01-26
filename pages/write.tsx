import React, { useState } from 'react'
import styled from '@emotion/styled'

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

const Write = () => {
  const [surname, setSurname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')

  const sentToFirebase = async () => {
    fetch('http://localhost:3000/api/add-userinfo', {
      method: 'POST',
      body: JSON.stringify({
        first: surname,
        last: lastname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`${data.message}`)
      })
      .catch((error) => console.error(error))
  }

  return (
    <Container>
      <input
        name="surname"
        placeholder="성"
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        name="lastname"
        placeholder="이름"
        onChange={(e) => setLastname(e.target.value)}
      />
      <button onClick={sentToFirebase}>Send Data To Cloud FireStore</button>
    </Container>
  )
}

export default Write

import { useContext, useState } from "react"
import { AppContext } from "../../App"
import { styled } from "styled-components"
import { InputText, Button, Card } from "../../components"

export default function Login() {
    const [userInput, setUserInput] = useState('')
    const { setUser } = useContext(AppContext)
    const submitForm = (e) => {
        e.preventDefault()
        setUser(userInput)
    }
    return (<Styled.Wrapper>
        <Card>
            <Styled.Form onSubmit={submitForm}>
                <Styled.Title>Login</Styled.Title>
                <InputText placeholder={"Username"} value={userInput} onChange={(e) => setUserInput(e.currentTarget.value)} />
                <Button>Entrar</Button>
            </Styled.Form>
        </Card>
    </Styled.Wrapper>)
}

const Styled = {
    Wrapper: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        max-height: -webkit-fill-available;
    `,
    Title: styled.div`
        letter-spacing: 1px;
        font-size: 24px;
        margin-bottom: 12px;
    `,
    Form: styled.form`
        display: flex;
        flex-flow: column;
        gap: 8px;
        width: 250px;
        max-width: 100%;
    `
}
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import { styled } from "styled-components"
import { InputText, Button, Card, Bubble } from "../../components"
import { LogoApp } from "../logo"

export default function Login() {
    const [userInput, setUserInput] = useState('')
    const [bubbles, setBubbles] = useState([])
    const { setUser } = useContext(AppContext)

    const submitForm = (e) => {
        e.preventDefault()
        setUser(userInput)
    }

    const mColor = ['#4285f4','#4285f4','#4285f4', '#ea4335', '#fbbc05', '#fbbc05']

    useEffect(() => {
        setTimeout(() => {
            if (bubbles.length < 15) {
                setBubbles([...bubbles, {
                    id: Date.now(), 
                    color: mColor[Math.floor(Math.random() * mColor.length)], 
                    left: `${Math.floor(Math.random() * 80)}%`, 
                    duration: `${Math.floor(Math.random() * 10 + 7)}s`
                }])
            } else {
                setTimeout(() => setBubbles([]), 5000)
            }
        }, 500)
    }, [bubbles])

    return (<Styled.Wrapper>
        <Styled.AnimationBack>
            {bubbles.map((e) => <Bubble key={e.id} mColor={e.color} className={e.classnName} style={{
                backgroundColor: e.color,
                left: e.left,
                animationDuration: e.duration
            }} />)}
        </Styled.AnimationBack>
        <Card>
            <Styled.Form onSubmit={submitForm}>
                <Styled.Title>
                    <LogoApp style={{width: '80px', margin: 'auto'}} />
                </Styled.Title>
                <InputText placeholder={"Username"} length={20} value={userInput} onChange={(e) => setUserInput(e.currentTarget.value)} />
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
    AnimationBack: styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        overflow: hidden;
    `,
    Title: styled.div`
        letter-spacing: 1px;
        font-size: 24px;
        margin-bottom: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    `,
    Form: styled.form`
        display: flex;
        flex-flow: column;
        gap: 8px;
        width: 250px;
        max-width: 100%;
    `
}
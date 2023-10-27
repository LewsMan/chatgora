import { useContext, useEffect, useState } from "react"
import { styled } from "styled-components"
import { AppContext } from "../../App"
import { InputText, Button, Message } from "../../components"

export default function Chat() {
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState('')
    const { user, supabase } = useContext(AppContext)
    const submitForm = (e) => {
        e.preventDefault()
        sendMessage()
    }

    useEffect(() => {
        setTimeout(handleInserts, 2000)
    }, [])

    const handleInserts = async () => {
        console.log("UPDATE!")
        let { data } = await supabase
            .from('messages')
            .select('*')
            .eq('chat', 'general')
        setChats(data)
    }

    supabase
        .channel('messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleInserts)
        .subscribe()

    const sendMessage = async () => {
        await supabase
            .from('messages')
            .insert([
                { user, message }
            ]).select()
        setMessage("")
    }
    
    return (<Styled.Wrapper>
        <Styled.Chat>
            <Styled.Legend>te has unido a #general</Styled.Legend>
            {chats?.map(m => (<Message key={m.id} message={m} />))}
        </Styled.Chat>
        <Styled.Form onSubmit={submitForm}>
            <Styled.InputText>
                <InputText type="text" value={message} onChange={(e) => setMessage(e.currentTarget.value)} />
            </Styled.InputText>
            <Styled.Button><Button>Enviar</Button></Styled.Button>
        </Styled.Form>
    </Styled.Wrapper>)
}

const Styled = {
    Wrapper: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        width: 100vw;
        height: 100vh;
        padding: 16px;
        gap: 16px;
        max-height: -webkit-fill-available;
    `,
    Chat: styled.div`
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-flow: column;
    `,
    Legend: styled.div`
        font-weight: lighter;
        opacity: .5;
    `,
    Form: styled.form`
        width: 100%;
        display: flex;
        gap: 4px;
    `,
    InputText: styled.div`
        flex: 1;
    `,
    Button: styled.div`
        flex: 0 0 10vw;
    `
}
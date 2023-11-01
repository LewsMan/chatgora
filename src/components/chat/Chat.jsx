import { useContext, useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import { AppContext } from "../../App"
import { InputText, Button, Message } from "../../components"
import { crypt, decrypt } from "../../hooks"

export default function Chat() {
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState('')
    const { user, supabase } = useContext(AppContext)
    const submitForm = (e) => {
        e.preventDefault()
        sendMessage()
    }

    useEffect(() => {
        handleInserts()
    }, [])

    const handleInserts = async () => {
        let { data } = await supabase
            .from('messages')
            .select('*')
            .eq('chat', 'general')
        const oldChatsIds = chats.map(x => x.id)
        setChats([...chats, ...data.filter(x => oldChatsIds.indexOf(x.id) < 0)])
    }

    supabase
        .channel('messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleInserts)
        .subscribe()

    const sendMessage = async () => {
        const { data } = await supabase
            .from('messages')
            .insert([
                { user, message: crypt('general', message) }
            ]).select()
        setChats([...chats, ...data])
        await supabase
            .from('messages')
            .delete()
            .eq('id', data[0].id)
        setMessage("")
    }
    
    return (<Styled.Wrapper>
        <Styled.Chat>
            <Styled.Legend>te has unido a #general</Styled.Legend>
            {chats?.map(m => <Message key={m.id} message={decrypt('general', m.message)} user={m.user} created_at={m.created_at} />)}
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
        overflow: scroll;
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
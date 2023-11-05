import { useContext, useEffect, useState } from "react"
import { styled } from "styled-components"
import { AppContext } from "../../App"
import { Message, SendInput, Header } from "../../components"
import { decrypt } from "../../hooks"

export default function Chat() {
    const [chats, setChats] = useState([])
    const { currentChat, supabase } = useContext(AppContext)

    useEffect(() => {
        handleInserts()
    }, [])

    const handleInserts = async (payload) => {
        if(payload) {
            setChats([...chats, payload.new])
            await supabase
                    .from('messages')
                    .delete()
                    .eq('id', payload.new.id)
        }
    }

    supabase
        .channel('messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleInserts)
        .subscribe()

    
    return (<Styled.Wrapper>
        <Header />
        <Styled.Chat>
            <Styled.Legend>te has unido a #{currentChat}</Styled.Legend>
            {chats?.map(m => <Message key={m.id} message={decrypt(currentChat, m.message || '')} user={m.user} created_at={m.created_at} />)}
        </Styled.Chat>
        <SendInput chats={chats} setChats={setChats} />
    </Styled.Wrapper>)
}

const Styled = {
    Wrapper: styled.div`
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        flex-flow: column;
        width: 100vw;
        height: 100vh;
        padding: 16px;
        gap: 16px;
        max-height: -webkit-fill-available;
    `,
    Chat: styled.div`
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-flow: column;
        width: 100%;
    `,
    Legend: styled.div`
        font-weight: lighter;
        opacity: .5;
    `
}
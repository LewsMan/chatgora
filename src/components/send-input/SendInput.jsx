import { useContext, useState } from "react"
import { styled } from "styled-components"
import { AppContext } from "../../App"
import { InputText, Button } from "../../components"
import { crypt } from "../../hooks"

export default function SendInput({chats, setChats}) {
    const [message, setMessage] = useState('')
    const { user, supabase } = useContext(AppContext)
    const submitForm = (e) => {
        e.preventDefault()
        sendMessage()
    }

    const sendMessage = async () => {
        if(message !== '') {
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
            setMessage('')
            }
    }
    
    return (<Styled.Form onSubmit={submitForm}>
        <Styled.InputText>
            <InputText type="text" value={message} onChange={(e) => setMessage(e.currentTarget.value)} />
        </Styled.InputText>
        <Styled.Button><Button>Enviar</Button></Styled.Button>
    </Styled.Form>)
}

const Styled = {
    Form: styled.form`
        position: sticky;
        bottom: 0;
        width: 100%;
        display: flex;
        gap: 4px;
        background-color: #232323;
    `,
    InputText: styled.div`
        flex: 1;
    `,
    Button: styled.div`
        flex: 0 0 10vw;
    `
}
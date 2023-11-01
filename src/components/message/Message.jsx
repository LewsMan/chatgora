import { styled } from "styled-components"

export default function Message({message, user, created_at, ...props}) {
    const date = new Date(created_at)
    
    return (<Styled.Wrapper>
        <Styled.User>
            <span>{user}</span>
            <Styled.Hour>{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</Styled.Hour>
        </Styled.User>
        <Styled.Message>{message}</Styled.Message>
    </Styled.Wrapper>)
}

const Styled = {
    Wrapper: styled.div`
        margin: 8px 0;
        border-radius: 8px;
        width: 100%;
    `,
    User: styled.div`
        font-weight: normal;
        font-size: 120%;
        display: flex;
        gap: 8px;
        align-items: flex-end;
        justify-content: flex-start;
    `,
    Hour: styled.span`
        font-weight: lighter;
        font-size: 60%;
        opacity: .3;
    `,
    Message: styled.div`
        font-weight: lighter;
        padding: 4px 0;
    `,
}
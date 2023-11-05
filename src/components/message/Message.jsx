import { styled } from "styled-components"

export default function Message({message, user, created_at, ...props}) {
    const dateMessage = new Date(created_at)
    const twoDigits = (n) => {
        return n > 9 ? n : `0${n}`
    }
    
    return (<Styled.Wrapper mColor={"#4285f4"}>
        <Styled.User>
            <span>{user}</span>
            <Styled.Hour>{twoDigits(dateMessage.getHours())}:{twoDigits(dateMessage.getMinutes())}</Styled.Hour>
        </Styled.User>
        <Styled.Message>{message}</Styled.Message>
    </Styled.Wrapper>)
}

const Styled = {
    Wrapper: styled.div`
        position: relative;
        margin: 8px 0 16px;
        padding: 8px;
        border-radius: 8px;
        border-radius: 8px;
        background-color: ${props => props.mColor};
        &:before {
            content: '';
            display: block;
            position: absolute;
            z-index: -1000;
            bottom: -8px;
            left: -15px;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            border-right: 6px solid ${props => props.mColor};
            background-color: transparent;
        }
    `,
    User: styled.div`
        font-weight: normal;
        display: flex;
        gap: 8px;
        align-items: flex-end;
        justify-content: flex-start;
    `,
    Hour: styled.span`
        font-weight: lighter;
        font-size: 60%;
        opacity: .6;
    `,
    Message: styled.div`
        font-weight: lighter;
        padding: 4px 0;
        font-size: 120%;
    `,
}
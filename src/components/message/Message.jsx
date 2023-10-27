import { styled } from "styled-components"

export default function Message({message, ...props}) {

    
    return (<Styled.Wrapper>
        <Styled.User>
            {message.user}
        </Styled.User>
        <Styled.Message>{message.message}</Styled.Message>
    </Styled.Wrapper>)
}

const Styled = {
    Wrapper: styled.div`
        padding: 8px;
        margin: 4px 0;
        border-radius: 8px;
        border: 1px solid #696969;
        width: 100%;
    `,
    User: styled.div`
        font-weight: bold;
    `,
    Message: styled.div`
        font-weight: lighter;
        padding: 4px 0;
    `,
}
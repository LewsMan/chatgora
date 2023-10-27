import { styled } from "styled-components"

export default function InputText({...props}) {

    
    return (<Styled.Wrapper>
        <Styled.Input type="text" {...props}  />
    </Styled.Wrapper>)
}

const Styled = {
    Wrapper: styled.div`
    
    `,
    Input: styled.input`
        width: 100%;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #696969;
        color: white;
        background-color: transparent;
        max-width: -webkit-fill-available;
        &:hover {
            border-color: #2A769A;
        }
        &:focus-within {
            outline: 1px solid #2A769A;
        }
    `
}
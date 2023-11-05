import { styled } from "styled-components"

export default function Button({...props}) {

    
    return (<Styled.Button {...props}  />)
}

const Styled = {
    Button: styled.button`
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #4285f4;
        background-color: #4285f4;
        color: white;
        text-transform: uppercase;
        width: 100%;
        letter-spacing: 1px;
        transition: all .6s;
        cursor: pointer;
        &:hover {
            background-color: #85B9E1;
            letter-spacing: 2px;
        }
    `
}
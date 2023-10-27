import { styled } from "styled-components"

export default function Card({...props}) {
    
    return (<Styled.Wrapper {...props} />)
}

const Styled = {
    Wrapper: styled.div`
        border: 1px solid #696969;
        background: rgba(105,105,105, .18);
        border-radius: 8px;
        padding: 16px;
        margin: 4px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    `
}
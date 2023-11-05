import { styled } from "styled-components"

export default function Bubble({...props}) {

    
    return (<Styled.Bubble {...props}  />)
}

const Styled = {
    Bubble: styled.div`
        position: absolute;
        bottom: 0;
        width: 100px;
        height: 30px;
        border-radius: 8px;
        animation: bubbleGo forwards;
        animation-iteration-count: 1;
        @keyframes bubbleGo{
            from {
                opacity: 1;
                bottom: 0;
            }
            to {
                opacity: 0;
                bottom: 200vh;
            }
        }
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
}
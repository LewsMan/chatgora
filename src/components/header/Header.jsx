import { styled } from "styled-components"
import { useContext} from "react"
import { AppContext } from "../../App"
import { LogoApp } from "../logo"

export default function Header() {
    const { currentChat } = useContext(AppContext)

    return (<Styled.Wrapper>
        <div><LogoApp style={{width: '40px', margin: 'auto'}} /></div>
        <Styled.Title>#{currentChat}</Styled.Title>
    </Styled.Wrapper>)
}

const Styled = {
    Wrapper: styled.div`
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        width: 100%;
        border-bottom: 1px solid #696969;
        background: rgba(105,105,105, .18);
        padding: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    `,
    Title: styled.div`
        opacity: .5;
    `
}
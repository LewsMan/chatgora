

export default function LogoApp(props) {
    return (<img alt="chatgorapp" {...props} src="data:image/png;base64,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" />)
}
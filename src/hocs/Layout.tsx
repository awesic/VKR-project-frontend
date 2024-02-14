import {Helmet} from "react-helmet";

export default function Layout({title, content, children}: {
    title: string,
    content?: string,
    children: React.ReactNode
}){
    return (<>
        <Helmet>
            <title>{title}</title>
            <meta name={"description"} content={content}/>
        </Helmet>
        {children}
    </>)
}
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";
import ReactMarkdown from "react-markdown";
import './hl'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
const meta = require('./../meta.json')


interface IMenu {
    title: string,
    path?: string,
    items?: IMenu[],
    tags?: string[]
}

const Docs = () => {
    const [navItems, setNavItems] = React.useState<IMenu[]>(meta);
    const [activeMd, setActiveMd] = React.useState('');

    useEffect(() => { fetchdoc(`default.md`) }, []);

    const fetchdoc = (path: string) => {
        axios.get(`${process.env.PUBLIC_URL}/docs/${path}`)
            .then(res => {
                if (res.status === 200) {
                    setActiveMd(res.data);
                } else {
                    alert(res.statusText)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const renderAnchor = (menu: IMenu) => {
        return (
            <>
                {menu.path &&
                    <a href={`#${menu.path}`}
                        className="nav-link" onClick={() => { fetchdoc(menu.path ?? '') }}
                    >
                        {menu.title}
                        {menu.items && menu.items.length > 0 && <span className="float-end">&raquo;</span>}
                    </a>}
                {!menu.path &&
                    <a className="nav-link">
                        {menu.title}
                        {menu.items && menu.items.length > 0 && <span className="float-end">&raquo;</span>}
                    </a>}
            </>
        )
    }
    const renderMenuItem = (menu: IMenu) => {
        return (
            <li className="nav-item" key={menu.title}>
                {renderAnchor(menu)}
                {menu.items && menu.items.length > 0 &&
                    <ul className="submenu dropdown-menu">
                        {menu.items?.sort((a,b)=> a.title.localeCompare(b.title)).map(subMenu => (<li className="nav-item" key={subMenu.title}>{renderAnchor(subMenu)}</li>))}
                    </ul>
                }
            </li>
        )
    }

    return <div className="doc_root">
        <nav className="sidebar">
            <ul className="nav flex-column">{navItems?.map(renderMenuItem)}</ul>
        </nav>
        <div className="doc-body">
            {activeMd && <ReactMarkdown
                children={activeMd}
                className='markdown'
                components={{
                    pre: ({ children }) => (<>{children}</>),
                    code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                            <div className="bd-example-snippet bd-code-snippet">
                                <div className="d-flex align-items-center highlight-toolbar p-1">
                                    <small className="font-monospace text-uppercase">{match[1]}</small>
                                    <div className="d-flex ms-auto mx-1">
                                        <CopyToClipboard text={String(children)} />
                                    </div>
                                </div>
                                <div className="highlight">
                                    <SyntaxHighlighter
                                        showInlineLineNumbers={true}
                                        wrapLines={true}
                                        useInlineStyles={false}
                                        wrapLongLines={true}
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        PreTag={undefined}
                                        {...props}
                                        style={{}}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="highlight code-inline">
                                <SyntaxHighlighter
                                    showInlineLineNumbers={true}
                                    wrapLines={true}
                                    useInlineStyles={false}
                                    wrapLongLines={true}
                                    children={String(children).replace(/\n$/, '')}
                                    language='lang-dos'
                                    PreTag={undefined}
                                    {...props}
                                    style={{}}
                                />
                                <div className="ms-auto mx-1">
                                    <CopyToClipboard text={String(children)} />
                                </div>
                            </div>
                        )
                    }
                }}

            />}
        </div>
    </div>
}


const CopyToClipboard = (props: any) => {
    const [toolTip, setToolTip] = useState("Copy");
    const [icon, setIcon] = useState("bi-clipboard");

    const copy = () => {
        navigator.clipboard.writeText(String(props.text))
        setIcon('bi-clipboard-check')
        setToolTip("Copied");
        setTimeout(() => {
            setIcon('bi-clipboard')
            setToolTip("Copy");
        }, 3000);
    }

    return <OverlayTrigger
        overlay={
            <Tooltip >
                {toolTip}
            </Tooltip>
        }
    ><button type="button" className="btn-clipboard"
        onClick={() => { copy() }}>
            <span className={`bi ${icon}`}></span>
        </button>
    </OverlayTrigger>
}

export default Docs;
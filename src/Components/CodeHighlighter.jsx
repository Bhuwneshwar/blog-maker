import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useClipboard from "react-use-clipboard";

const CodeBlock = ({ code }) => {
    const [isCopied, setCopied] = useClipboard(code);
    const [copyText, setCopyText] = useState("Copy Code");
    const copy = () => {
        setCopied();
        setCopyText("Copied!");
        const id = setTimeout(() => setCopyText("Copy Code"), 2000);
    };
    return (
        <code className="codePlace">
            <div className="top">
                <span>Example Code</span>
                <button className="copy-button" onClick={copy}>
                    {copyText}
                </button>
            </div>

            <SyntaxHighlighter
                language="jsx"
                style={atomOneDark}
                customStyle={{ padding: "1rem",     borderRadius: "0 0 10px 10px" 
}}
            >
                {code}
            </SyntaxHighlighter>
        </code>
    );
};

export default CodeBlock;

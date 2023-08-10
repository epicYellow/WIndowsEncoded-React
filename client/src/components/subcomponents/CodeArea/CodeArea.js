import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Style from './CodeArea.module.scss';

const CodeArea = (props) => {

    const codeString = props.children;
    console.log(props.language);

    return (
    <div className={`${props.className} ${Style.DefaultStyle}`}>
        <SyntaxHighlighter language={props.language} style={docco}>
            {codeString}
        </SyntaxHighlighter>
    </div>
    );
};

export default CodeArea;
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import markdown from 'react-syntax-highlighter/dist/esm/languages/hljs/markdown';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import dockerfile from 'react-syntax-highlighter/dist/esm/languages/hljs/dockerfile';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import dos from 'react-syntax-highlighter/dist/esm/languages/hljs/dos';
import powershell from 'react-syntax-highlighter/dist/esm/languages/hljs/powershell';
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';


import scss from 'react-syntax-highlighter/dist/esm/languages/hljs/scss';
import less from 'react-syntax-highlighter/dist/esm/languages/hljs/less';
import http from 'react-syntax-highlighter/dist/esm/languages/hljs/http';
// import razor from 'highlightjs-cshtml-razor'
const razor = require('highlightjs-cshtml-razor')
import bicep from './../hl/bicep';
import 'highlight.js/scss/stackoverflow-dark.scss'
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('xaml', xml);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('tsql', sql);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('dockerfile', dockerfile);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('dos', dos);
SyntaxHighlighter.registerLanguage('powershell', powershell);
SyntaxHighlighter.registerLanguage('azurepowershell', powershell);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('less', less);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('rest', http);
SyntaxHighlighter.registerLanguage('razor', razor);
SyntaxHighlighter.registerLanguage('terraform', bicep);

 
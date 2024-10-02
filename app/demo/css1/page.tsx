import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-light.css';
import 'github-markdown-css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const str = `
# Welcome to My Blog

This is a sample blog post written in Markdown.

## Features

- Easy to write
- Supports **bold** and *italic* text
- And even \`inline code\`

### Code Example

\`\`\`javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
\`\`\`

For GFM, you can *also* use a plugin:
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| 列1   | 列2   | 列3   |
|-------|-------|-------|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
| 数据4 | 数据5 | 数据6 |
| 数据4 | 数据5 | 数据6 |


~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use ['rehype-raw'](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
['rehype-sanitize'](https://github.com/rehypejs/rehype-sanitize).

<h1>
  👆 Use the toggle above to add the plugin.
</h1>
`;

const MarkdownRenderer = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <ReactMarkdown
        className='markdown-body'
        children={str}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      />
    </div>
  );
};

export default MarkdownRenderer;

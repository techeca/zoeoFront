import React, { useState, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

const TextEditor = ({ content, setContent }) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const renderElement = useCallback(props => {
    return <p {...props.attributes}>{props.children}</p>;
  }, []);

  return (
    <Slate
      editor={editor}
      value={content}
      initialValue={content}
      onChange={value => setContent(value)}
    >
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

export default TextEditor;

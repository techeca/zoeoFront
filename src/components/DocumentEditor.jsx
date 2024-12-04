import React, { useState } from 'react';
import TextEditor from './TextEditor';
import { handleGenerateDocument } from '../utils/requests'

const DocumentEditor = () => {
  const [fragmentContent, setFragmentContent] = useState([
    { type: 'paragraph', children: [{ text: '' }] }
  ]);

  return (
    <div>
      <TextEditor content={fragmentContent} setContent={setFragmentContent} />
      {/*<button onClick={handleGenerateDocument}>Download Modified Document</button>*/}
      <button className="btn btn-solid-error" disabled={true}>Guardar</button>
    </div>
  );
};

export default DocumentEditor;

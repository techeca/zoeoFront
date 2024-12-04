// src/WordUploader.js
import React, { useState } from 'react';
import mammoth from 'mammoth';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import TextEditor from './TextEditor';

const WordUploader = () => {
  const [documentContent, setDocumentContent] = useState('');
  const [fragmentContent, setFragmentContent] = useState('');
  const [isDocx, setIsDocx] = useState(false); // State para detectar el formato

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;

      try {
        // Determinar el formato del archivo
        const fileType = getFileType(file);

        if (fileType === 'docx') {
          setIsDocx(true);
          handleDocxFile(arrayBuffer);
        } else if (fileType === 'doc') {
          setIsDocx(false);
          handleDocFile(arrayBuffer);
        } else {
          alert('Unsupported file format. Please upload a .docx or .doc file.');
        }
      } catch (error) {
        console.error('Error processing file:', error);
        alert('Error processing file. Please check if it is a valid Word document.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const getFileType = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension === 'docx') {
      return 'docx';
    } else if (extension === 'doc') {
      return 'doc';
    } else {
      return 'unsupported';
    }
  };

  const handleDocxFile = (arrayBuffer) => {
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    setDocumentContent(doc.getFullText());

    // Extract the fragment marked with {{fragment}}
    const fragment = extractFragment(doc.getFullText());
    setFragmentContent(fragment);
  };

  const handleDocFile = async (arrayBuffer) => {
    const result = await mammoth.extractRawText({ arrayBuffer });
    setDocumentContent(result.value);

    // Extract the fragment marked with {{fragment}}
    const fragment = extractFragment(result.value);
    setFragmentContent(fragment);
  };

  const extractFragment = (content) => {
    const match = content.match(/{{Fragment}}/);
    return match ? match[1] : '';
  };

  const saveDocument = () => {
    if (isDocx) {
      saveDocxDocument();
    } else {
      alert('Saving functionality for .doc files would require a different approach.');
    }
  };

  const saveDocxDocument = () => {
    const doc = new Docxtemplater();
    doc.loadZip(new PizZip());
    doc.setData({ fragment: fragmentContent });
    try {
      doc.render();
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(out, 'edited-document.docx');
    } catch (error) {
      console.error('Error rendering document:', error);
      alert('Error rendering document. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <textarea
        value={documentContent}
        readOnly
        rows="10"
        cols="50"
      />
      <TextEditor content={fragmentContent} setContent={setFragmentContent} />
      <button onClick={saveDocument}>Save Document</button>
    </div>
  );
};

export default WordUploader;

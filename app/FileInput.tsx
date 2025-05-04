'use client';

import React from 'react';
import styled from 'styled-components';

const FileInput = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first!');

    const text = await file.text();
    const res = await fetch('/api/upload-csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ csvText: text }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return alert(`Error: ${errorText}`);
    }

    const result = await res.json();
    alert(
      `File inserted successfully! ${result.insertedCount} records inserted.`
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) setFile(event.target.files[0]);
  };
  return (
    <div>
      <StyledInput type='file' accept='.csv' onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default FileInput;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 10px;
`;

import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/Services/api';

import { Container } from './styles';

export default function MeetupImageInput() {
  const { defaultValue, registerField } = useField('File');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      if (defaultValue) {
        setFile(defaultValue.id);
        setPreview(defaultValue.url);
      }
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="files">
        <img src={preview} alt="" />

        <input
          type="file"
          id="files"
          accept="images/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

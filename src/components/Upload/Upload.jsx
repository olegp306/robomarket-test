import React, { useState, useCallback } from 'react';
import styles from './Upload.module.scss';

export default React.memo(
  props => {

    const [fileName, setFileName] = useState('')

    const onInputChange = useCallback(e => {
      const file = e.target?.files?.[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedJson = JSON.parse(event.target.result);
          props.fileUploadCallback?.(parsedJson);
          setFileName(file.name);
        } catch (e) {
          console.error(e);
        }
      }
      reader.readAsText(file);
    }, [])

    return (
      <div className={styles.container}>
        <input id={'fileUploader'} hidden type={'file'} onChange={onInputChange} accept={'application/JSON'}/>
        {
          fileName && <div>{fileName}</div>
        }
        <label className={styles.buttonLabel} htmlFor={'fileUploader'}>Select {fileName ? 'new ' : ''} JSON file</label>
      </div>
    );
  }
);

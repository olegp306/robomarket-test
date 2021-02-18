import Upload from "./components/Upload/Upload";
import Form from "./components/Form/Form";
import styles from './App.module.scss';
import {useState} from 'react';

function App() {

  const [jsonObj, setJsonObj] = useState(null)

  return (
    <div className={styles.app}>
      <Upload fileUploadCallback={setJsonObj}/>
      {
        jsonObj && <Form jsonObj={jsonObj}/>
      }
    </div>
  );
}

export default App;

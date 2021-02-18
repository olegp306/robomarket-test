import React from "react";
import {Field} from "formik";
import styles from "./CustomField.module.scss";

const CustomField = React.memo(({ info }) => {
  switch (info.type) {
    case 'number':
    case 'input':
      return (
        <Field
          className={info.type === 'input' ? styles.textInput : `${styles.textInput} ${styles.numberInput}`}
          id={info.id}
          placeholder={info.placeholder}
          type={info.type}
          name={info.id}
        />
      );
    case 'select':
      return (
        <div className={styles.selectDropdown}>
          <Field as="select" name={info.id}>
            {
              info.options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </Field>
        </div>
      );
    case 'checkboxGroup':
      return (
        <div role="group" aria-labelledby="checkbox-group">
          {
            info.elements.map(
              element =>
                <div key={element.value}>
                  <label>
                    <Field type="checkbox" name={info.id} value={element.value}/>
                    {element.name}
                  </label>
                </div>
            )
          }
        </div>
      );
    default:
      return null
  }
});

export default CustomField;

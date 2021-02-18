import React, {useCallback, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import styles from './Form.module.scss'
import CustomField from "../CustomField/CustomField";

export default React.memo(
  props => {

    const [ submittedJson, submitJson ] = useState('');

    const { jsonObj } = props;

    const getInitialValue = useCallback(element => {
      switch (element.type){
        case 'select':
          return element.options?.[0]?.value;
        case 'checkboxGroup':
          return [];
        default:
          return '';
      }
    }, []);

    return (
      <Formik
        initialValues={jsonObj?.elements?.reduce((values, element) => {
          values[element.id] = getInitialValue(element);
          return values;
        }, {})}
        validate={values => {
          const errors = {};
          Object.entries(values).forEach(([key, value]) => {
            const element = jsonObj.elements.find(element => element.id === key);
            if (!value && element.isRequired) {
              errors[key] = 'Поле обязательно'
            }
            if (element?.minValue && (value < parseFloat(element.minValue))) {
              errors[key] = 'Недопустимое значение'
            }
            if (element?.maxValue && (value > parseFloat(element.maxValue))) {
              errors[key] = 'Недопустимое значение'
            }
          })
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          submitJson(JSON.stringify(values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form>
            {
              jsonObj?.title &&
              <h1 className={styles.title}>{jsonObj.title}</h1>
            }
            {
              jsonObj?.elements?.map(
                info =>
                  <div key={info.id} className={styles.row}>
                    <div className={styles.rowInputBlock}>
                      <label htmlFor={info.id} className={
                        info.type === 'checkboxGroup' ?
                          `${styles.inputLabel} ${styles.checkBoxGroupLabel}`
                          :
                          styles.inputLabel
                      }>
                        {info.label}{info.isRequired && <span className={styles.isRequired}>*</span>}
                      </label>
                      {
                        <CustomField info={info}/>
                      }
                    </div>
                    <ErrorMessage className={styles.error} name={info.id} component="div" />
                  </div>
              )
            }
            <button className={styles.send} type="submit" disabled={isSubmitting || Object.entries(errors).length > 0}>
              Отправить
            </button>
            {
              submittedJson &&
                <div>
                  {submittedJson}
                </div>
            }
          </Form>
        )}
      </Formik>
    );
  }
);

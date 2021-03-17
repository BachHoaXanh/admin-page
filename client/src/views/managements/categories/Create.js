import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { ERROR_MESSAGE, slugify, SUCCESS_MESSAGE, useFormInput } from '../../../common';
import { API_CATEGORIES } from '../../../api.common';

const Create = (props) => {
  const name = useFormInput('');
  const slug = useFormInput('');
  const [error, setError] = useState(null);
  const [errorName, setErrorName] = useState(null);

  const validate = (name) => {
    resetValidation();

    if (name.trim().length === 0) {
      setErrorName('Please enter Category name');
      return false;
    }

    return true;
  };

  const resetValidation = () => setErrorName(null);

  const handleSubmit = () => {
    setError(null);

    validate(name.value) && axios.post(`${API_CATEGORIES}`, {
      name: name.value,
      slug: slug.value !== '' ? slug.value : `${slugify(name.value)}-${new Date().getTime()}`,
    }).then(() => {
      alert(SUCCESS_MESSAGE);
      props.history.push('/managements/categories');
    }).catch((error) => setError(error.response.status === 401 ? error.response.data.message : ERROR_MESSAGE));
  };

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Create New Category</h2></strong>
            {error && <><br/><CAlert color="danger">{error}</CAlert></>}
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Category Name<label style={{ color: 'red' }}>*</label></CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput name="text-input" placeholder="Category Name"
                          id={errorName ? 'inputIsInvalid' : 'inputIsValid'}
                          className={errorName && 'is-invalid invalid'} {...name}/>
                  {errorName && <CFormText color="danger">{errorName}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Slug</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="slug" name="text-input" placeholder="Category Slug" {...slug}/>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" style={{ marginRight: '1rem' }} onClick={handleSubmit}>
              <CIcon name="cil-scrubber"/> Submit</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

export default Create;

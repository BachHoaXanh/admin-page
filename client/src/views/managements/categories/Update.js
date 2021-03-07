import React, { useState, useEffect } from 'react';
import {
  CAlert,
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
  CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { API_CATEGORIES } from '../../../api.common';
import { ERROR_MESSAGE, kebabCase, SUCCESS_MESSAGE } from '../../../common';

const Update = (props) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState(null);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    // Get Categories
    axios.get(`${API_CATEGORIES}/${props.match.params.id}`)
      .then((res) => {
        setName(res.data.name);
        setSlug(res.data.slug);
        setActive(res.data.isActive);
      }).catch(() => alert(ERROR_MESSAGE));
  }, [props.match.params.id]);

  const handleSubmit = () => {
    setError(null);

    axios.put(`${API_CATEGORIES}/${props.match.params.id}`, {
      name,
      slug: slug !== '' ? slug : `${kebabCase(name)}-${new Date().getTime()}`,
      isActive: (isActive === 'true'),
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
            <strong><h2>Update Category</h2></strong>
            {error && <><br/><CAlert color="danger">{error}</CAlert></>}
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="first-name" name="text-input" placeholder="Category Name" value={name}
                          onChange={e => setName(e.target.value)}/>
                  <CFormText>Please enter Category name</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Category Slug</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="slug" name="text-input" placeholder="Slug" value={slug}
                          onChange={e => setSlug(e.target.value)}/>
                  <CFormText>Please enter Category Slug</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id="select" value={isActive} onChange={e => setActive(e.target.value)}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </CSelect>
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

export default Update;

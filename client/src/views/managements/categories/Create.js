import React, {useState, useEffect} from 'react'
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
  CSelect,
  CAlert
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import { errorMessage, successMessage } from '../../../common';

const Create = (props) => {
  const name = useFormInput('');
  const parent = useFormInput('');
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleSubmit = () => {
    setError(null);

    axios.post(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/categories`, {
      name: name.value,
      parent: +parent.value
    }).then(() => {
      alert(successMessage);
      props.history.push('/managements/categories');
    }).catch((error) => {
      setError(error.response.status === 401
        ? error.response.data.message : errorMessage);
    });
  };

  useEffect(() => {
    // Get All Categories
    axios.get(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/categories`)
      .then((res) => {
        setCategories(res.data);
      }).catch(() => {
      alert(errorMessage);
    });
  }, [categories])

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Create New Category</h2></strong>
            {error && <><CAlert color="danger">{error}</CAlert></>}
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="first-name" name="text-input" placeholder="Name" {...name}/>
                  <CFormText>Please enter Category name</CFormText>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Parent</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id="select" {...parent}>
                    <option value="">Select Category Parent</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" style={{marginRight: '1rem'}} onClick={handleSubmit}>
              <CIcon name="cil-scrubber"/> Submit</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  )
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return { value, onChange: e => setValue(e.target.value) };
}

export default Create

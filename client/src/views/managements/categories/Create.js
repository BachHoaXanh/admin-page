import React, {useState} from 'react'
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
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";

const Create = (props) => {
  let name = useFormInput('');
  let parent = useFormInput('');

  const handleSubmit = () => {
    axios.post('http://localhost:3000/api/categories', {
      name: name.value,
      parent: parseInt(parent.value.toString())
    }).then(() => {
      alert('Successfully');
      props.history.push('/managements/categories');
    }).catch((error) => {
      alert('Something went wrong');
      console.log(error);
    });
  };

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Create New Category</h2></strong>
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
                    <option value="0">Please select Category Parent</option>
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

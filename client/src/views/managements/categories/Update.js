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
  CInputFile,
  CLabel,
  CSelect,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";

const Create = (props) => {
  let name = useFormInput('');
  let parent = useFormInput('');

  const handleSubmit = () => {
    axios.post('http://localhost:3000/api/categories', {
      name: name.value,
      parent: parent.value
    }).then((res) => {
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
                  <CInput id="first-name" name="text-input" placeholder="First Name" {...name}/>
                  <CFormText>Please enter Category name</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Category Parent</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="last-name" name="text-input" placeholder="Last Name" {...parent}/>
                  <CFormText>Please enter Category parent</CFormText>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Role</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id="select">
                    <option value="0">Please select role</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol tag="label" sm="3" className="col-form-label">
                  Active
                </CCol>
                <CCol sm="9">
                  <CSwitch
                    className="mr-1"
                    color="dark"
                    defaultChecked
                    shape="pill"
                    variant="opposite"
                  />
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
  const handleChange = e => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange };
}

export default Create

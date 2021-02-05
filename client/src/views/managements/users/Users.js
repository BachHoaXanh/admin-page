import React from 'react'
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

const Users = () => {
  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Create New User</h2></strong>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">First Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" placeholder="First Name"/>
                  <CFormText>Please enter your first name</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Last Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" placeholder="Last Name"/>
                  <CFormText>Please enter your last name</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="email-input">Email</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="email" id="email-input" name="email-input" placeholder="Email"
                          autoComplete="email"/>
                  <CFormText className="help-block">Please enter your email</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="password-input">Password</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="password" id="password-input" name="password-input" placeholder="Password"
                          autoComplete="new-password"/>
                  <CFormText className="help-block">Please enter a complex password</CFormText>
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
                <CLabel col md="3" htmlFor="file-input">Avatar</CLabel>
                <CCol xs="12" md="9">
                  <CInputFile id="file-input" name="file-input"/>
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
            <CButton type="submit" size="sm" color="primary" style={{marginRight: '1rem'}}>
              <CIcon name="cil-scrubber"/> Submit</CButton>
            <CButton type="reset" size="sm" color="danger">
              <CIcon name="cil-ban"/> Reset</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  )
}

export default Users

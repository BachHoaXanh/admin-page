import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup, CFormText,
  CInput,
  CLabel,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { API_USERS } from '../../../api.common';
import { SUCCESS_MESSAGE, useFormInput } from '../../../common';

const UpdateAvatar = (props) => {
  const { match } = props;
  const oldPassword = useFormInput('');
  const newPassword = useFormInput('');

  const [errorOldPassword, setErrorOldPassword] = useState(null);
  const [errorNewPassword, setErrorNewPassword] = useState(null);

  const resetValidation = () => {
    setErrorOldPassword(null);
    setErrorNewPassword(null);
  };

  const validate = (oldPassword, newPassword) => {
    resetValidation();
    let flag = true;

    if (oldPassword?.trim().length === 0) {
      setErrorOldPassword('Please enter your old password');
      flag = false;
    }
    if (newPassword?.trim().length === 0) {
      setErrorNewPassword('Please enter your new password');
      flag = false;
    }

    return flag;
  };

  const handleSubmit = () => {
    if (validate(oldPassword.value, newPassword.value)) {
      axios.patch(`${API_USERS}/change-password/${match.params.id}`, {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      }).then(() => {
        alert(SUCCESS_MESSAGE);
        props.history.push('/managements/users');
      }).catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Update Password User</h2></strong>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="password-input">Old Password</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorOldPassword ? 'inputIsInvalid' : 'inputIsValid'} type="password"
                          name="password-input" autoComplete="new-password" {...oldPassword}
                          className={errorOldPassword && 'is-invalid invalid'} placeholder="Password"/>
                  {errorOldPassword && <CFormText color="danger">{errorOldPassword}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="password-input">New Password</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorNewPassword ? 'inputIsInvalid' : 'inputIsValid'} type="password"
                          name="password-input" autoComplete="new-password" {...newPassword}
                          className={errorNewPassword && 'is-invalid invalid'} placeholder="Password"/>
                  {errorNewPassword && <CFormText color="danger">{errorNewPassword}</CFormText>}
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

export default UpdateAvatar;

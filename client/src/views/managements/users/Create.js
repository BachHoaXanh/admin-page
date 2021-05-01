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
  CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { ERROR_MESSAGE, SUCCESS_MESSAGE, useFormInput } from '../../../common';
import axios from 'axios';
import { API_USERS } from '../../../api.common';

const Create = (props) => {
  const email = useFormInput('');
  const password = useFormInput('');
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const phone = useFormInput('');
  const address = useFormInput('');
  const gender = useFormInput('');
  const role = useFormInput('');

  const [error, setError] = useState(null);

  // Validate
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorFirstName, setErrorFirstName] = useState(null);
  const [errorLastName, setErrorLastName] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorGender, setErrorGender] = useState(null);
  const [errorRole, setErrorRole] = useState(null);

  const resetValidation = () => {
    setErrorEmail(null);
    setErrorPassword(null);
    setErrorFirstName(null);
    setErrorLastName(null);
    setErrorPhone(null);
    setErrorAddress(null);
    setErrorGender(null);
    setErrorRole(null);
  };

  const validate = (email, password, firstName, lastName, phone, address, gender, role) => {
    resetValidation();
    let flag = true;

    if (email?.trim().length === 0) {
      setErrorEmail('Please enter your email');
      flag = false;
    }
    if (password?.trim().length === 0) {
      setErrorPassword('Please enter a complex password');
      flag = false;
    }
    if (firstName?.trim().length === 0) {
      setErrorFirstName('Please enter your first name');
      flag = false;
    }
    if (lastName?.trim().length === 0) {
      setErrorLastName('Please enter your last name');
      flag = false;
    }
    if (phone?.trim().length === 0) {
      setErrorPhone('Please enter your phone number');
      flag = false;
    }
    if (address?.trim().length === 0) {
      setErrorAddress('Please enter your address');
      flag = false;
    }
    if (gender?.trim().length === 0) {
      setErrorGender('Please enter your gender');
      flag = false;
    }
    if (role?.trim().length === 0) {
      setErrorRole('Please enter your role');
      flag = false;
    }

    return flag;
  };

  const handleSubmit = () => {
    setError(null);

    if (validate(email.value, password.value, firstName.value, lastName.value, phone.value, address.value, gender.value,
      role.value)) {
      axios.post(`${API_USERS}`, {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phone: `+84${+phone.value}`,
        address: address.value,
        gender: gender.value,
        role: role.value,
      }).then((res) => {
        alert(SUCCESS_MESSAGE);
        props.history.push('/managements/users');
      }).catch((error) => {
        setError(`${error.response.data.message }`);
      });
    }
  };

  useEffect(() => {

  });

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Create New User</h2></strong>
            {error && <><br/><CAlert color="danger">{error}</CAlert></>}
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="email-input">Email</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorEmail ? 'inputIsInvalid' : 'inputIsValid'} type="email" name="email-input"
                          className={errorEmail && 'is-invalid invalid'} placeholder="Email" autoComplete="email"
                          {...email}/>
                  {errorEmail && <CFormText color="danger">{errorEmail}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="password-input">Password</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorPassword ? 'inputIsInvalid' : 'inputIsValid'} type="password" name="password-input"
                          className={errorPassword && 'is-invalid invalid'} placeholder="Password"
                          autoComplete="new-password" {...password}/>
                  {errorPassword && <CFormText color="danger">{errorPassword}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="text-input">First Name</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorFirstName ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorFirstName && 'is-invalid invalid'} placeholder="First Name" {...firstName}/>
                  {errorFirstName && <CFormText color="danger">{errorFirstName}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="text-input">Last Name</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorLastName ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorLastName && 'is-invalid invalid'} placeholder="Last Name" {...lastName}/>
                  {errorLastName && <CFormText color="danger">{errorLastName}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="text-input">Phone Number</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorPhone ? 'inputIsInvalid' : 'inputIsValid'} name="text-input" type="number"
                          className={errorPhone && 'is-invalid invalid'} placeholder="Phone Number" {...phone}/>
                  {errorPhone && <CFormText color="danger">{errorPhone}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">Address</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea id={errorAddress ? 'inputIsInvalid' : 'inputIsValid'} name="textarea-input"
                             className={errorAddress && 'is-invalid invalid'} rows="9" placeholder="Address..."
                             {...address}/>
                  {errorAddress && <CFormText color="danger">{errorAddress}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="select">Gender</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id={errorGender ? 'inputIsInvalid' : 'inputIsValid'}
                           className={errorGender && 'is-invalid invalid'} {...gender}>
                    <option value="null">Please select Gender</option>
                    <option value="unknown">Unknown</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </CSelect>
                  {errorGender && <CFormText color="danger">{errorGender}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3"><CLabel htmlFor="select">Role</CLabel></CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id={errorRole ? 'inputIsInvalid' : 'inputIsValid'}
                           className={errorRole && 'is-invalid invalid'} {...role}>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </CSelect>
                  {errorRole && <CFormText color="danger">{errorRole}</CFormText>}
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

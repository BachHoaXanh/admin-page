import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import { ERROR_MESSAGE, setUserSession, useFormInput } from '../../../common';
import { HOST } from '../../../api.common';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get Form value
  const email = useFormInput('');
  const password = useFormInput('');

  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios.post(`${HOST}/auth/login`, {
      email: email.value,
      password: password.value
    }).then((res) => {
      setLoading(false);
      setUserSession(res.data.token, res.data.id);
      props.history.push('/');
    }).catch(error => {
      setLoading(false);
      setError(error.response.status === 401
        ? error.response.data.message : ERROR_MESSAGE);
    });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="email" {...email} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="password" {...password} />
                    </CInputGroup>
                    {error && <><div style={{ color: 'red' }}><strong>{error}</strong></div><br /></>}<br />
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" value={loading ? 'Loading...' : 'Login'}
                                 onClick={handleLogin} disabled={loading}>Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary bg-logo py-5 d-md-down-none">
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

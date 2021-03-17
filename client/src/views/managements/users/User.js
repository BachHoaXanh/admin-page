import React, { useState, useEffect } from 'react';
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import axios from 'axios';
import { ERROR_MESSAGE } from '../../../common';
import { API_USERS } from '../../../api.common';

const User = (props) => {
  const { match, history } = props;
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [passwordUpdated, setPasswordUpdated] = useState(null);

  const handleResetPassword = () => {
    setError(null);
    setPasswordUpdated(null);

    axios.patch(`${API_USERS}/reset-password/${match.params.id}`)
      .then((res) => {
        setPasswordUpdated(`New Password is ${res?.data.newPassword}`);
      }).catch(() => {
      setError(error.response.status === 401 ? error.response.data.message : ERROR_MESSAGE);
      alert(ERROR_MESSAGE);
    });
  };

  const handleEdit = () => history.push(`/managements/users/${match.params.id}/update`);

  const handleRemove = () => {
    axios.delete(`${API_USERS}/${match.params.id}`)
      .then(() => history.push('/managements/users'))
      .catch(() => {
        alert(ERROR_MESSAGE);
        history.push('/managements/users');
      });
  };

  useEffect(() => {
    axios.get(`${API_USERS}/${match.params.id}`)
      .then((res) => {
        const { id, password, avatar, isActive, createdAt, updatedAt, ...user } = res.data;
        setUser({ ...user, active: isActive });
      }).catch(() => alert(ERROR_MESSAGE));
  }, [match.params.id]);

  const userDetails = user ? Object.entries(user) :
    [[(<span><CIcon className="text-muted" name="cui-icon-ban"/> Not found</span>)]];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow className="align-items-center">
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0">
                <h4><strong>User Information</strong></h4>
              </CCol>
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0"/>
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0"/>
              <CCol col="5" sm="4" md="3" className="mb-3 mb-xl-0" style={{ maxWidth: 'max-content' }}>
                <CButton variant="ghost" color="info" onClick={handleResetPassword}>
                  <CIcon size={'sm'} name="cilSettings"/> Reset Password
                </CButton>
              </CCol>
              <CCol col="2" sm="2" md="2" className="mb-3 mb-xl-0" style={{ maxWidth: 'max-content' }}>
                <CButton variant="ghost" color="success" onClick={handleEdit}>
                  <CIcon name="cil-pencil"/> Edit
                </CButton>
                <CButton variant="ghost" color="danger" onClick={handleRemove}>
                  <CIcon name="cil-x"/> Delete
                </CButton>
              </CCol>
            </CRow>
            {passwordUpdated && <><br/><CAlert color="success">Successfully. Please check your email.</CAlert></>}
            {error && <><br/><CAlert color="danger">{error}</CAlert></>}
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
              {
                userDetails.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td><strong>{value?.toString()}</strong></td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;

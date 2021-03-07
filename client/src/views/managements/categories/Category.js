import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { API_CATEGORIES } from '../../../api.common';
import { ERROR_MESSAGE } from '../../../common';

const Category = ({ match }) => {
  const history = useHistory();
  const [category, setCategory] = useState();

  const handleEdit = () => {
    history.push(`/managements/categories/update/${match.params.id}`);
  };

  const handleRemove = () => {
    axios.delete(`${API_CATEGORIES}/${match.params.id}`)
      .then(() => history.push('/managements/categories'))
      .catch(() => {
        alert(ERROR_MESSAGE);
        history.push('/managements/categories');
      });
  };

  useEffect(() => {
    // Get Categories
    axios.get(`${API_CATEGORIES}/${match.params.id}`)
      .then((res) => {
        let { id, createdAt, updatedAt, parent, isActive, ...category } = res.data;

        setCategory({ ...category, active: isActive });
      }).catch(() => alert(ERROR_MESSAGE));
  }, [match.params.id]);

  const categoryDetails = category ? Object.entries(category) :
    [[(<span><CIcon className="text-muted" name="cui-icon-ban"/> Not found</span>)]];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow className="align-items-center">
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0">
                <h4><strong>Category Information</strong></h4>
              </CCol>
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0"/>
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0"/>
              <CCol col="2" sm="4" md="2" className="mb-3 mb-xl-0" style={{ maxWidth: 'max-content' }}>
                <CButton variant="ghost" color="success" onClick={handleEdit}>
                  <CIcon name="cil-pencil"/> Edit
                </CButton>
                <CButton variant="ghost" color="danger" onClick={handleRemove}>
                  <CIcon name="cil-x"/> Delete
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
              {
                categoryDetails.map(([key, value], index) => {
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

export default withRouter(Category);

import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { API_ORDERS } from '../../../api.common';
import { ERROR_MESSAGE } from '../../../common';

const Order = (props) => {
  const { match, history } = props;
  const [order, setOrder] = useState();

  const handleEdit = () => history.push(`/managements/orders/${match.params.id}/update`);

  const handleRemove = () => {
    axios.delete(`${API_ORDERS}/${match.params.id}`)
      .then(() => history.push('/managements/orders'))
      .catch(() => {
        alert(ERROR_MESSAGE);
        history.push('/managements/orders');
      });
  };

  useEffect(() => {
    // Get Categories
    axios.get(`${API_ORDERS}/${match.params.id}`)
      .then((res) => {
        const {id, staffId, customerId, createdAt, updatedAt, ...data} = res.data;
        setOrder(data);
      })
      .catch(() => alert(ERROR_MESSAGE));
  }, [match.params.id]);

  const orderDetails = order ? Object.entries(order) :
    [[(<span><CIcon className="text-muted" name="cui-icon-ban"/> Not found</span>)]];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow className="align-items-center">
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0">
                <h4><strong>Order Information</strong></h4>
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
                orderDetails.map(([key, value], index) => {
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

export default Order;

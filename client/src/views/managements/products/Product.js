import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import axios from 'axios';
import { API_CATEGORIES, API_PRODUCTS } from '../../../api.common';
import { ERROR_MESSAGE } from '../../../common';

const User = ({ match }) => {
  console.log(match);
  const history = useHistory();
  const [product, setProduct] = useState();

  const handleEdit = () => {
    history.push(`/managements/products/update/${match.params.id}`);
  };

  const handleRemove = () => {
    axios.delete(`${API_PRODUCTS}/${match.params.id}`)
      .then(() => history.push('/managements/products'))
      .catch(() => {
        alert(ERROR_MESSAGE);
        history.push('/managements/products');
      });
  };

  useEffect(() => {
    axios.get(`${API_PRODUCTS}/${match.params.id}`)
      .then((res) => {
        const { id, categoryId, images, createdAt, updatedAt, ...product } = res.data;

        if (res?.data.categoryId) {
          axios.get(`${API_CATEGORIES}/${res.data.categoryId}`)
            .then((data) => {
              // TODO: Find way to show images
              setProduct({ category: data.data.name, ...product });
            }).catch(() => alert(ERROR_MESSAGE));
        } else {
          setProduct(product);
        }
      }).catch(() => alert(ERROR_MESSAGE));
  }, [match.params.id]);
  console.log(product);
  const productDetails = product ? Object.entries(product) :
    [[(<span><CIcon className="text-muted" name="cui-icon-ban"/> Not found</span>)]];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow className="align-items-center">
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0">
                <h4><strong>Product Information</strong></h4>
              </CCol>
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0"/>
              <CCol col="1" sm="2" md="2" xl className="mb-3 mb-xl-0"/>
              <CCol col="2" sm="2" md="2" className="mb-3 mb-xl-0" style={{ maxWidth: 'max-content' }}>
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
                productDetails.map(([key, value], index) => {
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

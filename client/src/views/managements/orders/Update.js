import React, { useState, useEffect } from 'react';
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
  CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../../common';
import { API_ORDERS } from '../../../api.common';
import axios from 'axios';

const Update = (props) => {
  const { match, history } = props;
  const [products, setProducts] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [note, setNote] = useState('');
  const [shippingNote, setShippingNote] = useState('');
  const [payment, setPayment] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Validation
  const [error, setError] = useState();
  const [errorCustomerName, setErrorCustomerName] = useState(null);
  const [errorCustomerPhone, setErrorCustomerPhone] = useState(null);
  const [errorCustomerEmail, setErrorCustomerEmail] = useState(null);
  const [errorCustomerAddress, setErrorCustomerAddress] = useState(null);
  const [errorPayment, setErrorPayment] = useState(null);

  const handleSubmit = () => {
    axios.put(`${API_ORDERS}/${match.params.id}`, {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
      note, shippingNote, payment, totalPrice
    })
      .then(() => {
        alert(SUCCESS_MESSAGE);
        history.push('/managements/orders');
      })
      .catch((error) => setError(error.response.status === 401 ? error.response.data.message : ERROR_MESSAGE));
  };

  useEffect(() => {
    axios.get(`${API_ORDERS}/${match.params.id}`)
      .then((res) => {
        const { data } = res;

        setCustomerName(data.name);
        setCustomerPhone(data.phone);
        setCustomerEmail(data.email);
        setCustomerAddress(data.address);
        setNote(data.note);
        setShippingNote(data.shippingNote);
        setPayment(data.payment);
        setTotalPrice(data.totalPrice);
        setProducts(data.products);
      })
      .catch((error) => setError(error.response.status === 401 ? error.response.data.message : ERROR_MESSAGE));
  }, [match.params.id]);

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Update Order</h2></strong>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              {/*<CFormGroup row>*/}
              {/*  <CCol md="3">*/}
              {/*    <CLabel htmlFor="text-input">Products</CLabel>*/}
              {/*  </CCol>*/}
              {/*  <CCol xs="12" md="9">*/}
              {/*    <CInput id="customer_name" name="text-input" placeholder="Products"/>*/}
              {/*    <CFormText>Please enter Products</CFormText>*/}
              {/*  </CCol>*/}
              {/*</CFormGroup>*/}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Customer Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput name="text-input" placeholder="Customer Name" value={customerName}
                          id={errorCustomerName ? 'inputIsInvalid' : 'inputIsValid'}
                          className={errorCustomerName && 'is-invalid invalid'}
                          onChange={e => setCustomerName(e.target.value)}/>
                  {errorCustomerName && <CFormText color="danger">{errorCustomerName}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Customer Phone</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput name="text-input" placeholder="Customer Phone" value={customerPhone}
                          id={errorCustomerPhone ? 'inputIsInvalid' : 'inputIsValid'}
                          className={errorCustomerPhone && 'is-invalid invalid'}
                          onChange={e => setCustomerPhone(e.target.value)}/>
                  {errorCustomerPhone && <CFormText color="danger">{errorCustomerPhone}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="email-input">Customer Email</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="email" name="email-input" placeholder="Customer Email" value={customerEmail}
                          autoComplete="email" id={errorCustomerEmail ? 'inputIsInvalid' : 'inputIsValid'}
                          className={errorCustomerEmail && 'is-invalid invalid'}
                          onChange={e => setCustomerEmail(e.target.value)}/>
                  {errorCustomerEmail && <CFormText color="danger">{errorCustomerEmail}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">Customer Address</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea name="textarea-input" id={errorCustomerAddress ? 'inputIsInvalid' : 'inputIsValid'}
                             className={errorCustomerAddress && 'is-invalid invalid'} rows="9"
                             placeholder="Customer Address ..." value={customerAddress}
                             onChange={e => setCustomerAddress(e.target.value)}/>
                  {errorCustomerAddress && <CFormText color="danger">{errorCustomerAddress}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">Note</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea name="textarea-input" rows="9" placeholder="Customer Address ..." value={note}
                             onChange={e => setNote(e.target.value)}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">Shipping Note</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea name="textarea-input" rows="9" placeholder="Shipping Note ..." value={shippingNote}
                             onChange={e => setShippingNote(e.target.value)}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Total Price</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_price" type="number" name="text-input" placeholder="Total Price"
                          value={totalPrice} onChange={e => setTotalPrice(e.target.value)}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Payment</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id={errorPayment ? 'inputIsInvalid' : 'inputIsValid'} value={payment}
                           className={errorPayment && 'is-invalid invalid'} onChange={e => setPayment(e.target.value)}>
                    <option value="">Please select Payment type</option>
                    <option value="COD">COD</option>
                    <option value="ATM">ATM</option>
                  </CSelect>
                  {errorPayment && <CFormText color="danger">{errorPayment}</CFormText>}
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" style={{ marginRight: '1rem' }} onClick={handleSubmit}>
              <CIcon name="cil-scrubber"/> Submit
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

export default Update;

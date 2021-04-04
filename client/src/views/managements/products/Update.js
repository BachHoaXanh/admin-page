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
  CInputFile,
  CLabel,
  CSelect,
  CTextarea,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../../common';
import { API_CATEGORIES, API_PRODUCTS } from '../../../api.common';
import axios from 'axios';

const Update = (props) => {
  const { match, history } = props;
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState(0);
  const [saleOff, setSaleOff] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [mfg, setMFG] = useState('');
  const [exp, setEXP] = useState('');
  const [provider, setProvider] = useState('');
  const [origination, setOrigination] = useState('');
  const [status, setStatus] = useState('');
  const [files, setFiles] = useState();
  const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

  // Validate
  const [error, setError] = useState(null);
  const [errorCategoryId, setErrorCategoryId] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [errorShortDescription, setErrorShortDescription] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorProvider, setErrorProvider] = useState(null);
  const [errorOrigination, setErrorOrigination] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [errorEXP, setErrorEXP] = useState(null);
  const [errorMFG, setErrorMFG] = useState(null);

  useEffect(() => {
    axios.get(`${API_PRODUCTS}/${match.params.id}`)
      .then((res) => {
        setCategoryId(res.data.categoryId);
        setName(res.data.name);
        setCode(res.data.code);
        setPrice(res.data.price);
        setSaleOff(res.data.saleOff);
        setQuantity(res.data.quantity);
        setDescription(res.data.description);
        setShortDescription(res.data.shortDescription);
        setMFG(res.data.mfg);
        setEXP(res.data.exp);
        setProvider(res.data.provider);
        setOrigination(res.data.origination);
        setStatus(res.data.status);
      });

    // Get Activated Category
    axios.get(`${API_CATEGORIES}`).then(res => setCategories(res.data.filter(item => item.isActive)));
  }, [match.params.id]);

  const handleSubmit = () => {
    setError(null);

    if (validate(categoryId, name, code, description, shortDescription, provider, origination, status, mfg, exp)) {
      const formData = new FormData();
      const tempUploadFiles = files && Array.from(files);

      formData.append('categoryId', categoryId);
      formData.append('name', name);
      formData.append('code', code);
      formData.append('price', price);
      formData.append('saleOff', saleOff);
      formData.append('quantity', quantity);
      formData.append('description', description);
      formData.append('shortDescription', shortDescription);
      formData.append('mfg', mfg);
      formData.append('exp', exp);
      formData.append('provider', provider);
      formData.append('origination', origination);
      formData.append('status', status);

      tempUploadFiles?.forEach((item) => formData.append('images', item));

      axios.put(`${API_PRODUCTS}/${match.params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(() => {
        alert(SUCCESS_MESSAGE);
        history.push('/managements/products');
      }).catch((error) => setError(error.response.status === 401 ? error.response.data.message : ERROR_MESSAGE));
    }
  };

  const resetValidation = () => {
    setErrorName(null);
    setErrorCode(null);
    setErrorStatus(null);
    setErrorProvider(null);
    setErrorCategoryId(null);
    setErrorDescription(null);
    setErrorOrigination(null);
    setErrorShortDescription(null);
    setErrorMFG(null);
    setErrorEXP(null);
  };

  const validate = (categoryId, name, code, description, shortDescription, provider, origination, status, mfg, exp) => {
    resetValidation();
    let flag = true;

    if (categoryId?.trim().length === 0) {
      setErrorCategoryId('Please enter Category');
      flag = false;
    }
    if (name?.trim().length === 0) {
      setErrorName('Please enter Product Name');
      flag = false;
    }
    if (code?.trim().length === 0) {
      setErrorCode('Please enter Product Code');
      flag = false;
    }
    if (description?.trim().length === 0) {
      setErrorDescription('Please enter Product Description');
      flag = false;
    }
    if (shortDescription?.trim().length === 0) {
      setErrorShortDescription('Please enter Short Description');
      flag = false;
    }
    if (provider?.trim().length === 0) {
      setErrorProvider('Please enter Provider');
      flag = false;
    }
    if (origination?.trim().length === 0) {
      setErrorOrigination('Please enter Origination');
      flag = false;
    }
    if (status?.trim().length === 0) {
      setErrorStatus('Please enter Status');
      flag = false;
    }
    if (mfg?.trim().length === 0) {
      setErrorMFG('Please enter Manufacturing Date');
      flag = false;
    }
    if (exp?.trim().length === 0) {
      setErrorEXP('Please enter Expiry date');
      flag = false;
    }

    return flag;
  };

  const imageHandler = e => {
    const reader = new FileReader();

    setFiles(e.target.files);
    reader.onload = () => reader.readyState === 2 && setProfileImg(reader.result.toString());
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Update Product</h2></strong>
            {error && <><br/><CAlert color="danger">{error}</CAlert></>}
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Category</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id={errorCategoryId ? 'inputIsInvalid' : 'inputIsValid'}
                           className={errorCategoryId && 'is-invalid invalid'} value={categoryId}
                           onChange={e => setCategoryId(e.target.value)}>
                    <option value="">Please select Category</option>
                    {
                      categories.length > 0 &&
                      categories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
                    }
                  </CSelect>
                  {errorCategoryId && <CFormText color="danger">{errorCategoryId}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorName ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorName && 'is-invalid invalid'} placeholder="Product Name"
                          value={name} onChange={e => setName(e.target.value)}/>
                  {errorName && <CFormText color="danger">{errorName}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Code</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorCode ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorCode && 'is-invalid invalid'} placeholder="Product Code"
                          value={code} onChange={e => setCode(e.target.value)}/>
                  {errorCode && <CFormText color="danger">{errorCode}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Price</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_price" type="number" name="text-input" placeholder="Product Price"
                          value={price} onChange={e => setPrice(e.target.value)}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Quantity</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_quantity" type="number" name="text-input" placeholder="Product Quantity"
                          value={quantity} onChange={e => setQuantity(e.target.value)}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Sale Off</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_sale" type="number" name="text-input" placeholder="Product Sale"
                          value={saleOff} onChange={e => setSaleOff(e.target.value)}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Provider</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorProvider ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorProvider && 'is-invalid invalid'} placeholder="Provider"
                          value={provider} onChange={e => setProvider(e.target.value)}/>
                  {errorProvider && <CFormText color="danger">{errorProvider}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Origination</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorOrigination ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorOrigination && 'is-invalid invalid'} placeholder="Origination"
                          value={origination} onChange={e => setOrigination(e.target.value)}/>
                  {errorOrigination && <CFormText color="danger">{errorOrigination}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">Manufacturing Date</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorMFG ? 'inputIsInvalid' : 'inputIsValid'} type="date" name="date-input"
                          className={errorMFG && 'is-invalid invalid'} placeholder="date" value={mfg}
                          onChange={e => setMFG(e.target.value)}/>
                  {errorMFG && <CFormText color="danger">{errorMFG}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">Expiry date</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorEXP ? 'inputIsInvalid' : 'inputIsValid'} type="date" name="date-input"
                          className={errorEXP && 'is-invalid invalid'} placeholder="date" value={exp}
                          onChange={e => setEXP(e.target.value)}/>
                  {errorEXP && <CFormText color="danger">{errorEXP}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">Short Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea id={errorShortDescription ? 'inputIsInvalid' : 'inputIsValid'} name="textarea-input"
                             className={errorShortDescription && 'is-invalid invalid'} rows="9"
                             placeholder="Short Description..." value={shortDescription}
                             onChange={e => setShortDescription(e.target.value)}/>
                  {errorShortDescription && <CFormText color="danger">{errorShortDescription}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea id={errorDescription ? 'inputIsInvalid' : 'inputIsValid'} name="textarea-input"
                             className={errorDescription && 'is-invalid invalid'} rows="9" placeholder="Description..."
                             value={description} onChange={e => setDescription(e.target.value)}/>
                  {errorDescription && <CFormText color="danger">{errorDescription}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Status</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id={errorStatus ? 'inputIsInvalid' : 'inputIsValid'}
                           className={errorStatus && 'is-invalid invalid'} value={status}
                           onChange={e => setStatus(e.target.value)}>
                    <option value="">Please select Status</option>
                    <option value="Stocking">STOCKING</option>
                    <option value="Coming">COMING</option>
                    <option value="Incoming">INCOMING</option>
                    <option value="Sold-out">SOLD_OUT</option>
                  </CSelect>
                  {errorStatus && <CFormText color="danger">{errorStatus}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CLabel col md="3" htmlFor="file-input">Images</CLabel>
                <CCol xs="12" md="9">
                  <CInputFile id="file-input" multiple name="file-input" onChange={imageHandler}/>
                </CCol>
                <CCol xs="12" md="9">
                  <CImg src={profileImg}/>
                  {
                    files && files?.forEach((item, index) => {
                      return (
                        <CImg key={index} src={URL.createObjectURL(item)}/>
                      );
                    })
                  }
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

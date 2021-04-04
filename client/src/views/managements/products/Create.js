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
  CImg,
  CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { ERROR_MESSAGE, SUCCESS_MESSAGE, useFormInput } from '../../../common';
import { API_CATEGORIES, API_PRODUCTS } from '../../../api.common';
import axios from 'axios';

const Create = (props) => {
  const categoryId = useFormInput('');
  const name = useFormInput('');
  const code = useFormInput('');
  const price = useFormInput(0);
  const saleOff = useFormInput(0);
  const quantity = useFormInput(0);
  const description = useFormInput('');
  const shortDescription = useFormInput('');
  const mfg = useFormInput('');
  const exp = useFormInput('');
  const provider = useFormInput('');
  const origination = useFormInput('');
  const status = useFormInput('');
  const [files, setFiles] = useState();
  const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Validate
  const [errorCategoryId, setErrorCategoryId] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [errorShortDescription, setErrorShortDescription] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorProvider, setErrorProvider] = useState(null);
  const [errorOrigination, setErrorOrigination] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [errorMFG, setErrorMFG] = useState(null);
  const [errorEXP, setErrorEXP] = useState(null);

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

  const handleSubmit = () => {
    setError(null);

    if (validate(categoryId.value, name.value, code.value, description.value, shortDescription.value, provider.value,
      origination.value, status.value, mfg.value, exp.value)) {
      const formData = new FormData();
      const tempUploadFiles = files && Array.from(files);

      formData.append('categoryId', categoryId.value);
      formData.append('name', name.value);
      formData.append('code', code.value);
      formData.append('price', price.value);
      formData.append('saleOff', saleOff.value);
      formData.append('quantity', quantity.value);
      formData.append('description', description.value);
      formData.append('shortDescription', shortDescription.value);
      formData.append('mfg', mfg.value);
      formData.append('exp', exp.value);
      formData.append('provider', provider.value);
      formData.append('origination', origination.value);
      formData.append('status', status.value);

      tempUploadFiles?.forEach((item) => {
        formData.append('images', item);
      });

      axios.post(`${API_PRODUCTS}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(() => {
        alert(SUCCESS_MESSAGE);
        props.history.push('/managements/products');
      }).catch((error) => setError(error.response?.status === 401 ? error.response.data.message : ERROR_MESSAGE));
    }
  };

  useEffect(() => {
    // Get Activated Category
    axios.get(`${API_CATEGORIES}`).then(res => setCategories(res.data.filter(item => item.isActive)));
  }, []);

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
            <strong><h2>Create New Product</h2></strong>
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
                           className={errorCategoryId && 'is-invalid invalid'} {...categoryId}>
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
                          className={errorName && 'is-invalid invalid'} placeholder="Product Name" {...name}/>
                  {errorName && <CFormText color="danger">{errorName}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Code</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorCode ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorCode && 'is-invalid invalid'} placeholder="Product Code" {...code}/>
                  {errorCode && <CFormText color="danger">{errorCode}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Price</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_price" type="number" name="text-input" placeholder="Product Price" {...price}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Quantity</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_quantity" type="number" name="text-input"
                          placeholder="Product Quantity" {...quantity}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Sale Off</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_sale" type="number" name="text-input" placeholder="Product Sale" {...saleOff}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Provider</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorProvider ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorProvider && 'is-invalid invalid'} placeholder="Provider" {...provider}/>
                  {errorProvider && <CFormText color="danger">{errorProvider}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Origination</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorOrigination ? 'inputIsInvalid' : 'inputIsValid'} name="text-input"
                          className={errorOrigination && 'is-invalid invalid'}
                          placeholder="Origination" {...origination}/>
                  {errorOrigination && <CFormText color="danger">{errorOrigination}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">Manufacturing Date</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorMFG ? 'inputIsInvalid' : 'inputIsValid'} type="date" name="date-input"
                          className={errorMFG && 'is-invalid invalid'} placeholder="date" {...mfg}/>
                  {errorMFG && <CFormText color="danger">{errorMFG}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">Expiry date</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id={errorEXP ? 'inputIsInvalid' : 'inputIsValid'} type="date" name="date-input"
                          className={errorEXP && 'is-invalid invalid'} placeholder="date" {...exp}/>
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
                             placeholder="Short Description..." {...shortDescription}/>
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
                             {...description}/>
                  {errorDescription && <CFormText color="danger">{errorDescription}</CFormText>}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Status</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id={errorStatus ? 'inputIsInvalid' : 'inputIsValid'}
                           className={errorStatus && 'is-invalid invalid'} {...status}>
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

export default Create;

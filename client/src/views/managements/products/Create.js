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
  CSwitch,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { ERROR_MESSAGE, showThumbnailProduct, SUCCESS_MESSAGE, useFormInput } from '../../../common';
import { API_CATEGORIES, API_PRODUCTS } from '../../../api.common';
import axios from 'axios';

const Create = () => {
  const categoryId = useFormInput('');
  const name = useFormInput('');
  const code = useFormInput('');
  const price = useFormInput(0);
  const saleOff = useFormInput(0);
  const quantity = useFormInput(0);
  const description = useFormInput('');
  const shortDescription = useFormInput('');
  const mfg = useFormInput(new Date().toLocaleDateString());
  const exp = useFormInput(new Date().toLocaleDateString());
  const provider = useFormInput('');
  const origination = useFormInput('');
  const [files, setFiles] = useState();
  const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleSubmit = (props) => {
    const formData = new FormData();
    const tempUploadFiles = Array.from(files);

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
    tempUploadFiles.forEach((item) => {
      formData.append('images', item);
    });

    axios.post(`${API_PRODUCTS}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: progressEvent => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
          ),
        );

        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 10000);
      },
    }).then(() => {
      alert(SUCCESS_MESSAGE);
      props.history.push('/managements/products');
    }).catch((error) => setError(error.response?.status === 401 ? error.response.data.message : ERROR_MESSAGE));
  };

  useEffect(() => {
    // Get Activated Category
    axios.get(`${API_CATEGORIES}`).then(res => setCategories(res.data.filter(item => item.isActive)));
  }, []);

  const imageHandler = e => {
    setFiles(e.target.files);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result.toString());
      }
    };

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
                  <CSelect custom name="select" id="select" {...categoryId}>
                    <option value="">Please select Category</option>
                    {
                      categories.length > 0 &&
                      categories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
                    }
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_name" name="text-input" placeholder="Product Name" {...name}/>
                  <CFormText>Please enter Product Name</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Code</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_code" name="text-input" placeholder="Product Code" {...code}/>
                  <CFormText>Please enter Product Code</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Price</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_price" type="number" name="text-input" placeholder="Product Price" {...price}/>
                  <CFormText className="help-block">Please enter Product price</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Quantity</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_price" type="number" name="text-input" placeholder="Product Price" {...quantity}/>
                  <CFormText className="help-block">Please enter Product quantity</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="price-input">Sale Off</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="product_price" type="number" name="text-input" placeholder="Product Price" {...saleOff}/>
                  <CFormText className="help-block">Please enter Product sale</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CLabel col md="3" htmlFor="file-input">Images</CLabel>
                <CCol xs="12" md="9">
                  <CInputFile id="file-input" multiple name="file-input" onChange={imageHandler}/>
                </CCol>
                <CCol xs="12" md="9">
                  {/*<CImg src={profileImg}/>*/}

                  {/*{*/}
                  {/*  files && files?.forEach((item, index) => {*/}
                  {/*    return (*/}
                  {/*      <CImg key={index} src={URL.createObjectURL(item)}/>*/}
                  {/*    );*/}
                  {/*  })*/}
                  {/*}*/}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol tag="label" sm="3" className="col-form-label">
                  Active
                </CCol>
                <CCol sm="9">
                  <CSwitch className="mr-1" color="dark" defaultChecked shape="pill" variant="opposite"/>
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

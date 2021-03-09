import React, {useState, useEffect} from 'react';
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
  CInputFile,
  CLabel,
  CSelect,
  CSwitch,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {ERROR_MESSAGE, useFormInput} from '../../../common';
import {API_CATEGORIES, API_PRODUCTS} from '../../../api.common';
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

  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleSubmit = () => {
    axios.post(`${API_PRODUCTS}`, {}).then((res) => {

    }).catch((error) => {
      setError(error.response.status === 401
        ? error.response.data.message : ERROR_MESSAGE);
    });
  };

  useEffect(() => {
    // Get Activate Category
    axios.get(`${API_CATEGORIES}`).then(res => setCategories(res.data.filter(item => item.isActive)));
  }, []);

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Create New Product</h2></strong>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
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
                  <CFormText className="help-block">Please enter a complex password</CFormText>
                </CCol>
              </CFormGroup>
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
                <CLabel col md="3" htmlFor="file-input">Images</CLabel>
                <CCol xs="12" md="9">
                  <CInputFile id="file-input" multiple name="file-input"/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol tag="label" sm="3" className="col-form-label">
                  Active
                </CCol>
                <CCol sm="9">
                  <CSwitch
                    className="mr-1"
                    color="dark"
                    defaultChecked
                    shape="pill"
                    variant="opposite"
                  />
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" style={{marginRight: '1rem'}} onClick={handleSubmit}>
              <CIcon name="cil-scrubber"/> Submit
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

export default Create;

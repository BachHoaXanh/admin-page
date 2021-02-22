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
  CLabel,
  CSelect,
  CSwitch,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { API_CATEGORIES } from '../../../api.common';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../../common';

const Update = (props) => {
  let name = useFormInput('');
  let parent = useFormInput('');
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleSubmit = () => {
    setError(null);

    axios.post(`${API_CATEGORIES}`, {
      name: name.value,
      parent: parent.valuen,
    }).then((res) => {
      alert(SUCCESS_MESSAGE);
      props.history.push('/managements/categories');
    }).catch((error) => {
      setError(error.response.status === 401
        ? error.response.data.message : ERROR_MESSAGE);
    });
  };

  useEffect(() => {
    // Get All Categories
    axios.get(`${API_CATEGORIES}`)
      .then((res) => {
        setCategories(res.data);
      }).catch(() => alert(ERROR_MESSAGE));
  }, [setCategories]);

  const getCategoryName = id => {
    const category = categories.find(each => each.id === id);
    return category?.name;
  };

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Update Category</h2></strong>
            {error && <><br/><CAlert color="danger">{error}</CAlert></>}
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="first-name" name="text-input" placeholder="First Name" {...name}/>
                  <CFormText>Please enter Category name</CFormText>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Parent</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id="select" {...parent}>
                    <option value="">Select Category Parent</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="13">3</option>
                  </CSelect>
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
            <CButton type="submit" size="sm" color="primary" style={{ marginRight: '1rem' }} onClick={handleSubmit}>
              <CIcon name="cil-scrubber"/> Submit</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange };
};

export default Update;

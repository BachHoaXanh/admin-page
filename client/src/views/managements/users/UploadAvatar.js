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
  CImg,
  CInputFile,
  CLabel,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { API_USERS } from '../../../api.common';
import { ERROR_MESSAGE, showAvatar, SUCCESS_MESSAGE } from '../../../common';

const UpdateAvatar = (props) => {
  const { match } = props;
  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState();
  const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

  const imageHandler = e => {
    const reader = new FileReader();

    setAvatar(null);
    setFile(e.target.files[0]);
    reader.onload = () => reader.readyState === 2 && setProfileImg(reader.result.toString());
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('avatar', file);

    axios.patch(`${API_USERS}/avatar/${match.params.id}`, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    }).then((res) => {
      alert(SUCCESS_MESSAGE);
      props.history.push('/managements/users');
      setAvatar(res.data?.avatar?.path)
    }).catch(() => alert(ERROR_MESSAGE));
  };

  useEffect(() => {
    axios.get(`${API_USERS}/${match.params.id}`)
      .then((res) => setAvatar(res.data?.avatar?.path))
      .catch(() => alert(ERROR_MESSAGE));
  }, [match.params.id]);

  return (
    <>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            <strong><h2>Update Avatar User</h2></strong>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CLabel col md="3" htmlFor="file-input">Images</CLabel>
                <CCol xs="12" md="9">
                  <CInputFile id="file-input" name="file-input" onChange={imageHandler}/>
                </CCol>
                <CCol xs="12" md="9" style={{ textAlign: 'center' }}>
                  <CImg src={avatar ? showAvatar(avatar) : profileImg} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
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

export default UpdateAvatar;

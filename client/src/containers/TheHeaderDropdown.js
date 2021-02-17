import React, {useState} from 'react'
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { getToken, removeUserSession } from '../common';
import axios from 'axios';

const TheHeaderDropdown = (props) => {
  const handleLogout = () => {
    // Call API
    axios.post('http://localhost:3000/auth/logout', {
      token: getToken()
    }).then((res) => {
      if (res.status === 201) {
        removeUserSession();
        console.log(this.props);
        props.history.push('/login');
      }
    });
  };

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CButton color="primary" className="px-4" onClick={handleLogout}>Logout</CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown

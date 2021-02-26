import React from 'react'
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { getToken, getUserSession, removeUserSession } from '../common';
import axios from 'axios';
import { HOST } from '../api.common';
import { useHistory } from 'react-router-dom';

const TheHeaderDropdown = () => {
  const history = useHistory();

  const handleLogout = () => {
    axios.post(`${HOST}/auth/logout`, {
      token: getToken()
    }).then(() => {
        removeUserSession();
        history.push('/login');
    });
  };

  const getProfile = () => {
    const user = getUserSession();
    history.push(user.user ? `/managements/users/${user.user}` : '/login');
  }

  const updateAvatar = () => {
    alert('This feature is coming soon...');
  }

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com"/>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CButton onClick={updateAvatar}>
            <CIcon name="cil-pencil" className="mfe-2" />Update Avatar
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton onClick={getProfile}>
            <CIcon name="cil-user" className="mfe-2" />Profile
          </CButton>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CButton className="px-4" onClick={handleLogout}>
            Logout
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown

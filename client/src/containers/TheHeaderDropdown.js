import React, {useState, useEffect} from 'react';
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { getToken, getUserSession, removeUserSession, showAvatar } from '../common';
import axios from 'axios';
import { API_USERS, HOST } from '../api.common';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const TheHeaderDropdown = () => {
  const history = useHistory();
  const userSession = getUserSession();

  const [user, setUser] = useState();

  const handleLogout = () => axios.post(`${HOST}/auth/logout`, { token: getToken() }).then(() => redirectLoginPage());

  const redirectLoginPage = () => {
    removeUserSession();
    history.push('/login');
  }

  const updateAvatar = () => history.push(`/managements/users/${userSession.user}/update-avatar`);
  const changePassword = () => history.push(`/managements/users/${userSession.user}/update-password`);
  const getProfile = () => history.push(userSession.user ? `/managements/users/${userSession.user}` : '/login');

  useEffect(() => {
    if (userSession.user) {
      axios.get(`${API_USERS}/${userSession.user}`).then((res) => setUser(res.data))
    } else redirectLoginPage();
  }, [userSession.user]);

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={showAvatar(user?.avatar.path)}
                className="c-avatar-img" alt="admin@bootstrapmaster.com"/>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CButton onClick={updateAvatar}>
            <CIcon name="cil-pencil" className="mfe-2"/>Update Avatar
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton onClick={changePassword}>
            <CIcon name="cil-pencil" className="mfe-2"/>Change Password
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton onClick={getProfile}>
            <CIcon name="cil-user" className="mfe-2"/>Profile
          </CButton>
        </CDropdownItem>
        <CDropdownItem divider/>
        <CDropdownItem>
          <CButton onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="breadcrumb-arrow" style={{ marginRight: '0.5rem' }}/>
            Logout
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;

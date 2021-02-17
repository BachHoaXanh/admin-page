import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination, CButton, CImg
  ,
} from '@coreui/react';

import axios from 'axios';
import { errorMessage, limit, totalPages } from '../../common';

const getBadge = status => {
  switch (status) {
    case true:
      return 'success'
    case false:
      return 'secondary'
    default:
      return 'primary'
  }
}

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  };

  // Call API
  const list = (props) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/users`)
      .then((res) => {
        setUsers(res.data);
        setPages(totalPages(res.data.length, limit));
      }).catch(error => {
      alert(errorMessage);
      props.history.push('/');
      console.log(error);
    });
  };

  useEffect((props) => {
    list(props);
    const interval = setInterval(async () => {
      await list();
    }, 5000);

    currentPage !== page && setPage(currentPage);
    return () => clearInterval(interval);
  }, [ currentPage, page ]);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <strong>Users Management</strong>
            <CButton onClick={() => history.push('/managements/users/create')}
                     block variant="outline" color="success" className='btn-custom'>
              +
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={users}
              fields={[
                'avatar',
                'firstName',
                'lastName',
                'email',
                'gender',
                'phone',
                'address',
                'role',
                { key: 'isActive', label: 'Active' },
              ]}
              hover
              striped
              itemsPerPage={limit}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                'isActive':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.isActive)}>
                        {item.isActive.toString()}
                      </CBadge>
                    </td>
                  ),
                'avatar':
                  (item) => (
                    <td>
                      <CImg src={item.avatar} className="c-avatar-img" style={{ maxWidth: '4rem'}} />
                    </td>
                  ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={pages}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default Users

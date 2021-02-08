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

import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    default:
      return 'primary'
  }
}

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [ page, setPage ] = useState(currentPage);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
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
              items={usersData}
              fields={[
                'avatar',
                'name',
                'email',
                'phone',
                'role',
                'status',
              ]}
              hover
              striped
              itemsPerPage={15}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
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
              pages={5}
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
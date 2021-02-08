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
  CPagination, CButton
} from '@coreui/react'

import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}

const Categories = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [ page, setPage ] = useState(currentPage);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/managements/categories?page=${newPage}`)
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [ currentPage, page ]);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <strong>Categories Management</strong>
            <CButton onClick={() => history.push('/managements/categories/create')}
                     block variant="outline" color="success" className='btn-custom' style={{left: '12rem'}}>
              +
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={[
                'images',
                'name',
                'code',
                'price',
                'quantity',
                'saleOff',
              ]}
              hover
              striped
              itemsPerPage={15}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/managements/categories/${item.id}`)}
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
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

export default Categories

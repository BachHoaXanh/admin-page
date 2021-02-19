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

import axios from 'axios';
import {ERROR_MESSAGE, LIMIT_RECORDS, totalPages} from '../../../common';
import {API_CATEGORIES} from "../../../api.common";

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

const Categories = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [pages, setPages] = useState(1);
  const [categories, setCategories] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/managements/categories?page=${newPage}`)
  };

  // Call API
  const list = props => {
    axios.get(`${API_CATEGORIES}`)
      .then(res => {
        setCategories(res.data);
        setPages(totalPages(res.data.length, LIMIT_RECORDS));
      }).catch(() => {
      alert(ERROR_MESSAGE);
      props.history.push('/');
    });
  };

  const getCategoryName = id => {
    const category = categories.find(each => each.id === id);
    return category?.name;
  };

  useEffect(props => {
    list(props);
    const interval = setInterval(async () => {
      await list();
    }, 10000);

    currentPage !== page && setPage(currentPage);
    return () => clearInterval(interval);
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
              items={categories}
              fields={[
                'name',
                'parent',
                { key: 'isActive', label: 'Active' },
              ]}
              hover
              sorter
              striped
              itemsPerPage={LIMIT_RECORDS}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/managements/categories/${item.id}`)}
              scopedSlots={{
                'isActive': (item) => (
                  <td>
                    <CBadge color={getBadge(item.isActive)}>
                      {item.isActive.toString()}
                    </CBadge>
                  </td>
                ),
                'parent': (item) => (
                  <td> {getCategoryName(item.parent)} </td>
                )
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

export default Categories

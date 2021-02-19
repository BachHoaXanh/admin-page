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
} from '@coreui/react'

import axios from 'axios';
import {ERROR_MESSAGE, LIMIT_RECORDS, totalPages} from '../../../common';
import {API_CATEGORIES, API_PRODUCTS} from "../../../api.common";

const getBadge = status => {
  switch (status) {
    case 'Stocking':
      return 'success'
    case 'Coming':
      return 'secondary'
    case 'InComing':
      return 'warning'
    case 'Sold-out':
      return 'danger'
    default:
      return 'primary'
  }
}

const Products = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [pages, setPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/managements/products?page=${newPage}`)
  };

  // Call API
  const list = (props) => {
    axios.get(`${API_PRODUCTS}`)
      .then((res) => {
        setProducts(res.data);
        setPages(totalPages(res.data.length, LIMIT_RECORDS));
      }).catch(() => {
      alert(ERROR_MESSAGE);
      props.history.push('/');
    });
  };

  const getAllCategories = () => {
    axios.get(`${API_CATEGORIES}`)
      .then(res => setCategories(res.data))
      .catch(() => alert(ERROR_MESSAGE));
  }

  useEffect((props) => {
    getAllCategories();
    list(props);
    const interval = setInterval(async () => {
      await list();
    }, 8000);

    currentPage !== page && setPage(currentPage);
    return () => clearInterval(interval);
  }, [ currentPage, page ]);

  const getCategoryName = (id) => {
    const category = categories.find(each => each.id === parseInt(id.toString()));
    return category?.name;
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <strong>Products Management</strong>
            <CButton onClick={() => history.push('/managements/products/create')}
                     block variant="outline" color="success" className='btn-custom' style={{left: '11.4rem'}}>
              +
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={products}
              fields={[
                'images',
                { key: 'categoryId', label: 'Category'},
                'name',
                'code',
                { key: 'price', label: 'Price (VND)' },
                'quantity',
                { key: 'saleOff', label: 'Sale (%)' },
                'status',
              ]}
              hover
              sorter
              striped
              itemsPerPage={LIMIT_RECORDS}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/managements/products/${item.id}`)}
              scopedSlots={{
                'categoryId': (item) => (
                  <td> {getCategoryName(item.categoryId || '')} </td>
                ),
                'status': (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                ),
                'images': (item) => (
                  <td>
                    <CImg src={'../server/'+item?.images[0]?.path} className="c-avatar-img" style={{maxWidth: '4rem'}}/>
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

export default Products

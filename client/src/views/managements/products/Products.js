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
import { errorMessage, limit, totalPages } from '../../../common';

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

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/managements/products?page=${newPage}`)
  };

  // Call API
  const list = (props) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/products`)
      .then((res) => {
        setProducts(res.data);
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
    }, 10000);

    currentPage !== page && setPage(currentPage);
    return () => clearInterval(interval);
  }, [ currentPage, page ]);

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
                'name',
                'code',
                { key: 'price', label: 'Price (VND)' },
                'quantity',
                { key: 'saleOff', label: 'Sale (%)' },
                'status',
              ]}
              hover
              striped
              itemsPerPage={limit}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/managements/products/${item.id}`)}
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                'images':
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

export default Products

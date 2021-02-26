import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination, CButton,
} from '@coreui/react';

import axios from 'axios';
import { ERROR_MESSAGE, LIMIT_RECORDS, totalPages } from '../../../common';
import { API_ORDERS, API_USERS } from '../../../api.common';

const getBadge = status => {
  switch (status) {
    case 'Stocking':
      return 'success';
    case 'Coming':
      return 'secondary';
    case 'InComing':
      return 'warning';
    case 'Sold-out':
      return 'danger';
    default:
      return 'primary';
  }
};

const Orders = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const pageChange = page => currentPage !== page && history.push(`/managements/orders?page=${page}`);

  const list = (props) => {
    axios.get(`${API_ORDERS}`)
      .then((res) => {
        setOrders(res.data);
        setPages(totalPages(res.data.length, LIMIT_RECORDS));
      }).catch(() => {
      alert(ERROR_MESSAGE);
      props.history.push('/');
    });
  };

  useEffect((props) => {
    list(props);

    // Get Users
    axios.get(`${API_USERS}`)
      .then((res) => setUsers(res.data))
      .catch(() => alert(ERROR_MESSAGE));

    const interval = setInterval(async () => {
      await list();
    }, 8000);

    currentPage !== page && setPage(currentPage);

    return () => clearInterval(interval);
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <strong>Orders Management</strong>
            <CButton onClick={() => history.push('/managements/orders/create')}
                     block variant="outline" color="success" className='btn-custom' style={{left: '10.4rem'}}>
              +
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={orders}
              fields={[
                'images',
                'staffId',
                'customerId',
                { key: 'totalPrice', label: 'Total Price (VND)' },
                'status',
              ]}
              hover
              sorter
              striped
              itemsPerPage={LIMIT_RECORDS}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/managements/orders/${item.id}`)}
              scopedSlots={{
                'status': (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
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
};

export default Orders;

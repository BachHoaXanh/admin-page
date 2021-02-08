import http from '../http-common';

export async function list() {
  const res = await fetch('api/users');

  return await res.json();
}

export async function create(data) {
  const res = await fetch('api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  return await res.json();
}
class UsersService {
  list() {
    return http.get('users');
  }

  get(id) {
    return http.get(`users/${id}`);
  }

  create(data) {
    return http.post('users', data);
  }

  update(id, data) {
    return http.put(`users/${id}`, data);
  }

  delete(id) {
    return http.delete(`users/${id}`);
  }

}

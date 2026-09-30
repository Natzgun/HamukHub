import assert from 'node:assert/strict';
import test from 'node:test';
import api from './axios.js';

test('writes use a shared CSRF fetch and send the matching header with credentials', async () => {
  const requests = [];
  api.defaults.adapter = async (config) => {
    requests.push(config);
    return { data: config.url === '/users/csrf' ? { token: 'abc123' } : {},
      status: 200, statusText: 'OK', headers: {}, config };
  };

  await Promise.all([api.post('/users/register', {}), api.post('/users/login', {})]);
  const csrfRequests = requests.filter(({ url }) => url === '/users/csrf');
  const writes = requests.filter(({ method }) => method === 'post');
  assert.equal(csrfRequests.length, 1);
  assert.equal(csrfRequests[0].headers.get('X-XSRF-TOKEN'), undefined);
  assert.equal(writes.length, 2);
  for (const request of writes) {
    assert.equal(request.withCredentials, true);
    assert.equal(request.headers.get('X-XSRF-TOKEN'), 'abc123');
  }
});

test('a failed CSRF fetch can be retried by a later write', async () => {
  let csrfAttempts = 0;
  api.defaults.adapter = async (config) => {
    if (config.url === '/users/csrf' && ++csrfAttempts === 1) throw new Error('Offline');
    return { data: config.url === '/users/csrf' ? { token: 'new-token' } : {},
      status: 200, statusText: 'OK', headers: {}, config };
  };

  await assert.rejects(api.post('/users/register', {}), /Offline/);
  const response = await api.post('/users/register', {});
  assert.equal(csrfAttempts, 2);
  assert.equal(response.config.headers.get('X-XSRF-TOKEN'), 'new-token');
});

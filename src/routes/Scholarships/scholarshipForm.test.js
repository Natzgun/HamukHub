import assert from 'node:assert/strict';
import test from 'node:test';
import { toFormValues, toScholarshipRequest } from './scholarshipForm.js';

test('editing a scholarship preserves publication date and maps requirements', () => {
  const original = {
    title: 'Grant', description: 'Study', date: '2026-09-29T18:12:34-05:00',
    image: 'https://example.org/img', country: 'Peru', continent: 'South America',
    moreInfo: 'https://example.org', requirements: [{ name: 'Enrollment' }],
  };
  const form = toFormValues(original);
  assert.equal(form.requirements, 'Enrollment');
  assert.equal(Object.hasOwn(form, 'date'), false);
  const request = toScholarshipRequest(form);
  assert.equal(Object.hasOwn(request, 'date'), false);
  assert.deepEqual(request.requirements, [{ name: 'Enrollment' }]);
});

test('empty and duplicate lines produce valid requirement objects', () => {
  const request = toScholarshipRequest({
    title: ' Grant ', description: 'Study', image: 'https://example.org/img',
    country: 'Peru', continent: 'South America', moreInfo: 'https://example.org',
    requirements: ' Proof of enrollment \r\n\nProof of enrollment\n Recommendation ',
  });
  assert.equal(request.title, 'Grant');
  assert.deepEqual(request.requirements, [
    { name: 'Proof of enrollment' }, { name: 'Recommendation' },
  ]);
  assert.deepEqual(toScholarshipRequest({ ...request, requirements: '' }).requirements, []);
});

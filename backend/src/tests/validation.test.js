const { validateBug } = require('../utils/validation');

describe('validateBug', () => {
  test('valid bug passes validation', () => {
    const { valid, errors } = validateBug({
      title: 'Bug title',
      description: 'Bug description',
      status: 'open'
    });

    expect(valid).toBe(true);
    expect(errors).toEqual({});
  });

  test('missing fields return errors', () => {
    const { valid, errors } = validateBug({ title: '', description: '' });

    expect(valid).toBe(false);
    expect(errors.title).toBeDefined();
    expect(errors.description).toBeDefined();
  });

  test('invalid status gives error', () => {
    const { valid, errors } = validateBug({
      title: 'Bug',
      description: 'Desc',
      status: 'INVALID'
    });

    expect(valid).toBe(false);
    expect(errors.status).toBe('Invalid status');
  });

  test('non-object payload returns body error', () => {
    const { valid, errors } = validateBug(null);

    expect(valid).toBe(false);
    expect(errors.body).toBe('Invalid payload');
  });
});

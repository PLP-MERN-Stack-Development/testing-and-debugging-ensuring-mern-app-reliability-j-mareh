function validateBug(bug) {
  const errors = {};

  if (!bug || typeof bug !== 'object') {
    errors.body = 'Invalid payload';
    return { valid: false, errors };
  }

  if (!bug.title || bug.title.trim().length === 0) {
    errors.title = 'Title is required';
  }

  if (!bug.description || bug.description.trim().length === 0) {
    errors.description = 'Description is required';
  }

  if (bug.status && !['open', 'in-progress', 'resolved'].includes(bug.status)) {
    errors.status = 'Invalid status';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validateBug };


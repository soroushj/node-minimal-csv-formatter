const csvField = field => {
  if (field === undefined || field === null) {
    return '';
  }
  let escaped = ('' + field).replace(/\0/g, '').replace(/"/g, '""');
  if (escaped.match(/[,"\r\n]/)) {
    return '"' + escaped + '"';
  }
  return escaped;
};

const csvRow = row => {
  if (row === undefined || row === null) {
    return '';
  }
  if (!Array.isArray(row)) {
    throw new Error('Invalid row - expected an array, got: ' + JSON.stringify(row));
  }
  if (row.length === 0) {
    return '';
  }
  return row.map(csvField).join(',') + '\n';
};

/**
 * Transform an array of (arrays of) values into equivalent CSV string.
 * @param {any[]} rowOrRows An array of values for a single row, or an array of arrays of values for multiple rows.
 * @returns {string} Equivalent CSV string.
 */
module.exports = rowOrRows => {
  if (rowOrRows === undefined || rowOrRows === null) {
    return '';
  }
  if (!Array.isArray(rowOrRows)) {
    throw new Error('Invalid row(s) - expected an array, got: ' + JSON.stringify(rowOrRows));
  }
  let containsArray = false;
  let containsValue = false;
  rowOrRows.forEach(valueOrRow => {
    if (Array.isArray(valueOrRow)) {
      containsArray = true;
    } else if (valueOrRow !== undefined && valueOrRow !== null) {
      containsValue = true;
    }
  });
  if (containsArray && !containsValue) {
    return rowOrRows.map(csvRow).join('');
  }
  return csvRow(rowOrRows);
};

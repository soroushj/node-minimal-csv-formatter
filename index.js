const csvField = field => {
  if (field === undefined || field === null) {
    return '';
  }
  if (typeof field.toString !== 'function') {
    throw new Error('Invalid field - expected a toString-able object, got: ' + JSON.stringify(field));
  }
  let escaped = field.toString().replace(/\0/g, '').replace(/"/g, '""');
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

module.exports = rowOrRows => {
  if (rowOrRows === undefined || rowOrRows === null) {
    return '';
  }
  if (!Array.isArray(rowOrRows)) {
    throw new Error('Invalid row(s) - expected an array, got: ' + JSON.stringify(rowOrRows));
  }
  let containsArray = false;
  let containsValue = false;
  for (let i = 0; i < rowOrRows.length; ++i) {
    if (Array.isArray(rowOrRows[i])) {
      containsArray = true;
    } else if (rowOrRows[i] !== undefined && rowOrRows[i] !== null) {
      containsValue = true;
    }
  }
  if (containsArray && !containsValue) {
    return rowOrRows.map(csvRow).join('');
  }
  return csvRow(rowOrRows);
};

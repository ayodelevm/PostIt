/**
 * Method handling pagination
 * @param {number} limit
 * @param {number} offset
 * @param {object} queryResult
 * @returns {object} pagination metadata
 */
const paginate = (limit, offset, queryResult) => {
  const pageCount = Math.ceil(queryResult.count / limit);
  const currentPage = Math.floor((offset + limit) / limit);

  return {
    pageCount,
    currentPage,
    totalCount: queryResult.count,
    pageSize: queryResult.rows.length
  };
};

export default paginate;

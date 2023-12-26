/** @format */

import ResponsivePagination from 'react-responsive-pagination';

const CustomPaginationComponent = ({
  pageNumber,
  paginationList,
  setPageNumber,
  totalRecords,
}) => {
  function handlePageChange(page) {
    setPageNumber(page);
  }

  return (
    <>
      {totalRecords && (
        <div className='total-records'>
          <div>Summary</div>
          <div> - </div>
          <div> - </div>
          <div>{totalRecords?.total_estimated_earnings}</div>
          <div>{totalRecords?.total_observed_ecpm}</div>
          <div>{totalRecords?.total_ad_requests}</div>
          <div>{totalRecords?.total_match_rate}</div>
          <div>{totalRecords?.total_matched_requests}</div>
          <div>{totalRecords?.total_show_rate}</div>
          <div>{totalRecords?.total_impressions}</div>
          <div>{totalRecords?.total_impression_ctr}</div>
          <div>{totalRecords?.total_clicks}</div>
        </div>
      )}
      <ResponsivePagination
        className='custom_pagination'
        total={paginationList.length}
        current={pageNumber}
        onPageChange={(page) => handlePageChange(page)}
        maxWidth={150}
        previousLabel='Prev'
        nextLabel='Next'
      />
    </>
  );
};

export default CustomPaginationComponent;

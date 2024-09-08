import { Component } from 'react'
import { connect } from 'react-redux';
import { getChangeStatus } from '../redux/tableReducer';
// import { useNavigate } from 'react-router-dom';

// Inside your component

class Pagination extends Component {

  handlePreviousPage = () => {
    if (this.props.dataPagination.currentPage > 1) {
      this.props.getChangeStatus(this.props.statusCode, this.props.dataPagination.currentPage - 1);
    }
  };

  handleNextPage = () => {
    if (this.props.dataPagination.currentPage < this.props.dataPagination.totalPages) {
      this.props.getChangeStatus(this.props.statusCode, this.props.dataPagination.currentPage + 1)
    }
  };

  handlePageClick = (page) => {

    // this.props.onPageChange(page);
    this.props.getChangeStatus(this.props.statusCode, page);
  };

  renderPageNumbers = () => {
    const { currentPage, totalPages } = this.props.dataPagination;
    const pageNumbers = [];
    const breakLabel = "...";

    if (totalPages <= 6) {
      // Hiển thị tất cả các trang nếu tổng số trang <= 6
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Hiển thị phân đoạn trang
      if (currentPage <= 4) {
        // Hiển thị các trang từ 1 đến 5, và thêm break label
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(breakLabel);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Hiển thị break label và các trang cuối
        pageNumbers.push(1);
        pageNumbers.push(breakLabel);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Hiển thị break label ở cả hai đầu và các trang xung quanh ht
        pageNumbers.push(1);
        pageNumbers.push(breakLabel);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(breakLabel);
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  render() {
    const { currentPage, totalPages } = this.props.dataPagination;
    const pageNumbers = this.renderPageNumbers();

    return (
      <>
        <nav className="ml-5">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={this.handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((page, index) => (
              <li key={index}>
                {page === "..." ? (
                  <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">...</span>
                ) : (
                  <button
                    onClick={() => this.handlePageClick(page)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight border ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'} border-gray-300`}
                  >
                    {page}
                  </button>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={this.handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
const mapStateToProps = (state) => ({ dataPagination: state.tableReducer })

const mapDispatchToProps = { getChangeStatus }
// export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

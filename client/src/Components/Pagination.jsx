
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)}
                            href='#'
                            className={currentPage === number ? 'page-link active' : 'page-link'}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination
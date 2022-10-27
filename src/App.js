import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsByKeyword } from "./features/postSlice";

function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Limit
  const dispatch = useDispatch();
  const { posts, totalPosts } = useSelector((state) => ({
    ...state.post,
  }));

  useEffect(() => {
    dispatch(fetchPostsByKeyword({ currentPage, perPage, keyword }));
    setItems(posts);
  }, [posts, perPage]);

  const columns = useMemo(
    () => [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
    ],
    []
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    console.log(newPerPage);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(inputSearch);
  };

  return (
    <div className="container">
      <center>
        <h1>Data Posts</h1>
      </center>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
      <DataTable
        columns={columns}
        data={items}
        pagination
        paginationServer
        paginationTotalRows={totalPosts}
        paginationDefaultPage={currentPage}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
}

export default App;

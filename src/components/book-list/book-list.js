import React from 'react';
import BookListItem from "../book-list-item";
import {connect} from 'react-redux';
import {withBookStoreService} from '../hoc';
import {booksLoaded, booksRequested, booksError} from "../../actions";
import {compose} from "../../utils";
import Spinner from "../spinner";
import './book-list.css';
import ErrorIndicator from "../error-indicator";

class BookList extends React.Component {

  componentDidMount() {
    const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError
    } = this.props;
    booksRequested();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data))
      .catch((error) => booksError(error));
  }

  render() {
    const {books, loading, error} = this.props;

    if (loading) {
      return <Spinner/>
    }

    if (error) {
      return <ErrorIndicator/>
    }

    return (
      <ul className="book-list">
        {
          books.map((book) => {
            return (
              <li key={book.id}><BookListItem book={book}/></li>
            )
          })
        }
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksError
};

export default compose(
  withBookStoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
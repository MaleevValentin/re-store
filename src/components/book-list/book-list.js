import React from 'react';
import BookListItem from "../book-list-item";
import {connect} from 'react-redux';
import {withBookStoreService} from '../hoc';
import {fetchBooks, bookAddedToCart} from "../../actions";
import {compose} from "../../utils";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import './book-list.css';

const BookList = ({books, onAddedToCart}) => {
  return (
    <ul className="book-list">
      {
        books.map((book) => {
          return (
            <li key={book.id}><BookListItem
              onAddedToCart={() => onAddedToCart(book.id)}
              book={book}/>
            </li>
          )
        })
      }
    </ul>
  );
};

class BookListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const {books, loading, error, onAddedToCart} = this.props;

    if (loading) {
      return <Spinner/>
    }

    if (error) {
      return <ErrorIndicator/>
    }

    return <BookList
      onAddedToCart={onAddedToCart}
      books={books}/>
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  };
};

export default compose(
  withBookStoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
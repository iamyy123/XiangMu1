import { useEffect, useState } from 'react';
import { Book } from '../services/api';
import { useLibraryStore } from '../store/store';

const BookCatalog = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { borrowedBooks, borrowBook, returnBook } = useLibraryStore();

  const fetchBooks = async () => {
    try {
      // 这里应该调用获取图书列表的API
      const data = await getBookList(12);
      setBookList(data);
    } catch (error) {
      console.error('获取图书失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const isBookBorrowed = (bookId: number) =>
    borrowedBooks.some((b) => b.id === bookId);

  const handleBorrowToggle = (book: Book) => {
    if (isBookBorrowed(book.id)) {
      returnBook(book.id);
    } else {
      borrowBook(book);
    }
  };

  if (loading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">图书目录</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookList.map((book) => (
          <div key={book.id} className="card bg-base-200 shadow-xl">
            <figure className="px-4 pt-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-32 h-32"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{book.title}</h2>
              <p className="text-sm">{book.author}</p>
              <div className="card-actions justify-end">
                <button
                  className={`btn ${isBookBorrowed(book.id) ? 'btn-error' : 'btn-primary'}`}
                  onClick={() => handleBorrowToggle(book)}
                >
                  {isBookBorrowed(book.id) ? '归还' : '借阅'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCatalog;
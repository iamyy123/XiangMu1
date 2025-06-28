import React, { useState } from 'react';

// 定义书籍类型
interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  available: boolean;
}

const BookManager = () => {
  // 书籍状态（模拟数据）
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "React入门", author: "张三", category: "编程", available: true },
    { id: 2, title: "三体", author: "刘慈欣", category: "科幻", available: false }
  ]);

  // 添加书籍状态
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    category: '编程',
    available: true
  });

  // 编辑状态
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // 添加书籍
  const handleAddBook = () => {
    if (newBook.title && newBook.author) {
      setBooks([
        ...books,
        { ...newBook, id: Date.now() }
      ]);
      setNewBook({ title: '', author: '', category: '编程', available: true });
    }
  };

  // 开始编辑
  const handleEdit = (book: Book) => {
    setEditingBook({ ...book });
    setNewBook({
      title: book.title,
      author: book.author,
      category: book.category,
      available: book.available
    });
  };

  // 保存编辑
  const handleSaveEdit = () => {
    if (editingBook) {
      setBooks(books.map(book => 
        book.id === editingBook?.id ? { ...editingBook, ...newBook } : book
      ));
      setEditingBook(null);
      setNewBook({ title: '', author: '', category: '编程', available: true });
    }
  };

  // 删除书籍
  const handleDelete = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">图书管理系统首页</h2>

      {/* 添加/编辑表单 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          {editingBook ? "编辑书籍" : "添加书籍"}
        </h3>
        <input
          type="text"
          placeholder="书名"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border rounded-lg p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="作者"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border rounded-lg p-2 w-full mb-2"
        />
        <select
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
          className="border rounded-lg p-2 w-full mb-2"
        >
          <option value="编程">编程</option>
          <option value="科幻">科幻</option>
          <option value="文学">文学</option>
        </select>
        <div className="flex gap-2">
          {editingBook ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            >
              保存修改
            </button>
          ) : (
            <button
              onClick={handleAddBook}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              添加书籍
            </button>
          )}
          {editingBook && (
            <button
              onClick={() => setEditingBook(null)}
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
            >
              取消编辑
            </button>
          )}
        </div>
      </div>

      {/* 书籍列表 */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300">书名</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">作者</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">类别</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">状态</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">操作</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b-2 border-gray-300">
                  {book.title}
                </td>
                <td className="px-6 py-4 border-b-2 border-gray-300">
                  {book.author}
                </td>
                <td className="px-6 py-4 border-b-2 border-gray-300">
                  {book.category}
                </td>
                <td className="px-6 py-4 border-b-2 border-gray-300">
                  {book.available ? "在架" : "借出"}
                </td>
                <td className="px-6 py-4 border-b-2 border-gray-300">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-500 text-white p-1 rounded hover:opacity-80 mr-1"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 text-white p-1 rounded hover:opacity-80"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManager;
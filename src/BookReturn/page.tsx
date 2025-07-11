import React, { useState } from 'react';

// 定义图书类型
type Book = {
  id: number;
  title: string;
  dueDate: string;
  overdue: boolean;
  returnDate?: Date; // 可选属性，仅已归还图书有
};

// 模拟数据
const initialBooks: Book[] = [
  { id: 1, title: "Python编程", dueDate: "2025-07-15", overdue: false },
  { id: 2, title: "数据结构与算法", dueDate: "2025-07-20", overdue: false },
  { id: 3, title: "三体", dueDate: "2025-07-05", overdue: true },
  { id: 4, title: "人类简史", dueDate: "2025-07-30", overdue: false },
  { id: 5, title: "Python数据分析", dueDate: "2025-06-20", overdue: true },
];

const BookReturn: React.FC = () => {
  const [borrowed, setBorrowed] = useState<Book[]>(initialBooks);
  const [returned, setReturned] = useState<Book[]>([]);
  const [message, setMessage] = useState<string>('');

  // 处理归还操作
  const handleReturn = (id: number) => {
    const book = borrowed.find(b => b.id === id);
    
    if (book) {
      // 更新状态
      setBorrowed(borrowed.filter(b => b.id !== id));
      setReturned([{ ...book, returnDate: new Date() }, ...returned]);
      
      // 显示消息
      setMessage(`《${book.title}》归还成功${book.overdue ? '（已逾期）' : ''}`);
      
      // 3秒后清除消息
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">图书归还系统</h1>
      
      {/* 消息提示 */}
      {message && (
        <div className={`p-3 rounded-lg mb-4 ${message.includes('逾期') ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
          {message}
        </div>
      )}
      
      {/* 待归还图书 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="font-semibold text-lg mb-3">待归还图书 ({borrowed.length})</h2>
        
        {borrowed.length === 0 ? (
          <p className="text-gray-500 text-center py-4">没有需要归还的图书</p>
        ) : (
          <ul>
            {borrowed.map(book => (
              <li key={book.id} className="flex justify-between items-center p-3 border-b last:border-0">
                <div>
                  <span className="font-medium">{book.title}</span>
                  <span className="ml-2 text-sm text-gray-500">应归还日期: {book.dueDate}</span>
                  {book.overdue && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">逾期</span>}
                </div>
                <button
                  onClick={() => handleReturn(book.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  归还
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* 已归还图书 */}
      {returned.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-semibold text-lg mb-3">已归还图书 ({returned.length})</h2>
          <ul>
            {returned.map(book => (
              <li key={book.id} className="flex justify-between items-center p-3 border-b last:border-0">
                <div>
                  <span className="font-medium">{book.title}</span>
                  <span className="ml-2 text-sm text-gray-500">应归还日期: {book.dueDate}</span>
                  {book.returnDate && (
                    <span className="ml-2 text-xs text-gray-400">归还于 {book.returnDate.toLocaleDateString()}</span>
                  )}
                </div>
                <span className="text-green-600 text-sm">已归还</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookReturn;
import { useState, useEffect } from 'react';
import { BorrowRecord, getBorrowRecords, createBorrowRecord } from '../services/api';
import { useLibraryStore } from '../store/store';

const BorrowRecords = () => {
  const [records, setRecords] = useState<BorrowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookTitle, setBookTitle] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const { librarian } = useLibraryStore();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getBorrowRecords();
        setRecords(data.slice(0, 10));
      } catch (error) {
        console.error('获取借阅记录失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle || !borrowerName) return;

    try {
      const newRecord = await createBorrowRecord({
        bookTitle,
        borrowerName,
        borrowDate: new Date().toISOString(),
        returned: false
      });
      setRecords([newRecord, ...records]);
      setBookTitle('');
      setBorrowerName('');
    } catch (error) {
      console.error('创建借阅记录失败:', error);
    }
  };

  if (loading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">借阅记录</h1>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">新增借阅记录</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <input
                type="text"
                placeholder="书名"
                className="input input-bordered"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="借阅人姓名"
                className="input input-bordered"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              提交
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{record.bookTitle}</h2>
              <p className="text-sm text-base-content/70">借阅人: {record.borrowerName}</p>
              <p>借阅日期: {new Date(record.borrowDate).toLocaleDateString()}</p>
              <p>状态: {record.returned ? '已归还' : '未归还'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowRecords;
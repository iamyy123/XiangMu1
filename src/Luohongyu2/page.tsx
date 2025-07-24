import { useState, useEffect } from 'react';
// 导入接口层的类型和方法
import { 
  BorrowRecord, 
  getBorrowRecords, 
  createBorrowRecord, 
  updateBorrowRecord 
} from '../services/api';
// 导入 Zustand 状态（假设 store 已定义）
import { useLibraryStore } from '../store/store';

const BorrowRecords = () => {
  // 借阅记录列表
  const [records, setRecords] = useState<BorrowRecord[]>([]);
  // 加载状态
  const [loading, setLoading] = useState(true);
  // 新增记录的表单状态
  const [bookId, setBookId] = useState('');     // 图书ID（修复类型错误的核心字段）
  const [bookTitle, setBookTitle] = useState('');// 书名
  const [borrowerName, setBorrowerName] = useState('');// 借阅人

  // 从 Zustand Store 获取 librarian （若无需此逻辑，可删除）
  const { librarian } = useLibraryStore();

  // 初始化加载借阅记录
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getBorrowRecords();
        setRecords(data.slice(0, 10)); // 仅展示前 10 条
      } catch (error) {
        console.error('获取借阅记录失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);
  // 提交新增借阅记录
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 校验：图书ID、书名、借阅人必填
    if (!bookId || !bookTitle || !borrowerName) return; 

    try {
      const newRecord = await createBorrowRecord({
        bookId:bookIdNum,          // 必须传入（匹配 BorrowRecord 类型）
        bookTitle,
        borrowerName,
        borrowDate: new Date().toISOString(), // 标准时间格式
        returned: false
      });
      // 局部更新列表（性能更优）
      setRecords([newRecord, ...records]);
      // 清空表单
      setBookId('');
      setBookTitle('');
      setBorrowerName('');
    } catch (error) {
      console.error('创建借阅记录失败:', error);
    }
  };

  // 归还图书逻辑
  const handleReturn = async (record: BorrowRecord) => {
    if (record.returned) return; // 已归还则跳过
    try {
      const updatedRecord = await updateBorrowRecord(record.id, { 
        returned: true 
      });
      // 局部更新列表，避免全量渲染
      setRecords(prev => prev.map(r => 
        r.id === updatedRecord.id ? updatedRecord : r
      ));
    } catch (error) {
      console.error('归还图书失败:', error);
    }
  };
 // 加载中状态提示
  if (loading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  // 页面渲染（依赖 Tailwind + 组件库样式，如 daisyUI）
  return (
    <div className="space-y-6 p-4">
      {/* 标题 */}
      <h1 className="text-2xl font-bold">借阅记录</h1>

      {/* 新增借阅表单 */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">新增借阅记录</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 图书ID输入框 */}
            <div className="form-control">
              <input
                type="text"
                placeholder="图书ID"
                className="input input-bordered"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>
            {/* 书名输入框 */}
            <div className="form-control">
              <input
                type="text"
                placeholder="书名"
                className="input input-bordered"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>
            {/* 借阅人输入框 */}
            <div className="form-control">
              <input
                type="text"
                placeholder="借阅人姓名"
                className="input input-bordered"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
              />
            </div>
            {/* 提交按钮 */}
            <button type="submit" className="btn btn-primary">
              提交
            </button>
          </form>
        </div>
      </div>
        {/* 借阅记录列表 */}
      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{record.bookTitle}</h2>
              <p className="text-sm text-base-content/70">借阅人: {record.borrowerName}</p>
              <p>借阅日期: {new Date(record.borrowDate).toLocaleDateString()}</p>
              <p>状态: {record.returned ? '已归还' : '未归还'}</p>
              {/* 归还按钮（仅未归还时显示） */}
              {!record.returned && (
                <button 
                  onClick={() => handleReturn(record)} 
                  className="btn btn-secondary mt-2"
                >
                  归还
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowRecords;
import { useEffect, useState } from 'react';
import { useLibraryStore } from '../store/store';

const ReaderManagement = () => {
  const [readers, setReaders] = useState<Reader[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReader, setNewReader] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { readers: storeReaders, addReader, removeReader } = useLibraryStore();

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        setReaders(storeReaders);
      } catch (error) {
        console.error('获取读者列表失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReaders();
  }, [storeReaders]);

  const filteredReaders = readers.filter(reader => 
    reader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reader.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReader(prev => ({ ...prev, [name]: value }));
  };

  const handleAddReader = () => {
    if (newReader.name && newReader.email) {
      const reader = {
        ...newReader,
        id: Date.now(),
        borrowedCount: 0
      };
      addReader(reader);
      setNewReader({ name: '', email: '', phone: '' });
    }
  };

  const handleRemoveReader = (id: number) => {
    if (window.confirm('确定要删除此读者吗？')) {
      removeReader(id);
    }
  };

  if (loading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">读者管理</h1>
      
      <div className="card bg-base-200 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">添加新读者</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="姓名 *"
            className="input input-bordered"
            value={newReader.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="邮箱 *"
            className="input input-bordered"
            value={newReader.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="电话"
            className="input input-bordered"
            value={newReader.phone}
            onChange={handleInputChange}
          />
        </div>
        <button 
          className="btn btn-primary mt-4"
          onClick={handleAddReader}
          disabled={!newReader.name || !newReader.email}
        >
          添加读者
        </button>
      </div>

      <div className="card bg-base-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">读者列表</h2>
          <input
            type="text"
            placeholder="搜索读者..."
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>借阅数量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredReaders.length > 0 ? (
                filteredReaders.map(reader => (
                  <tr key={reader.id}>
                    <td>{reader.id}</td>
                    <td>{reader.name}</td>
                    <td>{reader.email}</td>
                    <td>{reader.phone || '-'}</td>
                    <td>{reader.borrowedCount}</td>
                    <td>
                      <button 
                        className="btn btn-error btn-sm"
                        onClick={() => handleRemoveReader(reader.id)}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    暂无读者数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReaderManagement;

import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <header className="navbar bg-primary text-primary-content">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">图书馆管理系统</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/login">登录</Link></li>
            <li><Link to="/">图书管理</Link></li>
            <li><Link to="/catalog">图书目录</Link></li>
            <li><Link to="/records">借阅记录</Link></li>
            <li><Link to="/readers">读者管理</Link></li>
            
          </ul>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default App;


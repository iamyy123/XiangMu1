import axios from 'axios';

const libraryApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  available: boolean;
}

export interface BorrowRecord {
  id: number;
  bookId: number;
  bookTitle: string;
  borrowerName: string;
  borrowDate: string;
  returned: boolean;
}

export const getBookList = async (limit?: number): Promise<Book[]> => {
  const response = await libraryApi.get('/books');
  return response.data;
};

export const borrowBook = async (bookId: number): Promise<boolean> => {
  const response = await libraryApi.post(`/books/${bookId}/borrow`);
  return response.data.success;
};

export const returnBook = async (bookId: number): Promise<boolean> => {
  const response = await libraryApi.post(`/books/${bookId}/return`);
  return response.data.success;
};

export const getBorrowRecords = async (): Promise<BorrowRecord[]> => {
  const response = await libraryApi.get('/borrow-records');
  return response.data;
};

export const createBorrowRecord = async (
  record: Omit<BorrowRecord, 'id'>
): Promise<BorrowRecord> => {
  const response = await libraryApi.post('/borrow-records', record);
  return response.data;
};

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
}

export const login = async (username: string, password: string): Promise<User> => {
  // 确保已添加以下测试用户数据
  const users = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user", password: "user123", role: "user" }
  ];

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    throw new Error("用户名或密码错误");
  }

  // 返回用户信息（不包含密码）
  return { id: user.id, username: user.username, role: user.role };
};

export const logout = async (): Promise<void> => {
  await libraryApi.post('/auth/logout');
};
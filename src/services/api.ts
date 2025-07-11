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
  id: number;         // 保持原有类型：ID 为 number
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

// ===================== 新增代码（归还接口） ===================== //
/**
 * 更新借阅记录（局部更新，如标记为已归还）
 * @param id 借阅记录 ID（与 BorrowRecord.id 类型一致：number）
 * @param data 要更新的字段（如 { returned: true }）
 */
export const updateBorrowRecord = async (
  id: number,
  data: Partial<BorrowRecord>
): Promise<BorrowRecord> => {
  const response = await libraryApi.patch(`/borrow-records/${id}`, data);
  return response.data;
};
// ===================== 新增代码结束 ===================== //

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
}

export const login = async (username: string, password: string): Promise<User> => {
  const users = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user", password: "user123", role: "user" }
  ];
  await new Promise(resolve => setTimeout(resolve, 500));
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    throw new Error("用户名或密码错误");
  }
  return { id: user.id, username: user.username, role: user.role };
};

export const logout = async (): Promise<void> => {
  await libraryApi.post('/auth/logout');
};

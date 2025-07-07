

import { create } from 'zustand';
import { Book, User } from '../services/api';

interface Reader {
  id: number;
  name: string;
  email: string;
  phone: string;
  borrowedCount: number;
}

interface LibraryState {
  user: User | null;
  setUser: (user: User | null) => void;
  librarian: string;
  borrowedBooks: Book[];
  readers: Reader[];
  setLibrarian: (name: string) => void;
  borrowBook: (book: Book) => void;
  returnBook: (bookId: number) => void;
  addReader: (reader: Reader) => void;
  removeReader: (id: number) => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  librarian: '管理员',
  borrowedBooks: [],
  readers: [],
  setLibrarian: (name) => set({ librarian: name }),
  borrowBook: (book) => set((state) => ({ borrowedBooks: [...state.borrowedBooks, book] })),
  returnBook: (id) => set((state) => ({ borrowedBooks: state.borrowedBooks.filter((b) => b.id !== id) })),
  addReader: (reader) => set((state) => ({ readers: [...state.readers, reader] })),
  removeReader: (id) => set((state) => ({ readers: state.readers.filter((r) => r.id !== id) })),
}));
import { LocalStorage } from './constants/enums';

class Storage {
  private storageItem: LocalStorage;

  constructor(storageItem: LocalStorage) {
    this.storageItem = storageItem;
  }

  setItem(value: string | null): void {
    localStorage.setItem(this.storageItem, value || '');
  }

  getItem(): string | null {
    return localStorage.getItem(this.storageItem);
  }

  removeItem(): void {
    localStorage.removeItem(this.storageItem);
  }
}

export const userStorage = new Storage(LocalStorage.User);
export const themeStorage = new Storage(LocalStorage.Theme);
export const searchGoodsStorage = new Storage(LocalStorage.SearchGoods);
export const categoryGoodsStorage = new Storage(LocalStorage.CategoryGoods);
export const sortGoodsStorage = new Storage(LocalStorage.SortGoods);

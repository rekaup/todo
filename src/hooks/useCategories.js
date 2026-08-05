import { useState, useEffect } from "react";
import { getCloudStorage } from "./cloudStorage";

const DEFAULT_CATEGORIES = [
    
]

export function useCategories() {
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
    const [isLoaded , setIsLoaded ] = useState(false)

  useEffect(() => {
    const cloudStorage = getCloudStorage();

    if (cloudStorage) {
      try {
        cloudStorage.getItem('categories', (err, value) => {
          if (!err && value) {
            setCategories(JSON.parse(value));
          }
          setIsLoaded(true);
        });
      } catch (e) {
        console.warn('CloudStorage недоступен, используется localStorage', e);
        const saved = localStorage.getItem('categories');
        if (saved) setCategories(JSON.parse(saved));
        setIsLoaded(true);
      }
    } else {
      const saved = localStorage.getItem('categories');
      if (saved) setCategories(JSON.parse(saved));
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const json = JSON.stringify(categories);
    const cloudStorage = getCloudStorage();

    if (cloudStorage) {
      cloudStorage.setItem('categories', json);
    } else {
      localStorage.setItem('categories', json);
    }
  }, [categories, isLoaded]);

  function addCategory(name, color) {
    const newCategory = {
      id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name,
      color,
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }

  function getCategoryById(id) {
    return categories.find(c => c.id === id);
  }

  function deleteCategory(id) {
    setCategories(prev => prev.filter(c => c.id !== id));
  }

  function updateCategory(id, name, color) {
    setCategories(prev => prev.map(category => {
      if (category.id !== id) return category

      return {
        ...category,
        name,
        color,
      }
    }))
  }

  return { 
    categories, 
    addCategory, 
    updateCategory,
    getCategoryById, 
    deleteCategory,
};
}
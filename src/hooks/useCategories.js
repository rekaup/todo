import { useState } from "react";

const DEFAULT_CATEGORIES = [
    {id: 'test', name: 'Test', color: '#4d2b9c'},
]

export function useCategories() {
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES)

    function addCategory(name, color) {
        const newCategory = {
            id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
            name,
            color,
        }
        setCategories(prev => [...prev, newCategory])
        return newCategory
    }

    function getCategoryById(id) {
        return categories.find(c => c.id === id)
    }

    return {
        categories, 
        addCategory, 
        getCategoryById
    }
}
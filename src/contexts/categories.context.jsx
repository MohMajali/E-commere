import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firbase.utils";

export const CategoruContext = createContext({
    categories: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategories(categoryMap);
        }

        getCategoriesMap();
    }, []);

    const value = { categories };
    return (
        <CategoruContext.Provider value={ value }>{ children }</CategoruContext.Provider>
    );
};
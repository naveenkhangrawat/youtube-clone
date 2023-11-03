import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

const AppContext = createContext();


export function AppContextProvider({children}) {

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults]  = useState(false);
    const [selectCategory, setSelectCategory] = useState('New');
    const [mobileMenu, setMobileMenu] = useState(false);
    

    const fetchSelectedCategoryData = async (query) => {
        setLoading(true);
        const {contents} = await fetchData(`search/?q=${query}&`);
        setSearchResults(contents);
        setLoading(false);
    }

    useEffect(() => {
        fetchSelectedCategoryData(selectCategory);
    },[selectCategory])

    
    const appCtxValue = {
        loading,
        setLoading,
        searchResults,
        setSearchResults,
        selectCategory,
        setSelectCategory,
        mobileMenu,
        setMobileMenu,
    };


    return(
        <>
            <AppContext.Provider value={appCtxValue}>
                {children}
            </AppContext.Provider>
        </>
    )

}

export default function useAppContext() {
    return useContext(AppContext);
} 
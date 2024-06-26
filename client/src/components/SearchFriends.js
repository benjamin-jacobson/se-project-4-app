import React from 'react';
import { useFormik } from 'formik';

function Search({ searchTerm, onSearchChange }) {
    const formik = useFormik({
        initialValues: {
            search: searchTerm
        },
    });

    const handleChange = (e) => {
        formik.handleChange(e);
        onSearchChange(e.target.value);
    };

    return (
        <div ClassName="searchbar">
        <div class="max-w-sm mx-auto">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="search">Search: </label>
            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="search"
                name="search"
                placeholder="Type to limit the search..."
                value={formik.values.search}
                onChange={handleChange}
            />
        </div>
        </div>
    );
}

export default Search;
import { useEffect, useState } from "react";

import Api from "../lib/api";

const usePages = (pageId) => {
  const [pages, setPages] = useState([]);

  const loadPages = async () => {
    const response = await Api.get(`/pages`);
    const data = response.data;
    setPages(Object.values(data));
  };

  const addPage = async (page) => {
    const response = await Api.post(`/pages`, page);
    const newPage = response.data;
    setPages((pages) => [...pages, newPage]);
  };

  const updatePage = async (id, data) => {
    const index = pages.findIndex((page) => page.id === id);
    const newPage = { ...pages[index], ...data };

    setPages((pages) => {
      pages[index] = newPage;
      return [...pages];
    });

    const response = await Api.put(`/pages/${id}`, newPage);
    return response.data;
  };

  const getPage = (id) => {
    let _page = pages.filter(page => page.id === id);
    return _page[0];
  };

  const deletePage = async (id) => {
    await Api.delete(`/pages/${id}`);
    setPages((pages) => pages.filter((page) => page.id !== id));
  };

  useEffect(() => {
    loadPages();
  }, []);

  return {
    pages,
    addPage,
    getPage,
    updatePage,
    deletePage,
  };
};

export default usePages;

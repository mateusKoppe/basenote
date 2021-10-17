import axios from "axios";
import { useEffect, useState } from "react";

import Api from "../lib/api";

const useBlocks = (pageId) => {
  const [blocks, setBlocks] = useState([]);

  // Todo: When file is sent, save block as well
  const _uploadFile = async (file) => {
    const response = await Api.post(`/pages/${pageId}/upload`, file);
    return response;
  }

  const loadBlocks = async () => {
    const response = await Api.get(`/pages/${pageId}/blocks`);
    const data = response.data;
    setBlocks(Object.values(data));
  };

  const addBlock = async (block, isUpdate=false) => {
    let newBlock;

    if (isUpdate) {
      await _uploadFile(block.file);
    }
    
    const response = await Api.post(`/pages/${pageId}/blocks`, block);
    newBlock = response.data;
    
    setBlocks((blocks) => [...blocks, newBlock]);
  };

  const updateBlock = async (id, data) => {
    const index = blocks.findIndex((block) => block.id === id);
    const newBlock = { ...blocks[index], data };

    setBlocks((blocks) => {
      blocks[index] = newBlock;
      return [...blocks];
    });

    const response = await Api.put(`/pages/${pageId}/blocks/${id}`, newBlock);
    return response.data;
  };

  const deleteBlock = async (id) => {
    await Api.delete(`/pages/${pageId}/blocks/${id}`);
    setBlocks((blocks) => blocks.filter((block) => block.id !== id));
  };

  useEffect(() => {
    loadBlocks();
  }, [pageId]);

  return {
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
  };
};

export default useBlocks;

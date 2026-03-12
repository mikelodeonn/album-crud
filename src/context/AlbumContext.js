import { createContext, useState } from "react";

import {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumById
} from "../storage/albumStorage";

export const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAlbums = async () => {
    setLoading(true);
    const data = await getAlbums();
    setAlbums(data);
    setLoading(false);
  };

  const addAlbum = async (albumData) => {
    await createAlbum(albumData);
    await loadAlbums();
  };

  const editAlbum = async (id, data) => {
    await updateAlbum(id, data);
    await loadAlbums();
  };

  const removeAlbum = async (id) => {
    await deleteAlbum(id);
    await loadAlbums();
  };

  const getAlbum = async (id) => {
    return await getAlbumById(id);
  };

  return (
    <AlbumContext.Provider
      value={{
        albums,
        loading,
        loadAlbums,
        addAlbum,
        editAlbum,
        removeAlbum,
        getAlbum
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
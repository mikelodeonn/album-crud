import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const ALBUMS_KEY = "albums";

export const getAlbums = async () => {
  try {
    const data = await AsyncStorage.getItem(ALBUMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error obteniendo álbumes", error);
    return [];
  }
};

const saveAlbums = async (albums) => {
  try {
    await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(albums));
  } catch (error) {
    console.error("Error guardando álbumes", error);
  }
};

export const createAlbum = async (albumData) => {
  const albums = await getAlbums();

  const newAlbum = {
    id: uuidv4(),
    title: albumData.title,
    artist: albumData.artist,
    year: albumData.year,
    genre: albumData.genre,
    image: albumData.image,
    createdAt: Date.now(),
  };

  const updatedAlbums = [...albums, newAlbum];

  await saveAlbums(updatedAlbums);

  return newAlbum;
};

export const getAlbumById = async (id) => {
  const albums = await getAlbums();
  return albums.find((album) => album.id === id);
};

export const updateAlbum = async (id, updatedData) => {
  const albums = await getAlbums();

  const updatedAlbums = albums.map((album) =>
    album.id === id ? { ...album, ...updatedData } : album
  );

  await saveAlbums(updatedAlbums);
};

export const deleteAlbum = async (id) => {
  const albums = await getAlbums();

  const filteredAlbums = albums.filter((album) => album.id !== id);

  await saveAlbums(filteredAlbums);
};
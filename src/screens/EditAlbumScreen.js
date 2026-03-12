import { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import AlbumForm from "../components/AlbumForm";
import { AlbumContext } from "../context/AlbumContext";

export default function EditAlbumScreen({ route, navigation }) {

  const { id } = route.params;

  const { editAlbum, getAlbum } = useContext(AlbumContext);

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    loadAlbum();
  }, []);

  const loadAlbum = async () => {
    const data = await getAlbum(id);
    setAlbum(data);
  };

  const handleEdit = async (data) => {
    await editAlbum(id, data);
    navigation.goBack();
  };

  if (!album) return null;

  return (
    <View style={{ flex: 1 }}>
      <AlbumForm
        initialValues={album}
        onSubmit={handleEdit}
      />
    </View>
  );
}
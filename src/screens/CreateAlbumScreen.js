import { useContext } from "react";
import { View, StyleSheet } from "react-native";

import AlbumForm from "../components/AlbumForm";
import { AlbumContext } from "../context/AlbumContext";

export default function CreateAlbumScreen({ navigation }) {

  const { addAlbum } = useContext(AlbumContext);

  const handleCreate = async (data) => {
    await addAlbum(data);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AlbumForm onSubmit={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
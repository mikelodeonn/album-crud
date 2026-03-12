import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ScrollView
} from "react-native";

import { AlbumContext } from "../context/AlbumContext";

export default function AlbumDetailScreen({ route, navigation }) {

  const { id } = route.params;

  const { getAlbum, removeAlbum } = useContext(AlbumContext);

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    loadAlbum();
  }, []);

  const loadAlbum = async () => {
    const data = await getAlbum(id);
    setAlbum(data);
  };

  const handleDelete = () => {

    Alert.alert(
      "Eliminar álbum",
      "¿Seguro que deseas eliminar este álbum?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: confirmDelete
        }
      ]
    );
  };

  const confirmDelete = async () => {
    await removeAlbum(id);
    navigation.navigate("Home");
  };

  if (!album) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={
          album.image
            ? { uri: album.image }
            : require("../../assets/placeholder.png")
        }
        style={styles.image}
      />

      <Text style={styles.title}>{album.title}</Text>

      <Text style={styles.text}>
        Artista: {album.artist}
      </Text>

      <Text style={styles.text}>
        Año: {album.year}
      </Text>

      <Text style={styles.text}>
        Género: {album.genre}
      </Text>

      <View style={styles.buttons}>

        <Button
          title="Editar"
          onPress={() =>
            navigation.navigate("EditAlbum", { id: album.id })
          }
        />

        <Button
          title="Eliminar"
          color="red"
          onPress={handleDelete}
        />

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    alignItems: "center"
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  text: {
    fontSize: 16,
    marginBottom: 6
  },

  buttons: {
    marginTop: 20,
    width: "100%",
    gap: 10
  }

});
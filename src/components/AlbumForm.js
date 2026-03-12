import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
  ScrollView
} from "react-native";

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function AlbumForm({ onSubmit, initialValues }) {

  const [title, setTitle] = useState(initialValues?.title || "");
  const [artist, setArtist] = useState(initialValues?.artist || "");
  const [year, setYear] = useState(initialValues?.year?.toString() || "");
  const [genre, setGenre] = useState(initialValues?.genre || "");
  const [image, setImage] = useState(initialValues?.image || null);

  const pickImage = async () => {

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se necesita acceso a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {

    if (!title.trim()) {
      Alert.alert("Error", "El título es obligatorio");
      return;
    }

    if (!artist.trim()) {
      Alert.alert("Error", "El artista es obligatorio");
      return;
    }

    onSubmit({
      title,
      artist,
      year: Number(year),
      genre,
      image
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Nombre del álbum"
      />

      <Text style={styles.label}>Artista</Text>
      <TextInput
        style={styles.input}
        value={artist}
        onChangeText={setArtist}
        placeholder="Artista"
      />

      <Text style={styles.label}>Año</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        placeholder="Ej: 2001"
      />

      <Text style={styles.label}>Género</Text>
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
        placeholder="Rock, Pop, etc"
      />

      <Text style={styles.label}>Portada</Text>

      <Image
        source={
          image
            ? { uri: image }
            : require("../../assets/placeholder.png")
        }
        style={styles.imagePreview}
      />

      <Button
        title="Seleccionar imagen"
        onPress={pickImage}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Guardar álbum"
          onPress={handleSubmit}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20
  },

  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff"
  },

  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "center"
  }

});
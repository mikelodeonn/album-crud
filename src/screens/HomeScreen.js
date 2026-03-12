import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button
} from "react-native";

import { useContext, useEffect } from "react";
import { AlbumContext } from "../context/AlbumContext";

import AlbumItem from "../components/AlbumItem";

export default function HomeScreen({ navigation }) {

  const { albums, loading, loadAlbums } = useContext(AlbumContext);

  useEffect(() => {
    loadAlbums();
  }, []);

  const renderAlbum = ({ item }) => (
    <AlbumItem
      album={item}
      onPress={() =>
        navigation.navigate("AlbumDetail", { id: item.id })
      }
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando álbumes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Button
          title="Crear álbum"
          onPress={() => navigation.navigate("CreateAlbum")}
        />
      </View>

      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No hay álbumes todavía
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },

  header: {
    padding: 15
  },

  list: {
    paddingHorizontal: 15
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});
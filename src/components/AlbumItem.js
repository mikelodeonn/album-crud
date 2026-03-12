import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function AlbumItem({ album, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>

      <Image
        source={
          album.image
            ? { uri: album.image }
            : require("../../assets/placeholder.png")
        }
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{album.title}</Text>

        <Text style={styles.artist}>
          {album.artist} • {album.year}
        </Text>

        <Text style={styles.genre}>
          {album.genre}
        </Text>
      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 12
  },

  info: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    fontSize: 16,
    fontWeight: "bold"
  },

  artist: {
    color: "#555",
    marginTop: 4
  },

  genre: {
    color: "#888",
    marginTop: 2,
    fontSize: 12
  }

});
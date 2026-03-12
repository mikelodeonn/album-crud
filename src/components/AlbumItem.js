import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function AlbumItem({ album, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <Image
        source={
          album.image
            ? { uri: album.image }
            : require("../../assets/placeholder.png")
        }
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {album.title}
        </Text>

        <Text style={styles.artist} numberOfLines={1}>
          {album.artist} • {album.year}
        </Text>

        <Text style={styles.genre} numberOfLines={1}>
          {album.genre}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 5,
  },

  pressed: {
    opacity: 0.92,
  },

  image: {
    width: 76,
    height: 76,
    borderRadius: 12,
    marginRight: 16,
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e2937",
    marginBottom: 2,
  },

  artist: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },

  genre: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 4,
    fontWeight: "500",
  },
});
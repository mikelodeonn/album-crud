import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import { useContext, useEffect, useState, useCallback } from "react";
import { AlbumContext } from "../context/AlbumContext";

import AlbumItem from "../components/AlbumItem";

export default function HomeScreen({ navigation }) {
  const { albums, loading, loadAlbums } = useContext(AlbumContext);

  const [refreshing, setRefreshing] = useState(false);

  // Carga inicial
  useEffect(() => {
    loadAlbums();
  }, []);

  // Pull-to-refresh (práctica moderna y súper común en 2025-2026)
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAlbums(); // asumimos que loadAlbums es async o se puede await
    setRefreshing(false);
  }, [loadAlbums]);

  const renderAlbum = ({ item }) => (
    <AlbumItem
      album={item}
      onPress={() =>
        navigation.navigate("AlbumDetail", { id: item.id })
      }
    />
  );

  // Loading más moderno y elegante
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Cargando álbumes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header moderno: título + botón pill-shaped */}
      <View style={styles.header}>
        <Text style={styles.title}>Mis Álbumes</Text>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("CreateAlbum")}
          activeOpacity={0.85}
        >
          <Text style={styles.createButtonText}>+ Crear álbum</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#6366f1"]} // Android
            tintColor="#6366f1"   // iOS
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.empty}>No hay álbumes todavía 😔</Text>
            <Text style={styles.emptySub}>
              Crea tu primer álbum tocando el botón de arriba
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // fondo más limpio y moderno (gris muy suave)
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    // Sombra sutil (muy usado en diseños actuales)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e2937",
    letterSpacing: -0.5,
  },

  createButton: {
    backgroundColor: "#6366f1", // indigo moderno (tailwind-like)
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 9999, // botón "pill" súper trendy
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  createButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },

  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  empty: {
    fontSize: 18,
    color: "#64748b",
    fontWeight: "500",
  },

  emptySub: {
    fontSize: 15,
    color: "#94a3b8",
    marginTop: 8,
    textAlign: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748b",
  },
});
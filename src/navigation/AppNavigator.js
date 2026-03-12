import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CreateAlbumScreen from "../screens/CreateAlbumScreen";
import EditAlbumScreen from "../screens/EditAlbumScreen";
import AlbumDetailScreen from "../screens/AlbumDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Álbumes" }}
        />

        <Stack.Screen
          name="CreateAlbum"
          component={CreateAlbumScreen}
          options={{ title: "Crear Álbum" }}
        />

        <Stack.Screen
          name="AlbumDetail"
          component={AlbumDetailScreen}
          options={{ title: "Detalle del Álbum" }}
        />

        <Stack.Screen
          name="EditAlbum"
          component={EditAlbumScreen}
          options={{ title: "Editar Álbum" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
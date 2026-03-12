import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { AlbumProvider } from "./src/context/AlbumContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AlbumProvider>
        <AppNavigator />
      </AlbumProvider>
    </GestureHandlerRootView>
  );
}
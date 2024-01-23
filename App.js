import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HolaCoder from "./src/Components/HolaCoder"

export default function App() {
  return (
    <View style={styles.container}>
    <Text>¡Hola Tutores!</Text>
    <HolaCoder/>
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

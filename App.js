import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoList from './src/Components/Lista';

export default function App() {
  return (
    <View style={{flex:1}}>
      <TodoList/>
    </View>
  );
}


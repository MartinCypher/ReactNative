import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Modal, FlatList, Button } from 'react-native';

const ListaModal = ({ lista, onClose }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={lista !== null}
    onRequestClose={onClose}
  >
    {lista && (
      <View style={styles.modal}>
        <Text style={styles.modalText}>{lista.text}</Text>
        {lista.completed && <Text style={styles.completedText}>Completado</Text>}
        <Pressable onPress={onClose}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </Pressable>
      </View>
    )}
  </Modal>
);

const ListaItem = ({ lista, index, deleteLista, toggleCompleted, showModal, setShowModal, setModalLista }) => (
  <Pressable
    style={[styles.listaItem, { backgroundColor: lista.completed ? 'lightgray' : 'white' }]}
    onPress={() => {
      toggleCompleted(index);
      setModalLista(lista);
      setShowModal(true);
    }}
  >
    <Text style={styles.listaText}>{lista.text}</Text>
    <Pressable onPress={() => deleteLista(index)}>
      <Text style={styles.deleteText}>Eliminar</Text>
    </Pressable>
  </Pressable>
);

const Lista = () => {
  const [listas, setListas] = useState([
    { text: 'Comprar Leche', completed: false },
    { text: 'Comprar Té', completed: false },
    { text: 'Pasear al Perro', completed: true },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalLista, setModalLista] = useState(null);
  const [newListaText, setNewListaText] = useState('');

  const addLista = () => {
    if (newListaText.trim() !== '') {
      const newListas = [...listas, { text: newListaText, completed: false }];
      setListas(newListas);
      setNewListaText('');
    }
  };

  const deleteLista = (index) => {
    const newListas = [...listas];
    newListas.splice(index, 1);
    setListas(newListas);
  };

  const toggleCompleted = (index) => {
    const newListas = [...listas];
    newListas[index].completed = !newListas[index].completed;
    setListas(newListas);
  };

  const renderItem = ({ item, index }) => (
    <ListaItem
      key={index}
      index={index}
      lista={item}
      deleteLista={deleteLista}
      toggleCompleted={toggleCompleted}
      showModal={showModal}
      setShowModal={setShowModal}
      setModalLista={setModalLista}
    />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese Tarea"
        value={newListaText}
        onChangeText={(text) => setNewListaText(text)}
        onSubmitEditing={addLista}
      />
      <FlatList
        data={listas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Agregar Tarea" onPress={addLista} />
      <ListaModal lista={modalLista} onClose={() => setShowModal(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  listaItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  completedText: {
    color: 'green',
    marginBottom: 10,
  },
  deleteText: {
    color: 'red',
    marginLeft: 10,
  },
  listaText: {
    fontSize: 16,
  },
});

export default Lista;
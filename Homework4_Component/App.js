import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Appearance, ScrollView } from 'react-native';
import NoteButton from './src/components/Button/NoteButton';  //use with export default NoteButton
import styles from './src/styles/styles.js';
//npm install prop-types

// Note清單的陣列資料
const noteItems = [
  {
    image: 'rain',
    title: 'Umbrella',
    content: 'Today is a raniny day. Remember to bring an umbrella.',
    time: '07:00',
    backgroundColor: '#FFE5D9'
  },
  {
    image: 'teatime',
    title: 'Coffee',
    content: 'Buy Emma a cup of coffee.',
    time: '08:00',
    backgroundColor: '#D8E2DC'
  },
  {
    image: 'reading',
    title: 'Read Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    content: 'Read chapter 10 for today.',
    time: '10:00',
    backgroundColor: '#FFE5D9'
  },
  {
    image: 'ball',
    title: 'Play ball',
    content: 'Make an appointment with John to play ball.',
    time: '18:00',
    backgroundColor: '#F4ACB7'
  }
];

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}></View>
      <Text style={styles.title}>Notes for today</Text>
      <ScrollView style={styles.listView}>
        {noteItems.length > 0 ?
          noteItems.map((item, index) => (
            <NoteButton
              key={index}
              image={item.image}
              title={item.title}
              content={item.content}
              time={item.time}
              backgroundColor={item.backgroundColor} />
          ))
          :
          <Text style={styles.noNotesText}>No Notes</Text>
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}


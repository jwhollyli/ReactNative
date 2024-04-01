import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    const phoneNumberRegex = /^09\d{8}$/;  //Using a literal expression
    // const phoneNumberRegex = new RegExp(/^09\d{8}$/);  //Using the RegExp constructor expression
    setIsValidPhoneNumber(phoneNumberRegex.test(phoneNumber));
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.7 }}>
        <Text style={styles.text}>請輸入電話號碼</Text>
        <TextInput style={styles.textInput}
          placeholder='0912345678'
          placeholderTextColor='#DCDDD0'
          keyboardType='numeric'
          maxLength={10}
          onChangeText={(text => { setPhoneNumber(text), setIsClicked(false) })}
        ></TextInput>
        <Text style={styles.text}>您輸入的手機號碼是...</Text>
        <Text style={styles.textRemind}>{phoneNumber}</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.6} title="驗證手機號碼" onPress={handleButtonClick}>
          <Text style={styles.buttonText}>驗證手機號碼</Text>
        </TouchableOpacity>
        {isClicked && isValidPhoneNumber && <Text style={styles.textOk}>輸入成功！</Text>}
        {isClicked && !isValidPhoneNumber && <Text style={styles.textError}>手機輸入錯誤！</Text>}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F3F4D2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 18,
    backgroundColor: '#A1AD80',
    color: '#100604',
    borderRadius: 10,
    height: 40,
    width: '100%',
    marginBottom: 20
  },
  button: {
    height: 50,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#2F3619',
    marginTop: 20,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#F3F4D2',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#4C4935',
  },
  textRemind: {
    fontSize: 18,
    color: '#4C4935'
  },
  textError: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6A1111'
  },
  textOk: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4C4935'
  }
});

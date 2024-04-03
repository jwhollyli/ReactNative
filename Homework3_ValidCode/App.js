import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [validCode, setValidCode] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  const checkValidCode = () => {
    const validCodeRegex = /^1234$/;  //先設一個簡單的Regex, 檢核要是1234
    setVerifyResult(validCodeRegex.test(validCode));
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}
        maxLength={4}
        onChangeText={(text) => {
          setValidCode(text);
          setVerifyResult(null);
        }}
        keyboardType={'numeric'}
        value={validCode}
        secureTextEntry={true}
        autoFocus={true}></TextInput>
      <TouchableOpacity style={styles.button}
        onPress={checkValidCode}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
      {validCode.length !== 4 && <Text style={styles.failMsg}>請輸入密碼</Text>}
      {validCode.length === 4 && verifyResult && <Text style={styles.successMsg}>輸入成功</Text>}
      {validCode.length === 4 && verifyResult === false && <Text style={styles.failMsg}>輸入錯誤</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEDCD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    color: '#FEFAE0',
    backgroundColor: '#E9EDC9',
    height: 50,
    width: 200,
    borderRadius: 25,
    textAlign: 'center',
    fontSize: 28,
  },
  successMsg: {
    color: '#CCD5AE',
    fontSize: 18,
  },
  failMsg: {
    color: '#E7C8A0',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#D4A373',
    height: 50,
    width: 300,
    borderRadius: 25,
    justifyContent: 'center',
    margin: 15
  },
  buttonText: {
    color: '#FAEDCD',
    textAlign: 'center',
    fontSize: 25
  }
});

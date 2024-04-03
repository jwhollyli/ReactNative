import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, Vibration } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// Picker => npm install @react-native-picker/picker --save

export default function App() {
  const [selectedTab, setSelectedTab] = useState('Counter'); //頁面下方Tab選擇項目 Counter:計次器; Timer:倒數計時器; Calculator:簡易計算機

  //Counter
  const [counter, setCounter] = useState(0);

  //Timer
  const [timerSet, setTimerSet] = useState({ hours: 0, minutes: 10, seconds: 0 });  //Timer設定時間
  const [remainSeconds, setRemainSeconds] = useState(0);  //倒數剩餘時間
  const [isRunning, setIsRunning] = useState(false);  //是否已啟動倒數
  const timerRef = useRef(null);  //倒數Timer hook
  const vibrationRef = useRef(null);  //倒數結束的震動 hook

  //開始倒數計時
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setRemainSeconds(timerSet.hours * 3600 + timerSet.minutes * 60 + timerSet.seconds);
      timerRef.current = setInterval(() => {
        setRemainSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          else {
            setIsRunning(false);
            clearInterval(timerRef.current);
            showTimesUpAlert();
            return 0;
          }
        });
      }, 1000);
    }
  }

  //結束倒數計時
  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  }

  //倒數計時結束Popup視窗及震動提醒
  const showTimesUpAlert = () => {
    vibrationRef.current = setInterval(() => {
      Vibration.vibrate(500);
    }, 1000);
    Alert.alert('Times Up',
      'Time is up!',
      [
        { text: 'OK', onPress: () => clearInterval(vibrationRef.current) }
      ],
      { cancelable: false }
    )
  }

  //將秒數轉為顯示的時分秒, 格式如下列:
  //時分秒: 4:05:00
  //時分: 10:21
  //僅剩下秒數: 18
  const formattedTime = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time % 3600 / 60);
    let seconds = time % 60;
    return [
      hours > 0 ? hours + ':' : '',
      minutes > 0 || hours > 0 ? minutes.toString().padStart(2, '0') + ':' : '',
      seconds.toString().padStart(2, '0')
    ].join('');
  };

  //Calculator
  const [calculateResult, setCalculateResult] = useState('0');
  const handleCalculatorPress = (value) => {
    if (value === '=') {
      //當按下'='時進行運算
      try {
        //運算前將x取代為*
        const toCalculate = calculateResult.replace("x", "*");
        const result = eval(toCalculate);
        setCalculateResult(result.toString());
      } catch (error) {
        setCalculateResult('Error');
      }
    } else if (value === 'AC') {
      //AC清空輸入
      setCalculateResult('0');
    } else if (value === '.') {
      //防止重複輸入'.'
      if (!calculateResult.endsWith('.')) {
        setCalculateResult(calculateResult + value);
      }
    } else {
      //判斷原始值為0則直接取代
      if (calculateResult === '0') {
        setCalculateResult(value);
      } else {
        setCalculateResult(calculateResult + value);
      }
    }
  }

  //依照選擇的Tab切換不同內容
  const tabContent = () => {
    switch (selectedTab) {
      case 'Counter':
        return (
          <View style={styles.mainView}>
            <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20 }}>
              <TouchableWithoutFeedback onLongPress={() => setCounter(0)}>
                <Text style={{ fontSize: 180, color: '#100604' }}>{counter}</Text>
              </TouchableWithoutFeedback>
              <View style={{ position: 'absolute', right: '25%', top: '80%' }}>
                <Text style={styles.text}>次</Text>
              </View>
              <Image style={{ width: 100, height: 100, position: 'absolute', left: '10%', top: '80%' }} source={require('./assets/counter-notifyMsg.png')}></Image>
            </View>
            <View style={{ flex: 0.5, flexDirection: 'row' }}>
              <View style={{ flex: 0.5, alignItems: 'center' }}>
                <TouchableOpacity style={StyleSheet.compose(styles.button, { height: 90, width: 90, marginTop: 20 })}
                  onPress={() => { if (counter > 0) setCounter(counter - 1) }}>
                  <Text style={StyleSheet.compose(styles.buttonText, { fontSize: 50 })}>-</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5, alignItems: 'center' }}>
                <TouchableOpacity style={StyleSheet.compose(styles.button, { height: 90, width: 90, marginTop: 20 })}
                  onPress={() => setCounter(counter + 1)}>
                  <Text style={StyleSheet.compose(styles.buttonText, { fontSize: 50 })}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case 'Timer':
        let timerHourOptions = Array.from((Array(24).keys()));
        let timerMinuteOptions = Array.from((Array(60).keys()));
        let timerSecondOptions = Array.from((Array(60).keys()));
        return (
          <View style={styles.mainView}>
            {isRunning ?
              // 顯示倒數剩餘時間
              <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'flex-end' }}>
                {/* 剩餘時間 */}
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingRight: 30 }}>
                  <Text style={StyleSheet.compose(styles.text, { fontSize: 50 })}> {formattedTime(remainSeconds)}</Text>
                </View>
                {/* 設定時間 */}
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingRight: 30 }}>
                  {timerSet.hours > 0 && <Text style={{ fontSize: 18, color: '#F3F4D2' }}>{timerSet.hours}小時</Text>}
                  {timerSet.minutes > 0 && <Text style={{ fontSize: 18, color: '#F3F4D2' }}>{timerSet.minutes}分鐘</Text>}
                  {timerSet.seconds > 0 && <Text style={{ fontSize: 18, color: '#F3F4D2' }}>{timerSet.seconds}秒</Text>}
                </View>
              </View>
              :
              // 顯示倒數設定選單
              <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'flex-end' }}>
                <View style={{ flex: 2, height: 200 }}>
                  <Picker
                    selectedValue={timerSet.hours}
                    onValueChange={(value) => { setTimerSet(prevState => { return { hours: value, minutes: prevState.minutes, seconds: prevState.seconds } }) }}>
                    {timerHourOptions.map((option, index) => (
                      <Picker.Item label={option.toString()} value={option} key={index} />
                    ))}
                  </Picker>
                </View>
                <View style={{ flex: 1, height: 190, justifyContent: 'center' }}>
                  <Text style={StyleSheet.compose(styles.text, { fontSize: 20 })}>小時</Text>
                </View>
                <View style={{ flex: 2, height: 200 }}>
                  <Picker
                    selectedValue={timerSet.minutes}
                    onValueChange={(value) => { setTimerSet(prevState => { return { hours: prevState.hours, minutes: value, seconds: prevState.seconds } }) }}>
                    {timerMinuteOptions.map((option, index) => (
                      <Picker.Item label={option.toString()} value={option} key={index} />
                    ))}
                  </Picker>
                </View>
                <View style={{ flex: 1, height: 190, justifyContent: 'center' }}>
                  <Text style={StyleSheet.compose(styles.text, { fontSize: 18 })}>分鐘</Text>
                </View>
                <View style={{ flex: 2, height: 200 }}>
                  <Picker
                    selectedValue={timerSet.seconds}
                    onValueChange={(value) => { setTimerSet(prevState => { return { hours: prevState.hours, minutes: prevState.minutes, seconds: value } }) }}>
                    {timerSecondOptions.map((option, index) => (
                      <Picker.Item label={option.toString()} value={option} key={index} />
                    ))}
                  </Picker>
                </View>
                <View style={{ flex: 1, height: 190, justifyContent: 'center' }}>
                  <Text style={StyleSheet.compose(styles.text, { fontSize: 18 })}>秒</Text>
                </View>
              </View >
            }
            <View style={{ flex: 0.5, flexDirection: 'row', alignContent: 'flex-start', paddingTop: 20 }}>
              <View style={{ flex: 0.5, alignItems: 'center' }}>
                {!isRunning &&
                  <TouchableOpacity style={StyleSheet.compose(styles.button, { height: 50, width: 130 })}
                    onPress={() => {
                      setTimerSet({ hours: 0, minutes: 10, seconds: 0 });
                    }}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={{ flex: 0.5, alignItems: 'center' }}>
                <TouchableOpacity style={StyleSheet.compose(styles.button, { height: 50, width: 130 })}
                  onPress={() => isRunning ? stopTimer() : startTimer()}>
                  <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View >
        );
      case 'Calculator':
        return (
          <View style={styles.mainView}>
            <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
              <Text style={{ textAlign: 'right', alignSelf: 'flex-end', marginRight: '10%', fontSize: 70, color: '#100604', fontWeight: 'bold' }}>{calculateResult}</Text>
            </View>
            <View style={{ flex: 0.7, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={StyleSheet.compose(styles.calculateButton, { width: '43%', aspectRatio: 2 })}
                  onPress={() => handleCalculatorPress('AC')}>
                  <Text style={styles.buttonText}>AC</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('%')}>
                  <Text style={styles.buttonText}>%</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('/')}>
                  <Text style={styles.buttonText}>/</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('7')}>
                  <Text style={styles.buttonText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('8')}>
                  <Text style={styles.buttonText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('9')}>
                  <Text style={styles.buttonText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('x')}>
                  <Text style={styles.buttonText}>x</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('4')}>
                  <Text style={styles.buttonText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('5')}>
                  <Text style={styles.buttonText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('6')}>
                  <Text style={styles.buttonText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('-')}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('1')}>
                  <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('2')}>
                  <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('3')}>
                  <Text style={styles.buttonText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('+')}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={StyleSheet.compose(styles.calculateButton, { width: '43%', aspectRatio: 2 })}
                  onPress={() => handleCalculatorPress('0')}>
                  <Text style={styles.buttonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('.')}>
                  <Text style={styles.buttonText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton}
                  onPress={() => handleCalculatorPress('=')}>
                  <Text style={styles.buttonText}>=</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View >
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      {tabContent()}
      <View style={styles.tabView}>
        <TouchableOpacity style={selectedTab == 'Counter' ? styles.selectedTab : styles.nonSelectedTab}
          onPress={() => setSelectedTab('Counter')}>
          <Image style={styles.tabImage} source={require('./assets/counter-icon.png')}></Image>
          <Text>Counter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedTab == 'Timer' ? styles.selectedTab : styles.nonSelectedTab}
          onPress={() => setSelectedTab('Timer')}>
          <Image style={styles.tabImage} source={require('./assets/timer-icon.png')}></Image>
          <Text>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedTab == 'Calculator' ? styles.selectedTab : styles.nonSelectedTab}
          onPress={() => setSelectedTab('Calculator')}>
          <Image style={styles.tabImage} source={require('./assets/calculator-icon.png')}></Image>
          <Text>Calculator</Text>
        </TouchableOpacity>
      </View>
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
    margin: 10
  },
  //上方主視窗
  mainView: {
    backgroundColor: '#A1AD80',
    borderRadius: 10,
    flex: 0.9,
    width: '100%',
    margin: 10
  },
  //上方視窗內設定
  text: {
    fontSize: 24,
    color: '#100604'
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#2F3619',
    justifyContent: 'center'
  },
  calculateButton: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: '#2F3619',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3F4D2',
    textAlign: 'center',
  },
  // 下方Tab
  tabView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 0.1,
    padding: 0,
  },
  selectedTab: {
    borderRadius: 10,
    margin: 2,
    width: '33%',
    backgroundColor: '#A1AD80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonSelectedTab: {
    borderRadius: 10,
    margin: 2,
    width: '33%',
    backgroundColor: '#F3F4D2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabImage: {
    width: '60%',
    height: '100%',
    maxWidth: 45,
    maxHeight: 45,
  },
});

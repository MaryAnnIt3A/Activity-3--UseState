import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, BackHandler, } from 'react-native';

// Flight (Flashlight) component
const Flight = ({ onBackPress }) => {
  const [isOn, setIsOn] = useState(true); // State to track flashlight status

  const toggleFlashlight = () => {
    setIsOn(!isOn); // Toggle the flashlight status
  };

  return (
    <View style={{ flexDirection: 'column', alignSelf: 'center', columnGap: 20, marginTop: 20, marginLeft: 60 }}>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        {isOn ? (
          <Image source={require('./assets/flashlight_on.png')} style={{ height: 400, width: 250 }} />
        ) : (
          <Image source={require('./assets/flashlight_off.png')} style={{ height: 400, width: 250 }} />
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <Button title={isOn ? 'OFF' : 'ON'} onPress={toggleFlashlight} />
      </View>
      <View>
        <Button title="BACK" onPress={onBackPress} />
      </View>
    </View>
  );
};

// Counter component
const Counter = ({ onBackPress }) => {
  const [number, setNumber] = useState(0);

  const setAdd = () => {
    setNumber(number + 1);
  };

  const setSubtract = () => {
    setNumber(number - 1);
  };

  return (
    <View>
      <Text style={{ fontSize: 300, marginLeft: 55 }}>{number}</Text>
      <View style={{ flexDirection: 'row', height: 50, width: 60, gap: 100, marginLeft: 55 }}>
        <Button title="-1" color="red" onPress={() => setSubtract()} />
        <Button title="+1" color="green" onPress={() => setAdd()} />
      </View>
      <View style={{ marginTop: 20, marginLeft: 55 }}>
        <Button title="BACK" onPress={onBackPress} />
      </View>
    </View>
  );
};

export default function App() {
  const [flight, setFlight] = useState(false);
  const [counter, setCounter] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [flashlightVisible, setFlashlightVisible] = useState(false);

  const toggleFlight = () => {
    setFlight(!flight); // Toggle the flight state
    setCounter(false); // Disable the counter button
    setFlashlightVisible(false); // Hide the flashlight component
  };

  const toggleCounter = () => {
    setCounter(!counter); // Toggle the counter state
    setFlight(false); // Disable the F-LIGHT button
    setFlashlightVisible(false); // Hide the flashlight component
  };

  const toggleFlashlight = () => {
    setFlashlightOn(!flashlightOn);
  };

  const showFlashlight = () => {
    setFlashlightVisible(true);
  };

  const hideFlashlight = () => {
    setFlashlightVisible(false);
  };

  const Back = () => {
    if (flashlightVisible) {
      hideFlashlight();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', Back);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', Back);
    };
  }, [flashlightVisible]);

  return (
    <View style={styles.container}>
      <View style={{ flex: .10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 80, marginLeft: 80}}>
        <Button title="F-LIGHT" onPress={toggleFlight} disabled={flight || counter} />
        <Button title="COUNTER" onPress={toggleCounter} disabled={flight || counter} />
      </View>
      <View>
        {flight && <Flight onBackPress={toggleFlight} />}
        {counter && <Counter onBackPress={toggleCounter} />}
        {flashlightVisible && (
          <Flashlight isVisible={flashlightVisible} onToggle={toggleFlashlight} isOn={flashlightOn} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    margin: 20,
  },
});

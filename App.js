// Barcode Scanner sederhana dengan Expo
import { SafeAreaView, Text, StyleSheet, Button, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "expo-status-bar";

export default function bcScannerApp() {
  const [permission, setPermision] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Perizinan kamera
  useEffect (() => {
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermision( status === 'granted');
    };
    getPermission();
  }, []);

  // Ambil nilai hasil scan
  const scannerHandler = ({ data }) => {
    setScanned(true);
    alert(`Result: \n ${data}`);
  };

  if (permission === null) {
    return <Text>Requesting for camera permission</Text>;
  };

  if (permission === false) {
    return <Text>Access Denied!</Text>;
  };  
  // Styles
  const styles = StyleSheet.create ({
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000'
    },
    scanner: {
      width: '100%',
      height: '100%',
      position: 'absolute'
    },
    image: {
      position: 'absolute'
    }
  });

  // Scan handler 
  function buttonHandler() {
    return setScanned(false);
  }
  
  return (
    // Tampilkan
    <SafeAreaView style={styles.body}>
        <StatusBar style="light"/>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : scannerHandler} style={styles.scanner}/>
        <Image source={require('./assets/Scanner.png')} style={styles.image}/>
        {scanned && <Button title="SCAN AGAIN" onPress={buttonHandler} style={styles.button}/>}
    </SafeAreaView>
  );
}
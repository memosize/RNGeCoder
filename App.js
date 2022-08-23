/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';
import {checkPermission} from './utils/checkPermissions';
import {requestPermission} from './utils/requestPermission';
const {GeCoderModule} = NativeModules;
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentLocation, setCurrentLocation] = useState<string[]>([]);
  const [withinHkorMacau, setWithinHkorMacau] = useState<Boolean>(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const checkInHkOrMacau = (lat, lon) => {
    const config = {
      authorizationLevel: 'whenInUse',
      skipPermissionRequests: false,
    };
    Geolocation.setRNConfiguration(config);
    // Geolocation.requestAuthorization();
    // getLocation(lat,lon)
    checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(res => {
        console.log('permission = ', res);
        console.log('nativeModules = ', NativeModules);
        getLocation(lat, lon);
      })
      .catch(err => {
        console.log('error = ', err);
        requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
          res => {
            console.log('res **', res);
            if (res === 'grated') {
              getLocation(lat, lon);
            }
          },
        );
      });
  };

  const getLocation = (lat, lon) => {
    console.log('lon: ', lon);
    console.log('lat: ', lat);

    Geolocation.getCurrentPosition(info => {
      /**
  //  CLLocationDegrees latitude=[@"22.31944" doubleValue];
  //  CLLocationDegrees longitude=[@"114.17778" doubleValue];
    CLLocationDegrees latitude=[@"22.198751" doubleValue];
    CLLocationDegrees longitude=[@"113.549134" doubleValue];
               info.coords.latitude.toString(),
          info.coords.longitude.toString(),
        */
      // let latitude = '22.31944';
      // let longitude = '114.17778';
      let latitude = info.coords.latitude.toString();
      let longitude = info.coords.longitude.toString();
      if (currentLocation.length === 0) {
        let position = [];
        position.push(latitude);
        position.push(longitude);
        setCurrentLocation(position);
      }
      if (lat) {
        let p = [lat, lon];
        let deepPosition = [...p];
        setCurrentLocation(deepPosition);
      }
      console.log(info);
      console.log('currentLocation', currentLocation);
      GeCoderModule.getCityFromCoordinate(
        lat ? lat : info.coords.latitude.toString(),
        lon ? lon : info.coords.longitude.toString(),
        city => {
          // TODO fix this judgement\
          console.log('city', city);
          if (['Macau', 'Hong Kong'].indexOf(city) !== -1) {
            setWithinHkorMacau(true);
          } else {
            setWithinHkorMacau(false);
          }
        },
      );
    });
  };

  useEffect(() => {
    checkInHkOrMacau();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={{marginTop: 100, fontSize: 16, fontWeight: '600'}}>
        {`latitude = ${currentLocation[0]} \nlongitude = ${currentLocation[1]}`}
      </Text>
      <View
        style={{
          width: '100%',
          height: 80,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            let hkposition = ['22.31944', '114.17778'];
            checkInHkOrMacau(hkposition[0], hkposition[1]);
          }}>
          <View
            style={{
              width: 150,
              height: 60,
              backgroundColor: 'gray',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 60,
              borderRadius: 8,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              change to HK
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: 100}}>
        {`是否在香港澳门: ${withinHkorMacau ? '是' : '否'}`}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

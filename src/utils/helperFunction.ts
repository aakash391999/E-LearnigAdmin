import moment from 'moment';
import { PermissionsAndroid, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { MAP_KEY } from '../config/keys';

const showError = (message: string) => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
  });
};

const showSuccess = (message: string) => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
  });
};

export function otpTimerCounter(seconds: number) {
  // alert(seconds)
  let m: any = Math.floor(seconds / 60);
  let s: any = seconds % 60;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return `${m}:${s}`;
}
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Location permission error', error);
      return false;
    }
  }
  return true; // For iOS
};

const getLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (hasPermission) {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude:', latitude, 'Longitude:', longitude);
          resolve({ latitude, longitude });
        },
        error => {
          console.error('Location error', error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  } else {
    console.error('Location permission denied');
    return null;
  }
};
export { requestLocationPermission, getLocation };

export async function reverseGeocode(
  latitude: any,
  longitude: any,
) {
  try {
    const response = await axios.get(
      'https://api.olamaps.io/places/v1/reverse-geocode',
      {
        params: {
          latlng: `${latitude},${longitude}`,
          api_key: MAP_KEY,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching reverse geocode data:', error);
    return null;
  }
}
export async function autoComplete(
  input: any
) {
  try {
    const response = await axios.get(
      'https://api.olamaps.io/places/v1/autocomplete',
      {
        params: {
          input: input,
          api_key: MAP_KEY,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching reverse geocode data:', error);
    return null;
  }
}



export async function GetLocals(location: any) {


  const paramsList = [
    { strictbounds: true, withCentroid: true },
    { strictbounds: false, withCentroid: false },
    { strictbounds: true, withCentroid: false },
    { strictbounds: false, withCentroid: true },
  ];

  let allPredictions: any[] = [];
  const uniquePlaceIds = new Set(); // To store unique place_id values


  try {
    for (const params of paramsList) {
      const response = await axios.get('https://api.olamaps.io/places/v1/nearbysearch', {
        params: {
          layers: 'venue',
          types: 'sublocality',
          location: location,
          radius: 50000,
          strictbounds: params.strictbounds,
          withCentroid: params.withCentroid,
          limit: 100,
          api_key: MAP_KEY,
        },
        maxBodyLength: Infinity,
      });


      response.data.predictions.forEach((prediction: { place_id: unknown; }) => {
        if (!uniquePlaceIds.has(prediction.place_id)) {
          uniquePlaceIds.add(prediction.place_id);
          allPredictions.push(prediction);
        }
      });
    }

    // Return combined results
    return allPredictions;
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw error;
  }
}


export function extractAddressDetails(fullAddress: string) {
  const addressParts = fullAddress.split(',');

  const name = addressParts[2].trim();

  const description = addressParts
    .slice(0, 2)
    .concat(addressParts.slice(3))
    .map((part: string) => part.trim())
    .join(', ');

  return { name, description };
}

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: any;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export { showError, showSuccess };

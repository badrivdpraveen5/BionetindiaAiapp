import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import styles from '../styles/BiodiversityForm.styles';

import { Ionicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import {
  AudioModule,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
} from 'expo-audio';

import { useNavigation } from '@react-navigation/native';

import { useOffline } from '../contexts/OfflineContext';

import { createBiodiversityEntry } from '../services/api';

import ViewShot, {
  captureRef,
} from 'react-native-view-shot';


// ============================================================
// CONSTANTS
// ============================================================

const MAX_PHOTOS = 5;

const MAX_ACCEPTABLE_GPS_ACCURACY = 50;

const STAMP_WIDTH = 1080;

const STAMP_PANEL_HEIGHT = 205;


// ============================================================
// SCREEN
// ============================================================

const BiodiversityFormScreen = () => {

  const navigation = useNavigation();

  const {
    isOffline,
    saveOfflineEntry,
  } = useOffline();


  // ==========================================================
  // FORM DATA
  // ==========================================================

  const [formData, setFormData] = useState({

    commonName: '',

    scientificName: '',

    localName: '',

    category: 'flora',

    habitat: '',

    description: '',

    uses: '',

  });


  // ==========================================================
  // PHOTOS
  // ==========================================================

  const [photos, setPhotos] = useState([]);


  // ==========================================================
  // LOCATION
  // ==========================================================

  const [location, setLocation] = useState(null);

  const [locationLoading, setLocationLoading] =
    useState(false);


  // ==========================================================
  // SUBMIT
  // ==========================================================

  const [loading, setLoading] = useState(false);


  // ==========================================================
  // PHOTO STAMPING
  // ==========================================================

  const stampRef = useRef(null);

  const [stampData, setStampData] = useState(null);

  const [stampSize, setStampSize] = useState({
    width: STAMP_WIDTH,
    height: 810,
  });

  const [stampLoading, setStampLoading] =
    useState(false);


  // ==========================================================
  // AUDIO
  // ==========================================================

  const audioRecorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const recorderState =
    useAudioRecorderState(audioRecorder);

  const audioUri = audioRecorder.uri;


  // ==========================================================
  // INITIAL PERMISSION
  // ==========================================================

  useEffect(() => {

    requestPermissions();

  }, []);


  // ==========================================================
  // REQUEST PERMISSIONS
  // ==========================================================

  const requestPermissions = async () => {

    try {

      // We don't force all permissions here.
      // Permissions are requested when the user uses
      // the corresponding feature.

      console.log(
        'Biodiversity form initialized'
      );

    } catch (error) {

      console.log(
        'PERMISSION ERROR =>',
        error
      );

    }

  };


  // ==========================================================
  // UPDATE FIELD
  // ==========================================================

  const updateField = (
    field,
    value
  ) => {

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

  };


  // ==========================================================
  // FORMAT LOCATION ADDRESS
  // ==========================================================

  const formatLocationAddress = (
    place
  ) => {

    if (!place) {
      return 'Location unavailable';
    }


    const parts = [

      place.name,

      place.district,

      place.city,

      place.subregion,

      place.region,

    ];


    const cleanedParts = [];

    parts.forEach(item => {

      if (!item) {
        return;
      }

      const value =
        String(item).trim();

      if (!value) {
        return;
      }

      // Avoid duplicate location names.
      if (
        !cleanedParts.some(
          existing =>
            existing.toLowerCase() ===
            value.toLowerCase()
        )
      ) {

        cleanedParts.push(value);

      }

    });


    return cleanedParts.join(', ') ||
      'Location address unavailable';

  };


  // ==========================================================
  // CAPTURE CURRENT LOCATION
  // ==========================================================

  const getCurrentLocation = async () => {

    try {

      setLocationLoading(true);


      const permission =
        await Location.requestForegroundPermissionsAsync();


      if (!permission.granted) {

        Alert.alert(
          'Permission Required',
          'Location permission is required to capture the biodiversity location.'
        );

        return;

      }


      const servicesEnabled =
        await Location.hasServicesEnabledAsync();


      if (!servicesEnabled) {

        Alert.alert(
          'Location Disabled',
          'Please enable GPS/location services and try again.'
        );

        return;

      }


      const currentLocation =
        await Location.getCurrentPositionAsync({

          accuracy:
            Location.Accuracy.High,

        });


      const latitude =
        currentLocation.coords.latitude;

      const longitude =
        currentLocation.coords.longitude;

      const accuracy =
        currentLocation.coords.accuracy || 0;


      // ======================================================
      // REVERSE GEOCODING
      // ======================================================

      let locationAddress =
        'Address unavailable';


      try {

        const addresses =
          await Location.reverseGeocodeAsync({

            latitude,

            longitude,

          });


        if (
          addresses &&
          addresses.length > 0
        ) {

          locationAddress =
            formatLocationAddress(
              addresses[0]
            );

        }

      } catch (geocodeError) {

        console.log(
          'REVERSE GEOCODE ERROR =>',
          geocodeError
        );

        locationAddress =
          'Address unavailable';

      }


      const locationData = {

        latitude,

        longitude,

        accuracy,

        address:
          locationAddress,

      };


      setLocation(
        locationData
      );


      // ======================================================
      // GPS ACCURACY MESSAGE
      // ======================================================

      let accuracyMessage =
        'GPS location captured successfully.';


      if (
        accuracy > MAX_ACCEPTABLE_GPS_ACCURACY
      ) {

        accuracyMessage =
          `GPS accuracy is approximately ${Math.round(
            accuracy
          )} meters. Consider capturing the location again in an open area.`;

      }


      Alert.alert(

        'Location Captured',

        `${locationAddress}\n\nGPS Accuracy: ${Math.round(
          accuracy
        )} meters\n\n${accuracyMessage}`

      );


    } catch (error) {

      console.log(
        'LOCATION ERROR =>',
        error
      );


      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please check GPS and try again.'
      );


    } finally {

      setLocationLoading(false);

    }

  };


  // ==========================================================
  // VALIDATE BEFORE PHOTO
  // ==========================================================

  const validatePhotoRequirements = () => {

    if (
      !formData.commonName.trim()
    ) {

      Alert.alert(
        'Required',
        'Please enter the Common Name before capturing a biodiversity photo.'
      );

      return false;

    }


    if (!location) {

      Alert.alert(
        'Location Required',
        'Please capture the current location before taking a geo-stamped photo.'
      );

      return false;

    }


    return true;

  };


  // ==========================================================
  // GET PHOTO SIZE
  // ==========================================================

  const calculateStampSize = (
    uri
  ) => {

    return new Promise(resolve => {

      Image.getSize(

        uri,

        (width, height) => {

          if (
            !width ||
            !height
          ) {

            const defaultHeight =
              810;

            setStampSize({
              width:
                STAMP_WIDTH,
              height:
                defaultHeight,
            });

            resolve();

            return;

          }


          const imageHeight =
            Math.round(
              STAMP_WIDTH *
              (height / width)
            );


          setStampSize({

            width:
              STAMP_WIDTH,

            height:
              imageHeight,

          });


          resolve();

        },

        error => {

          console.log(
            'IMAGE SIZE ERROR =>',
            error
          );


          setStampSize({

            width:
              STAMP_WIDTH,

            height:
              810,

          });


          resolve();

        }

      );

    });

  };


  // ==========================================================
  // CREATE GEO-STAMPED IMAGE
  // ==========================================================

  const createGeoStampedImage = async (
    imageUri
  ) => {

    try {

      if (!imageUri) {
        return null;
      }


      if (!location) {

        Alert.alert(
          'Location Required',
          'Please capture location before creating the geo-stamped image.'
        );

        return null;

      }


      setStampLoading(true);


      // Calculate image dimensions.
      await calculateStampSize(
        imageUri
      );


      const stampPayload = {

        imageUri,

        commonName:
          formData.commonName.trim(),

        scientificName:
          formData.scientificName.trim(),

        category:
          formData.category
            ?.charAt(0)
            .toUpperCase() +
          formData.category?.slice(1),

        address:
          location.address ||
          'Location unavailable',

      };


      setStampData(
        stampPayload
      );


      // Give React time to render the ViewShot.
      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            500
          )
      );


      if (!stampRef.current) {

        throw new Error(
          'Geo stamp view is not ready.'
        );

      }


      const stampedUri =
        await captureRef(
          stampRef.current,
          {

            format: 'jpg',

            quality: 0.85,

            result: 'tmpfile',

          }
        );


      setStampData(null);


      setStampLoading(false);


      return stampedUri;


    } catch (error) {

      console.log(
        'GEO STAMP ERROR =>',
        error
      );


      setStampData(null);

      setStampLoading(false);


      Alert.alert(
        'Photo Error',
        'Unable to create the geo-stamped photo. Please try again.'
      );


      return null;

    }

  };


  // ==========================================================
  // TAKE PHOTO
  // ==========================================================

  const takePhoto = async () => {

    try {


      // ------------------------------------------------------
      // PHOTO LIMIT
      // ------------------------------------------------------

      if (
        photos.length >=
        MAX_PHOTOS
      ) {

        Alert.alert(
          'Photo Limit',
          `You can add a maximum of ${MAX_PHOTOS} photos.`
        );

        return;

      }


      // ------------------------------------------------------
      // VALIDATE
      // ------------------------------------------------------

      if (
        !validatePhotoRequirements()
      ) {

        return;

      }


      // ------------------------------------------------------
      // CAMERA PERMISSION
      // ------------------------------------------------------

      const permission =
        await ImagePicker.requestCameraPermissionsAsync();


      if (!permission.granted) {

        Alert.alert(
          'Permission Required',
          'Camera permission is required to take a photo.'
        );

        return;

      }


      // ------------------------------------------------------
      // CAMERA
      // ------------------------------------------------------

      const result =
        await ImagePicker.launchCameraAsync({

          mediaTypes: ['images'],

          allowsEditing: true,

          aspect: [4, 3],

          quality: 0.8,

        });


      if (

        result.canceled ||

        !result.assets?.length

      ) {

        return;

      }


      const originalUri =
        result.assets[0].uri;


      // ------------------------------------------------------
      // GEO STAMP
      // ------------------------------------------------------

      const stampedUri =
        await createGeoStampedImage(
          originalUri
        );


      if (!stampedUri) {

        return;

      }


      // ------------------------------------------------------
      // SAVE STAMPED IMAGE
      // ------------------------------------------------------

      setPhotos(prev => [

        ...prev,

        stampedUri,

      ]);


      Alert.alert(
        'Photo Added',
        'Geo-stamped biodiversity photo has been added successfully.'
      );


    } catch (error) {

      console.log(
        'CAMERA ERROR =>',
        error
      );


      Alert.alert(
        'Error',
        'Unable to open camera.'
      );

    }

  };


  // ==========================================================
  // PICK IMAGE FROM GALLERY
  // ==========================================================

  const pickImage = async () => {

    try {


      // ------------------------------------------------------
      // VALIDATE
      // ------------------------------------------------------

      if (
        !validatePhotoRequirements()
      ) {

        return;

      }


      // ------------------------------------------------------
      // REMAINING PHOTO COUNT
      // ------------------------------------------------------

      const remaining =
        MAX_PHOTOS -
        photos.length;


      if (remaining <= 0) {

        Alert.alert(
          'Photo Limit',
          `You can add a maximum of ${MAX_PHOTOS} photos.`
        );

        return;

      }


      // ------------------------------------------------------
      // GALLERY PERMISSION
      // ------------------------------------------------------

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();


      if (!permission.granted) {

        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select photos.'
        );

        return;

      }


      // ------------------------------------------------------
      // IMAGE LIBRARY
      // ------------------------------------------------------

      const result =
        await ImagePicker.launchImageLibraryAsync({

          mediaTypes: ['images'],

          allowsMultipleSelection: true,

          selectionLimit: remaining,

          quality: 0.8,

        });


      if (

        result.canceled ||

        !result.assets?.length

      ) {

        return;

      }


      // ------------------------------------------------------
      // PROCESS PHOTOS ONE BY ONE
      // ------------------------------------------------------

      const stampedPhotos = [];


      for (
        const asset of result.assets
      ) {

        if (
          stampedPhotos.length >=
          remaining
        ) {

          break;

        }


        const stampedUri =
          await createGeoStampedImage(
            asset.uri
          );


        if (stampedUri) {

          stampedPhotos.push(
            stampedUri
          );

        }

      }


      if (
        stampedPhotos.length > 0
      ) {

        setPhotos(prev => [

          ...prev,

          ...stampedPhotos,

        ]);


        Alert.alert(
          'Photos Added',
          `${stampedPhotos.length} geo-stamped photo${
            stampedPhotos.length > 1
              ? 's'
              : ''
          } added successfully.`
        );

      }


    } catch (error) {

      console.log(
        'IMAGE PICKER ERROR =>',
        error
      );


      Alert.alert(
        'Error',
        'Unable to select images.'
      );

    }

  };


  // ==========================================================
  // REMOVE PHOTO
  // ==========================================================

  const removePhoto = (
    index
  ) => {

    Alert.alert(

      'Remove Photo',

      'Do you want to remove this photo?',

      [

        {
          text: 'Cancel',
          style: 'cancel',
        },

        {

          text: 'Remove',

          style: 'destructive',

          onPress: () => {

            setPhotos(prev =>
              prev.filter(
                (_, i) =>
                  i !== index
              )
            );

          },

        },

      ]

    );

  };


  // ==========================================================
  // START AUDIO RECORDING
  // ==========================================================

  const startRecording = async () => {

    try {

      const permission =
        await AudioModule.requestRecordingPermissionsAsync();


      if (!permission.granted) {

        Alert.alert(
          'Permission Required',
          'Microphone permission is required to record audio.'
        );

        return;

      }


      await setAudioModeAsync({

        allowsRecording: true,

        playsInSilentMode: true,

      });


      await audioRecorder.prepareToRecordAsync();


      audioRecorder.record();


      console.log(
        'AUDIO RECORDING STARTED'
      );


    } catch (error) {

      console.log(
        'START RECORDING ERROR =>',
        error
      );


      Alert.alert(
        'Error',
        'Failed to start audio recording.'
      );

    }

  };


  // ==========================================================
  // STOP AUDIO RECORDING
  // ==========================================================

  const stopRecording = async () => {

    try {

      await audioRecorder.stop();


      console.log(
        'AUDIO URI =>',
        audioRecorder.uri
      );


      Alert.alert(
        'Recording Saved',
        'Audio recording has been saved successfully.'
      );


    } catch (error) {

      console.log(
        'STOP RECORDING ERROR =>',
        error
      );


      Alert.alert(
        'Error',
        'Failed to stop audio recording.'
      );

    }

  };


  // ==========================================================
  // BUILD ENTRY PAYLOAD
  // ==========================================================

  const buildEntryPayload = () => {

    const category =
      formData.category
        ?.charAt(0)
        .toUpperCase() +
      formData.category?.slice(1);


    return {

      commonName:
        formData.commonName.trim(),

      scientificName:
        formData.scientificName.trim(),

      localName:
        formData.localName.trim(),

      category,

      habitat:
        formData.habitat.trim(),

      description:
        formData.description.trim(),

      uses:
        formData.uses.trim(),


      // ------------------------------------------------------
      // CURRENT GRAM PANCHAYAT
      // ------------------------------------------------------

      gramPanchayat:
        'Hatia Ranchi',


      // ------------------------------------------------------
      // GEOJSON
      // ------------------------------------------------------

      location: {

        type: 'Point',

        coordinates: [

          location.longitude,

          location.latitude,

        ],

      },


      // ------------------------------------------------------
      // GPS ACCURACY
      // ------------------------------------------------------

      locationAccuracy:
        location.accuracy || 0,


      // ------------------------------------------------------
      // HUMAN READABLE LOCATION
      // ------------------------------------------------------

      locationAddress:
        location.address || '',


      // ------------------------------------------------------
      // GEO-STAMPED PHOTOS
      // ------------------------------------------------------

      photos,


      // ------------------------------------------------------
      // AUDIO
      // ------------------------------------------------------

      audioUri:
        audioUri || null,


      // ------------------------------------------------------
      // TIMESTAMP
      // ------------------------------------------------------

      timestamp:
        new Date().toISOString(),

    };

  };


  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async () => {

    try {


      // ------------------------------------------------------
      // VALIDATE COMMON NAME
      // ------------------------------------------------------

      if (
        !formData.commonName.trim()
      ) {

        Alert.alert(
          'Required',
          'Please enter the common name.'
        );

        return;

      }


      // ------------------------------------------------------
      // VALIDATE LOCATION
      // ------------------------------------------------------

      if (!location) {

        Alert.alert(
          'Location Required',
          'Please capture your current location before submitting.'
        );

        return;

      }


      // ------------------------------------------------------
      // VALIDATE PHOTO
      // ------------------------------------------------------

      if (!photos.length) {

        Alert.alert(
          'Photo Required',
          'Please capture at least one biodiversity photo.'
        );

        return;

      }


      // ------------------------------------------------------
      // GPS ACCURACY WARNING
      // ------------------------------------------------------

      if (
        location.accuracy >
        MAX_ACCEPTABLE_GPS_ACCURACY
      ) {

        Alert.alert(

          'Low GPS Accuracy',

          `Current GPS accuracy is approximately ${Math.round(
            location.accuracy
          )} meters.\n\nPlease recapture the location in an open area for better accuracy.`,

          [

            {
              text: 'Submit Anyway',

              onPress: () =>
                submitEntry(),

            },

            {

              text: 'Recapture',

              style: 'cancel',

            },

          ]

        );

        return;

      }


      await submitEntry();


    } catch (error) {

      console.log(
        'SUBMIT ERROR =>',
        error
      );

    }

  };


  // ==========================================================
  // ACTUAL SUBMISSION
  // ==========================================================

  const submitEntry = async () => {

    try {

      setLoading(true);


      const entry =
        buildEntryPayload();


      console.log(
        'BIODIVERSITY ENTRY =>',
        entry
      );


      // ====================================================
      // OFFLINE
      // ====================================================

      if (isOffline) {

        await saveOfflineEntry(
          entry
        );


        Alert.alert(

          'Saved Offline',

          'Your biodiversity entry has been saved locally and will be synchronized when internet connection is restored.',

          [

            {

              text: 'OK',

              onPress: () =>
                navigation.goBack(),

            },

          ]

        );


        return;

      }


      // ====================================================
      // ONLINE API
      // ====================================================

      const response =
        await createBiodiversityEntry(
          entry
        );


      console.log(
        'CREATE BIODIVERSITY RESPONSE =>',
        response
      );


      Alert.alert(

        'Success',

        'Biodiversity entry submitted successfully.',

        [

          {

            text: 'OK',

            onPress: () =>
              navigation.goBack(),

          },

        ]

      );


    } catch (error) {

      console.log(
        'API SUBMIT ERROR =>',
        error
      );


      // ====================================================
      // OFFLINE FALLBACK
      // ====================================================

      try {

        const offlineEntry =
          buildEntryPayload();


        await saveOfflineEntry(
          offlineEntry
        );


        Alert.alert(

          'Saved Offline',

          'Network submission failed, so the entry was saved locally and will be synchronized when internet connection is restored.',

          [

            {

              text: 'OK',

              onPress: () =>
                navigation.goBack(),

            },

          ]

        );


      } catch (offlineError) {

        console.log(
          'OFFLINE SAVE ERROR =>',
          offlineError
        );


        Alert.alert(

          'Error',

          'Unable to save the biodiversity entry.'

        );

      }


    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // CATEGORY COLOR
  // ==========================================================

  const getCategoryColor = (
    value
  ) => {

    if (
      value === 'flora'
    ) {

      return '#4CAF50';

    }


    if (
      value === 'fauna'
    ) {

      return '#3F51B5';

    }


    if (
      value === 'fungi'
    ) {

      return '#FF9800';

    }


    return '#757575';

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <View style={styles.container}>


      {/* ================================================== */}
      {/* HIDDEN GEO-STAMP CANVAS                           */}
      {/* ================================================== */}

      {stampData && (

        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: -5000,
            top: 0,
            width: stampSize.width,
            height: stampSize.height,
            zIndex: -999,
          }}
        >

          <ViewShot
            ref={stampRef}
            options={{
              format: 'jpg',
              quality: 0.85,
            }}
            style={{
              width:
                stampSize.width,

              height:
                stampSize.height,

              backgroundColor:
                '#000000',
            }}
          >

            {/* ============================================ */}
            {/* ORIGINAL IMAGE                              */}
            {/* ============================================ */}

            <Image

              source={{
                uri:
                  stampData.imageUri,
              }}

              resizeMode="contain"

              style={{
                width:
                  stampSize.width,

                height:
                  stampSize.height,

                position: 'absolute',

                left: 0,

                top: 0,

              }}

            />


            {/* ============================================ */}
            {/* GEO STAMP PANEL                             */}
            {/* ============================================ */}

            <View
              style={{
                position: 'absolute',

                left: 0,

                right: 0,

                bottom: 0,

                minHeight:
                  STAMP_PANEL_HEIGHT,

                paddingHorizontal: 35,

                paddingVertical: 22,

                backgroundColor:
                  'rgba(0,0,0,0.78)',

                justifyContent:
                  'center',

              }}
            >


              {/* ------------------------------------------ */}
              {/* TITLE                                     */}
              {/* ------------------------------------------ */}

              <Text
                style={{
                  color: '#FFFFFF',

                  fontSize: 32,

                  fontWeight: '800',

                  letterSpacing: 1,

                  marginBottom: 8,

                }}
              >

                BIO-NET INDIA

              </Text>


              {/* ------------------------------------------ */}
              {/* COMMON NAME                               */}
              {/* ------------------------------------------ */}

              <Text
                style={{
                  color: '#FFFFFF',

                  fontSize: 22,

                  fontWeight: '600',

                  marginBottom: 3,

                }}
              >

                Specimen Name: {stampData.commonName}

              </Text>


              {/* ------------------------------------------ */}
              {/* SCIENTIFIC NAME                           */}
              {/* ------------------------------------------ */}

              {stampData.scientificName ? (

                <Text
                  style={{
                    color: '#FFFFFF',

                    fontSize: 20,

                    marginBottom: 3,

                  }}
                >

                  Scientific Name:{' '}
                  {stampData.scientificName}

                </Text>

              ) : null}


              {/* ------------------------------------------ */}
              {/* CATEGORY                                  */}
              {/* ------------------------------------------ */}

              <Text
                style={{
                  color: '#FFFFFF',

                  fontSize: 20,

                  marginBottom: 3,

                }}
              >

                Category: {stampData.category}

              </Text>


              {/* ------------------------------------------ */}
              {/* LOCATION                                  */}
              {/* ------------------------------------------ */}

              <Text
                style={{
                  color: '#FFFFFF',

                  fontSize: 19,

                  lineHeight: 25,

                }}
              >

                Location: {stampData.address}

              </Text>


            </View>

          </ViewShot>

        </View>

      )}


      {/* ================================================== */}
      {/* MAIN SCROLL                                       */}
      {/* ================================================== */}

      <ScrollView

        style={
          styles.scrollView
        }

        contentContainerStyle={
          styles.scrollContent
        }

        showsVerticalScrollIndicator={
          false
        }

      >


        {/* ================================================= */}
        {/* BASIC INFORMATION                                */}
        {/* ================================================= */}

        <View style={styles.section}>


          <Text
            style={
              styles.sectionTitle
            }
          >

            Basic Information

          </Text>


          {/* ----------------------------------------------- */}
          {/* COMMON NAME                                    */}
          {/* ----------------------------------------------- */}

          <Text
            style={styles.label}
          >

            Common Name *

          </Text>


          <TextInput

            style={
              styles.input
            }

            placeholder="Enter common name"

            placeholderTextColor="#999"

            value={
              formData.commonName
            }

            onChangeText={
              text =>
                updateField(
                  'commonName',
                  text
                )
            }

          />


          {/* ----------------------------------------------- */}
          {/* SCIENTIFIC NAME                                */}
          {/* ----------------------------------------------- */}

          <Text
            style={styles.label}
          >

            Scientific Name

          </Text>


          <TextInput

            style={
              styles.input
            }

            placeholder="Enter scientific name"

            placeholderTextColor="#999"

            value={
              formData.scientificName
            }

            onChangeText={
              text =>
                updateField(
                  'scientificName',
                  text
                )
            }

          />


          {/* ----------------------------------------------- */}
          {/* LOCAL NAME                                     */}
          {/* ----------------------------------------------- */}

          <Text
            style={styles.label}
          >

            Local Name

          </Text>


          <TextInput

            style={
              styles.input
            }

            placeholder="Enter local name"

            placeholderTextColor="#999"

            value={
              formData.localName
            }

            onChangeText={
              text =>
                updateField(
                  'localName',
                  text
                )
            }

          />


          {/* ----------------------------------------------- */}
          {/* CATEGORY                                       */}
          {/* ----------------------------------------------- */}

          <Text
            style={styles.label}
          >

            Category

          </Text>


          <View
            style={
              styles.categoryContainer
            }
          >

            {[
              {
                label: 'Flora',
                value: 'flora',
                icon: 'leaf-outline',
              },

              {
                label: 'Fauna',
                value: 'fauna',
                icon: 'paw-outline',
              },

              {
                label: 'Fungi',
                value: 'fungi',
                icon: 'nutrition-outline',
              },

            ].map(item => {

              const selected =
                formData.category ===
                item.value;


              const categoryColor =
                getCategoryColor(
                  item.value
                );


              return (

                <TouchableOpacity

                  key={
                    item.value
                  }

                  style={[

                    styles.categoryButton,

                    selected && {

                      backgroundColor:
                        categoryColor,

                      borderColor:
                        categoryColor,

                    },

                  ]}

                  onPress={() =>
                    updateField(
                      'category',
                      item.value
                    )
                  }

                  activeOpacity={0.75}

                >

                  <Ionicons

                    name={
                      item.icon
                    }

                    size={20}

                    color={
                      selected
                        ? '#FFFFFF'
                        : categoryColor
                    }

                  />


                  <Text

                    style={[

                      styles.categoryText,

                      selected && {

                        color:
                          '#FFFFFF',

                      },

                    ]}

                  >

                    {item.label}

                  </Text>


                </TouchableOpacity>

              );

            })}

          </View>


          {/* ----------------------------------------------- */}
          {/* HABITAT                                        */}
          {/* ----------------------------------------------- */}

          <Text
            style={styles.label}
          >

            Habitat

          </Text>


          <TextInput

            style={[

              styles.input,

              styles.multilineInput,

            ]}

            placeholder="Describe the habitat"

            placeholderTextColor="#999"

            value={
              formData.habitat
            }

            onChangeText={
              text =>
                updateField(
                  'habitat',
                  text
                )
            }

            multiline

            numberOfLines={3}

          />


          {/* ----------------------------------------------- */}
          {/* DESCRIPTION                                    */}
          {/* ----------------------------------------------- */}

          <Text
            style={styles.label}
          >

            Description

          </Text>


          <TextInput

            style={[

              styles.input,

              styles.multilineInput,

            ]}

            placeholder="Describe the biodiversity"

            placeholderTextColor="#999"

            value={
              formData.description
            }

            onChangeText={
              text =>
                updateField(
                  'description',
                  text
                )
            }

            multiline

            numberOfLines={4}

          />


          {/* ----------------------------------------------- */}
          {/* USES                                           */}
          {/* ----------------------------------------------- */}

          <Text
            style={styles.label}
          >

            Uses / Traditional Knowledge

          </Text>


          <TextInput

            style={[

              styles.input,

              styles.multilineInput,

            ]}

            placeholder="Mention medicinal, food, cultural or other uses"

            placeholderTextColor="#999"

            value={
              formData.uses
            }

            onChangeText={
              text =>
                updateField(
                  'uses',
                  text
                )
            }

            multiline

            numberOfLines={4}

          />


        </View>


        {/* ================================================= */}
        {/* LOCATION                                        */}
        {/* ================================================= */}

        <View style={styles.section}>


          <Text
            style={
              styles.sectionTitle
            }
          >

            Location

          </Text>


          <Text
            style={{
              fontSize: 13,
              color: '#666',
              marginBottom: 12,
              lineHeight: 19,
            }}
          >

            Capture the location before taking a
            biodiversity photo. The coordinates will
            be stored in the database, while the
            readable address will be printed on the photo.

          </Text>


          {/* ----------------------------------------------- */}
          {/* LOCATION BUTTON                                */}
          {/* ----------------------------------------------- */}

          <TouchableOpacity

            style={
              styles.locationButton
            }

            onPress={
              getCurrentLocation
            }

            disabled={
              locationLoading
            }

            activeOpacity={0.8}

          >

            {locationLoading ? (

              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />

            ) : (

              <Ionicons

                name={
                  location
                    ? 'checkmark-circle'
                    : 'location-outline'
                }

                size={25}

                color="#FFFFFF"

              />

            )}


            <Text
              style={
                styles.locationButtonText
              }
            >

              {locationLoading

                ? 'Getting Location...'

                : location

                ? 'Refresh Location'

                : 'Capture Current Location'

              }

            </Text>


          </TouchableOpacity>


          {/* ----------------------------------------------- */}
          {/* LOCATION CARD                                  */}
          {/* ----------------------------------------------- */}

          {location && (

            <View
              style={
                styles.locationCard
              }
            >


              {/* ADDRESS */}

              <View
                style={[
                  styles.locationRow,
                  {
                    alignItems:
                      'flex-start',
                  },
                ]}
              >

                <Ionicons

                  name="location"

                  size={22}

                  color="#00897B"

                />


                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                  }}
                >

                  <Text
                    style={{
                      fontSize: 12,
                      color: '#777',
                      marginBottom: 3,
                    }}
                  >

                    Location Address

                  </Text>


                  <Text
                    style={[
                      styles.locationText,
                      {
                        fontWeight:
                          '600',
                      },
                    ]}
                  >

                    {location.address ||
                      'Address unavailable'}

                  </Text>

                </View>

              </View>


              {/* GPS ACCURACY */}

              <View
                style={
                  styles.locationRow
                }
              >

                <Ionicons

                  name="radio-outline"

                  size={20}

                  color="#777777"

                />


                <Text
                  style={
                    styles.accuracyText
                  }
                >

                  GPS Accuracy:{' '}

                  {Math.round(
                    location.accuracy || 0
                  )}

                  {' '}meters

                </Text>

              </View>


              {/* ACCURACY WARNING */}

              {location.accuracy >
                MAX_ACCEPTABLE_GPS_ACCURACY && (

                <View
                  style={{
                    marginTop: 8,
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor:
                      '#FFF3E0',
                  }}
                >

                  <Text
                    style={{
                      color:
                        '#E65100',
                      fontSize: 12,
                      lineHeight: 18,
                    }}
                  >

                    GPS accuracy is low.
                    Consider refreshing the
                    location before submitting.

                  </Text>

                </View>

              )}


            </View>

          )}


        </View>


        {/* ================================================= */}
        {/* PHOTOS                                          */}
        {/* ================================================= */}

        <View style={styles.section}>


          <View
            style={{
              flexDirection:
                'row',

              justifyContent:
                'space-between',

              alignItems:
                'center',

              marginBottom:
                12,

            }}
          >

            <Text
              style={
                styles.sectionTitle
              }
            >

              Geo-Stamped Photos

            </Text>


            <Text
              style={{
                fontSize: 13,
                color: '#666',
              }}
            >

              {photos.length}/{MAX_PHOTOS}

            </Text>

          </View>


          <Text
            style={{
              fontSize: 13,
              color: '#666',
              lineHeight: 19,
              marginBottom: 12,
            }}
          >

            Photos are automatically stamped with
            specimen name, scientific name, category,
            and location address.

          </Text>


          {/* ----------------------------------------------- */}
          {/* PHOTO BUTTONS                                  */}
          {/* ----------------------------------------------- */}

          <View
            style={
              styles.photoButtons
            }
          >


            {/* CAMERA */}

            <TouchableOpacity

              style={[

                styles.photoButton,

                styles.cameraButton,

              ]}

              onPress={
                takePhoto
              }

              disabled={
                stampLoading
              }

              activeOpacity={0.75}

            >

              {stampLoading ? (

                <ActivityIndicator
                  size="small"
                  color="#3F51B5"
                />

              ) : (

                <Ionicons

                  name="camera-outline"

                  size={24}

                  color="#3F51B5"

                />

              )}


              <Text
                style={[

                  styles.photoButtonText,

                  {
                    color:
                      '#3F51B5',
                  },

                ]}
              >

                Take Photo

              </Text>


            </TouchableOpacity>


            {/* GALLERY */}

            <TouchableOpacity

              style={[

                styles.photoButton,

                styles.galleryButton,

              ]}

              onPress={
                pickImage
              }

              disabled={
                stampLoading
              }

              activeOpacity={0.75}

            >

              {stampLoading ? (

                <ActivityIndicator
                  size="small"
                  color="#7E57C2"
                />

              ) : (

                <Ionicons

                  name="images-outline"

                  size={24}

                  color="#7E57C2"

                />

              )}


              <Text
                style={[

                  styles.photoButtonText,

                  {
                    color:
                      '#7E57C2',
                  },

                ]}
              >

                Gallery

              </Text>


            </TouchableOpacity>


          </View>


          {/* ----------------------------------------------- */}
          {/* PHOTO LIST                                     */}
          {/* ----------------------------------------------- */}

          {photos.length > 0 && (

            <ScrollView

              horizontal

              showsHorizontalScrollIndicator={
                false
              }

              style={
                styles.photoList
              }

            >

              {photos.map(
                (photo, index) => (

                  <View

                    key={
                      `${photo}-${index}`
                    }

                    style={
                      styles.photoWrapper
                    }

                  >

                    <Image

                      source={{
                        uri: photo,
                      }}

                      style={
                        styles.photo
                      }

                    />


                    {/* GEO BADGE */}

                    <View
                      style={{
                        position:
                          'absolute',

                        left: 5,

                        bottom: 5,

                        paddingHorizontal:
                          6,

                        paddingVertical:
                          3,

                        borderRadius:
                          5,

                        backgroundColor:
                          'rgba(0,0,0,0.65)',

                      }}
                    >

                      <Text
                        style={{
                          color:
                            '#FFFFFF',

                          fontSize:
                            9,

                          fontWeight:
                            '700',

                        }}
                      >

                        GEO STAMPED

                      </Text>

                    </View>


                    {/* REMOVE */}

                    <TouchableOpacity

                      style={
                        styles.removePhoto
                      }

                      onPress={() =>
                        removePhoto(
                          index
                        )
                      }

                    >

                      <Ionicons

                        name="close"

                        size={18}

                        color="#FFFFFF"

                      />

                    </TouchableOpacity>


                  </View>

                )
              )}

            </ScrollView>

          )}


        </View>


        {/* ================================================= */}
        {/* AUDIO                                           */}
        {/* ================================================= */}

        <View style={styles.section}>


          <Text
            style={
              styles.sectionTitle
            }
          >

            Traditional Knowledge Audio

          </Text>


          <Text
            style={
              styles.audioDescription
            }
          >

            Record local knowledge, traditional
            uses, or information about this
            biodiversity.

          </Text>


          <TouchableOpacity

            style={[

              styles.audioButton,

              recorderState.isRecording &&
                styles.audioButtonRecording,

            ]}

            onPress={

              recorderState.isRecording

                ? stopRecording

                : startRecording

            }

            activeOpacity={0.8}

          >

            <Ionicons

              name={

                recorderState.isRecording

                  ? 'stop-circle-outline'

                  : 'mic-outline'

              }

              size={28}

              color="#FFFFFF"

            />


            <Text
              style={
                styles.audioButtonText
              }
            >

              {recorderState.isRecording

                ? 'Stop Recording'

                : 'Start Recording'

              }

            </Text>


          </TouchableOpacity>


          {/* RECORDING STATUS */}

          {recorderState.isRecording && (

            <View
              style={
                styles.recordingStatus
              }
            >

              <View
                style={
                  styles.recordingDot
                }
              />


              <Text
                style={
                  styles.recordingText
                }
              >

                Recording in progress...

              </Text>

            </View>

          )}


          {/* AUDIO SAVED */}

          {audioUri &&
            !recorderState.isRecording && (

              <View
                style={
                  styles.audioSaved
                }
              >

                <Ionicons

                  name="checkmark-circle"

                  size={22}

                  color="#EF6C00"

                />


                <Text
                  style={
                    styles.audioSavedText
                  }
                >

                  Audio recording saved

                </Text>

              </View>

            )}


        </View>


        {/* ================================================= */}
        {/* OFFLINE NOTICE                                  */}
        {/* ================================================= */}

        {isOffline && (

          <View
            style={
              styles.offlineNotice
            }
          >

            <Ionicons

              name="cloud-offline-outline"

              size={22}

              color="#E65100"

            />


            <View
              style={
                styles.offlineContent
              }
            >

              <Text
                style={
                  styles.offlineTitle
                }
              >

                Offline Mode

              </Text>


              <Text
                style={
                  styles.offlineText
                }
              >

                Your entry will be saved on
                this device and synchronized
                when internet connection is
                restored.

              </Text>


            </View>


          </View>

        )}


        {/* ================================================= */}
        {/* SUBMIT                                          */}
        {/* ================================================= */}

        <TouchableOpacity

          style={[

            styles.submitButton,

            loading &&
              styles.submitButtonDisabled,

          ]}

          onPress={
            handleSubmit
          }

          disabled={
            loading
          }

          activeOpacity={0.8}

        >

          {loading ? (

            <>

              <Ionicons

                name="sync-outline"

                size={22}

                color="#FFFFFF"

              />


              <Text
                style={
                  styles.submitText
                }
              >

                Saving...

              </Text>

            </>

          ) : (

            <>

              <Ionicons

                name="cloud-upload-outline"

                size={22}

                color="#FFFFFF"

              />


              <Text
                style={
                  styles.submitText
                }
              >

                Submit Biodiversity

              </Text>

            </>

          )}


        </TouchableOpacity>


        <View
          style={{
            height: 40,
          }}
        />


      </ScrollView>

    </View>

  );

};


// ============================================================
// EXPORT
// ============================================================

export default BiodiversityFormScreen;
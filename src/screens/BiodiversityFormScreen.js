import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
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


const BiodiversityFormScreen = () => {
  const navigation = useNavigation();

  const { isOffline, saveOfflineEntry } = useOffline();

  const [formData, setFormData] = useState({
    commonName: '',
    scientificName: '',
    localName: '',
    category: 'flora',
    habitat: '',
    description: '',
    uses: '',
  });

  const [photos, setPhotos] = useState([]);

  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const audioRecorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const recorderState =
    useAudioRecorderState(audioRecorder);

  const audioUri = audioRecorder.uri;

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();

      await ImagePicker.requestMediaLibraryPermissionsAsync();

      await Location.requestForegroundPermissionsAsync();

      const audioPermission =
        await AudioModule.requestRecordingPermissionsAsync();

      if (!audioPermission.granted) {
        console.log('Microphone permission denied');
      }
    } catch (error) {
      console.log('PERMISSION ERROR =>', error);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const takePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take a photo.'
        );
        return;
      }

      const result =
        await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

      if (
        !result.canceled &&
        result.assets?.length > 0
      ) {
        const newPhoto = result.assets[0].uri;

        setPhotos(prev => [
          ...prev,
          newPhoto,
        ]);
      }
    } catch (error) {
      console.log('CAMERA ERROR =>', error);

      Alert.alert(
        'Error',
        'Unable to open camera.'
      );
    }
  };

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select photos.'
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsMultipleSelection: true,
          quality: 0.8,
        });

      if (
        !result.canceled &&
        result.assets?.length > 0
      ) {
        const selectedPhotos =
          result.assets.map(
            asset => asset.uri
          );

        setPhotos(prev => [
          ...prev,
          ...selectedPhotos,
        ]);
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

  const removePhoto = index => {
    setPhotos(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

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

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      const locationData = {
        latitude:
          currentLocation.coords.latitude,

        longitude:
          currentLocation.coords.longitude,

        accuracy:
          currentLocation.coords.accuracy || 0,
      };

      setLocation(locationData);

      Alert.alert(
        'Location Captured',
        `Latitude: ${locationData.latitude.toFixed(
          6
        )}\nLongitude: ${locationData.longitude.toFixed(
          6
        )}`
      );
    } catch (error) {
      console.log(
        'LOCATION ERROR =>',
        error
      );

      Alert.alert(
        'Location Error',
        'Unable to get your current location.'
      );
    } finally {
      setLocationLoading(false);
    }
  };

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

  const handleSubmit = async () => {
    try {
      if (!formData.commonName.trim()) {
        Alert.alert(
          'Required',
          'Please enter the common name.'
        );
        return;
      }

      if (!location) {
        Alert.alert(
          'Location Required',
          'Please capture your current location before submitting.'
        );
        return;
      }

      setLoading(true);

      const category =
        formData.category
          ?.charAt(0)
          .toUpperCase() +
        formData.category?.slice(1);

      const entry = {
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

        gramPanchayat:
          'Hatia Ranchi',

        location: {
          type: 'Point',

          coordinates: [
            location.longitude,
            location.latitude,
          ],
        },

        locationAccuracy:
          location.accuracy || 0,

        photos,

        audioUri:
          audioUri || null,

        timestamp:
          new Date().toISOString(),
      };

      console.log(
        'BIODIVERSITY ENTRY =>',
        entry
      );

      if (isOffline) {
        await saveOfflineEntry(entry);

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

      const response =
        await createBiodiversityEntry(entry);

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
        'SUBMIT ERROR =>',
        error
      );

      try {
        const offlineEntry = {
          commonName:
            formData.commonName.trim(),

          scientificName:
            formData.scientificName.trim(),

          localName:
            formData.localName.trim(),

          category:
            formData.category
              ?.charAt(0)
              .toUpperCase() +
            formData.category?.slice(1),

          habitat:
            formData.habitat.trim(),

          description:
            formData.description.trim(),

          uses:
            formData.uses.trim(),

          gramPanchayat:
            'Hatia Ranchi',

          location: {
            type: 'Point',

            coordinates: [
              location?.longitude,
              location?.latitude,
            ],
          },

          locationAccuracy:
            location?.accuracy || 0,

          photos,

          audioUri:
            audioUri || null,

          timestamp:
            new Date().toISOString(),
        };

        await saveOfflineEntry(
          offlineEntry
        );

        Alert.alert(
          'Saved Offline',
          'Network submission failed, so the entry was saved locally.',
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

  const getCategoryColor = value => {
    if (value === 'flora') {
      return '#4CAF50';
    }

    if (value === 'fauna') {
      return '#3F51B5';
    }

    if (value === 'fungi') {
      return '#FF9800';
    }

    return '#757575';
  };

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Basic Information
          </Text>

          <Text style={styles.label}>
            Common Name *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter common name"
            placeholderTextColor="#999"
            value={formData.commonName}
            onChangeText={text =>
              updateField(
                'commonName',
                text
              )
            }
          />

          <Text style={styles.label}>
            Scientific Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter scientific name"
            placeholderTextColor="#999"
            value={formData.scientificName}
            onChangeText={text =>
              updateField(
                'scientificName',
                text
              )
            }
          />

          <Text style={styles.label}>
            Local Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter local name"
            placeholderTextColor="#999"
            value={formData.localName}
            onChangeText={text =>
              updateField(
                'localName',
                text
              )
            }
          />

          <Text style={styles.label}>
            Category
          </Text>

          <View
            style={styles.categoryContainer}
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
                  key={item.value}
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
                    name={item.icon}
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

          <Text style={styles.label}>
            Habitat
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.multilineInput,
            ]}
            placeholder="Describe the habitat"
            placeholderTextColor="#999"
            value={formData.habitat}
            onChangeText={text =>
              updateField(
                'habitat',
                text
              )
            }
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.multilineInput,
            ]}
            placeholder="Describe the biodiversity"
            placeholderTextColor="#999"
            value={formData.description}
            onChangeText={text =>
              updateField(
                'description',
                text
              )
            }
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>
            Uses / Traditional Knowledge
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.multilineInput,
            ]}
            placeholder="Mention medicinal, food, cultural or other uses"
            placeholderTextColor="#999"
            value={formData.uses}
            onChangeText={text =>
              updateField(
                'uses',
                text
              )
            }
            multiline
            numberOfLines={4}
          />

        </View>

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Photos
          </Text>

          <View
            style={styles.photoButtons}
          >

            <TouchableOpacity
              style={[
                styles.photoButton,
                styles.cameraButton,
              ]}
              onPress={takePhoto}
              activeOpacity={0.75}
            >

              <Ionicons
                name="camera-outline"
                size={24}
                color="#3F51B5"
              />

              <Text
                style={[
                  styles.photoButtonText,
                  {
                    color: '#3F51B5',
                  },
                ]}
              >
                Take Photo
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.photoButton,
                styles.galleryButton,
              ]}
              onPress={pickImage}
              activeOpacity={0.75}
            >

              <Ionicons
                name="images-outline"
                size={24}
                color="#7E57C2"
              />

              <Text
                style={[
                  styles.photoButtonText,
                  {
                    color: '#7E57C2',
                  },
                ]}
              >
                Gallery
              </Text>

            </TouchableOpacity>

          </View>

          {photos.length > 0 && (

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              style={styles.photoList}
            >

              {photos.map(
                (photo, index) => (

                  <View
                    key={`${photo}-${index}`}
                    style={styles.photoWrapper}
                  >

                    <Image
                      source={{
                        uri: photo,
                      }}
                      style={styles.photo}
                    />

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

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Location
          </Text>

          <TouchableOpacity
            style={styles.locationButton}
            onPress={
              getCurrentLocation
            }
            disabled={locationLoading}
            activeOpacity={0.8}
          >

            <Ionicons
              name={
                location
                  ? 'checkmark-circle'
                  : 'location-outline'
              }
              size={25}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.locationButtonText
              }
            >
              {locationLoading
                ? 'Getting Location...'
                : location
                ? 'Location Captured'
                : 'Capture Current Location'}
            </Text>

          </TouchableOpacity>

          {location && (

            <View
              style={styles.locationCard}
            >

              <View
                style={styles.locationRow}
              >

                <Ionicons
                  name="navigate-outline"
                  size={20}
                  color="#00897B"
                />

                <Text
                  style={
                    styles.locationText
                  }
                >
                  Latitude:{' '}
                  {location.latitude.toFixed(
                    6
                  )}
                </Text>

              </View>

              <View
                style={styles.locationRow}
              >

                <Ionicons
                  name="navigate-outline"
                  size={20}
                  color="#00897B"
                />

                <Text
                  style={
                    styles.locationText
                  }
                >
                  Longitude:{' '}
                  {location.longitude.toFixed(
                    6
                  )}
                </Text>

              </View>

              {location.accuracy && (

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
                    Accuracy:{' '}
                    {Math.round(
                      location.accuracy
                    )}{' '}
                    meters
                  </Text>

                </View>

              )}

            </View>

          )}

        </View>

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Traditional Knowledge Audio
          </Text>

          <Text
            style={styles.audioDescription}
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
                : 'Start Recording'}
            </Text>

          </TouchableOpacity>

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

          {audioUri &&
            !recorderState.isRecording && (

              <View
                style={styles.audioSaved}
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

        {isOffline && (

          <View
            style={styles.offlineNotice}
          >

            <Ionicons
              name="cloud-offline-outline"
              size={22}
              color="#E65100"
            />

            <View
              style={styles.offlineContent}
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

        <TouchableOpacity
          style={[
            styles.submitButton,

            loading &&
              styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={loading}
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
                style={styles.submitText}
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
                style={styles.submitText}
              >
                Submit Biodiversity
              </Text>
            </>

          )}

        </TouchableOpacity>

        <View style={{ height: 40 }} />

      </ScrollView>

    </View>
  );
};




export default BiodiversityFormScreen;
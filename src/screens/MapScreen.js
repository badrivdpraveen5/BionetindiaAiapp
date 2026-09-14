import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import MapView, {
  Marker,
  Callout,
} from 'react-native-maps';

import * as Location from 'expo-location';

import {
  Ionicons,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';

import { getBiodiversityEntries } from '../services/api';

import styles from '../styles/Map.styles';

const { height } = Dimensions.get('window');

export default function MapScreen() {
  const mapRef = useRef(null);

  const insets = useSafeAreaInsets();

  const [region, setRegion] = useState(null);

  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [mapType, setMapType] = useState('standard');

  const [search, setSearch] = useState('');

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [userLocation, setUserLocation] = useState(null);

  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    loadMapData();
  }, []);

  const loadMapData = async () => {
    try {
      setLoading(true);


      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });

        const { latitude, longitude } = location.coords;

        setUserLocation(location.coords);

        const initialRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        };

        setRegion(initialRegion);
      } else {
        // Default India region if location permission denied
        setRegion({
          latitude: 23.3441,
          longitude: 85.3096,
          latitudeDelta: 4,
          longitudeDelta: 4,
        });
      }

  
      const response = await getBiodiversityEntries();

      console.log('MAP API RESPONSE =>', response);

      // Make sure API response is an array
      const responseData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];


      const validEntries = responseData.filter((item) => {
        const coordinates = item?.location?.coordinates;

        if (
          !Array.isArray(coordinates) ||
          coordinates.length < 2
        ) {
          return false;
        }

        const longitude = Number(coordinates[0]);
        const latitude = Number(coordinates[1]);

        return (
          Number.isFinite(latitude) &&
          Number.isFinite(longitude) &&
          latitude >= -90 &&
          latitude <= 90 &&
          longitude >= -180 &&
          longitude <= 180
        );
      });

      console.log(
        'VALID MAP ENTRIES =>',
        validEntries.length
      );

      setEntries(validEntries);
      setAllEntries(validEntries);
    } catch (error) {
      console.log(
        'MAP SCREEN ERROR =>',
        error?.response?.data || error?.message || error
      );

      setEntries([]);
      setAllEntries([]);
    } finally {
      setLoading(false);
    }
  };



  const onSearch = (text) => {
    setSearch(text);

    filterEntries(text, activeCategory);
  };



  const filterByCategory = (category) => {
    setActiveCategory(category);

    filterEntries(search, category);
  };



  const filterEntries = (searchText, category) => {
    let filtered = [...allEntries];

    // Category filter
    if (category !== 'All') {
      filtered = filtered.filter(
        (item) =>
          String(item?.category || '')
            .toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Search filter
    if (searchText?.trim()) {
      const q = searchText.trim().toLowerCase();

      filtered = filtered.filter((item) => {
        const commonName = String(
          item?.commonName || ''
        ).toLowerCase();

        const scientificName = String(
          item?.scientificName || ''
        ).toLowerCase();

        const localName = String(
          item?.localName || ''
        ).toLowerCase();

        const itemCategory = String(
          item?.category || ''
        ).toLowerCase();

        const village = String(
          item?.village || ''
        ).toLowerCase();

        const district = String(
          item?.district || ''
        ).toLowerCase();

        return (
          commonName.includes(q) ||
          scientificName.includes(q) ||
          localName.includes(q) ||
          itemCategory.includes(q) ||
          village.includes(q) ||
          district.includes(q)
        );
      });
    }

    setEntries(filtered);
  };


  const toggleMapType = () => {
    if (mapType === 'standard') {
      setMapType('satellite');
    } else if (mapType === 'satellite') {
      setMapType('hybrid');
    } else {
      setMapType('standard');
    }
  };



  const centerToUser = () => {
    if (!userLocation) {
      return;
    }

    const newRegion = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    };

    setRegion(newRegion);

    mapRef.current?.animateToRegion(
      newRegion,
      1000
    );
  };


  const zoomIn = () => {
    if (!region) {
      return;
    }

    const newRegion = {
      ...region,
      latitudeDelta: Math.max(
        region.latitudeDelta / 2,
        0.001
      ),
      longitudeDelta: Math.max(
        region.longitudeDelta / 2,
        0.001
      ),
    };

    setRegion(newRegion);

    mapRef.current?.animateToRegion(
      newRegion,
      400
    );
  };


  const zoomOut = () => {
    if (!region) {
      return;
    }

    const newRegion = {
      ...region,
      latitudeDelta: Math.min(
        region.latitudeDelta * 2,
        90
      ),
      longitudeDelta: Math.min(
        region.longitudeDelta * 2,
        180
      ),
    };

    setRegion(newRegion);

    mapRef.current?.animateToRegion(
      newRegion,
      400
    );
  };


  const navigateToLocation = () => {
    if (!selectedMarker) {
      return;
    }

    const coordinates =
      selectedMarker?.location?.coordinates;

    if (
      !Array.isArray(coordinates) ||
      coordinates.length < 2
    ) {
      return;
    }

    const longitude = Number(coordinates[0]);
    const latitude = Number(coordinates[1]);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return;
    }

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${latitude},${longitude}`;

    Linking.openURL(url).catch((error) => {
      console.log(
        'Unable to open Google Maps =>',
        error
      );
    });
  };



  const getMarkerColor = (category) => {
    switch (category) {
      case 'Flora':
        return '#22c55e';

      case 'Fauna':
        return '#ef4444';

      case 'Bird':
        return '#3b82f6';

      case 'Aquatic':
        return '#06b6d4';

      default:
        return '#f59e0b';
    }
  };


  const getImageUrl = (
    photos,
    fallback =
      'https://via.placeholder.com/500'
  ) => {
    if (!Array.isArray(photos) || photos.length === 0) {
      return fallback;
    }

    const firstPhoto = photos[0];

    // API returns string
    if (typeof firstPhoto === 'string') {
      return firstPhoto;
    }

    // API returns object
    if (typeof firstPhoto === 'object') {
      return (
        firstPhoto?.url ||
        firstPhoto?.uri ||
        firstPhoto?.path ||
        fallback
      );
    }

    return fallback;
  };



  const stats = useMemo(() => {
    return {
      total: allEntries.length,

      flora: allEntries.filter(
        (item) => item?.category === 'Flora'
      ).length,

      fauna: allEntries.filter(
        (item) => item?.category === 'Fauna'
      ).length,

      bird: allEntries.filter(
        (item) => item?.category === 'Bird'
      ).length,

      aquatic: allEntries.filter(
        (item) => item?.category === 'Aquatic'
      ).length,
    };
  }, [allEntries]);



  if (loading || !region) {
    return (
      <SafeAreaView
        style={styles.loader}
        edges={['top', 'bottom']}
      >

        <ActivityIndicator
          size="large"
          color="#16a34a"
        />

        <Text style={styles.loadingText}>
          Loading Biodiversity Map...
        </Text>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}
    >



      <MapView
        ref={mapRef}
      
        style={styles.map}
        region={region}
        mapType={mapType}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onRegionChangeComplete={(newRegion) => {
          setRegion(newRegion);
        }}
      >
        {entries.map((item, index) => {
          const coordinates =
            item?.location?.coordinates;

          const longitude = Number(
            coordinates?.[0]
          );

          const latitude = Number(
            coordinates?.[1]
          );

          if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
          ) {
            return null;
          }

          return (
            <Marker
              key={item?._id || `marker-${index}`}
              coordinate={{
                latitude,
                longitude,
              }}
              pinColor={getMarkerColor(
                item?.category
              )}
            >
              <Callout
                tooltip
                onPress={() => {
                  setSelectedMarker(item);
                  setShowModal(true);
                }}
              >
                <View style={styles.callout}>
                  {/* Callout Image */}

                  <Image
                    source={{
                      uri: getImageUrl(
                        item?.photos,
                        'https://via.placeholder.com/300'
                      ),
                    }}
                    style={styles.calloutImage}
                    resizeMode="cover"
                  />

                  {/* Callout Body */}

                  <View style={styles.calloutBody}>
                    <Text
                      style={styles.calloutTitle}
                      numberOfLines={1}
                    >
                      {item?.commonName ||
                        'Unknown'}
                    </Text>

                    <Text
                      style={styles.calloutScientific}
                      numberOfLines={1}
                    >
                      {item?.scientificName ||
                        'N/A'}
                    </Text>

                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor:
                            getMarkerColor(
                              item?.category
                            ),
                        },
                      ]}
                    >
                      <Text style={styles.badgeText}>
                        {item?.category || 'Other'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>


      <View
        style={[
          styles.searchContainer,
          {
            top: insets.top + 8,
          },
        ]}
      >
        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={20}
            color="#6b7280"
          />

          <TextInput
            placeholder="Search biodiversity..."
            placeholderTextColor="#6b7280"
            style={styles.searchInput}
            value={search}
            onChangeText={onSearch}
            returnKeyType="search"
          />

          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => onSearch('')}
              style={styles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={toggleMapType}
            style={styles.layerButton}
          >
            <MaterialIcons
              name="layers"
              size={24}
              color="#16a34a"
            />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={
          styles.categoryContent
        }
      >
        {[
          'All',
          'Flora',
          'Fauna',
          'Bird',
          'Aquatic',
        ].map((item) => (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            style={[
              styles.categoryBtn,
              activeCategory === item &&
                styles.categoryBtnActive,
            ]}
            onPress={() =>
              filterByCategory(item)
            }
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === item &&
                  styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {stats.total}
          </Text>

          <Text style={styles.statLabel}>
            Total
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {stats.flora}
          </Text>

          <Text style={styles.statLabel}>
            Flora
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {stats.fauna}
          </Text>

          <Text style={styles.statLabel}>
            Fauna
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {stats.bird}
          </Text>

          <Text style={styles.statLabel}>
            Bird
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.floatButtons,
          {
            bottom: 145 + insets.bottom,
          },
        ]}
      >
        {/* Zoom In */}

        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.8}
          onPress={zoomIn}
        >
          <Feather
            name="plus"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Zoom Out */}

        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.8}
          onPress={zoomOut}
        >
          <Feather
            name="minus"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Current Location */}

        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.8}
          onPress={centerToUser}
        >
          <Ionicons
            name="locate"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {entries.length === 0 && (
        <View
          style={[
            styles.noResultsCard,
            {
              top: insets.top + 150,
            },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={24}
            color="#6b7280"
          />

          <Text style={styles.noResultsText}>
            No biodiversity found
          </Text>
        </View>
      )}


      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() =>
          setShowModal(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                styles.modalScrollContent
              }
            >
              {selectedMarker && (
                <>
                  {/* Modal Image */}

                  <Image
                    source={{
                      uri: getImageUrl(
                        selectedMarker?.photos,
                        'https://via.placeholder.com/500'
                      ),
                    }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />

                  {/* Close Button */}

                  <TouchableOpacity
                    style={styles.modalCloseIcon}
                    onPress={() =>
                      setShowModal(false)
                    }
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color="#111827"
                    />
                  </TouchableOpacity>

                  {/* Name */}

                  <Text style={styles.modalTitle}>
                    {selectedMarker?.commonName ||
                      'Unknown'}
                  </Text>

                  {/* Scientific Name */}

                  <Text
                    style={styles.modalScientific}
                  >
                    {selectedMarker?.scientificName ||
                      'N/A'}
                  </Text>

                  {/* Category */}

                  <View
                    style={[
                      styles.modalCategory,
                      {
                        backgroundColor:
                          getMarkerColor(
                            selectedMarker?.category
                          ),
                      },
                    ]}
                  >
                    <Text
                      style={
                        styles.modalCategoryText
                      }
                    >
                      {selectedMarker?.category ||
                        'Other'}
                    </Text>
                  </View>

                  {/* Local Name */}

                  <View style={styles.infoCard}>
                    <Text
                      style={styles.infoHeading}
                    >
                      Local Name
                    </Text>

                    <Text
                      style={styles.infoText}
                    >
                      {selectedMarker?.localName ||
                        'N/A'}
                    </Text>
                  </View>

                  {/* Habitat */}

                  <View style={styles.infoCard}>
                    <Text
                      style={styles.infoHeading}
                    >
                      Habitat
                    </Text>

                    <Text
                      style={styles.infoText}
                    >
                      {selectedMarker?.habitat ||
                        'N/A'}
                    </Text>
                  </View>

                  {/* Description */}

                  <View style={styles.infoCard}>
                    <Text
                      style={styles.infoHeading}
                    >
                      Description
                    </Text>

                    <Text
                      style={styles.infoText}
                    >
                      {selectedMarker?.description ||
                        'No description available'}
                    </Text>
                  </View>

                  {/* Village */}

                  {selectedMarker?.village && (
                    <View style={styles.infoCard}>
                      <Text
                        style={styles.infoHeading}
                      >
                        Village
                      </Text>

                      <Text
                        style={styles.infoText}
                      >
                        {selectedMarker.village}
                      </Text>
                    </View>
                  )}

                  {/* District */}

                  {selectedMarker?.district && (
                    <View style={styles.infoCard}>
                      <Text
                        style={styles.infoHeading}
                      >
                        District
                      </Text>

                      <Text
                        style={styles.infoText}
                      >
                        {selectedMarker.district}
                      </Text>
                    </View>
                  )}

                  {/* Gram Panchayat */}

                  {selectedMarker?.gramPanchayat && (
                    <View style={styles.infoCard}>
                      <Text
                        style={styles.infoHeading}
                      >
                        Gram Panchayat
                      </Text>

                      <Text
                        style={styles.infoText}
                      >
                        {
                          selectedMarker.gramPanchayat
                        }
                      </Text>
                    </View>
                  )}
                </>
              )}
            </ScrollView>

            {/* Bottom Buttons */}

            <View style={styles.bottomButtons}>
              <TouchableOpacity
                style={styles.navigateButton}
                activeOpacity={0.8}
                onPress={navigateToLocation}
              >
                <Ionicons
                  name="navigate"
                  size={18}
                  color="#fff"
                />

                <Text
                  style={styles.bottomBtnText}
                >
                  Navigate
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.8}
                onPress={() =>
                  setShowModal(false)
                }
              >
                <Text
                  style={styles.bottomBtnText}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
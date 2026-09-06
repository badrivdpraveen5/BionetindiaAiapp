import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Callout,
} from 'react-native-maps';

import * as Location from 'expo-location';

import {
  Ionicons,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';

import {
  getBiodiversityEntries,
} from '../services/api';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {

  const mapRef = useRef(null);

  const [region, setRegion] = useState(null);

  const [entries, setEntries] = useState([]);

  const [allEntries, setAllEntries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [mapType, setMapType] =
    useState('standard');

  const [search, setSearch] = useState('');

  const [selectedMarker, setSelectedMarker] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [userLocation, setUserLocation] =
    useState(null);

  const [activeCategory, setActiveCategory] =
    useState('All');

  // =========================
  // LOAD MAP DATA
  // =========================

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
            accuracy:
              Location.Accuracy.High,
          });

        setUserLocation(location.coords);

        const initialRegion = {
          latitude:
            location.coords.latitude,
          longitude:
            location.coords.longitude,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        };

        setRegion(initialRegion);

      } else {

        setRegion({
          latitude: 23.3441,
          longitude: 85.3096,
          latitudeDelta: 4,
          longitudeDelta: 4,
        });
      }

      // =========================
      // API CALL
      // =========================

      const response =
        await getBiodiversityEntries();

      console.log(
        'MAP API RESPONSE =>',
        response
      );

      const validEntries =
        response.filter(
          (item) =>
            item?.location?.coordinates &&
            item.location.coordinates.length >= 2
        );

      setEntries(validEntries);
      setAllEntries(validEntries);

    } catch (error) {

      console.log(
        'MAP SCREEN ERROR =>',
        error.response?.data ||
        error.message
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // SEARCH FILTER
  // =========================

  const onSearch = (text) => {

    setSearch(text);

    filterEntries(
      text,
      activeCategory
    );
  };

  // =========================
  // CATEGORY FILTER
  // =========================

  const filterByCategory = (category) => {

    setActiveCategory(category);

    filterEntries(search, category);
  };

  // =========================
  // COMMON FILTER
  // =========================

  const filterEntries = (
    searchText,
    category
  ) => {

    let filtered = [...allEntries];

    // CATEGORY

    if (category !== 'All') {

      filtered = filtered.filter(
        (item) =>
          item.category === category
      );
    }

    // SEARCH

    if (searchText) {

      const q =
        searchText.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          (item.commonName || '')
            .toLowerCase()
            .includes(q) ||

          (item.scientificName || '')
            .toLowerCase()
            .includes(q) ||

          (item.localName || '')
            .toLowerCase()
            .includes(q) ||

          (item.category || '')
            .toLowerCase()
            .includes(q)
      );
    }

    setEntries(filtered);
  };

  // =========================
  // MAP TYPE TOGGLE
  // =========================

  const toggleMapType = () => {

    if (mapType === 'standard') {
      setMapType('satellite');
    } else if (mapType === 'satellite') {
      setMapType('hybrid');
    } else {
      setMapType('standard');
    }
  };

  // =========================
  // CENTER USER
  // =========================

  const centerToUser = () => {

    if (!userLocation) return;

    const newRegion = {

      latitude:
        userLocation.latitude,

      longitude:
        userLocation.longitude,

      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    };

    mapRef.current?.animateToRegion(
      newRegion,
      1000
    );
  };

  // =========================
  // ZOOM
  // =========================

  const zoomIn = () => {

    if (!region) return;

    const newRegion = {

      ...region,

      latitudeDelta:
        region.latitudeDelta / 2,

      longitudeDelta:
        region.longitudeDelta / 2,
    };

    setRegion(newRegion);

    mapRef.current?.animateToRegion(
      newRegion,
      400
    );
  };

  const zoomOut = () => {

    if (!region) return;

    const newRegion = {

      ...region,

      latitudeDelta:
        region.latitudeDelta * 2,

      longitudeDelta:
        region.longitudeDelta * 2,
    };

    setRegion(newRegion);

    mapRef.current?.animateToRegion(
      newRegion,
      400
    );
  };

  // =========================
  // NAVIGATE
  // =========================

  const navigateToLocation = () => {

    if (!selectedMarker) return;

    const coordinates =
      selectedMarker.location.coordinates;

    const longitude =
      coordinates[0];

    const latitude =
      coordinates[1];

    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    );
  };

  // =========================
  // MARKER COLOR
  // =========================

  const getMarkerColor = (
    category
  ) => {

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

  // =========================
  // CATEGORY COUNTS
  // =========================

  const stats = useMemo(() => {

    return {
      total: allEntries.length,

      flora:
        allEntries.filter(
          i => i.category === 'Flora'
        ).length,

      fauna:
        allEntries.filter(
          i => i.category === 'Fauna'
        ).length,

      bird:
        allEntries.filter(
          i => i.category === 'Bird'
        ).length,
    };

  }, [allEntries]);

  // =========================
  // LOADING
  // =========================

  if (loading || !region) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#16a34a"
        />

        <Text style={styles.loadingText}>
          Loading Biodiversity Map...
        </Text>

      </View>
    );
  }

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />

      {/* ========================= */}
      {/* MAP */}
      {/* ========================= */}

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        mapType={mapType}
        showsUserLocation
        showsMyLocationButton={false}
      >

        {entries.map((item, index) => {

          const coordinates =
            item.location.coordinates;

          const longitude =
            parseFloat(coordinates[0]);

          const latitude =
            parseFloat(coordinates[1]);

          if (!latitude || !longitude) {
            return null;
          }

          return (

            <Marker
              key={item._id || index}
              coordinate={{
                latitude,
                longitude,
              }}
              pinColor={
                getMarkerColor(
                  item.category
                )
              }
            >

              <Callout
                tooltip
                onPress={() => {

                  setSelectedMarker(item);

                  setShowModal(true);
                }}
              >

                <View style={styles.callout}>

                  <Image
                    source={{
                      uri:
                        item.photos?.[0] ||
                        'https://via.placeholder.com/300',
                    }}
                    style={styles.calloutImage}
                  />

                  <View style={styles.calloutBody}>

                    <Text
                      style={styles.calloutTitle}
                    >
                      {item.commonName || 'Unknown'}
                    </Text>

                    <Text
                      style={styles.calloutScientific}
                    >
                      {item.scientificName || 'N/A'}
                    </Text>

                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor:
                            getMarkerColor(
                              item.category
                            ),
                        },
                      ]}
                    >

                      <Text
                        style={styles.badgeText}
                      >
                        {item.category}
                      </Text>

                    </View>

                  </View>

                </View>

              </Callout>

            </Marker>
          );
        })}

      </MapView>

      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <View style={styles.searchContainer}>

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
          />

          <TouchableOpacity
            onPress={toggleMapType}
          >

            <MaterialIcons
              name="layers"
              size={24}
              color="#16a34a"
            />

          </TouchableOpacity>

        </View>

      </View>

      {/* ========================= */}
      {/* CATEGORY */}
      {/* ========================= */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
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

      {/* ========================= */}
      {/* STATS CARD */}
      {/* ========================= */}

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

      </View>

      {/* ========================= */}
      {/* FLOAT BUTTONS */}
      {/* ========================= */}

      <View style={styles.floatButtons}>

        <TouchableOpacity
          style={styles.fab}
          onPress={zoomIn}
        >

          <Feather
            name="plus"
            size={24}
            color="#fff"
          />

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fab}
          onPress={zoomOut}
        >

          <Feather
            name="minus"
            size={24}
            color="#fff"
          />

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fab}
          onPress={centerToUser}
        >

          <Ionicons
            name="locate"
            size={24}
            color="#fff"
          />

        </TouchableOpacity>

      </View>

      {/* ========================= */}
      {/* DETAILS MODAL */}
      {/* ========================= */}

      <Modal
        visible={showModal}
        animationType="slide"
        transparent
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContent}>

            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {selectedMarker && (

                <>

                  <Image
                    source={{
                      uri:
                        selectedMarker.photos?.[0] ||
                        'https://via.placeholder.com/500',
                    }}
                    style={styles.modalImage}
                  />

                  <Text style={styles.modalTitle}>
                    {selectedMarker.commonName}
                  </Text>

                  <Text style={styles.modalScientific}>
                    {selectedMarker.scientificName}
                  </Text>

                  <View
                    style={[
                      styles.modalCategory,
                      {
                        backgroundColor:
                          getMarkerColor(
                            selectedMarker.category
                          ),
                      },
                    ]}
                  >

                    <Text
                      style={styles.modalCategoryText}
                    >
                      {selectedMarker.category}
                    </Text>

                  </View>

                  <View style={styles.infoCard}>

                    <Text style={styles.infoHeading}>
                      Local Name
                    </Text>

                    <Text style={styles.infoText}>
                      {selectedMarker.localName || 'N/A'}
                    </Text>

                  </View>

                  <View style={styles.infoCard}>

                    <Text style={styles.infoHeading}>
                      Habitat
                    </Text>

                    <Text style={styles.infoText}>
                      {selectedMarker.habitat || 'N/A'}
                    </Text>

                  </View>

                  <View style={styles.infoCard}>

                    <Text style={styles.infoHeading}>
                      Description
                    </Text>

                    <Text style={styles.infoText}>
                      {selectedMarker.description || 'No description available'}
                    </Text>

                  </View>

                </>

              )}

            </ScrollView>

            <View style={styles.bottomButtons}>

              <TouchableOpacity
                style={styles.navigateButton}
                onPress={navigateToLocation}
              >

                <Ionicons
                  name="navigate"
                  size={18}
                  color="#fff"
                />

                <Text style={styles.bottomBtnText}>
                  Navigate
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() =>
                  setShowModal(false)
                }
              >

                <Text style={styles.bottomBtnText}>
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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  map: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 15 : 5,
    left: 15,
    right: 15,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 58,
    elevation: 8,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#111827',
  },

  categoryContainer: {
    position: 'absolute',
    top: 90,
    left: 15,
  },

  categoryBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    elevation: 4,
  },

  categoryBtnActive: {
    backgroundColor: '#16a34a',
  },

  categoryText: {
    color: '#111827',
    fontWeight: '600',
  },

  categoryTextActive: {
    color: '#fff',
  },

  statsCard: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 25,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
  },

  statLabel: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 13,
  },

  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },

  floatButtons: {
    position: 'absolute',
    right: 18,
    bottom: 130,
  },

  fab: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 10,
  },

  callout: {
    width: 240,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },

  calloutImage: {
    width: '100%',
    height: 120,
  },

  calloutBody: {
    padding: 12,
  },

  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  calloutScientific: {
    marginTop: 5,
    color: '#6b7280',
    fontStyle: 'italic',
  },

  badge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: height * 0.88,
  },

  modalImage: {
    width: '100%',
    height: 240,
    borderRadius: 20,
  },

  modalTitle: {
    marginTop: 18,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },

  modalScientific: {
    marginTop: 6,
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 14,
  },

  modalCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },

  modalCategoryText: {
    color: '#fff',
    fontWeight: '700',
  },

  infoCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  infoHeading: {
    color: '#6b7280',
    marginBottom: 6,
    fontSize: 13,
  },

  infoText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },

  bottomButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },

  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 16,
    marginRight: 8,
  },

  closeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b7280',
    padding: 16,
    borderRadius: 16,
    marginLeft: 8,
  },

  bottomBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },

});
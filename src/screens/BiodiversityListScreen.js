import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { getBiodiversityEntries } from '../services/api';

export default function BiodiversityListScreen() {

  const [entries, setEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  // =========================
  // LOAD API DATA
  // =========================

  const loadEntries = async () => {

    try {

      const data = await getBiodiversityEntries();

      console.log(
        'BIODIVERSITY LIST DATA =>',
        JSON.stringify(data, null, 2)
      );

      setEntries(data || []);

    } catch (error) {

      console.log(
        'LOAD ENTRY ERROR =>',
        error.response?.data || error.message
      );

      setEntries([]);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // REFRESH
  // =========================

  const onRefresh = async () => {

    setRefreshing(true);

    await loadEntries();

    setRefreshing(false);
  };

  // =========================
  // RENDER ITEM
  // =========================

  const renderEntry = ({ item }) => {

    // =========================
    // IMAGE FIX
    // =========================

    let imageUrl = null;

    if (
      item.photos &&
      item.photos.length > 0
    ) {

      // IF ARRAY OBJECT
      if (typeof item.photos[0] === 'object') {

        imageUrl =
          item.photos[0]?.url ||
          item.photos[0]?.uri;

      } else {

        // IF STRING URL
        imageUrl = item.photos[0];
      }
    }

    return (

      <TouchableOpacity style={styles.card}>

        {/* IMAGE */}

        {imageUrl ? (

          <Image
            source={{ uri: imageUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />

        ) : (

          <View style={styles.noImageContainer}>
            <Ionicons
              name="image-outline"
              size={50}
              color="#9ca3af"
            />

            <Text style={styles.noImageText}>
              No Image
            </Text>
          </View>
        )}

        {/* CONTENT */}

        <View style={styles.cardContent}>

          <Text style={styles.commonName}>
            {item.commonName || 'Unknown'}
          </Text>

          {!!item.scientificName && (
            <Text style={styles.scientificName}>
              {item.scientificName}
            </Text>
          )}

          {!!item.localName && (
            <Text style={styles.localName}>
              Local Name: {item.localName}
            </Text>
          )}

          {!!item.category && (
            <Text style={styles.category}>
              Category: {item.category}
            </Text>
          )}

          {!!item.gramPanchayat && (
            <Text style={styles.gramPanchayat}>
              Gram Panchayat:
              {' '}
              {item.gramPanchayat}
            </Text>
          )}

          {!!item.description && (
            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          )}

          {/* FOOTER */}

          <View style={styles.cardFooter}>

            {/* LOCATION */}

            <View style={styles.locationBadge}>

              <Ionicons
                name="location"
                size={12}
                color="#059669"
              />

              <Text style={styles.locationText}>

                {item.location &&
                item.location.coordinates
                  ? 'GPS Tagged'
                  : 'No Location'}

              </Text>

            </View>

            {/* STATUS */}

            <View
              style={[
                styles.statusBadge,

                item.validationStatus === 'Approved'
                  ? styles.approvedBadge
                  : styles.pendingBadge,
              ]}
            >

              <Text style={styles.statusText}>
                {item.validationStatus || 'Pending'}
              </Text>

            </View>

          </View>

          {/* DATE */}

          <Text style={styles.dateText}>

            {item.createdAt
              ? new Date(
                  item.createdAt
                ).toLocaleDateString()
              : 'No Date'}

          </Text>

        </View>

      </TouchableOpacity>
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <View style={styles.centerContainer}>

        <ActivityIndicator
          size="large"
          color="#10b981"
        />

        <Text style={styles.loadingText}>
          Loading Entries...
        </Text>

      </View>
    );
  }

  // =========================
  // MAIN SCREEN
  // =========================

  return (

    <View style={styles.container}>

      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item, index) =>
          item._id || index.toString()
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          entries.length === 0
            ? styles.emptyList
            : { paddingVertical: 10 }
        }
        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Ionicons
              name="leaf-outline"
              size={64}
              color="#d1d5db"
            />

            <Text style={styles.emptyText}>
              No Entries Found
            </Text>

            <Text style={styles.emptySubtext}>
              Start documenting biodiversity
            </Text>

          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f3f4f6',
  },

  noImageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },

  noImageText: {
    marginTop: 10,
    color: '#6b7280',
  },

  cardContent: {
    padding: 16,
  },

  commonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },

  scientificName: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#6b7280',
    marginBottom: 5,
  },

  localName: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },

  category: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 4,
    fontWeight: '600',
  },

  gramPanchayat: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 10,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  approvedBadge: {
    backgroundColor: '#dcfce7',
  },

  pendingBadge: {
    backgroundColor: '#fef3c7',
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },

  dateText: {
    marginTop: 10,
    fontSize: 12,
    color: '#9ca3af',
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
    marginTop: 15,
  },

  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },

});
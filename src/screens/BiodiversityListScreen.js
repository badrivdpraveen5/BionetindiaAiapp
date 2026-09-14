import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { getBiodiversityEntries } from '../services/api';
import styles from '../styles/BiodiversityList.styles';

export default function BiodiversityListScreen() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [searchText, entries]);

  const filterEntries = () => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      setFilteredEntries(entries);
      return;
    }

    const filtered = entries.filter((item) => {
      return (
        item.commonName?.toLowerCase().includes(search) ||
        item.scientificName?.toLowerCase().includes(search) ||
        item.localName?.toLowerCase().includes(search) ||
        item.category?.toLowerCase().includes(search) ||
        item.gramPanchayat?.toLowerCase().includes(search)
      );
    });

    setFilteredEntries(filtered);
  };

  const loadEntries = async () => {
    try {
      const data = await getBiodiversityEntries();

      console.log(
        'BIODIVERSITY LIST DATA =>',
        JSON.stringify(data, null, 2)
      );

      const result = Array.isArray(data) ? data : [];

      setEntries(result);
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

  const onRefresh = async () => {
    setRefreshing(true);

    await loadEntries();

    setRefreshing(false);
  };

  const getImageUrl = (item) => {
    if (!item?.photos || !Array.isArray(item.photos)) {
      return null;
    }

    if (item.photos.length === 0) {
      return null;
    }

    const firstPhoto = item.photos[0];

    if (typeof firstPhoto === 'string') {
      return firstPhoto;
    }

    if (typeof firstPhoto === 'object') {
      return firstPhoto?.url || firstPhoto?.uri || null;
    }

    return null;
  };

  const hasLocation = (item) => {
    return (
      item?.location?.coordinates &&
      Array.isArray(item.location.coordinates) &&
      item.location.coordinates.length >= 2
    );
  };

  const formatDate = (date) => {
    if (!date) {
      return 'No Date';
    }

    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return 'No Date';
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'Approved') {
      return styles.approvedBadge;
    }

    if (status === 'Rejected') {
      return styles.rejectedBadge;
    }

    return styles.pendingBadge;
  };

  const renderEntry = ({ item }) => {
    const imageUrl = getImageUrl(item);
    const locationAvailable = hasLocation(item);

    const status = item.validationStatus || 'Pending';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => {
          console.log('SELECTED ENTRY =>', item._id);
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons
              name="leaf-outline"
              size={48}
              color="#9ca3af"
            />

            <Text style={styles.noImageText}>
              No Image
            </Text>
          </View>
        )}

        <View style={styles.cardContent}>
          <Text style={styles.commonName}>
            {item.commonName || 'Unknown Species'}
          </Text>

          {item.scientificName ? (
            <Text style={styles.scientificName}>
              {item.scientificName}
            </Text>
          ) : null}

          {item.localName ? (
            <View style={styles.infoRow}>
              <Ionicons
                name="language-outline"
                size={15}
                color="#6b7280"
              />

              <Text style={styles.infoText}>
                {item.localName}
              </Text>
            </View>
          ) : null}

          {item.category ? (
            <View style={styles.infoRow}>
              <Ionicons
                name="leaf-outline"
                size={15}
                color="#059669"
              />

              <Text style={styles.categoryText}>
                {item.category}
              </Text>
            </View>
          ) : null}

          {item.gramPanchayat ? (
            <View style={styles.infoRow}>
              <Ionicons
                name="location-outline"
                size={15}
                color="#6b7280"
              />

              <Text
                style={styles.infoText}
                numberOfLines={1}
              >
                {item.gramPanchayat}
              </Text>
            </View>
          ) : null}

          {item.description ? (
            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          ) : null}

          <View style={styles.divider} />
          <View style={styles.cardFooter}>
            <View
              style={[
                styles.locationBadge,
                locationAvailable
                  ? styles.locationAvailable
                  : styles.locationUnavailable,
              ]}
            >
              <Ionicons
                name={
                  locationAvailable
                    ? 'location'
                    : 'location-outline'
                }
                size={13}
                color={
                  locationAvailable
                    ? '#059669'
                    : '#6b7280'
                }
              />

              <Text
                style={[
                  styles.locationText,
                  !locationAvailable &&
                    styles.locationUnavailableText,
                ]}
              >
                {locationAvailable
                  ? 'GPS Tagged'
                  : 'No Location'}
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                getStatusStyle(status),
              ]}
            >
              <Text style={styles.statusText}>
                {status}
              </Text>
            </View>

          </View>

          <View style={styles.dateContainer}>
            <Ionicons
              name="calendar-outline"
              size={13}
              color="#9ca3af"
            />

            <Text style={styles.dateText}>
              {formatDate(item.createdAt)}
            </Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View>
          <Text style={styles.headerTitle}>
            Biodiversity
          </Text>

          <Text style={styles.headerSubtitle}>
            Explore documented species
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {entries.length}
          </Text>
        </View>

      </View>

      <View style={styles.searchContainer}>

        <Ionicons
          name="search-outline"
          size={20}
          color="#6b7280"
        />

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search species, category..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
        />

        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText('')}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}

      </View>

      <FlatList
        data={filteredEntries}
        renderItem={renderEntry}
        keyExtractor={(item, index) =>
          item?._id?.toString() || index.toString()
        }
        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

        contentContainerStyle={
          filteredEntries.length === 0
            ? styles.emptyList
            : styles.listContent
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <View style={styles.emptyIconContainer}>
              <Ionicons
                name="leaf-outline"
                size={58}
                color="#9ca3af"
              />
            </View>

            <Text style={styles.emptyText}>
              {searchText
                ? 'No Results Found'
                : 'No Entries Found'}
            </Text>

            <Text style={styles.emptySubtext}>
              {searchText
                ? 'Try searching with a different name or category.'
                : 'Start documenting biodiversity in your community.'}
            </Text>

          </View>
        }
      />

    </View>
  );
}

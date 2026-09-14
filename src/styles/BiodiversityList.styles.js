import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: '#6b7280',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,

    backgroundColor: '#ffffff',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: '#6b7280',
  },

  countBadge: {
    minWidth: 38,
    height: 38,

    borderRadius: 19,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#d1fae5',
  },

  countText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },


  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 6,

    paddingHorizontal: 13,
    height: 48,

    borderRadius: 12,

    backgroundColor: '#ffffff',

    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  searchInput: {
    flex: 1,

    marginLeft: 9,

    fontSize: 14,
    color: '#111827',
  },


  listContent: {
    paddingTop: 6,
    paddingBottom: 20,
  },


  card: {
    marginHorizontal: 16,
    marginVertical: 7,

    borderRadius: 14,

    backgroundColor: '#ffffff',

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  cardImage: {
    width: '100%',
    height: 190,

    backgroundColor: '#f3f4f6',
  },

  noImageContainer: {
    width: '100%',
    height: 190,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#f3f4f6',
  },

  noImageText: {
    marginTop: 8,

    fontSize: 13,
    color: '#9ca3af',
  },


  cardContent: {
    padding: 15,
  },

  commonName: {
    fontSize: 19,
    fontWeight: '700',

    color: '#111827',

    marginBottom: 3,
  },

  scientificName: {
    fontSize: 14,

    fontStyle: 'italic',

    color: '#6b7280',

    marginBottom: 10,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 7,
  },

  infoText: {
    flex: 1,

    marginLeft: 7,

    fontSize: 13,
    color: '#4b5563',
  },

  categoryText: {
    marginLeft: 7,

    fontSize: 13,

    color: '#059669',

    fontWeight: '600',
  },

  description: {
    marginTop: 5,
    marginBottom: 2,

    fontSize: 13,
    lineHeight: 19,

    color: '#6b7280',
  },


  divider: {
    height: 1,

    marginTop: 10,
    marginBottom: 10,

    backgroundColor: '#f3f4f6',
  },


  cardFooter: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },


  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 9,
    paddingVertical: 5,

    borderRadius: 20,
  },

  locationAvailable: {
    backgroundColor: '#d1fae5',
  },

  locationUnavailable: {
    backgroundColor: '#f3f4f6',
  },

  locationText: {
    marginLeft: 4,

    fontSize: 11,

    color: '#059669',

    fontWeight: '600',
  },

  locationUnavailableText: {
    color: '#6b7280',
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

  rejectedBadge: {
    backgroundColor: '#fee2e2',
  },

  statusText: {
    fontSize: 11,

    fontWeight: '700',

    color: '#374151',
  },


  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 9,
  },

  dateText: {
    marginLeft: 5,

    fontSize: 11,

    color: '#9ca3af',
  },


  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  emptyContainer: {
    alignItems: 'center',

    paddingHorizontal: 35,
    paddingVertical: 40,
  },

  emptyIconContainer: {
    width: 100,
    height: 100,

    borderRadius: 50,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#f3f4f6',
  },

  emptyText: {
    marginTop: 18,

    fontSize: 19,

    fontWeight: '700',

    color: '#4b5563',
  },

  emptySubtext: {
    marginTop: 7,

    fontSize: 13,
    lineHeight: 19,

    textAlign: 'center',

    color: '#9ca3af',
  },

});

export default styles;
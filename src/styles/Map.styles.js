import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

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

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 16,

    color: '#111827',

    paddingVertical: 0,
  },

  clearButton: {
    marginRight: 8,

    padding: 2,
  },

  layerButton: {
    padding: 2,
  },


  categoryContainer: {
    position: 'absolute',

    top: 90,

    left: 15,

    right: 0,

    maxHeight: 48,
  },

  categoryContent: {
    paddingRight: 15,
  },

  categoryBtn: {
    backgroundColor: '#fff',

    paddingHorizontal: 18,

    paddingVertical: 10,

    borderRadius: 20,

    marginRight: 10,

    elevation: 4,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.12,

    shadowRadius: 3,
  },

  categoryBtnActive: {
    backgroundColor: '#16a34a',
  },

  categoryText: {
    color: '#111827',

    fontWeight: '600',

    fontSize: 14,
  },

  categoryTextActive: {
    color: '#fff',
  },


  statsCard: {
    position: 'absolute',

    left: 15,

    right: 15,

    bottom: 25,

    backgroundColor: '#fff',

    borderRadius: 24,

    paddingVertical: 18,

    paddingHorizontal: 8,

    flexDirection: 'row',

    justifyContent: 'space-around',

    alignItems: 'center',

    elevation: 10,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.18,

    shadowRadius: 7,
  },

  statBox: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',
  },

  statNumber: {
    fontSize: 22,

    fontWeight: 'bold',

    color: '#16a34a',
  },

  statLabel: {
    marginTop: 4,

    color: '#6b7280',

    fontSize: 12,

    fontWeight: '500',
  },

  divider: {
    width: 1,

    height: 40,

    backgroundColor: '#e5e7eb',
  },

  floatButtons: {
    position: 'absolute',

    right: 18,
  },

  fab: {
    width: 54,

    height: 54,

    borderRadius: 28,

    backgroundColor: '#16a34a',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 12,

    elevation: 10,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.2,

    shadowRadius: 5,
  },

  noResultsCard: {
    position: 'absolute',

    left: 40,

    right: 40,

    backgroundColor: '#fff',

    borderRadius: 16,

    paddingVertical: 14,

    paddingHorizontal: 18,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    elevation: 8,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.15,

    shadowRadius: 5,
  },

  noResultsText: {
    marginLeft: 8,

    color: '#6b7280',

    fontSize: 14,

    fontWeight: '600',
  },


  callout: {
    width: 240,

    backgroundColor: '#fff',

    borderRadius: 20,

    overflow: 'hidden',

    elevation: 5,
  },

  calloutImage: {
    width: '100%',

    height: 120,

    backgroundColor: '#f3f4f6',
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

    fontSize: 13,
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

  modalScrollContent: {
    paddingBottom: 10,
  },

  modalImage: {
    width: '100%',

    height: 240,

    borderRadius: 20,

    backgroundColor: '#f3f4f6',
  },

  modalCloseIcon: {
    position: 'absolute',

    top: 30,

    right: 30,

    width: 40,

    height: 40,

    borderRadius: 20,

    backgroundColor: 'rgba(255,255,255,0.92)',

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 4,
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

    fontSize: 15,
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

    fontSize: 13,
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

    fontWeight: '500',
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

    paddingTop: 5,

    backgroundColor: '#fff',
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

export default styles;
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  errorText: {
    fontSize: 16,
    color: '#6b7280',
  },

  languageButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  languageIcon: {
    fontSize: 16,
    marginRight: 5,
  },

  languageText: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '600',
  },

  skipButton: {
    position: 'absolute',
    right: 24,
    top: 50,
    zIndex: 10,
    padding: 8,
  },

  skipText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },

  slide: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  imageContainer: {
    width: width * 0.65,
    height: width * 0.65,
    maxWidth: 280,
    maxHeight: 280,
    borderRadius: 24,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 14,
  },

  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 24,
    backgroundColor: '#10b981',
  },

  swipeText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 25,
  },

  finishButton: {
    height: 52,
    marginHorizontal: 24,
    marginBottom: 25,
    backgroundColor: '#10b981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  finishText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '75%',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },

  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#f9fafb',
  },

  selectedLanguage: {
    backgroundColor: '#d1fae5',
  },

  languageOptionText: {
    fontSize: 17,
    color: '#374151',
  },

  selectedLanguageText: {
    color: '#047857',
    fontWeight: 'bold',
  },

  checkMark: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: 'bold',
  },

  closeButton: {
    marginTop: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
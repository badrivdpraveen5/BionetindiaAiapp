import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#F7F9F7',
  },


  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
  },


  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D9DED9',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222222',
    backgroundColor: '#FFFFFF',
  },

  multilineInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },



  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  categoryButton: {
    flex: 1,
    minHeight: 48,

    borderWidth: 1,
    borderColor: '#D9DED9',

    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 6,

    backgroundColor: '#FFFFFF',
  },

  categoryText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '600',
  },

  photoButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  photoButton: {
    flex: 1,
    height: 52,

    borderWidth: 1,
    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,
  },

  cameraButton: {
    backgroundColor: '#F4F6FF',
    borderColor: '#C5CAE9',
  },

  galleryButton: {
    backgroundColor: '#F8F4FF',
    borderColor: '#D1C4E9',
  },

  photoButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  photoList: {
    marginTop: 14,
  },

  photoWrapper: {
    width: 100,
    height: 100,

    marginRight: 10,

    borderRadius: 10,

    overflow: 'hidden',
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  removePhoto: {
    position: 'absolute',

    top: 5,
    right: 5,

    width: 26,
    height: 26,

    borderRadius: 13,

    backgroundColor:
      'rgba(0,0,0,0.65)',

    alignItems: 'center',
    justifyContent: 'center',
  },

  locationButton: {
    height: 52,

    borderRadius: 10,

    backgroundColor: '#009688',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,
  },

  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  locationCard: {
    marginTop: 12,

    backgroundColor: '#E0F2F1',

    borderRadius: 10,

    padding: 12,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 8,

    gap: 8,
  },

  locationText: {
    fontSize: 14,
    color: '#444444',
  },

  accuracyText: {
    fontSize: 13,
    color: '#777777',
  },

  audioDescription: {
    fontSize: 13,
    color: '#666666',

    lineHeight: 19,

    marginBottom: 14,
  },

  audioButton: {
    height: 55,

    borderRadius: 11,

    backgroundColor: '#FF9800',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 9,
  },

  audioButtonRecording: {
    backgroundColor: '#E53935',
  },

  audioButtonText: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '700',
  },

  recordingStatus: {
    marginTop: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,
  },

  recordingDot: {
    width: 9,
    height: 9,

    borderRadius: 5,

    backgroundColor: '#E53935',
  },

  recordingText: {
    color: '#E53935',

    fontSize: 13,

    fontWeight: '600',
  },

  audioSaved: {
    marginTop: 12,

    padding: 10,

    borderRadius: 9,

    backgroundColor: '#FFF3E0',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 7,
  },

  audioSavedText: {
    color: '#EF6C00',

    fontSize: 13,

    fontWeight: '600',
  },

  offlineNotice: {
    backgroundColor: '#FFF3E0',

    borderRadius: 12,

    padding: 13,

    flexDirection: 'row',
    alignItems: 'flex-start',

    marginBottom: 16,

    gap: 10,
  },

  offlineContent: {
    flex: 1,
  },

  offlineTitle: {
    color: '#E65100',

    fontWeight: '700',

    fontSize: 14,

    marginBottom: 3,
  },

  offlineText: {
    color: '#6D4C41',

    fontSize: 12,

    lineHeight: 17,
  },


  submitButton: {
    height: 56,

    borderRadius: 12,

    backgroundColor: '#43A047',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 9,

    marginBottom: 20,
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitText: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',
  },

});
export default styles;
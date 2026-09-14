import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7F5',
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

 heroCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 18,
  padding: 18,
  marginBottom: 16,

  flexDirection: 'row',
  alignItems: 'center',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.06,
  shadowRadius: 8,

  elevation: 3,
},

heroIconCircle: {
  width: 52,
  height: 52,
  borderRadius: 26,

  backgroundColor: '#238B50',

  justifyContent: 'center',
  alignItems: 'center',

  marginRight: 14,
},

heroTextContainer: {
  flex: 1,
},

heroTitle: {
  fontSize: 22,
  fontWeight: '700',
  color: '#173B25',
  marginBottom: 5,
},

heroText: {
  fontSize: 13,
  lineHeight: 19,
  color: '#68736B',
},

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 18,

    marginBottom: 16,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.07,

    shadowRadius: 8,

    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 18,
  },

  iconCircle: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: '#EAF7EE',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,

    fontWeight: '700',

    color: '#173B25',
  },

  cardSubtitle: {
    fontSize: 12,

    color: '#7B857E',

    marginTop: 3,

    lineHeight: 17,
  },

  bulletRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginBottom: 12,

    paddingBottom: 12,

    borderBottomWidth: 1,

    borderBottomColor: '#F0F2F0',
  },

  lastBulletRow: {
    borderBottomWidth: 0,

    marginBottom: 0,

    paddingBottom: 0,
  },

  bulletDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: '#238B50',

    marginTop: 7,

    marginRight: 11,
  },

  bulletText: {
    flex: 1,

    fontSize: 14,

    color: '#465149',

    lineHeight: 21,
  },

  permissionItem: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    paddingVertical: 12,

    borderBottomWidth: 1,

    borderBottomColor: '#EEF1EF',
  },

  lastPermissionItem: {
    borderBottomWidth: 0,

    paddingBottom: 0,
  },

  permissionIconCircle: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: '#EAF7EE',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  permissionContent: {
    flex: 1,
  },

  permissionTitle: {
    fontSize: 15,

    fontWeight: '700',

    color: '#26332B',

    marginBottom: 4,
  },

  permissionText: {
    fontSize: 13,

    color: '#68736B',

    lineHeight: 20,
  },

  bodyText: {
    fontSize: 14,

    lineHeight: 21,

    color: '#465149',

    marginBottom: 12,
  },

  noticeCard: {
    backgroundColor: '#FFF9E8',

    borderRadius: 16,

    padding: 16,

    marginBottom: 16,

    borderWidth: 1,

    borderColor: '#F2D99A',
  },

  noticeHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 8,
  },

  noticeIconCircle: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: '#FEF3C7',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 9,
  },

  noticeTitle: {
    flex: 1,

    fontSize: 15,

    fontWeight: '700',

    color: '#92400E',
  },

  noticeText: {
    fontSize: 13,

    color: '#8A5A0A',

    lineHeight: 20,
  },

  contactButton: {
    minHeight: 54,

    backgroundColor: '#238B50',

    borderRadius: 13,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 16,
  },

  contactButtonText: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '700',

    marginHorizontal: 9,
  },


  bottomSpace: {
    height: 20,
  },

});
export default styles;
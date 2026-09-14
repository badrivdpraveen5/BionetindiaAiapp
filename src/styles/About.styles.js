import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7F5',
  },

  content: {
    padding: 16,
    paddingBottom: 24,
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


  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF7EE',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  sectionHeaderText: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#173B25',
    marginBottom: 3,
  },

  sectionSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: '#68736B',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF2EF',
    marginVertical: 14,
  },

  subDivider: {
    height: 1,
    backgroundColor: '#EEF2EF',
    marginVertical: 18,
  },

  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#37443B',
    marginBottom: 12,
  },

  bodyTextLast: {
    fontSize: 14,
    lineHeight: 21,
    color: '#37443B',
  },

  missionList: {
    marginTop: 14,
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 11,
  },

  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#238B50',
    marginTop: 7,
    marginRight: 11,
  },

  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: '#37443B',
  },


  capabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  capabilityItem: {
    width: '48%',
    minHeight: 86,

    borderRadius: 14,
    backgroundColor: '#F8FBF8',

    borderWidth: 1,
    borderColor: '#E1EFE5',

    padding: 12,

    justifyContent: 'center',
  },

  capabilityIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EAF7EE',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 8,
  },

  capabilityText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#238B50',
    fontWeight: '600',
  },


  contributorsBox: {
    backgroundColor: '#F8FBF8',
    borderRadius: 14,

    padding: 14,
    marginTop: 4,

    borderWidth: 1,
    borderColor: '#E1EFE5',
  },

  contributorsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  contributorsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#173B25',
    marginLeft: 8,
  },

  contributorsText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#68736B',
  },

  /* =========================
     VERSION
  ========================== */

  versionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,

    padding: 20,
    marginBottom: 16,

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

  versionIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF7EE',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 10,
  },

  versionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#173B25',
    marginBottom: 6,
  },

  versionText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#68736B',
    textAlign: 'center',
    marginBottom: 10,
  },

  versionBadge: {
    backgroundColor: '#EAF7EE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  versionNumber: {
    fontSize: 12,
    color: '#238B50',
    fontWeight: '700',
  },

  bottomSpace: {
    height: 8,
  },
});
export default styles;
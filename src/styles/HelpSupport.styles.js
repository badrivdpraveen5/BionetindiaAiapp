import { StyleSheet,Platform } from 'react-native';

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

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },

  actionButton: {
    flex: 1,
    minHeight: 88,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  actionIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EAF7EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },

  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#238B50',
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


  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 9,
  },

  lastItem: {
    paddingBottom: 0,
  },

  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EAF7EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  stepNumberText: {
    color: '#238B50',
    fontSize: 13,
    fontWeight: '700',
  },

  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: '#37443B',
    paddingTop: 2,
  },

  issueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2EF',
  },

  issueIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EAF7EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  issueContent: {
    flex: 1,
    paddingTop: 1,
  },

  issueTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#173B25',
    marginBottom: 4,
  },

  issueText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#68736B',
  },


  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#37443B',
  },

  supportCard: {
    backgroundColor: '#238B50',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  supportIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  supportContent: {
    flex: 1,
  },

  supportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 5,
  },

  supportText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#EAF7EE',
  },

  bottomSpace: {
    height: 8,
  },
});
export default styles;
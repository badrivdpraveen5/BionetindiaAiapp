import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', 
  },
  content: {
    padding: 18,
    paddingBottom: 30,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#238B50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#238B50',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  userInfo: { flex: 1 },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#173B25',
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userPhone: {
    fontSize: 13,
    color: '#68736B',
    marginLeft: 6,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },

  /* =========================
     LANGUAGE
  ========================== */
  languageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF7EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#173B25',
    flex: 1,
  },
  selectedLanguage: {
    fontSize: 13,
    fontWeight: '600',
    color: '#238B50',
  },
  languageArrow: { marginLeft: 6 },
  languageDivider: {
    height: 1,
    backgroundColor: '#EEF2EF',
    marginVertical: 12,
  },
  languageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  languageButton: {
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#F5F8F5',
    borderWidth: 1,
    borderColor: '#E1EAE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButtonActive: {
    backgroundColor: '#238B50',
    borderColor: '#238B50',
  },
  languageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#526057',
  },
  languageTextActive: { color: '#FFFFFF' },

  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsHeader: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#173B25',
  },
  settingsDivider: {
    height: 1,
    backgroundColor: '#EEF2EF',
  },
  menuItem: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2EF',
  },
  lastMenuItem: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EAF7EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#37443B',
  },

  /* =========================
     ABOUT APP
  ========================== */
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  aboutTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EAF7EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  aboutInfo: { flex: 1 },
  aboutTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#173B25',
    marginBottom: 4,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#68736B',
  },
  aboutDivider: {
    height: 1,
    backgroundColor: '#EEF2EF',
    marginVertical: 12,
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionLabel: {
    fontSize: 13,
    color: '#68736B',
  },
  versionValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#238B50',
  },
  aboutFooter: {
    fontSize: 12,
    lineHeight: 18,
    color: '#89928C',
    textAlign: 'center',
    marginTop: 14,
  },

  logoutButton: {
    height: 54,
    backgroundColor: '#FFF7F7',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
    marginLeft: 10,
  },
  bottomPadding: { height: 12 },
});

export default styles;

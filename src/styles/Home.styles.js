import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // softer neutral background
  },

  header: {
    backgroundColor: '#10b981',
    padding: 26,
    paddingTop: Platform.OS === 'ios' ? 64 : 26,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#d1fae5',
    marginBottom: 14,
  },
  welcomeText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },

  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 18,
    gap: 14,
  },
  statCard: {
    flex: 1,
    padding: 22,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statCardBlue: { backgroundColor: '#3b82f6' },
  statCardGreen: { backgroundColor: '#10b981' },
  statCardEmerald: { backgroundColor: '#059669' },
  statCardAmber: { backgroundColor: '#f59e0b' },
  statNumber: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
  },

  section: {
    padding: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 14,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  actionCard: {
    width: '48%',
    padding: 22,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  actionCardGreen: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
  },
  actionCardBlue: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  actionCardPurple: {
    backgroundColor: '#f3e8ff',
    borderColor: '#a855f7',
  },
  actionCardOrange: {
    backgroundColor: '#ffedd5',
    borderColor: '#f97316',
  },
  actionText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 16,
    marginTop: 20,
  },
  infoText: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 10,
  },
});

export default styles;

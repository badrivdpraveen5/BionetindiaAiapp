import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4', 
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#065f46',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 26,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
    color: '#10b981',
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
    color: '#111827',
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    shadowColor: '#10b981',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  guestButton: {
    borderWidth: 2,
    borderColor: '#10b981',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  guestButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    color: '#6b7280',
    fontSize: 15,
  },
  registerLink: {
    color: '#10b981',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 6,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '500',
  },
  footerSubtext: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 4,
  },
});

export default styles;

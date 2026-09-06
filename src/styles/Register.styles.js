import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scroll: {
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#10b981',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6b7280',
  },

  form: {
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: 54,
    fontSize: 16,
    color: '#111827',
  },

  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 16,
  },

  dropdownIcon: {
    marginRight: 10,
  },

  picker: {
    flex: 1,
    height: 55,
  },

  locationButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
  },

  locationText: {
    color: '#10b981',
    marginLeft: 8,
    fontWeight: '600',
  },

  registerButton: {
    backgroundColor: '#10b981',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  bottomText: {
    color: '#6b7280',
    fontSize: 14,
  },

  loginText: {
    color: '#10b981',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
  },

});
export default styles;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4', 
  },

  scroll: {
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
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
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 10,
    marginBottom: 28,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 18,
  },

  inputFocused: {
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },

  icon: {
    marginRight: 10,
    color: '#10b981',
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
    marginBottom: 18,
  },

  dropdownIcon: {
    marginRight: 10,
    color: '#10b981',
  },

  picker: {
    flex: 1,
    height: 55,
  },

locationButton: {
  height: 52,
  borderRadius: 16,
  backgroundColor: '#ecfdf5',   
  borderWidth: 1,
  borderColor: '#10b981',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: 20,
  shadowColor: '#10b981',
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 2,
  paddingHorizontal: 12,        
},

locationText: {
  color: '#065f46',
  marginLeft: 8,
  fontWeight: '600',
  fontSize: 16,
},



  registerButton: {
    backgroundColor: '#10b981',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },

  bottomText: {
    color: '#6b7280',
    fontSize: 15,
  },

  loginText: {
    color: '#10b981',
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 15,
  },

  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500',
  },

});

export default styles;

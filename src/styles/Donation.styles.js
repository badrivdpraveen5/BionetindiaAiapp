import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7F5',
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },

  topSection: {
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

  topIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,

    backgroundColor: '#EAF7EE',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  topIcon: {
    fontSize: 24,
  },

  topTextContainer: {
    flex: 1,
  },

  topTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#173B25',
    marginBottom: 5,
  },

  topSubtitle: {
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
    marginBottom: 22,
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

  icon: {
    fontSize: 20,
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#173B25',
  },

  cardSubtitle: {
    fontSize: 12,
    color: '#7B857E',
    marginTop: 3,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#354139',
    marginBottom: 12,
  },

  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  amountButton: {
    width: '48%',
    height: 48,

    borderWidth: 1,
    borderColor: '#D8DED9',

    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 10,

    backgroundColor: '#FFFFFF',
  },

  amountButtonSelected: {
    backgroundColor: '#EAF7EE',
    borderColor: '#2E8B57',
  },

  amountButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#465149',
  },

  amountButtonTextSelected: {
    color: '#19713F',
    fontWeight: '700',
  },

  customAmountContainer: {
    height: 50,

    borderWidth: 1,
    borderColor: '#D8DED9',

    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 14,

    marginBottom: 16,
  },

  rupeeSymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#465149',
    marginRight: 8,
  },

  customAmountInput: {
    flex: 1,
    fontSize: 15,
    color: '#26332B',
  },


  selectedAmountBox: {
    backgroundColor: '#F0F9F2',

    borderRadius: 14,

    padding: 14,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 18,
  },

  selectedAmountLabel: {
    fontSize: 12,
    color: '#6A756E',
    marginBottom: 3,
  },

  selectedAmount: {
    fontSize: 23,
    fontWeight: '800',
    color: '#19713F',
  },

  checkCircle: {
    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor: '#2E8B57',

    justifyContent: 'center',
    alignItems: 'center',
  },

  checkMark: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },


  detailRow: {
    marginBottom: 16,
  },

  detailLabel: {
    fontSize: 12,
    color: '#7B857E',
    marginBottom: 5,
    fontWeight: '500',
  },

  payeeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#26332B',
    lineHeight: 20,
  },

  upiRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  upiText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#26332B',
  },

  copyButton: {
    width: 38,
    height: 38,

    borderRadius: 10,

    backgroundColor: '#F1F5F2',

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 8,
  },

  copyIcon: {
    fontSize: 17,
  },


  payButton: {
    minHeight: 54,

    backgroundColor: '#238B50',

    borderRadius: 13,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 16,

    marginTop: 2,
  },

  payButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 22,
    marginLeft: 8,
    marginTop: -2,
  },

  paymentNote: {
    textAlign: 'center',

    fontSize: 11,
    color: '#8A938D',

    marginTop: 10,
  },

  scanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  scanIcon: {
    fontSize: 24,
    color: '#238B50',
    marginRight: 12,
  },

  qrContainer: {
    width: '100%',
    height: 330,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FAFBFA',

    borderRadius: 14,

    borderWidth: 1,
    borderColor: '#E5EAE6',

    padding: 10,
  },

  qrImage: {
    width: 300,
    height: 300,
  },

  scanText: {
    textAlign: 'center',

    color: '#68736B',

    fontSize: 13,

    marginTop: 12,
  },


  bankTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#173B25',
    marginBottom: 18,
  },

  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#EEF1EF',

    paddingVertical: 11,
  },

  bankLabel: {
    fontSize: 13,
    color: '#7B857E',

    flex: 0.9,
  },

  bankValueContainer: {
    flex: 1.1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  bankValue: {
    fontSize: 13,
    color: '#26332B',
    fontWeight: '600',

    flexShrink: 1,

    textAlign: 'right',
  },

  bankCopyButton: {
    backgroundColor: '#EAF7EE',

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 8,

    marginLeft: 8,
  },

  bankCopyText: {
    color: '#19713F',

    fontSize: 11,

    fontWeight: '700',
  },

  noticeBox: {
    backgroundColor: '#EAF7EE',

    borderRadius: 16,

    padding: 16,
  },

  noticeTitle: {
    fontSize: 15,
    fontWeight: '700',

    color: '#19713F',

    marginBottom: 6,
  },

  noticeText: {
    fontSize: 13,

    lineHeight: 20,

    color: '#526057',
  },

  bottomSpace: {
    height: 20,
  },

});

export default styles;
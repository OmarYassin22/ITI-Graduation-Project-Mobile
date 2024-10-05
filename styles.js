import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 'auto',
  },
  screenContainer: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  navbarContainer: {
    height: 60,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    height:80,
    marginBottom:5,

  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    // marginHorizontal:'auto'
    position:'absolute',
    left: '40%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  selectedItem: {
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    height: 40,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#e63946',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusText: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  todoContainer: {
    paddingHorizontal: 20,
  },
  todoItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todoText: {
    color: '#333',
    fontSize: 16,
  },
  deleteButton: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  mainContainer: { paddingTop: Platform.OS === "android" ? 0 : 0, backgroundColor: "white" },
  mainContainerDark: { paddingTop: Platform.OS === "android" ? 0 : 0, backgroundColor: "black" },
  txtAbout: { marginVertical: 10, color: "blue", fontSize: 20, fontWeight: "bold", textAlign: "center" },
  txtAboutContent: { marginVertical: 10, color: "black", fontSize: 10, paddingHorizontal: "5%" },
  txtAboutContentDark: { marginVertical: 10, color: "white", fontSize: 10, paddingHorizontal: "5%" },
  aboutImage: { marginBottom: 20, width: "70%", height: "25%", alignSelf: "center" },
  txtMession: { marginVertical: 10, color: "blue", fontSize: 20, fontWeight: "bold", textAlign: "center" },
  txtMessionContent: { marginVertical: 10, color: "black", fontSize: 10, paddingHorizontal: "5%" },
  txtMessionContentDark: { marginVertical: 10, color: "white", fontSize: 10, paddingHorizontal: "5%" },
  dropDownMenu: { marginVertical: 10, width: "90%", alignSelf: "center", borderColor: "black", borderWidth: 2, borderRadius: 5 },
  dropDownMenuDark: { marginVertical: 10, width: "90%", alignSelf: "center", borderColor: "white", borderWidth: 2, borderRadius: 5 },
  dropDownMenu2: { color: "black" },
  dropDownMenu2Dark: { color: "red" },
  map: { width: "90%", height: 1100, alignSelf: "center", marginBottom: 10 },
  tableContainer: { padding: 15 },
  tableHeader: { backgroundColor: '#DCDCDC', },
  coursesImages: { width: 50, height: 50 },
  coursesCardodd: { marginBottom: 10, backgroundColor: "red" },
  coursesCardeven: { marginBottom: 10, backgroundColor: "green" }
});
export default styles;

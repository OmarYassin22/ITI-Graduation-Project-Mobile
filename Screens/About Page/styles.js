import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
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
    map: { width: 1000, height: 1000, alignSelf: "center" },
});
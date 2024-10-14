import { StyleSheet } from 'react-native';

const lightColors = {
  background: "#fff",
  text: "#333",
  border: "#ccc",
  cardBackground: "#f9f9f9",
  questionBackground: "#f0f0f0",
  questionText: "#444",
  answerText: "#555",
  buttonBackground: "#4a90e2",
  errorText: "#e74c3c",
};

const darkColors = {
  background: "#121212",
  text: "#f0f0f0",
  border: "#555",
  cardBackground: "#1e1e1e",
  questionBackground: "#2a2a2a",
  questionText: "#e0e0e0",
  answerText: "#c0c0c0",
  buttonBackground: "#3a70b2",
  errorText: "#ff6b6b",
};

const createStyles = (isDarkMode) => {
  const colors = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 8,
      color: colors.text,
      paddingLeft: 10
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      marginVertical: 8,
      overflow: "hidden",
    },
    picker: {
      height: 50,
      marginVertical: 8,
      color: colors.text,
    },
    card: {
      padding: 16,
      backgroundColor: colors.cardBackground,
      borderRadius: 8,
      marginVertical: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    questionContainer: {
      marginBottom: 16,
      backgroundColor: colors.questionBackground,
      padding: 12,
      borderRadius: 8,
    },
    question: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.questionText,
    },
    answer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
    },
    answerText: {
      fontSize: 14,
      marginLeft: 8,
      color: colors.answerText,
    },
    subBtn: {
      marginTop: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: colors.buttonBackground,
      borderRadius: 8,
      alignItems: "centr",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.errorText,
      marginBottom: 12,
      paddingLeft: 7
    },
    text: {
      fontSize: 18,
      color: colors.text,
      paddingLeft: 7
    },
    
    
  });
};

export default createStyles;
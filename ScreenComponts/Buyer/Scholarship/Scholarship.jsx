import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";

import { db } from "../../../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from "../../../Navigations/navbar";
import createStyles from './styleScholarship';
import SecondNavbar from "../../../Navigations/secondNav/secondNavbar";

const Scholarship = ({ isDarkMode }) => {
  const styles = createStyles(isDarkMode);

  const [field, setField] = useState("Front-end");
  const [answers, setAnswers] = useState([]);
  const [docData, setDocData] = useState(null);
  const [docId, setDocId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);
  const navigation = useNavigation();

 const questions = {
      "Front-end": [
      {
        questions: "1. What does HTML stand for?",
        answers: [
          "A) HyperText Markup Language",
          "B) HyperText Management Language",
          "C) Hyper Transfer Markup Language",
          "D) HighText Markup Language",
        ],
        rightAnswer: 0,
      },
      {
        questions: "2. Which of the following is used to style a web page?",
        answers: ["A) HTML ", "B) CSS ", "C) JavaScript ", "D) PHP "],
        rightAnswer: 1,
      },
      {
        questions: "3. Which HTML tag is used to create a hyperlink?",
        answers: ["A) <a>", "B) <link> ", "C) <href> ", "D) <url> "],
        rightAnswer: 0,
      },
      {
        questions: "4. What is the purpose of the <div> tag in HTML?",
        answers: [
          "A) To create a clickable button",
          "B) To define a section or a division in the document",
          "C) To insert an image",
          "D) To add a line break",
        ],
        rightAnswer: 1,
      },
      {
        questions: "5. Which CSS property is used to change the text color?",
        answers: [
          "A) color ",
          "B) background-color  ",
          "C) text-style  ",
          "D) font-color ",
        ],
        rightAnswer: 0,
      },
      {
        questions: "6. What does the id attribute do in HTML?",
        answers: [
          "A) Assigns a unique identifier to an element",
          "B) Specifies a class for styling",
          "C) Defines the type of an element",
          "D) Indicates the content type of an element",
        ],
        rightAnswer: 0,
      },
      {
        questions: "7. Which of the following is a valid CSS selector?",
        answers: [
          "A) .class-name",
          "B) #id-name ",
          "C) element ",
          "D) All of the above",
        ],
        rightAnswer: 3,
      },
      {
        questions: `8. In JavaScript, what does document.getElementById("myId") do?`,
        answers: [
          "A) Retrieves an element by its class name",
          "B) Creates a new element with the specified ID",
          "C) Selects an element with the given ID",
          "D) Deletes an element with the specified ID",
        ],
        rightAnswer: 2,
      },
      {
        questions:
          "9. Which HTML attribute is used to provide alternative text for an image?",
        answers: ["A) alt ", "B) src ", "C) title ", "D) href "],
        rightAnswer: 0,
      },
      {
        questions:
          "10. Which of the following properties is used to control the spacing between the border and the content of an element in CSS?",
        answers: ["A) margin ", "B) padding ", "C) border-spacing  ", "D) gap "],
        rightAnswer: 1,
      },
    ],
    "Back-end": [
      {
        questions:
          "1. Which of the following is a commonly used back-end programming language?",
        answers: ["A) HTML ", "B) CSS ", " C) JavaScript ", "  D) Python "],
        rightAnswer: 3,
      },
      {
        questions:
          "2. What is the purpose of a database in back-end development?",
        answers: [
          "A) To style web pages",
          "B) To store and manage data",
          "C) To handle client-side interactions",
          "D) To create user interfaces",
        ],

        rightAnswer: 1,
      },
      {
        questions:
          "3. Which of the following is a relational database management system (RDBMS)?",
        answers: ["A) MongoDB ", "B) Firebase ", "C) MySQL ", "D) Redis "],
        rightAnswer: 2,
      },
      {
        questions: "4. In a RESTful API, what does the GET method do?",
        answers: [
          "A) Creates a new resource",
          "B) Updates an existing resource",
          "C) Retrieves data from the server",
          "D) Deletes a resource",
        ],

        rightAnswer: 3,
      },
      {
        questions:
          "5. Which HTTP method is used to send data to a server to create a new resource?",
        answers: ["A) GET ", "B) POST ", "C) PUT ", "D) DELETE "],
        rightAnswer: 1,
      },
      {
        questions: "6. What does SQL stand for?",
        answers: [
          "A) Structured Query Language",
          "B) Simple Query Language",
          "C) Sequential Query Language",
          "D) Standard Query Language",
        ],
        rightAnswer: 0,
      },
      {
        questions:
          "7. Which of the following is a common back-end framework for JavaScript?",
        answers: ["A) Django ", "B) Express ", "C) Laravel ", "D) Flask "],

        rightAnswer: 1,
      },
      {
        questions: "8. In the context of web development, what is middleware?",
        answers: [
          "A) A type of database",
          "B) A web server configuration tool",
          "C) Software that sits between an application and a database or other services",
          "D) A CSS framework",
        ],
        rightAnswer: 2,
      },
      {
        questions:
          "9. What is the primary purpose of using environment variables in back-end development?",
        answers: [
          "A) To manage user authentication",
          "B) To configure settings specific to different deployment environments (e.g., development, testing, production)",
          "C) To define CSS styles",
          "D) To handle client-side interactions",
        ],
        rightAnswer: 1,
      },
      {
        questions:
          "10. Which of the following is an example of an Object-Relational Mapping (ORM) tool?",
        answers: ["A) Sequelize ", "B) Express ", "C) Flask ", "D) Bootstrap "],
        rightAnswer: 0,
      },
    ],
    "Mobile-app": [
      {
        questions:
          "1. Which programming language is primarily used for Android app development?",
        answers: ["A) Swift ", "B) Java ", "C) Kotlin ", "D) Objective-C  "],
        rightAnswer: 1,
      },
      {
        questions:
          "2. Which of the following is the official IDE for Android development?",
        answers: [
          "A) Xcode ",
          "B) Visual Studio Code",
          "C) Android Studio",
          "D) IntelliJ IDEA",
        ],
        rightAnswer: 2,
      },
      {
        questions:
          "3. What is the primary language used for iOS app development?",
        answers: ["A) Java ", "B) Kotlin ", "C) Swift ", "D) Python "],
        rightAnswer: 2,
      },
      {
        questions:
          "4. Which framework is commonly used for building cross-platform mobile applications?",
        answers: ["A) Angular ", "B) React Native", "C) Django", "D) Laravel "],
        rightAnswer: 1,
      },
      {
        questions: `5. In mobile development, what does "UI" stand for?`,
        answers: [
          "A) Unified Interface",
          "B) User Interaction",
          "C) User Interface",
          "D) Universal Integration",
        ],
        rightAnswer: 2,
      },
      {
        questions:
          "6. Which of the following is used to handle data persistence in Android apps?",
        answers: [
          "A) SQLite ",
          "B) MongoDB ",
          "C) Firebase Realtime Database",
          "D) Redis ",
        ],
        rightAnswer: 0,
      },
      {
        questions: "7. What is the name of Apple's app distribution platform?",
        answers: [
          "A) Google Play Store",
          "B) App Store",
          "C) Microsoft Store",
          "D) Amazon Appstore",
        ],

        rightAnswer: 1,
      },
      {
        questions: "8. In React Native, what does JSX stand for?",
        answers: [
          "A) JavaScript XML",
          "B) JavaScript Extension",
          "C) Java Syntax",
          "D) JSON XML",
        ],
        rightAnswer: 0,
      },
      {
        questions:
          "9. Which component in Flutter is used to build a user interface?",
        answers: ["A) Widget ", "B) Fragment ", "C) View ", "D) Activity "],
        rightAnswer: 0,
      },
      {
        questions: "10. What is the purpose of an API in mobile development?",
        answers: [
          "A) To design user interfaces",
          "B) To handle user input",
          "C) To allow communication between the mobile app and external services",
          "D) To store local data",
        ],
        rightAnswer: 2,
      },
    ],
  };


  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          style: isDarkMode ? "default" : "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log("Alert dismissed"),
      }
    );
  };

  const resetState = () => {
    setField("Front-end");
    setAnswers([]);
    setDocData(null);
    setDocId(null);
    setSubmitted(false);
    setCurrentEmail(null);
  };

  const fetchData = async () => {
    try {
      resetState();

      const email = await AsyncStorage.getItem('email');
      const cleanedEmail = email?.replace(/^"|"$|'/g, '').trim();
      if (!cleanedEmail) {
        showAlert("Error", "Email is missing. Please try again.");
        return;
      }

      setCurrentEmail(cleanedEmail);

      const usersCollection = collection(db, "UserData");
      const q = query(usersCollection, where("email", "==", cleanedEmail));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setDocId(doc.id);
        setDocData(doc.data());
        if (doc.data().type === "applicant") {
          setSubmitted(true);
          setField(doc.data().field);
          setAnswers(JSON.parse(doc.data().answers || '[]'));
        }
      });

    } catch (error) {
      showAlert("Error", "Failed to fetch user data. Please try again.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );


  const submitHandle = () => {
    if (submitted) {
      showAlert("Already an Applicant", "You are already an applicant.");
      return;
    }

    if (field) {
      if (answers.length !== questions[field].length || answers.some(answer => answer === null)) {
        showAlert("Error", "Please answer all questions before submitting.");
        return;
      }

      Alert.alert(
        "Scholarship Application",
        "Are you sure you want to submit the application?",
        [
          {
            text: "Cancel",
            onPress: () => showAlert("Cancelled", "Your application has been canceled."),
            style: "cancel",
          },
          {
            text: "Submit",
            onPress: async () => {
              try {
                if (!docId) {
                  showAlert("Error", "Document ID is missing. Please try again.");
                  return;
                }

                let grade = answers.reduce((acc, answer, index) => {
                  return acc + (answer === questions[field][index].rightAnswer ? 1 : 0);
                }, 0);

                const docRef = doc(db, "UserData", docId);
                const updateData = {
                  type: "applicant",
                  grade: grade,
                  field: field,
                  answers: JSON.stringify(answers)
                };

                await updateDoc(docRef, updateData);

                const updatedDoc = await getDoc(docRef);
                if (updatedDoc.exists() && updatedDoc.data().type === "applicant") {
                  showAlert("Success", "You have become an applicant.");
                }
                setSubmitted(true);

                navigation.navigate("Courses");
              } catch (error) {
                showAlert("Error", "There was an issue submitting your application.");
              }
            },
          },
        ]
      );
    } else {
      showAlert("Error", "Please select a field");
    }
  };

  const renderQuestion = ({ item, index }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.question}>{item.questions}</Text>
      {item.answers.map((answer, answerIndex) => (
        <View key={answerIndex} style={styles.answer}>
          <RadioButton
            value={answerIndex.toString()}
            status={answers[index] === answerIndex ? "checked" : "unchecked"}
            onPress={() => {
              let newAnswers = [...answers];
              newAnswers[index] = answerIndex;
              setAnswers(newAnswers);
            }}
            color={isDarkMode ? "#fff" : "#000"}
          />
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      ))}
    </View>
  );

  if (docData?.type === "applicant") {
    return (
      <View style={styles.container}>
        <SecondNavbar
          isDarkMode={isDarkMode}
          navigation={navigation}
        />
        <Text style={styles.header}>You are already an applicant</Text>
        <Text style={styles.text}>You cannot apply again</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SecondNavbar
        isDarkMode={isDarkMode}
        navigation={navigation}
      />
      <Text style={styles.label}>Select Field you want</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={field}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setField(itemValue);
            if (itemValue && questions[itemValue]) {
              setAnswers(new Array(questions[itemValue].length).fill(null));
            } else {
              setAnswers([]);
            }
          }}
          dropdownIconColor={isDarkMode ? "#fff" : "#000"}
          enabled={!submitted}
        >
          <Picker.Item label="Front-end" value="Front-end" style={styles.pickerItem} />
          <Picker.Item label="Back-end" value="Back-end" style={styles.pickerItem} />
          <Picker.Item label="Mobile App" value="Mobile-app" style={styles.pickerItem} />
        </Picker>
      </View>

      {field && (
        <FlatList
          data={questions[field]}
          renderItem={renderQuestion}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            !submitted && (
              <Button
                title="Submit"
                onPress={submitHandle}
                color={isDarkMode ? "#3a70b2" : "#4a90e2"}
                style={styles.subBtn}
              />
            )
          }
        />
      )}

      {submitted && (
        <Text style={styles.submittedText}>
          You have already submitted your application for the {field} field.
        </Text>
      )}
    </View>
  );
};

export default Scholarship;
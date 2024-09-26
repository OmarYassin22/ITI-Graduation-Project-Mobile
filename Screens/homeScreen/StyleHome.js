// styles.js
// eslint-disable-next-line import/named
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  introSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  introTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  introHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
  introHighlight: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
  introParagraph: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  introImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  coursesSection: {
    marginTop: 20,
  },
  sectionHeading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  courseList: {
    paddingHorizontal: 10,
  },
  courseCard: {
    width: 250,
    height: 180,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  courseImage: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 2,
  },
  courseTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 16,
  },
  containerTxt: {
    height: 100,
    position: "relative",
    marginVertical: 20,
  },
  overlayTxt: {
    opacity: 0.6,
    backgroundColor: "#1e3a8a",
    borderRadius: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  txtTitle: {
    color: "#fff",
    fontSize: 23,
    zIndex: 2,
    textAlign: "center",
    marginTop: 20,
  },
  txtSubtitle: {
    color: "#fff",
    zIndex: 2,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingVertical: 16,
  },
  itemText: {
    flexWrap: 'wrap',
    width: '100%',
    fontSize: 14,
    color: "#666",
  },
  accordionBackground: {
    backgroundColor: "#fff", // لون خلفية الوضع العادي
  },
  darkAccordionBackground: {
    backgroundColor: "#1e1e1e", // لون خلفية الوضع الداكن
  },
  overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // لون الخلفية مع الشفافية
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10, // نفس قيمة borderRadius في courseCard
},

 backgroundImageContainer: {
    position: 'relative',
    // أضف هنا صورة الخلفية
    backgroundColor: 'transparent', // أو أي لون آخر ترغب به
  },

});

export default styles;

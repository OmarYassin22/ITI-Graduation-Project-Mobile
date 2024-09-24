import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

const Accordion = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <List.AccordionGroup>
          <List.Accordion title="What is E-Learning?" id="1">
            <CustomListItem title="E-Learning is an online learning platform dedicated to providing high-quality, accessible education to learners worldwide." />
          </List.Accordion>
          <List.Accordion title="Our Mission" id="2">
            <CustomListItem title="Our mission is to empower individuals worldwide through accessible, high-quality education." />
          </List.Accordion>
          <List.Accordion title="Our Instructors" id="3">
            <CustomListItem title="Our courses are taught by industry experts." />
          </List.Accordion>
          <List.Accordion title="How E-Learning is Unique" id="4">
            <CustomListItem title="E-learning stands out through quality-focused content and interactive learning." />
          </List.Accordion>
        </List.AccordionGroup>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    // paddingHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
  },
  itemText: {
    flexWrap: 'wrap',
    width: '100%', 
    fontSize: 14, 
  color:"#666"
  },
});

const CustomListItem = ({ title }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.itemText} numberOfLines={3} ellipsizeMode="tail">
      {title}
    </Text>
  </View>
);

export default Accordion;

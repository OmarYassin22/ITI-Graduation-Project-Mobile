import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { GetData } from '../../Contexts/GetDataContext';
import { TextInput, Text, Headline, Searchbar, useTheme, Button } from 'react-native-paper';
import CourseList from './CourseList';
import { useNavigation } from '@react-navigation/native';
import CourseListBuyer from './CourseListBuyer';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db , auth,functions} from '../../firebase';


const Mycart = () => {
const {courseBuyerCart} = useContext(GetData);
const [courses, setCourses] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const theme = useTheme();
const { initPaymentSheet, presentPaymentSheet } = useStripe();
function fetchCourses() {

setCourses(courseBuyerCart);
}

useEffect(() => {
fetchCourses();
}, [courseBuyerCart]);

const filteredCourses = courses?.filter((course) =>
course.data.title?.toLowerCase().includes(searchTerm.toLowerCase())
);
const totalAmount = courseBuyerCart.reduce((acc, curr) => acc + parseInt(curr.data.price), 0).toFixed(2);
const handlePayment = async () => {
  try {
    console.log('Calling createPaymentIntent function...');
    const createPaymentIntent = httpsCallable(functions, 'createPaymentIntent');
    console.log('Function retrieved, calling with amount:', Math.round(totalAmount * 100));
    const response = await createPaymentIntent({ amount: Math.round(totalAmount * 100) });
    console.log('Response received:', response);

    if (response.data && response.data.clientSecret) {
      const { clientSecret } = response.data;

      console.log('Initializing payment sheet...');
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });

      if (initError) {
        console.log('Error initializing payment sheet:', initError);
        Alert.alert('Payment Error', 'Error initializing payment sheet. Please try again.');
        return;
      }

      console.log('Presenting payment sheet...');
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        console.log('Error presenting payment sheet:', presentError);
        Alert.alert('Payment Error', 'Error presenting payment sheet. Please try again.');
      } else {
        console.log('Payment successful!');
        Alert.alert('Success', 'Payment was successful!');
        // Handle successful payment
      }
    } else {
      console.log('Error: Client secret not found in response.');
      Alert.alert('Payment Error', 'Client secret not found in response. Please try again.');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    console.error('Error details:', error.details);
    Alert.alert('Payment Error', `There was an error processing your payment: ${error.message}`);
  }
};

if(courseBuyerCart.length==0){
return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Text>No courses in your wishlist yet.</Text>
</View>
); // if wishlist is empty return a message.
}

return (
  <StripeProvider publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}>
<SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
<ScrollView contentContainerStyle={styles.scrollView}>
<View style={styles.header}>
<Headline style={styles.title}>All Courses in My Cart</Headline>
<Searchbar placeholder="Search courses" onChangeText={setSearchTerm} value={searchTerm} style={styles.searchBar} />
</View>
<CourseListBuyer
filteredCourses={filteredCourses}

    />
    <View style={{marginLeft:30}}>
      <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold' }}>
        Total: { totalAmount } $
      </Text>
      {/* Add a button to checkout */}
      <View style={{ marginBottom: 20 }}>
        <Button icon="cart" mode="contained" onPress={handlePayment}>Buy now</Button>
      </View>
    </View>
  </ScrollView>
</SafeAreaView>
</StripeProvider>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
scrollView: {
flexGrow: 1,
padding: 16,
},
header: {
marginBottom: 20,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 16,
},
searchBar: {
marginBottom: 16,
},
});

export default Mycart;
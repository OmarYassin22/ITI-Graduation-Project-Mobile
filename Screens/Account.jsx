import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import Signup from "./Signup";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Account() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
  );
}
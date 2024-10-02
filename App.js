import { Platform, View } from 'react-native';
import CourseCards from './ScreenComponts/Courses';
import AddVideo from './ScreenComponts/instructor/addvideo';
import Table from './ScreenComponts/instructor/table';
import Calendar from './ScreenComponts/instructor/calendar';
import InsHome from './ScreenComponts/instructor/InstructorHome';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <InsHome />
    </NavigationContainer>
  );
}

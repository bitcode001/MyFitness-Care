// import {RouteProp} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';

// // Define the param list for your routes
// type RootStackParamList = {
//   Home: undefined;
//   Details: {itemId: number};
//   Nested: undefined;
//   NestedChild1: undefined;
//   NestedChild2: undefined;
// };

// // Define the navigation prop types for the screen components
// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
// type DetailsScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Details'
// >;
// type NestedScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Nested'
// >;
// type NestedChild1ScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'NestedChild1'
// >;
// type NestedChild2ScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'NestedChild2'
// >;

// // Define the route prop types for the screen components
// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
// type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
// type NestedScreenRouteProp = RouteProp<RootStackParamList, 'Nested'>;
// type NestedChild1ScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'NestedChild1'
// >;
// type NestedChild2ScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'NestedChild2'
// >;

// // Define the component with the correct prop types
// const HomeScreen: React.FC<{
//   navigation: HomeScreenNavigationProp;
//   route: HomeScreenRouteProp;
// }> = ({navigation, route}) => {
//   // Your component code here
// };

// export default HomeScreen;

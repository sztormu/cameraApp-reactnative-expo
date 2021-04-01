import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main"
import Gallery from "./components/Gallery"
import CameraScreen from "./components/CameraScreen"
import BigPhoto from "./components/BigPhoto"


const Root = createStackNavigator({
  s1: { screen: Main },
  s2: { screen: Gallery },
  s3: { screen: CameraScreen },
  s4: { screen: BigPhoto }
});

const App = createAppContainer(Root);
//ZAINSTALOWAC W TESTAPP004
//npm install expo-camera
//npm install expo-media-library
//npm install react-native-elements


export default App;

import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {EntrustIdv} from '@entrust.corporation/idvsdk-reactnative';
import type {Callbacks} from '@entrust.corporation/idvsdk-reactnative/callbacks/callbacks';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Welcome,
  FacePhoto,
  FaceMotion,
  type ClassicParameters,
  type Configuration,
  Theme,
  MediaResult,
} from '@entrust.corporation/idvsdk-reactnative/src/capture-api';
import {ThemeMode} from "@entrust.corporation/idvsdk-reactnative/src/capture-api/theming/Theme.ts";
import {ColorTokensKeys} from "@entrust.corporation/idvsdk-reactnative/src/capture-api/theming/ColorTokens.ts";

// Create a SDK token for this applicant in your backend and use it here
const SDK_TOKEN = 'YOUR_SDK_TOKEN';

// For Studio flows, create a Studio-type SDK token for this applicant instead (in your backend)
// Workflow Run ID is required for Studio-type SDK tokens and it's embedded in the studio token
// const STUDIO_TOKEN = 'YOUR_STUDIO_TOKEN';

const classicSteps = [
  Welcome(),
  FacePhoto({showIntro: false}),
  FaceMotion({showIntro: false}),
];

// Language keys: https://sdk.onfido.com/capture/i18n/index.json
// Custom translations for a module name and a language: https://sdk.onfido.com/capture/i18n/welcome/en_US.min.json
// Commons translations for a language: https://sdk.onfido.com/capture/i18n/common/en_US.min.json
const customTranslations = {
  language: 'en_US',
  allowedLanguages: ['en_US'],
  overrides: {
    en_US: {
      'welcome.title': 'Custom welcome title',
      'welcome.button.default': 'Custom button text',
    },
  },
};

const customTheme: Theme = {
  mode: ThemeMode.Light,
  lightColors: {
    backgroundColorOverlay: '#10598A85', // pass RGBA HEX colors, we internally convert to ARGB
  },
  darkColors: {
    backgroundColorOverlay: '#10598A85', // pass RGBA HEX colors, we internally convert to ARGB
  },
};

const configuration: Configuration = {
  disableAnalytics: false,
  theme: customTheme,
  localisation: customTranslations,
};

const classicFlowParameters: ClassicParameters = {
  sdkToken: SDK_TOKEN,
  steps: classicSteps,
  configuration: configuration,
};

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const handleLaunchSDK = () => {
    const callbacks: Callbacks = {
      onComplete: (result) => {
        console.log('The onComplete callback has been called. Received:', result);
        // Finish or navigate away
      },
      onError: (error) => {
        console.error('The onError callback has been called with:', error);
        Alert.alert('An error occurred', error.message, [
          {
            text: 'Ok',
            onPress: () => {
              // Finish or navigate away
            },
          },
        ]);
      },
      onUserExit: (userAction) => {
        console.log('The onUserExit has been called with userAction:', userAction);
        // Finish or navigate away
      },
      onAnalytics: (event) => {
        console.log('The onAnalytics callback has been called with:', event);
      },
      onMedia: (media: MediaResult) => {
        console.log('The onMedia callback has been called with:', media);
      },
      biometricsTokenHandler: {
        onTokenGenerated: (customerUserHash, _encryptedBiometricToken) => {
          // Store the token securely (e.g., AsyncStorage, SecureStore)
          console.log('Token generated for:', customerUserHash);
        },
        onTokenRequested: (customerHash) => {
          // Retrieve the token from secure storage
          console.log('Token requested for:', customerHash);
          return ''; // Return the stored token or empty string
        },
      },
    };

    const idv = new EntrustIdv(callbacks);
    idv.start(classicFlowParameters); // For studio flows, use studioFlowParameters instead
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Button title="Launch SDK" onPress={handleLaunchSDK} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

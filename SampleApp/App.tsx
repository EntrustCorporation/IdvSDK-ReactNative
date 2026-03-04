import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {EntrustIdv} from '@entrust.corporation/idvsdk-reactnative';
import type {Callbacks} from '@entrust.corporation/idvsdk-reactnative/callbacks/callbacks';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Configuration,
  StudioParameters,
  ClassicParameters,
} from '@entrust.corporation/idvsdk-reactnative/SdkParameters';
import {Document} from '@entrust.corporation/idvsdk-reactnative/steps/Document';
import {FaceMotion} from '@entrust.corporation/idvsdk-reactnative/steps/Face';
import {Welcome} from '@entrust.corporation/idvsdk-reactnative/steps/Welcome';
import {
  Theme,
  ThemeMode,
} from '@entrust.corporation/idvsdk-reactnative/theming/Theme';

// For Studio flows, use the SDK token generated during the workflow creation process and use it here
// The workflow run ID is no longer required when Studio-type SDK tokens are used as it is embedded in the Studio token
const studioToken = '<Your Studio token>';

// For 'classic' sessions that are yet to migrate to Workflow Studio, create a SDK token for this applicant
// in your backend and use it here
const sdkToken = '<Your SDK token>';

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
  branding: {
    text: 'Brand Name',
    logo: 'https://commons.wikimedia.org/wiki/File:React-icon.svg', // URL to a publicly accessible SVG image
  },
  lightColors: {
    backgroundColorOverlay: '#10598A85',
  },
  darkColors: {
    backgroundColorOverlay: '#10598A85',
  },
};

const configuration: Configuration = {
  theme: customTheme,
  localisation: customTranslations,
};

const studioFlowParameters: StudioParameters = {
  sdkToken: studioToken,
  configuration: configuration,
};

// 'Classic' flow example (unused)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const classicFlowParameters: ClassicParameters = {
  sdkToken: sdkToken,
  steps: [Welcome(), Document(), FaceMotion()],
  configuration: configuration,
};

export default function App() {
  const handleLaunchSDK = () => {
    const callbacks: Callbacks = {
      onComplete: result => {
        console.log(
          'The onComplete callback has been called. Received:',
          result,
        );
        // Finish or navigate away
      },
      onError: error => {
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
      onUserExit: userAction => {
        console.log(
          'The onUserExit has been called with userAction:',
          userAction,
        );
        // Finish or navigate away
      },
    };

    const idv = new EntrustIdv(callbacks);
    idv.start(studioFlowParameters);
  };

  return (
    <SafeAreaProvider>
      <StatusBar />
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

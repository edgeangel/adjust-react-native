import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Adjust, AdjustConfig, AdjustThirdPartySharing } from "react-native-adjust";

const App = (): React.JSX.Element => {
  useEffect(() => {
    const adjustConfig = new AdjustConfig("{YourAppToken}", 
    AdjustConfig.EnvironmentSandbox);
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);

    // ATT authorization wrapper
    Adjust.requestAppTrackingAuthorization(function(status) {
      console.log("Authorization status update!");
      switch (status) {
        case 0:
          // ATTrackingManagerAuthorizationStatusNotDetermined
          console.log("[Adjust]: Status: Not Determined (l'utilisateur n'a pas encore répondu)");
          break;
        case 1:
          // ATTrackingManagerAuthorizationStatusRestricted
          console.log("[Adjust]: Status: Restricted (le suivi est bloqué sur l'appareil)");
          break;
        case 2:
          // ATTrackingManagerAuthorizationStatusDenied
          console.log("[Adjust]: Status: Denied (l'utilisateur a refusé)");
          break;
        case 3:
          // ATTrackingManagerAuthorizationStatusAuthorized
          console.log("[Adjust]: Status: Authorized (l'utilisateur a accepté)");
          break;
      }
    });

    // Third party sharing 
    var adjustThirdPartySharing = new AdjustThirdPartySharing(null);  
    adjustThirdPartySharing.addGranularOption("google_dma", "eea", "1");                // user is in Europe
    adjustThirdPartySharing.addGranularOption("google_dma", "ad_user_data", "1");       // user consented to Google Ads
    adjustThirdPartySharing.addGranularOption("google_dma", "ad_personalization", "1"); // user consented to Google Ads
    adjustThirdPartySharing.addGranularOption("google_dma", "ad_storage", "1");         // user consented to Google Ads
    adjustThirdPartySharing.addGranularOption("google_dma", "npa", "1");                // user consented to Google Ads
    Adjust.trackThirdPartySharing(adjustThirdPartySharing);

    Adjust.initSdk(adjustConfig); 

    return () => {
      Adjust.componentWillUnmount();
    };
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'}  />
      <View style={styles.container}>
        <Text style={styles.title}>Adjust React Native</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require('./src/assets/edgeangel.png')}
            style={styles.logo}
          />
          <Image
            source={require('./src/assets/react.png')}
            style={styles.logo}
          />
          <Image
            source={require('./src/assets/adjust.png')}
            style={styles.logo}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 25, 
  },
  logoContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginHorizontal: 15, 
  },
});

export default App;
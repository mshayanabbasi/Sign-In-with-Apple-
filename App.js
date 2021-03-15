import React from 'react'
import { View, Button, Text } from 'react-native'
import {firebase} from '@react-native-firebase/auth'
import {AppleButton, appleAuth} from '@invertase/react-native-apple-authentication'

const App = () => {
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }
  
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }
  
  return (
    <View>
      {appleAuth.isSupported && (
        <AppleButton cornerRadius={5} style={{width: 200, height: 60}} buttonStyle={AppleButton.Style.WHITE} buttonType={AppleButton.Type.SIGN_IN} onPress={() => onAppleButtonPress()} />
      )}
    </View>
  );
}

export default App
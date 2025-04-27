import React from 'react';
import {View, StyleSheet} from 'react-native';
import GameScreen from './GameScreen/GameScreen';

function App(): React.JSX.Element{
  return(
    <View style={styles.container}>
      <GameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
});

export default App;

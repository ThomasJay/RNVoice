// App.js
import React from 'react';
import {StyleSheet, Text, View, Button, AppRegistry} from 'react-native';
import Voice from 'react-native-voice';
export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
  componentWillUnmount() {
    console.log('Mounted');
    Voice.destroy().then(Voice.removeAllListeners);
  }
  onSpeechStart(e) {
    console.log('Started');
    this.setState({
      started: '√',
    });
  }
  onSpeechRecognized(e) {
    // console.log('Recognized');
    console.log('Recognized: ' + JSON.stringify(e));
    this.setState({
      recognized: '√',
    });
  }
  onSpeechResults(e) {
    console.log('Result: ' + JSON.stringify(e));
    //    console.log('Result: ' + e.value);
    this.setState({
      results: e.value,
    });
  }
  onSpeechEndHandler(e) {
    console.log('onSpeechEndHandler: ' + JSON.stringify(e));
    //    console.log('Result: ' + e.value);
    //    this.setState({
    //     results: e.value,
    //    });
  }
  async _startRecognition(e) {
    console.log('_startRecognition');

    this.setState({
      recognized: '',
      started: '',
      results: [],
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      console.log('Stopping');
      Voice.stop();
    }, 5000);
  }
  render() {
    return (
      <View>
        <Text style={styles.transcript}>Transcript</Text>
        {this.state.results.map((result, index) => (
          <Text style={styles.transcript}> {result}</Text>
        ))}
        <Button
          style={styles.transcript}
          onPress={this._startRecognition.bind(this)}
          title="Start"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
    paddingTop: 50,
  },
});
AppRegistry.registerComponent('VoiceNative', () => VoiceNative);

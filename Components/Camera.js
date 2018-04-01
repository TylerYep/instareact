import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraStream extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      photoId: 0,
    };
  }
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  
  takePicture = async function() {
    if (this.camera) {
      return await this.camera.takePictureAsync({ base64: true });      
    }
  };
  
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 0 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                  style={{
                    flex: 0.2,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={this.takePicture.bind(this)}>
                  <Text
                    style={{ fontSize: 12, marginBottom: 5, color: 'white' }}>
                    {' '}Snap{' '}
                  </Text>
                </TouchableOpacity>
            </View>              
          </Camera>
        </View>
      );
    }
  }
}

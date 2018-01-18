import React, { Component } from "react";
import { Platform, ToastAndroid, View } from "react-native"; // eslint-disable-line react-native/split-platform-components
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TitleText, BodyText, SubtitleText } from "../components/Typography";
import { MainTabPage } from "../components/Containers";
import { signOut } from "../actions/userActions";
import Button from "../components/Button";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    signOut: PropTypes.func,
    navigation: PropTypes.shape(),
    state: PropTypes.shape(),
  };

  static defaultProps = {
    signOut: () => {},
    navigation: {},
    state: {},
  };

  static mapStateToProps = state => ({
    state,
  });

  static mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
  });

  signOut() {
    this.props.signOut();
    if (Platform.OS === "android") {
      ToastAndroid.show("You have successfully signed out", ToastAndroid.SHORT);
    }
    this.props.navigation.navigate("Splash");
  }

  render() {
    const { state } = this.props;
    return (
      <MainTabPage>
        <TitleText>Settings</TitleText>
        <Button onPress={() => this.signOut()}>Sign Out</Button>
        <TitleText>About</TitleText>
        <BodyText>Created by Matt Bell, using the UCL API.</BodyText>
        <BodyText>
          Illustrations courtesy of the unDraw project, released under the MIT
          license.
        </BodyText>
        {__DEV__ && (
          <View>
            <TitleText>Dev Stuff</TitleText>
            <SubtitleText>State</SubtitleText>
            <BodyText>{JSON.stringify(state, "\n", 2)}</BodyText>
          </View>
        )}
      </MainTabPage>
    );
  }
}

export default connect(
  TimetableScreen.mapStateToProps,
  TimetableScreen.mapDispatchToProps,
)(TimetableScreen);

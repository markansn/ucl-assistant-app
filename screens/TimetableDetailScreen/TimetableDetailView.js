import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { MapView } from "expo";
import moment from "moment";
import {
  ErrorText,
  TitleText,
  SubtitleText,
  BodyText,
} from "../../components/Typography";
import Button from "../../components/Button";
import { Page } from "../../components/Containers";
import MapStyle from "../../styles/Map";
import MapsManager from "../../lib/MapsManager";

const styles = StyleSheet.create({});

class TimetableDetailView extends React.Component {
  navigateToLocation = ({ lat, lng, address }) => () => {
    if (lat && lng) {
      MapsManager.navigateToCoords({ lat, lng });
    } else {
      MapsManager.navigateToAddress(address.join());
    }
  };
  render() {
    let contactTypeStr = "";
    const sessionType = this.props.session_type_str.toLowerCase();
    switch (true) {
      case sessionType === "lecture":
      case sessionType === "seminar": {
        contactTypeStr = "Lecturer";
        break;
      }
      case sessionType === "practical":
      case sessionType === "problem based learning": {
        contactTypeStr = "Instructor";
        break;
      }
      default: {
        contactTypeStr = "Contact";
      }
    }

    const { lat, lng } = this.props.location.coordinates;
    const latitude = parseFloat(lat, 10) || this.props.initialRegion.latitude;
    const longitude = parseFloat(lng, 10) || this.props.initialRegion.longitude;
    const { address } = this.props.location;

    console.log(this.props);

    return (
      <Page>
        <TitleText>{this.props.module.name}</TitleText>
        <BodyText>
          {moment(this.props.date).format("dddd, Do MMMM YYYY")}
        </BodyText>
        <BodyText>
          {this.props.start_time} - {this.props.end_time}
        </BodyText>
        <BodyText>{this.props.location.name}</BodyText>
        <BodyText>Type: {this.props.session_type_str}</BodyText>
        {this.props.session_group.length > 0 && (
          <BodyText>Group {this.props.session_group}</BodyText>
        )}
        {(!lat || !lng) && (
          <ErrorText>
            Error: We couldn{"'"}t fetch coordinates for this venue, so the map
            may be incorrect.
          </ErrorText>
        )}
        <MapView
          style={MapStyle.wideMap}
          initialRegion={this.props.initialRegion}
          region={{
            latitude,
            longitude,
            latitudeDelta: this.props.initialRegion.latitudeDelta,
            longitudeDelta: this.props.initialRegion.longitudeDelta,
          }}
        >
          <MapView.Marker coordinate={{ latitude, longitude }} />
        </MapView>
        <Button onPress={this.navigateToLocation({ lat, lng, address })}>
          Directions
        </Button>

        <SubtitleText>{contactTypeStr}</SubtitleText>
        <BodyText>{this.props.contact}</BodyText>
        <Button>Details</Button>

        {__DEV__ && <SubtitleText>Debug Information</SubtitleText>}
        {__DEV__ && <BodyText>{JSON.stringify(this.props, "\n", 2)}</BodyText>}
      </Page>
    );
  }
}

TimetableDetailView.propTypes = {
  initialRegion: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  date: PropTypes.string,
  start_time: PropTypes.string,
  end_time: PropTypes.string,
  contact: PropTypes.string,
  location: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.arrayOf(PropTypes.string),
    coordinates: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
    }),
  }),
  module: PropTypes.shape({
    name: PropTypes.string,
    lecturer: PropTypes.shape({
      department_id: PropTypes.string,
      department_name: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  session_type_str: PropTypes.string,
  session_group: PropTypes.string,
};

TimetableDetailView.defaultProps = {
  initialRegion: {
    latitude: 51.5246586,
    longitude: -0.1339784,
    latitudeDelta: 0.0012,
    longitudeDelta: 0.0071,
  },
  date: "2019-01-01",
  start_time: "",
  end_time: "",
  contact: "",
  location: {
    name: "",
    address: [],
    coordinates: {
      lat: "51.5246586",
      lng: "-0.1339784",
    },
  },
  module: {
    name: "",
    lecturer: {
      department_id: "",
      department_name: "",
      email: "",
      name: "",
    },
  },
  session_type_str: "",
  session_group: "",
};

export default TimetableDetailView;

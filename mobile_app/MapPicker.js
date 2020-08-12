import React from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker, Circle, ProviderPropType } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import SubmitButton from './../components/SubmitButton';
import BackButton from './../components/BackButton';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

class MapPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 43.784305,
                longitude: -79.187589,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922 * ASPECT_RATIO,
            },
        };
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView
                style={StyleSheet.absoluteFill}
                contentContainerStyle={styles.scrollview}
                >
                    <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2}               // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'}    // Can be left out for default return key
                    listViewDisplayed={false}   // true/false/undefined
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        // props.notifyChange(details.geometry.location);
                        this.setState({
                            region: {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: this.state.region.latitudeDelta,
                                longitudeDelta: this.state.region.longitudeDelta,
                            },
                        });
                    }}
                    query={{
                        key: 'AIzaSyBNLrbh_D9AftY73lfJbKeRKcTH-av7MDk',
                        language: 'en'
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={300}
                    />
                    <MapView
                    provider="google"
                    style={styles.map}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    region={this.state.region}
                    onRegionChange={(region) =>{
                        this.setState({ region });
                        // console.log(region);
                    }}
                    >
                    </MapView>
                    <SubmitButton continue={this.props.continue}/>
                    <BackButton previous={this.props.previous}/>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    scrollview: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
    },
  });

export default MapPicker;

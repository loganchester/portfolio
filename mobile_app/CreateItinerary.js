import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import DateTime from './../../pages/DateTime';
import MapPicker from './../../components/MapPicker';
import Itinerary from './../../pages/Itinerary';
import Calendar from './../../components/Calendar';
import SubmitButton from './../../components/SubmitButton';
import BackButton from './../../components/BackButton';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

export class Multi extends Component {
  constructor(props){
    super(props)
    this.state = {
      step: 1,
      date: "Date",
      startTime: "Start Time",
      endTime: "End Time"
    };
  }

  setDate = (dataFromChild) => {
    this.setState({
      date: dataFromChild
    })
  }

  setStartTime = (dataFromChild) => {
    this.setState({
      startTime: dataFromChild
    })
  }

  setEndTime = (dataFromChild) => {
    this.setState({
      endTime: dataFromChild
    })
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  previousStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render(){
    const { step } = this.state;
    switch(step){
      case 1:
        return(
            <DateTime
              continue={this.nextStep}
              previous={this.previousStep}
              setDateFromParent={this.setDate}
              setStartTimeFromParent={this.setStartTime}
              setEndTimeFromParent={this.setEndTime}
            />
        );
      case 2:
        return(
          <View style={{paddingTop: 100, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
              {this.state.date}
            </Text>
            <Text>
              {this.state.endTime}
            </Text>
            <Text>
              {this.state.startTime}
            </Text>
          </View>
        );
    }
  }
}

export default Multi;

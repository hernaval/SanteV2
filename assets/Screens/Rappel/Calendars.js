import React, { Component } from 'react'
import { Text, View ,Platform,TouchableOpacity} from 'react-native'
import * as Calendar from 'expo-calendar';
export default class Calendars extends Component {

    async componentDidMount() {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync();
            console.log('Here are all your calendars:');
            console.log({ calendars });
        }
    }

    async  getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
      }
      
      async  createCalendar() {
        const defaultCalendarSource =
          Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
          title: 'Expo Calendar',
          color: 'blue',
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendarSource.id,
          source: defaultCalendarSource,
          name: 'internalCalendarName',
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
          allowedReminders : [Calendar.AlarmMethod.ALARM, Calendar.AlarmMethod.ALERT, Calendar.AlarmMethod.EMAIL, Calendar.AlarmMethod.SMS, Calendar.AlarmMethod.DEFAULT]
        });
        
        console.log(`Your new calendar ID is: ${newCalendarID}`);
        const date1 = new Date('July 03, 2020 23:37:00')
        const date2 = new Date('July 03, 2020 23:40:00')
       const tmz = new Date().getTimezoneOffset()
       const tmzAbs = Math.abs(tmz)
       const sign = tmz <0 ? "+" : "-"
       const tmzVal = tmzAbs / 60
       const timezone = `GMT${sign}${tmzVal}`
        
        const options = {
          method  : Calendar.AlarmMethod.ALERT,
         relativeOffset : -2
          
        } 
          let event = await Calendar.createEventAsync(newCalendarID,{
          title : "TEST VOLOHANA",
          startDate : date1,
          endDate : date2,
          timeZone :  timezone,

          alarms : [options]
          
        })
        console.log("your event id is : "+event)
      }

      
     
    render() {
        return (
            <View style={{flex : 1,justifyContent  :"center",alignItems : "center"}}>
                <TouchableOpacity onPress={this.createCalendar}>
                    <Text>Create caldentar and add Event</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

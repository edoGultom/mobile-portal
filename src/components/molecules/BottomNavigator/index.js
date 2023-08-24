import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  IcChatOff,
  IcChatOn,
  IcFormOff,
  IcFormOn,
  IcHomeOff,
  IcHomeOn,
  IcNotifOff,
  IcNotifOn,
  IcProfileOff,
  IcProfileOn,
  IcReportOff,
  IcReportOn,
} from '../../../assets';

const Icon = ({ label, focused }) => {
  switch (label) {
    case 'Home':
      return focused ? <IcHomeOn /> : <IcHomeOff />;
    case 'Form':
      return focused ? <IcFormOn /> : <IcFormOff />;
    case 'Notif':
      return focused ? <IcNotifOn /> : <IcNotifOff />;
    case 'Pengaduan':
      return focused ? <IcReportOn /> : <IcReportOff />;
    case 'Profile':
      return focused ? <IcProfileOn /> : <IcProfileOff />;
    default:
      return <IcHomeOn />;
  }
};
const BottomNavigator = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon label={label} focused={isFocused} />
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    paddingTop: 15,
    paddingBottom: 13,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    // backgroundColor: 'red'
    elevation: 5
  },
});

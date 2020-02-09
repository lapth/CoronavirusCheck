import React, { Component } from "react";
import { NativeModules, AppState } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProtectYourself from "./src/components/ProtectYourself";
import SituationReport from './src/components/SituationReport';
import News from './src/components/News';

const locale = NativeModules.I18nManager.localeIdentifier.replace('_','-');
global.locale = locale;

const MainNavigator = createBottomTabNavigator(
    {
        ProtectYourself: { screen: ProtectYourself },
        SituationReport: { screen: SituationReport },
        News: { screen: News }
    },
    {
        initialRouteName: 'ProtectYourself',
        defaultNavigationOptions: ({ navigation }) => {
            let navigationOptions = {
                title: titleNamesMap[navigation.state.routeName],

                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    const { routeName } = navigation.state;
                    let IconComponent = MaterialCommunityIcons;
                    let iconName;
                    if (routeName === 'SituationReport') {
                        iconName = 'chart-bar';
                    } else if (routeName === 'ProtectYourself') {
                        iconName = 'shield-check-outline';
                    } else if (routeName === 'News') {
                        iconName = 'help-circle';
                    }
            
                    // You can return any component that you like here!
                    return <IconComponent name={iconName} size={27} color={tintColor} />;
                },
            }

            return navigationOptions;
        },
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

const titleNamesMap = {
    ProtectYourself: 'Protect Yourself',
    SituationReport: 'Situation Reports',
    News: '2019-nCoV'
}

const App = createAppContainer(MainNavigator);

export default App;

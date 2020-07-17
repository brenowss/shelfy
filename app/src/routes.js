import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Shelf from "./pages/Shelf";
import Profile from "./pages/Profile";

import Login from './pages/Login'

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer theme={{ colors: { background: '#fffffe'}}}>
      <Tab.Navigator
        initialRouteName="Home"
        inactiveColor="#162335"
        tabBarOptions={{
          style: {
            backgroundColor : '#fefefe',
            borderTopColor: '#77777766',
            borderTopWidth: 0.2,
          },
          activeTintColor: '#64B5F6',
          labelStyle: {
            fontFamily: 'GothamMedium',
            alignItems: "center",
            marginBottom: 3
          }
        }}
      >
        {/* <Tab.Screen
          name="Home"
          activeBackgroundColor="#fff"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={21} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="compass" size={21} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Shelf"
          options={{
            tabBarLabel: "My Shelf",
            tabBarIcon: ({ color }) => (
              <Icon name="book" size={21} color={color} />
            ),
          }}
          component={Shelf}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="user-alt" size={21} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarVisible: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

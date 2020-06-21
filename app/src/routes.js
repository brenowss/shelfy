import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Shelf from "./pages/Shelf";
import Profile from "./pages/Profile";

const Tab = createMaterialBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        inactiveColor="#000"
        tabBarOptions={{
          activeTintColor: "#0ed800",
        }}
        >
        <Tab.Screen
          name="Home"
          activeBackgroundColor="#fff"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={22} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="compass" size={22} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Shelf"
          options={{
            tabBarLabel: "My Shelf",
            tabBarIcon: ({ color }) => (
                <Icon name="book" size={22} color={color} />
              ),
          }}
          component={Shelf}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="user-alt" size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

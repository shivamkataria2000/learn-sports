import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Colors } from "react-native-paper";
import { RootTabScreenProps } from "../types";

function OnboardingScreen({ navigation }: RootTabScreenProps<"Onboarding">) {
  return (
    <Onboarding
      onDone={() => navigation.navigate("Root")}
      onSkip={() => navigation.navigate("Root")}
      pages={[
        {
          backgroundColor: Colors.blueA400,
          image: <Image source={require("../assets/images/Onbording1.png")} />,
          title: "Learn Sports",
          subtitle: "Learn new sports from around the world!",
        },
        {
          backgroundColor: Colors.green300,
          image: <Image source={require("../assets/images/Onboarding2.png")} />,

          title: "Track Fitness Goals",
          subtitle:
            "Stay fit and healthy by tracking your progress with daily goals",
        },
        {
          backgroundColor: Colors.yellow400,
          image: <Image source={require("../assets/images/Onboarding3.png")} />,
          title: "Stay Happy",
          subtitle:
            "Learn Yoga and Meditation to take care of your mental wellbeing!",
        },
      ]}
    />
  );
}

export default OnboardingScreen;

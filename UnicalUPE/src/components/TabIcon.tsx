import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size: number;
  }) {
    return <FontAwesome size={props.size || 30} style={{ marginBottom: -3 }} {...props} />;
  }
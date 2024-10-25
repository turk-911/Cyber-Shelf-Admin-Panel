import { NavigationProp, RouteProp } from "@react-navigation/native";
export interface LoginScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any>;
}
export interface File {
    id: String;
    driveLink: String;
    name: String;
}
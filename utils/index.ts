import { NavigationProp, RouteProp } from "@react-navigation/native";
export interface LoginScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any>;
}
export interface File {
    _id: String;
    driveLink: String;
    name: String;
    semester: String;
    year: String;
    subject: String;
}
export interface FileCardProps {
    driveLink: String;
    semester: String;
    year: String;
    subject: String;
    _id: string;
}
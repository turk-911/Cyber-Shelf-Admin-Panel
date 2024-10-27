import { NavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    OTP: { email: string };
    SeeFiles: { user: { name: string | null; email: string | null; profilePic: string } };
    AddFile: { user: any };
    Profile: undefined;
};
export type OTPScreenRouteProp = RouteProp<RootStackParamList, "OTP">;
export type OTPScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "OTP">;
export interface OTPScreenProps {
    route: OTPScreenRouteProp;
    navigation: OTPScreenNavigationProp;
}
export interface LoginScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any>;
}
export interface File {
    _id: string; 
    driveLink: string;
    name: string;
    semester: string;
    year: string;
    subject: string;
}
export interface FileCardProps {
    driveLink: string;
    semester: string;
    year: string;
    subject: string;
    _id: string;
}
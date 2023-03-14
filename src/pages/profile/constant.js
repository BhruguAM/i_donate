import IcUser from "../../assets/icons/ic-user.svg";
import IcLocation from "../../assets/icons/ic-location.svg";
import IcPassword from "../../assets/icons/ic-password.svg";
import IcPrivacy from "../../assets/icons/ic-privacy.svg";
import IcTerms from "../../assets/icons/ic-terms.svg";

export const ProfileOptions = [
  { title: "Personal Info", icon: IcUser, path: "/personalInfo" },
  { title: "Address Info", icon: IcLocation, path: "/addressInfo" },
  { title: "Change Password", icon: IcPassword, path: "/changePassword" },
  { title: "Privacy Policy", icon: IcPrivacy, path: "/privacy" },
  { title: "Terms And Conditions", icon: IcTerms, path: "/terms" },
];

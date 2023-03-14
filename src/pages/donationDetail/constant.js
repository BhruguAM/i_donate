export const InitialValues = (member) => [
  {
    title: "Name",
    name: "Name",
    value: member
      ? member.first_name +
        (member.middle_name ? " " + member.middle_name : "") +
        " " +
        member.last_name
      : "",
    type: "text",
    mandatory: true,
  },
  {
    title: "India Origin",
    name: "origin gam",
    value: member ? member.gam_village : "",
    type: "text",
    mandatory: false,
  },
  {
    title: "Address 1",
    name: "Address 1",
    value: member ? member.address_line1 : "",
    type: "text",
    mandatory: true,
  },
  {
    title: "Address 2",
    name: "Address 2",
    value: member ? member.address_line2 : "",
    type: "text",
    mandatory: false,
  },
  {
    title: "City",
    name: "City",
    value: member ? member.city : "",
    type: "text",
    mandatory: true,
  },
  {
    title: "State",
    name: "State",
    value: member ? member.state : "",
    type: "text",
    mandatory: true,
  },
  {
    title: "ZIP",
    name: "ZIP",
    value: member ? member.zip : "",
    type: "number",
    mandatory: true,
  },
  {
    title: "Phone Number",
    name: "Phone Number",
    value: member ? member.phone : "",
    type: "number",
    mandatory: true,
  },
  {
    title: "Email",
    name: "Email",
    value: member ? member.email : "",
    type: "email",
    mandatory: true,
  },
];

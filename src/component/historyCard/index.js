import React from "react";
const data = {
  id: 1,
  donation_date: "2023-01-27T20:49:22.931Z",
  donar_full_name: "undefinedundefined",
  donar_middle_name: null,
  donar_phone: "08460304001",
  donar_email: "knowbhrugu14@gmail.com",
  donar_gam_village: null,
  donar_address1: "15/16 Shyamtenament,",
  donar_address2: "Manjipura Road",
  donar_city: "Nadiad",
  donar_state: "Gujarat",
  donar_zip: null,
  donation_amount: 100,
  invoice_no: "1008",
  event_name: null,
  status: false,
  created_at: "2023-01-27T20:49:24.139Z",
  updated_at: "2023-01-27T20:49:24.139Z",
  admin_id: null,
  donation_category_id: 1,
  member_id: null,
  payment_id: 1,
  organization_id: 1,
  donation_event_id: 1,
  donation_category: {
    id: 1,
    category_name: "Pooja",
    description: null,
    status: true,
    created_at: "2023-01-27T20:47:00.363Z",
    updated_at: "2023-01-27T20:47:00.363Z",
  },
  member: null,
  payment: {
    id: 1,
    gateway_ephemeralKey: null,
    gateway_paymentIntentKey: "pi_3MUyrQSFqtS6SXI704qFpiev",
    gateway_name: "STRIPE",
    reference_no: null,
    chaque_no: null,
    receipt_no: null,
    receipt_image: null,
    amount: 100,
    gateway_customer_id: "cus_NFTp6hIIp03iGj",
    payment_date: "2023-01-27T20:49:24.071Z",
    gateway_status: null,
    gateway_message: null,
    payment_status: null,
    created_at: "2023-01-27T20:49:24.073Z",
    updated_at: "2023-01-27T20:49:24.073Z",
  },
  donation_event: {
    id: 1,
    event_name: "Diwali",
    description: null,
    status: true,
    created_at: "2023-01-27T20:46:22.349Z",
    updated_at: "2023-01-27T20:46:22.349Z",
  },
  organization: {
    id: 1,
    full_name: "Shree Swaminarayan Siddhant Sajivan Mandal Midwest - Chicago",
    organization_name: "SSSSM - MidWest Chicago",
    address_line: "1020 Bapa Road (Off Irving Park)",
    city: "Streamwood",
    country_code: "Illinois",
    phone: "60107",
    email: null,
    state: "9876543210",
    zip: "+17733531633",
    status: true,
    created_at: "2023-01-27T20:02:23.624Z",
    updated_at: "2023-01-27T20:02:23.624Z",
  },
};
export function HistoryCard({ extraClass = "", item }) {
  return (
    <div className={`flex flex-col bg-gray-100 p-3 rounded-md ${extraClass}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="text-black text-base font-semibold">
            {"$ " + item?.payment?.amount + ".00"}
          </label>
          <label className="text-greyout text-[8px] font-medium ml-1">
            ({item?.organization?.organization_name})
          </label>
        </div>
        <label className="text-primary text-xs font-semibold">
          {item?.payment?.gateway_paymentIntentKey.substring(19)}
        </label>
      </div>
      <div className="flex items-center">
        <label className="text-greyout text-xs font-medium">
          {item.donation_category.category_name +
            " | " +
            item.donation_event.event_name}
        </label>
      </div>
      <div className="flex items-center">
        <label className="text-greyout text-xs font-medium mr-1">
          {"Date:"}
        </label>
        <label className="text-greyout text-xs font-medium">
          {new Date(item.created_at).toDateString()}
        </label>
      </div>
    </div>
  );
}

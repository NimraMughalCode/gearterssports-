import { Mail, Phone, MapPin } from "lucide-react";

export default function GetInTouch() {
  return (
    <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">Get in Touch</h2>
      <div className="space-y-3">
        <ContactItem icon={<Mail className="w-6 h-6 text-blue-600" />} text="prorgrumar@gmail.com" />
        <ContactItem icon={<Phone className="w-6 h-6 text-green-600" />} text="+92 310 7285247" />
        <ContactItem icon={<MapPin className="w-6 h-6 text-red-600" />} text="Sialkot, Punjab, Pakistan" />
      </div>
    </div>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-center space-x-4">
      {icon}
      <p className="text-gray-900 font-medium">{text}</p>
    </div>
  );
}

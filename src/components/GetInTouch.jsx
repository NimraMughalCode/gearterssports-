import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function GetInTouch() {
  return (
    <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">Get in Touch</h2>
      <div className="space-y-3">
        <ContactItem icon={<Mail className="w-6 h-6 text-blue-600" />} text="prorgrumar@gmail.com" />
        <ContactItem icon={<Phone className="w-6 h-6 text-green-600" />} text="+92 308 0903030" />
        <ContactItem icon={<MapPin className="w-6 h-6 text-red-600" />} text="Sialkot, Punjab, Pakistan" />
        
        {/* WhatsApp Contact Item */}
        <ContactItem
          icon={<MessageCircle className="w-6 h-6 text-green-500" />}
          text="Chat on WhatsApp"
          link="https://wa.me/923080903030"
        />
      </div>
    </div>
  );
}

function ContactItem({ icon, text, link }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-900 font-medium hover:text-green-600">
          {text}
        </a>
      ) : (
        <span className="text-gray-900 font-medium">{text}</span>
      )}
    </div>
  );
}

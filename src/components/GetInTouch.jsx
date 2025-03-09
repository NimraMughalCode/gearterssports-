import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function GetInTouch() {
  return (
    <div className="space-y-5 p-6 bg-gray-900 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold text-red-500">Get in Touch</h2>
      <div className="space-y-4">
        <ContactItem icon={<Mail className="w-6 h-6 text-blue-400" />} text="gearterssports@gmail.com" />
        <ContactItem icon={<Phone className="w-6 h-6 text-green-400" />} text="+92 3000000" />
        <ContactItem icon={<MapPin className="w-6 h-6 text-red-500" />} text="Sialkot, Punjab, Pakistan" />
        
        {/* WhatsApp Contact Item */}
        <ContactItem
          icon={<MessageCircle className="w-6 h-6 text-green-400" />}
          text="Chat on WhatsApp"
          link="https://wa.me/923080903030"
        />
      </div>
    </div>
  );
}

function ContactItem({ icon, text, link }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
      {icon}
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-green-400">
          {text}
        </a>
      ) : (
        <span className="text-white font-medium">{text}</span>
      )}
    </div>
  );
}

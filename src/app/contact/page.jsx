import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import SendMessage from "@/components/SendMessage";

export default function Contact() {
    return (
        <div className="bg-black px-12 py-12 ">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <GetInTouch />
            <SendMessage />
          </div>
        </div>
      );
    }
"use client";

import { useRouter } from "next/navigation";
import { Button } from "../component/button";
import { AlertTriangle, Phone, Mail, Clock } from "lucide-react";
import { Card } from "../component/ui/card";

export default function ContactPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                {/* Alert Message */}
                <div className="flex items-center gap-3 bg-red-100 text-red-700 p-4 rounded-lg">
                    <AlertTriangle className="w-6 h-6" />
                    <p>You have already been unsubscribed. If you need further assistance, please contact us.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Form</h2>
                        <div className="space-y-4">
                            <label className="block text-black font-medium">First Name *</label>
                            <input type="text" className="w-full p-3 border rounded-lg  text-black focus:ring focus:ring-purple-300" />

                            <label className="block text-gray-700 font-medium">Last Name</label>
                            <input type="text" className="w-full p-3 border rounded-lg  text-black focus:ring focus:ring-purple-300" />

                            <label className="block text-gray-700 font-medium">Email *</label>
                            <input type="email" className="w-full p-3 border rounded-lg text-black focus:ring focus:ring-purple-300" />

                            <label className="block text-gray-700 font-medium">Phone Number *</label>
                            <div className="flex gap-3">
                                <select className="p-3 border text-black rounded-lg">
                                    <option>+1</option>
                                    <option>+91</option>
                                    <option>+44</option>
                                </select>
                                <input type="tel" className="flex-1 text-black p-3 border rounded-lg focus:ring focus:ring-purple-300" />
                            </div>

                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium p-3 rounded-lg transition">
                                Send
                            </Button>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Details</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-center gap-3">
                                <Phone className="w-6 h-6 text-purple-600" />
                                <p className="font-medium">Customer Care Number: +1-703-832-0101</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-6 h-6 text-purple-600" />
                                <p className="font-medium"><a href="mailto:hello@friska.ai" className="text-purple-600 hover:underline">hello@friska.ai</a></p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-6 h-6 text-purple-600" />
                                <p className="font-medium">Availability: 09:00AM – 05:00PM EST</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

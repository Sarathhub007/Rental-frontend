import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 2500);

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-brand-BG py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Have questions or need support? We're here to help you. 
            Reach out to us anytime, and we'll get back to you soon.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div
            className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 
            text-green-700 flex items-center gap-3 shadow-sm"
          >
            <CheckCircle size={20} />
            Message sent! We'll get back to you shortly.
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT CARD - CONTACT DETAILS */}
          <Card className="shadow-sm border border-slate-200">
            <CardContent className="p-8 space-y-6">

              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Contact Information
              </h2>

              <div className="flex items-center gap-4">
                <Mail className="text-blue-600" />
                <p className="text-gray-700">ilamsarathchandra@gmail.com</p>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-green-600" />
                <p className="text-gray-700">+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-red-600" />
                <p className="text-gray-700 leading-relaxed">
                  522303 Tadapalli Vadeswaram,<br />
                  Vijayawada, India
                </p>
              </div>

              <p className="text-gray-600 text-sm mt-4">
                Our team responds within 24 hours on working days.
              </p>
            </CardContent>
          </Card>

          {/* RIGHT CARD - CONTACT FORM */}
          <Card className="shadow-sm border border-slate-200">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Type your message..."
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button className="w-full">Send Message</Button>

              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Send, MessageSquare, User, Mail, Building, FileText, Loader2 } from "lucide-react";
import { useTheme } from "@/hooks/use-theme-mode";

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export default function ContactSection() {
  const { mode } = useTheme();
  const isSpidy = mode === "spidy";

  const SERVICE_ID = "service_f1jvizs";
  const TEMPLATE_ID = "template_4rqud5n";
  const PUBLIC_KEY = "ZcDe_zhtSPAJwY2YQ";

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Required fields missing", {
        description: "Please fill in your name, email, and message."
      });
      return;
    }

    setIsLoading(true);
    try {
      const templateParams = {
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || "Not specified",
        message: form.message.trim(),
        type: "Direct Inquiry",
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      });

      toast.success("Inquiry sent successfully!", {
        description: "I'll get back to you as soon as possible via Gmail."
      });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (error: unknown) {
      console.error("Form Error:", error);
      const isObjectWithText = (err: unknown): err is { text: string } =>
        typeof err === "object" && err !== null && "text" in err;

      const errorMessage = isObjectWithText(error)
        ? error.text
        : "Please check your internet connection or email me directly.";

      toast.error("Failed to send inquiry", {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendChat = async () => {
    if (!chatName.trim() || !chatMessage.trim()) {
      toast.error("Missing fields", {
        description: "Please enter both your name and a message."
      });
      return;
    }

    setIsChatLoading(true);
    try {
      const chatParams = {
        name: chatName.trim(),
        message: chatMessage.trim(),
        email: "chat-system@portfolio.com",
        type: "Live Chat Message",
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, chatParams, {
        publicKey: PUBLIC_KEY
      });

      setMessages((prev) => [...prev, chatMessage.trim()]);
      setChatMessage("");
      toast.success("Message delivered!");
    } catch (error: unknown) {
      console.error("Chat Error:", error);
      toast.error("Message delivery failed", {
        description: "Verify your EmailJS configuration or try again later."
      });
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <section id="contact" className={`py-24 relative overflow-hidden transition-colors duration-500 ${isSpidy ? 'bg-transparent' : 'bg-gradient-to-b from-gray-50 to-gray-100'
      }`}>
      {/* Background decorative shapes */}
      {!isSpidy && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-zinc-200/30 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-zinc-300/20 rounded-full blur-[120px]" />
        </div>
      )}

      <div className="container-luxury relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className={`text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter mb-4 leading-none ${isSpidy ? 'text-white' : 'text-foreground'}`}>
            Let's Build Something <span className={isSpidy ? 'text-red-500 underline underline-offset-8 decoration-red-500/30' : 'text-zinc-900'}>Exceptional</span>
          </h2>
          <p className={`${isSpidy ? 'text-slate-400' : 'text-muted-foreground'} text-lg max-w-2xl mx-auto font-light`}>
            Ready to start a new project or have questions? Reach out through the form or chat below.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT FORM - Apple glass style */}
          <AnimatedSection delay={0.1}>
            <div className={`backdrop-blur-xl border p-6 sm:p-8 rounded-[32px] sm:rounded-[50px] transition-all duration-500 ${isSpidy
              ? 'bg-white/5 border-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.1)] hover:border-red-500/40'
              : 'bg-white/40 border-black/5 shadow-2xl hover:shadow-black/5'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${isSpidy ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-zinc-900'}`}>
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Inquiry Form</h3>
                  <p className={`text-xs ${isSpidy ? 'text-red-400/60 font-medium' : 'text-muted-foreground'}`}>Reliable Email Delivery</p>
                </div>
              </div>

              <form onSubmit={sendForm} className="space-y-4 font-light">
                <div className="relative">
                  <User className={`absolute left-4 top-3.5 w-5 h-5 ${isSpidy ? 'text-red-500/50' : 'text-muted-foreground'}`} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full border p-3 pl-12 rounded-full outline-none focus:ring-2 transition-all ${isSpidy
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-red-500/30'
                      : 'bg-white/60 border-black/5 text-black focus:ring-black/5'
                      }`}
                  />
                </div>
                <div className="relative">
                  <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${isSpidy ? 'text-red-500/50' : 'text-muted-foreground'}`} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full border p-3 pl-12 rounded-full outline-none focus:ring-2 transition-all ${isSpidy
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-red-500/30'
                      : 'bg-white/60 border-black/5 text-black focus:ring-black/5'
                      }`}
                  />
                </div>
                <div className="relative">
                  <Building className={`absolute left-4 top-3.5 w-5 h-5 ${isSpidy ? 'text-red-500/50' : 'text-muted-foreground'}`} />
                  <input
                    type="text"
                    placeholder="Company (Optional)"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={`w-full border p-3 pl-12 rounded-full outline-none focus:ring-2 transition-all ${isSpidy
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-red-500/30'
                      : 'bg-white/60 border-black/5 text-black focus:ring-black/5'
                      }`}
                  />
                </div>
                <div className="relative">
                  <FileText className={`absolute left-4 top-4 w-5 h-5 ${isSpidy ? 'text-red-500/50' : 'text-muted-foreground'}`} />
                  <textarea
                    rows={4}
                    placeholder="Project Description"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full border p-3 pl-12 rounded-2xl outline-none focus:ring-2 transition-all resize-none ${isSpidy
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-red-500/30'
                      : 'bg-white/60 border-black/5 text-black focus:ring-black/5'
                      }`}
                  />
                </div>

                <button
                  disabled={isLoading}
                  className={`w-full p-4 rounded-full font-bold tracking-widest uppercase text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 ${isSpidy
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-900/40'
                    : 'bg-zinc-900 text-white hover:bg-black shadow-black/10'
                    }`}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Send Inquiry
                </button>
              </form>
            </div>
          </AnimatedSection>

          {/* RIGHT CHAT - Chat theme + Apple glass */}
          <AnimatedSection delay={0.2}>
            <div className={`backdrop-blur-xl border p-6 sm:p-8 rounded-[32px] sm:rounded-[50px] flex flex-col h-full transition-all duration-500 ${isSpidy
              ? 'bg-white/5 border-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.1)] hover:border-red-500/40'
              : 'bg-white/40 border-black/5 shadow-2xl hover:shadow-black/5'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${isSpidy ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-zinc-900'}`}>
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Live Chat</h3>
                  <p className={`text-xs ${isSpidy ? 'text-red-400/60 font-medium' : 'text-muted-foreground'}`}>Usually responds instantly</p>
                </div>
              </div>


              {/* Message Display Area */}
              <div className={`flex-1 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-thin ${isSpidy ? 'scrollbar-thumb-red-500/20' : 'scrollbar-thumb-zinc-200'}`}>
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex flex-col items-end"
                    >
                      <div className={`text-sm py-2 px-4 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] break-words font-light ${isSpidy ? 'bg-red-600 text-white' : 'bg-zinc-900 text-white'
                        }`}>
                        {msg}
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">Delivered</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {messages.length === 0 && (
                  <div className={`h-full flex items-center justify-center text-sm italic opacity-50 ${isSpidy ? 'text-slate-500' : 'text-muted-foreground'}`}>
                    Your messages will appear here
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <User className={`absolute left-3 top-3 w-4 h-4 ${isSpidy ? 'text-red-500/50' : 'text-muted-foreground'}`} />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    className={`w-full border p-2.5 pl-10 rounded-full outline-none focus:ring-2 text-sm transition-all ${isSpidy
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-red-500/30'
                      : 'bg-white/60 border-black/5 text-black focus:ring-black/5'
                      }`}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MessageSquare className={`absolute left-3 top-3 w-4 h-4 ${isSpidy ? 'text-red-500/50' : 'text-muted-foreground'}`} />
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                      className={`w-full border p-2.5 pl-10 rounded-full outline-none focus:ring-2 text-sm transition-all ${isSpidy
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-red-500/30'
                        : 'bg-white/60 border-black/5 text-black focus:ring-black/5'
                        }`}
                    />
                  </div>
                  <button
                    onClick={sendChat}
                    disabled={isChatLoading}
                    className={`p-2.5 rounded-full transition-all active:scale-95 disabled:opacity-50 ${isSpidy ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-zinc-900 text-white hover:bg-black'
                      }`}
                  >
                    {isChatLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
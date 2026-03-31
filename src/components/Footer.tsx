import { Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { useTheme } from "@/hooks/use-theme-mode";


const Footer = () => {
  const { mode } = useTheme();

  return (
    <footer className={`py-12 border-t ${mode === 'spidy' ? 'bg-black border-white/5' : 'border-border'} relative overflow-hidden`}>
      {mode === 'spidy' && (
        <div className="absolute right-0 bottom-0 w-64 h-full pointer-events-none z-0">
          <div className="absolute right-12 bottom-0 w-[1px] h-32 bg-white/20 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
          <svg
            viewBox="0 0 200 400"
            className="absolute bottom-[-20px] right-[-10px] w-64 h-[400px] opacity-30 hover:opacity-60 transition-all duration-1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="100" cy="200" rx="38" ry="80" fill="#cc0000" />
            <ellipse cx="100" cy="100" rx="30" ry="35" fill="#cc0000" />
            <ellipse cx="88" cy="95" rx="12" ry="8" fill="white" opacity="0.9" />
            <ellipse cx="112" cy="95" rx="12" ry="8" fill="white" opacity="0.9" />
            <ellipse cx="88" cy="95" rx="7" ry="5" fill="#111" />
            <ellipse cx="112" cy="95" rx="7" ry="5" fill="#111" />
            <path d="M62 160 Q20 120 10 80" stroke="#cc0000" strokeWidth="14" strokeLinecap="round" />
            <path d="M138 160 Q180 120 190 80" stroke="#cc0000" strokeWidth="14" strokeLinecap="round" />
            <path d="M80 275 Q60 330 50 380" stroke="#cc0000" strokeWidth="14" strokeLinecap="round" />
            <path d="M120 275 Q140 330 150 380" stroke="#cc0000" strokeWidth="14" strokeLinecap="round" />
          </svg>
        </div>
      )}

      <div className="container-luxury flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className={`text-sm tracking-widest uppercase font-light ${mode === 'spidy' ? 'text-sky-400/60' : 'text-muted-foreground'}`}>
          © 2024 {mode === 'spidy' ? 'Spider-Prasanna' : 'Prasanna'}. Built for Excellence.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/prasanna-hari-5486a3367"
            target="_blank"
            rel="noopener noreferrer"
            className={`${mode === 'spidy' ? 'text-white/40 hover:text-sky-400 hover:scale-125' : 'text-muted-foreground hover:text-foreground'} transition-all duration-300`}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/hariprasanna939-hue"
            target="_blank"
            rel="noopener noreferrer"
            className={`${mode === 'spidy' ? 'text-white/40 hover:text-sky-400 hover:scale-125' : 'text-muted-foreground hover:text-foreground'} transition-all duration-300`}
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            className={`${mode === 'spidy' ? 'text-white/40 hover:text-sky-400 hover:scale-125' : 'text-muted-foreground hover:text-foreground'} transition-all duration-300`}
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/_.lym9xk/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className={`${mode === 'spidy' ? 'text-white/40 hover:text-sky-400 hover:scale-125' : 'text-muted-foreground hover:text-foreground'} transition-all duration-300`}
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

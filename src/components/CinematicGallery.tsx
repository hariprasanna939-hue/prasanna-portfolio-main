import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, AnimatePresence, useSpring } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Plus,
  Upload,
  Trash2
} from "lucide-react";

/* --- Types --- */
interface Activity {
  id: string;
  title: string;
  description: string;
  images: string[];
  date: string;
  type: "event" | "hackathon" | "certificate" | "meetup";
}

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "founderx-2026",
    title: "FounderX Global Startup Summit",
    description: "Representing at IITM Research Park. Engaging with 1000+ participants and 50+ VCs to discuss the future of tech and startups in India.",
    images: [
      "https://replicate.delivery/yhqm/eBfP9vffjueU6I6U6I6U6I6U6I6U6I6U6I6U6I6U6I6U6I6U/founder.jpg",
      "https://replicate.delivery/yhqm/eBfP9vffjueU6I6U6I6U6I6U6I6U6I6U6I6U6I6U6I6U6I6U/post_1.jpeg",
      "https://replicate.delivery/yhqm/eBfP9vffjueU6I6U6I6U6I6U6I6U6I6U6I6U6I6U6I6U6I6U/post3.jpeg"
    ],
    date: "Jan 24-25, 2026",
    type: "event"
  }
];

const CARD_W = 540;
const CARD_H = 620;
const GAP = 32;

/* --- Custom Cursor --- */
const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 250 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("button, .clickable-card, .lightbox-thumb, .upload-zone"));
    };
    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: isHovering ? 2.5 : 1 }}
    />
  );
};

/* --- Main Component --- */
const CinematicGallery: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem("portfolio-activities");
    try {
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch (e) {
      return INITIAL_ACTIVITIES;
    }
  });

  useEffect(() => {
    localStorage.setItem("portfolio-activities", JSON.stringify(activities));
  }, [activities]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const x = useMotionValue(0);
  const ITEM_STEP = CARD_W + GAP;

  const handleDrag = () => {
    const currentX = x.get();
    const totalW = activities.length * ITEM_STEP;
    if (currentX > 0) x.set(currentX - totalW);
    else if (currentX < -totalW) x.set(currentX + totalW);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      x.set(x.get() - e.deltaX);
    } else {
      x.set(x.get() - e.deltaY * 0.6);
    }
    handleDrag();
  };

  const addOrUpdateActivity = (act: Activity) => {
    if (editingActivity) {
      setActivities(prev => prev.map(a => a.id === act.id ? act : a));
    } else {
      setActivities(prev => [act, ...prev]);
    }
    setEditingActivity(null);
  };

  const deleteActivity = (id: string) => {
    if (confirm("Delete this milestone permanently?")) {
      setActivities(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] cursor-none overflow-x-hidden select-none">
      <CustomCursor />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      <main className="relative z-10 pt-32 pb-60">
        <div className="px-6 md:px-16 mb-24 max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="text-blue-400 text-xs tracking-[0.5em] uppercase mb-4 font-black">
            Personal Timeline
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-white text-[clamp(2.5rem,10vw,5.5rem)] font-black leading-[0.85] tracking-tighter">
            Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/10">Archive.</span>
          </motion.h2>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="fixed top-8 right-8 z-[60] flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="hidden md:inline">Post Milestone</span>
        </button>

        <div className="relative w-full touch-pan-y" style={{ height: CARD_H + 100 }} onWheel={handleWheel}>
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

          <motion.div
            drag="x"
            onDrag={handleDrag}
            style={{ x, left: `calc(50% - ${CARD_W / 2}px)`, gap: `${GAP}px` }}
            className="absolute flex items-start cursor-grab active:cursor-grabbing will-change-transform"
          >
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} onOpen={() => setSelectedActivity(activity)} />
            ))}
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {(isFormOpen || editingActivity) && (
          <AddActivityModal
            initialData={editingActivity || undefined}
            onClose={() => { setIsFormOpen(false); setEditingActivity(null); }}
            onSubmit={addOrUpdateActivity}
          />
        )}
        {selectedActivity && (
          <PhotoLightroom
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
            onDelete={() => { deleteActivity(selectedActivity.id); setSelectedActivity(null); }}
            onEdit={() => { setEditingActivity(selectedActivity); setSelectedActivity(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- Activity Card --- */
const ActivityCard: React.FC<{ activity: Activity; onOpen: () => void }> = ({ activity, onOpen }) => {
  return (
    <motion.div
      whileHover={{ y: -20 }}
      onClick={onOpen}
      className="clickable-card group relative bg-[#0d0d0d] border border-white/10 rounded-[40px] overflow-hidden flex flex-col transition-all duration-700 hover:border-blue-500/50"
      style={{ width: CARD_W, height: CARD_H }}
    >
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center text-sm font-black">PH</div>
          <div>
            <h4 className="text-white font-bold text-sm tracking-tight">Prasanna Hari</h4>
            <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold">AI Dude</p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-[9px] font-black uppercase tracking-widest">
          {activity.type}
        </div>
      </div>

      <div className="px-10 pb-6">
        <h3 className="text-white font-black text-2xl mb-3 group-hover:text-blue-400 transition-colors leading-tight">{activity.title}</h3>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2 font-medium">{activity.description}</p>
      </div>

      <div className="relative flex-1 bg-black/40 overflow-hidden mx-8 mb-8 rounded-[32px] border border-white/5">
        <img src={activity.images[0]} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-6 right-6 p-5 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <Maximize2 size={24} strokeWidth={3} />
        </div>
      </div>
    </motion.div>
  );
};

/* --- Helper: Optimized File to Base64 --- */
const fileToOptimizedBase64 = (file: File, maxWidth = 1200): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

/* --- Add Milestone Modal (With Drag & Drop) --- */
const AddActivityModal: React.FC<{
  initialData?: Activity;
  onClose: () => void;
  onSubmit: (act: Activity) => void;
}> = ({ initialData, onClose, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [desc, setDesc] = useState(initialData?.description || "");
  const [type, setType] = useState<Activity["type"]>(initialData?.type || "event");
  const [tempImages, setTempImages] = useState<string[]>(initialData?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList) => {
    setIsUploading(true);
    try {
      const base64Images = await Promise.all(
        Array.from(files).map(file => fileToOptimizedBase64(file))
      );
      setTempImages(prev => [...prev, ...base64Images]);
    } catch (error) {
      alert("Error processing images.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handlePublish = () => {
    if (title && desc && tempImages.length > 0) {
      onSubmit({
        id: initialData?.id || Date.now().toString(),
        title,
        description: desc,
        images: tempImages,
        date: initialData?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type
      });
      onClose();
    } else {
      alert("Fill all fields and add photos!");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-[48px] p-8 md:p-12 my-8">
        <h2 className="text-4xl font-black text-white mb-8 tracking-tighter">{initialData ? "Edit" : "New"} Record.</h2>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input value={title} placeholder="Activity Name" className="flex-[2] bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500 font-bold" onChange={e => setTitle(e.target.value)} />
            <select value={type} className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none font-bold" onChange={e => setType(e.target.value as any)}>
              <option value="event">Event</option>
              <option value="hackathon">Hackathon</option>
              <option value="certificate">Certificate</option>
              <option value="meetup">Meetup</option>
            </select>
          </div>

          <textarea 
            value={desc} 
            placeholder="Describe your achievement..." 
            className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white h-32 outline-none focus:border-blue-500 resize-none font-medium leading-relaxed" 
            onChange={e => setDesc(e.target.value)} 
          />

          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`upload-zone border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:bg-white/5'}`}
          >
            {isUploading ? <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /> : (
              <>
                <Upload size={32} className={`mb-3 ${isDragging ? 'text-blue-500' : 'text-white/20'}`} />
                <p className="text-white/40 font-bold uppercase tracking-widest text-[9px]">Drag & Drop or Click</p>
              </>
            )}
            <input type="file" multiple hidden ref={fileInputRef} accept="image/*" onChange={(e) => e.target.files && processFiles(e.target.files)} />
          </div>

          {tempImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {tempImages.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                  <img src={src} className="w-full h-full object-cover" alt="" />
                  <button onClick={() => setTempImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 bg-white/5 text-white font-black py-5 rounded-2xl">Cancel</button>
            <button onClick={handlePublish} className="flex-[2] bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500">
              {initialData ? "Save Changes" : "Publish Milestone"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* --- Photo Lightroom (With Proper Text Alignment) --- */
const PhotoLightroom: React.FC<{
  activity: Activity;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ activity, onClose, onEdit, onDelete }) => {
  const [idx, setIdx] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex flex-col overflow-hidden">
      <div className="fixed top-0 inset-x-0 p-8 flex justify-between items-start z-[120] pointer-events-none">
        <div className="pointer-events-auto bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex flex-col gap-1">
          <h2 className="text-white font-black text-3xl tracking-tighter">{activity.title}</h2>
          <div className="flex items-center gap-4">
            <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.5em]">{activity.date}</p>
            <div className="flex gap-2">
              <button onClick={onEdit} className="text-white/40 hover:text-white transition-colors text-[9px] uppercase font-bold tracking-widest border border-white/5 px-3 py-1 rounded-lg">Edit</button>
              <button onClick={onDelete} className="text-red-500/40 hover:text-red-500 transition-colors text-[9px] uppercase font-bold tracking-widest border border-red-500/5 px-3 py-1 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="pointer-events-auto p-6 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 shadow-2xl transition-all"><X size={28} /></button>
      </div>
      
      <div className="flex-1 w-full h-full overflow-y-auto pt-40 pb-48 px-6 md:px-20 apple-scrollbar">
        <div className="flex flex-col items-center gap-12 max-w-5xl mx-auto">
          <motion.img 
            key={idx} 
            src={activity.images[idx]} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full h-auto rounded-[40px] shadow-2xl border border-white/5" 
          />
          {/* TEXT ALIGNMENT FIX: whitespace-pre-wrap ensures line breaks, text-justify makes it look clean */}
          <div className="w-full max-w-3xl text-white/60 text-lg leading-relaxed font-medium whitespace-pre-wrap text-justify">
            {activity.description}
          </div>
        </div>
      </div>

      {activity.images.length > 1 && (
        <div className="fixed inset-y-0 inset-x-10 flex justify-between items-center pointer-events-none z-[120]">
          <button onClick={() => setIdx((idx - 1 + activity.images.length) % activity.images.length)} className="pointer-events-auto p-6 rounded-full bg-white/5 border border-white/5 text-white hover:bg-blue-600 transition-all shadow-2xl"><ChevronLeft size={32} /></button>
          <button onClick={() => setIdx((idx + 1) % activity.images.length)} className="pointer-events-auto p-6 rounded-full bg-white/5 border border-white/5 text-white hover:bg-blue-600 transition-all shadow-2xl"><ChevronRight size={32} /></button>
        </div>
      )}

      <div className="fixed bottom-0 inset-x-0 p-10 flex justify-center gap-4 z-[120] bg-gradient-to-t from-black to-transparent">
        {activity.images.map((img, i) => (
          <div key={i} onClick={() => setIdx(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === idx ? 'border-blue-500 scale-110' : 'border-transparent opacity-30 cursor-pointer'}`}>
            <img src={img} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CinematicGallery;
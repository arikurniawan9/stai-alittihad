"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Globe,
  Monitor
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- KONFIGURASI DATA ---
const slides = [
  {
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=2070",
    title: "Membangun Generasi Madani",
    subtitle: "STAI Al-Ittihad mencetak lulusan yang cerdas secara intelektual dan kokoh secara spiritual.",
  },
  {
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2070",
    title: "Sistem Informasi Terintegrasi",
    subtitle: "Akses perkuliahan, nilai, dan administrasi dalam satu platform SIAKAD yang canggih.",
  },
  {
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2070",
    title: "Lingkungan Belajar Kondusif",
    subtitle: "Kampus asri dengan fasilitas modern untuk kenyamanan eksplorasi akademik mahasiswa.",
  }
];

const features = [
  {
    icon: <Monitor className="w-8 h-8 text-blue-600" />,
    title: "Portal SIAKAD",
    desc: "Sistem manajemen akademik lengkap dari KRS, KHS, hingga wisuda."
  },
  {
    icon: <Globe className="w-8 h-8 text-green-600" />,
    title: "E-Learning",
    desc: "Belajar fleksibel dengan materi digital dan kelas virtual terintegrasi Zoom."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
    title: "Validitas Data",
    desc: "Keamanan data akademik terjamin dengan sistem enkripsi tingkat tinggi."
  }
];

const stats = [
  { label: "Mahasiswa Aktif", value: "1,200+", icon: <Users /> },
  { label: "Dosen Profesional", value: "45+", icon: <BookOpen /> },
  { label: "Program Studi", value: "5", icon: <GraduationCap /> },
  { label: "Tahun Berdiri", value: "20+ Thn", icon: <Calendar /> },
];

// --- KOMPONEN UTAMA ---
export default function LandingPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none text-blue-900">STAI AL-ITTIHAD</h1>
              <p className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold">Sistem Informasi Akademik</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#" className="hover:text-blue-600 transition-colors">Beranda</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Program Studi</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Informasi</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Kontak</Link>
            <Button className="bg-blue-700 hover:bg-blue-800 rounded-full px-6 shadow-lg shadow-blue-200" asChild>
              <Link href="/login">Login Portal</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO SLIDER SECTION */}
      <section className="relative h-screen pt-16 overflow-hidden">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="absolute inset-0 w-full h-full object-cover brightness-50"
                />
                <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={selectedIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl"
                  >
                    <span className="inline-block px-4 py-1.5 mb-4 bg-blue-600/30 backdrop-blur-md border border-blue-400/50 rounded-full text-xs font-bold tracking-widest uppercase">
                      Pendidikan Berkualitas
                    </span>
                    <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-200 mb-8 font-light">
                      {slide.subtitle}
                    </p>
                    <div className="flex gap-4">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 text-lg font-semibold shadow-xl shadow-blue-900/40 group">
                        Mulai Belajar <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button variant="outline" size="lg" className="rounded-full px-8 text-lg font-semibold bg-white/10 border-white/30 backdrop-blur-sm text-white hover:bg-white/20">
                        Tentang STAI
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* SLIDER CONTROLS */}
        <div className="absolute bottom-10 left-0 w-full container mx-auto px-6 flex justify-between items-center z-10">
          <div className="flex gap-3">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${selectedIndex === i ? "w-12 bg-blue-500" : "w-4 bg-white/30"}`}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="p-3 rounded-full border border-white/30 bg-black/20 text-white hover:bg-white hover:text-blue-900 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={scrollNext} className="p-3 rounded-full border border-white/30 bg-black/20 text-white hover:bg-white hover:text-blue-900 transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              Ekosistem Akademik Digital
            </motion.h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Sistem yang dirancang untuk mendukung efisiensi operasional dan kualitas pembelajaran di STAI Al-Ittihad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group"
              >
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 inline-block group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed mb-6">{feature.desc}</p>
                <Link href="#" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Pelajari Lebih Lanjut <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-blue-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black mb-2 text-blue-400">{stat.value}</div>
                <div className="text-slate-300 font-medium uppercase tracking-widest text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Siap Bergabung dengan Keluarga Besar STAI Al-Ittihad?</h2>
            <p className="text-blue-100 mb-10 text-lg md:text-xl font-light">
              Daftar sekarang untuk memulai perjalanan akademik Anda atau masuk ke portal untuk mengakses layanan SIAKAD.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-white text-blue-900 hover:bg-slate-100 rounded-full px-12 text-lg font-bold">
                Pendaftaran Online
              </Button>
              <Button size="xl" variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-12 text-lg font-bold">
                Bantuan Mahasiswa
              </Button>
            </div>
          </div>
          
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-white rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-16 text-slate-400 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                  A
                </div>
                <h1 className="text-lg font-bold text-white">STAI AL-ITTIHAD</h1>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Lembaga pendidikan tinggi Islam yang berfokus pada integrasi ilmu pengetahuan, teknologi, dan akhlakul karimah.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Link Terkait</h5>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-blue-400">Pendaftaran Maba</Link></li>
                <li><Link href="#" className="hover:text-blue-400">Kalender Akademik</Link></li>
                <li><Link href="#" className="hover:text-blue-400">Perpustakaan Digital</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Program Studi</h5>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-blue-400">Pendidikan Agama Islam</Link></li>
                <li><Link href="#" className="hover:text-blue-400">Ekonomi Syariah</Link></li>
                <li><Link href="#" className="hover:text-blue-400">Hukum Keluarga</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Kontak Kami</h5>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="text-blue-400">Alamat:</span>
                  <span>Jl. Raya Kampus No. 12, Indralaya, Indonesia</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">Email:</span>
                  <span>info@stai-al-ittihad.ac.id</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            © {new Date().getFullYear()} STAI Al-Ittihad Indralaya. All Rights Reserved. Powered by SIAKAD-Next.
          </div>
        </div>
      </footer>
    </div>
  );
}

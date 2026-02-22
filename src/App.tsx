/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, ArrowRight, ArrowLeft, X, Ruler, Home, Menu } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const Navbar = ({ onServiceClick }: { onServiceClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "포트폴리오", id: "portfolio" },
    { name: "설계&시공프로세스", id: "services" }
  ];

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'services') {
      onServiceClick();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? "bg-bg-card/95 backdrop-blur-md h-16 shadow-sm" : "bg-transparent h-20"} border-b border-black/5`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter font-serif text-gold">세움 아이디</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-sm font-medium text-text-main">
          {menuItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)}
              className="relative group hover:text-gold transition-colors tracking-widest py-2 cursor-pointer"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = '#contact'}
            className="gold-gradient px-5 py-2 text-white font-bold text-sm rounded-sm hover:opacity-90 transition-opacity hidden sm:block"
          >
            견적 문의
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-main hover:text-gold transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-card border-b border-black/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left text-lg font-medium text-text-main hover:text-gold transition-colors py-2"
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={() => { setIsMenuOpen(false); window.location.href = '#contact'; }}
                className="gold-gradient w-full py-4 text-white font-bold rounded-lg text-center"
              >
                견적 문의
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceDetailView = ({ onClose }: { onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const comparisons = [
    {
      title: "거실 아트월 설계 & 시공",
      blueprint: "https://postfiles.pstatic.net/MjAyNjAyMjJfMjEz/MDAxNzcxNzMzMDg1MDIw.W8NTuNQF2tuCXPlMTCTNBk21vND1iKW-zqMfdfTL964g.5VEdT45ZdQ19TsN6EPqEgHQ7FlE_JQNhWNYGbay8qZgg.JPEG/blue-print3-1.jpg?type=w773",
      finished: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80",
      desc: "정밀한 도면 설계를 바탕으로 공간의 깊이감을 더하는 조명 설계가 포함된 프리미엄 아트월입니다."
    },
    {
      title: "프리미엄 드레스룸 맞춤 시공",
      blueprint: "https://postfiles.pstatic.net/MjAyNjAyMjJfMTEz/MDAxNzcxNzMzMDg3ODcx.DKM3y6nJQruP9MyhFbQjp6FAn3_nYPAfAURzIm2vif4g.47rSMEHOX1yQGrOBdHNJYvk2YxP5G2OVMHEHXHW8Ea0g.JPEG/fit.jpg?type=w773",
      finished: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80",
      desc: "사용자의 수납 패턴을 분석한 최적의 레이아웃 설계로 완성된 고품격 맞춤 드레스룸입니다."
    },
    {
      title: "빌트인 서재 시스템",
      blueprint: "https://postfiles.pstatic.net/MjAyNjAyMjJfNzQg/MDAxNzcxNzMzMDg5OTQ5.K1jWEub1PZAKm6N9ss85cYeLaw7Y7rPiQ8vgrLRsQyYg.K8aVJHnLR9O0jXuB8LHmSI_GHB50JgmTIfNIg7jSt7Ig.JPEG/n2A3l1641490501.jpg?type=w773",
      finished: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80",
      desc: "수납량과 하중을 고려한 정밀 구조 설계가 적용된 서재로, 최적의 집중 환경을 조성합니다."
    }
  ];

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % comparisons.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + comparisons.length) % comparisons.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg-dark flex flex-col overflow-y-auto"
    >
      <div className="h-20 border-b border-black/5 flex items-center justify-between px-8 bg-bg-card sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="text-xl font-serif font-bold text-gold">설계 & 시공 프로세스</div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-gold/30"></span>
            {currentIndex + 1} / {comparisons.length}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-black/5 rounded-full transition-colors text-text-main"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 relative bg-bg-dark min-h-[calc(100vh-80px)] flex items-center">
        {/* 좌측 화살표 */}
        <button 
          onClick={prev}
          className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-14 h-14 rounded-full bg-bg-card/80 backdrop-blur-md shadow-2xl border border-black/5 flex items-center justify-center text-text-main hover:bg-gold hover:text-white transition-all group"
        >
          <ArrowLeft size={20} className="sm:w-8 sm:h-8 group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* 우측 화살표 */}
        <button 
          onClick={next}
          className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-14 h-14 rounded-full bg-bg-card/80 backdrop-blur-md shadow-2xl border border-black/5 flex items-center justify-center text-text-main hover:bg-gold hover:text-white transition-all group"
        >
          <ArrowRight size={20} className="sm:w-8 sm:h-8 group-hover:translate-x-1 transition-transform" />
        </button>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div 
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full px-4 sm:px-24 lg:px-32 py-12 flex flex-col gap-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
              {/* 도면 영역 */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-text-muted uppercase">
                  <Ruler size={14} className="text-gold" /> 01. 도면 설계
                </div>
                <div className="relative group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm aspect-[16/10]">
                  <img 
                    src={comparisons[currentIndex].blueprint} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    alt="도면"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </div>

              {/* 시공 완료 영역 */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-text-muted uppercase">
                  <Home size={14} className="text-gold" /> 02. 최종 시공
                </div>
                <div className="relative group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm aspect-[16/10]">
                  <img 
                    src={comparisons[currentIndex].finished} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="시공 완료"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </div>
            </div>

            {/* 하단 텍스트 영역 */}
            <div className="mt-8 pt-8 border-t border-black/5 max-w-6xl mx-auto w-full">
              <h3 className="text-3xl font-serif text-text-main mb-4">{comparisons[currentIndex].title}</h3>
              <p className="text-base text-text-muted font-light leading-relaxed">{comparisons[currentIndex].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-32 pb-12 bg-bg-dark">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-bg-dark" />
      </div>
      
      <div className="relative z-10 text-center px-4 mt-8 sm:mt-12">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gold tracking-[0.4em] mb-6 uppercase text-xs sm:text-sm font-semibold"
        >
          프리미엄 목공 장인정신
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-serif mb-8 leading-tight text-text-main"
        >
          공간의 기초를 세우다,<br />
          <span className="text-gold">세움 아이디</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-xl mx-auto text-text-muted font-light mb-10 text-sm sm:text-base"
        >
          디테일한 목공 작업부터 맞춤 가구 제작까지,<br />
          숙련된 목수가 만드는 당신만의 특별한 공간.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a href="#portfolio" className="border border-black/10 px-8 py-4 hover:bg-black hover:text-white transition-all duration-300 text-sm font-medium uppercase tracking-wider">
            작업물 보기
          </a>
          <a href="#contact" className="gold-gradient text-white px-8 py-4 font-bold transition-all duration-300 text-sm uppercase tracking-wider">
            상담 신청하기
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "한남동 고급 주택 거실 아트월",
      desc: "프리미엄 월넛 / 맞춤 간접 조명",
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80"
    },
    {
      title: "성수동 카페 오크 맞춤 카운터",
      desc: "내추럴 오크 / 상업 공간 목공",
      img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80"
    },
    {
      title: "평창동 서재 전체 서가 시공",
      desc: "다크 티크 / 빌트인 시스템 가구",
      img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80"
    },
    {
      title: "청담동 펜트하우스 주방 가구",
      desc: "화이트 오크 / 프리미엄 주방 목공",
      img: "https://images.unsplash.com/photo-1556912177-450034b7e50f?auto=format&fit=crop&q=80"
    },
    {
      title: "연남동 베이커리 우드 인테리어",
      desc: "빈티지 우드 / 카페 인테리어",
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
    },
    {
      title: "판교 IT 오피스 라운지 목공",
      desc: "자작나무 합판 / 오피스 가구",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
    },
    {
      title: "송도 아파트 중문 및 가벽",
      desc: "슬림 우드 프레임 / 주거 공간 목공",
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80"
    },
    {
      title: "제주도 스테이 원목 침대 프레임",
      desc: "내추럴 애쉬 / 맞춤 가구 제작",
      img: "https://images.unsplash.com/photo-1505693419148-4030a90441c9?auto=format&fit=crop&q=80"
    },
    {
      title: "가로수길 쇼룸 디스플레이 선반",
      desc: "블랙 스테인 우드 / 상업용 집기",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
    },
    {
      title: "해운대 호텔 로비 우드 월",
      desc: "대형 루버 시공 / 호텔 인테리어",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-bg-card scroll-mt-16 sm:scroll-mt-20 overflow-hidden" id="portfolio">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-serif mb-4 text-text-main">시공 사례</h2>
            <p className="text-text-muted font-light">세움 아이디의 정교한 손길로 완성된 공간들입니다.</p>
          </div>
        </div>
        
        <div className="relative px-4 sm:px-12">
          {/* 좌측 화살표 */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-bg-card shadow-lg border border-black/5 rounded-full text-text-main hover:bg-gold hover:text-white transition-all flex items-center justify-center"
            aria-label="이전"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* 우측 화살표 */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-bg-card shadow-lg border border-black/5 rounded-full text-text-main hover:bg-gold hover:text-white transition-all flex items-center justify-center"
            aria-label="다음"
          >
            <ArrowRight size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="group cursor-pointer min-w-[280px] sm:min-w-[320px] snap-start"
              >
                <div className="overflow-hidden mb-6 aspect-[4/5] relative rounded-lg">
                  <img 
                    src={project.img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    alt={project.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-serif mb-2 group-hover:text-gold transition-colors text-text-main">{project.title}</h3>
                <p className="text-text-muted text-sm font-light">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/xkovqgja", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 wood-texture relative scroll-mt-16 sm:scroll-mt-20">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif mb-6 text-text-main"
            >
              당신의 공간을 세우는 첫 걸음
            </motion.h2>
            <p className="mb-10 text-text-muted font-light leading-relaxed">
              상세한 상담을 통해 합리적인 견적과 최고의 시공 퀄리티를 약속드립니다.<br />
              목공 전문가가 직접 상담해 드립니다.
            </p>
            
            <div className="flex flex-col gap-4">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:010-3214-6663" 
                className="flex items-center gap-4 bg-bg-card shadow-sm border border-black/5 px-6 py-4 rounded-xl text-text-main hover:border-gold transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted">전화 상담</p>
                  <p className="font-semibold">010. 3214. 6663</p>
                </div>
              </motion.a>
              
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:tlgns25@naver.com" 
                className="flex items-center gap-4 bg-bg-card shadow-sm border border-black/5 px-6 py-4 rounded-xl text-text-main hover:border-gold transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted">이메일 상담</p>
                  <p className="font-semibold">tlgns25@naver.com</p>
                </div>
              </motion.a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card p-8 rounded-2xl shadow-xl border border-black/5"
          >
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <ArrowRight size={32} className="-rotate-45" />
                </div>
                <h3 className="text-2xl font-serif mb-4">문의가 접수되었습니다</h3>
                <p className="text-text-muted font-light mb-8">빠른 시일 내에 연락드리겠습니다. 감사합니다.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="text-gold font-semibold hover:underline"
                >
                  새로 문의하기
                </button>
              </motion.div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-text-muted">성함</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full px-4 py-3 bg-bg-dark border border-black/5 rounded-lg focus:outline-none focus:border-gold transition-colors text-text-main"
                      placeholder="홍길동"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-text-muted">연락처</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      className="w-full px-4 py-3 bg-bg-dark border border-black/5 rounded-lg focus:outline-none focus:border-gold transition-colors text-text-main"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-text-muted">문의 내용</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full px-4 py-3 bg-bg-dark border border-black/5 rounded-lg focus:outline-none focus:border-gold transition-colors text-text-main resize-none"
                    placeholder="시공 장소, 평수, 원하시는 스타일 등을 적어주세요."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full gold-gradient text-white py-4 rounded-lg font-bold shadow-lg shadow-gold/20 hover:opacity-90 transition-opacity uppercase tracking-widest disabled:opacity-50"
                >
                  {status === "submitting" ? "보내는 중..." : "견적 문의 보내기"}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center">오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-black/5 bg-bg-card">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-bold font-serif text-gold opacity-80">세움 아이디</div>
        <div className="text-text-muted text-xs text-center md:text-right">
          <p>© 2024 세움 아이디. 모든 권리 보유.</p>
          <p className="mt-1">대표: 홍길동 | 사업자등록번호: 000-00-00000 | 주소: 서울특별시 강남구 ...</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [showServiceDetail, setShowServiceDetail] = useState(false);

  // 서비스 상세 보기 시 메인 페이지 스크롤 방지
  useEffect(() => {
    if (showServiceDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showServiceDetail]);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      <Navbar onServiceClick={() => setShowServiceDetail(true)} />
      <main>
        <Hero />
        <Portfolio />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {showServiceDetail && (
          <ServiceDetailView onClose={() => setShowServiceDetail(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

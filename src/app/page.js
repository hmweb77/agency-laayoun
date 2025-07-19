"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Star, 
  Smartphone, 
  Zap, 
  Palette, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Phone,
  Mail,
  MapPin,
  Eye,
  Download,
  CheckCircle,
  Globe,
  Clock,
  Users,
  BookOpen,
  Coffee,
  Building2,
  Menu,
  X,
  Loader2
} from 'lucide-react';

const MoroccanTemplatesLanding = () => {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessDescription: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_9lql4b9',
    TEMPLATE_ID: 'template_n4sxosj',
    PUBLIC_KEY: 'aeH3McVuDGTzM_GVv'
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized with public key:', EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        business_description: formData.businessDescription,
        to_email: 'hmweb77@gmail.com',
        current_date: new Date().toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Sending email with params:', templateParams);
      console.log('Using EmailJS config:', {
        service: EMAILJS_CONFIG.SERVICE_ID,
        template: EMAILJS_CONFIG.TEMPLATE_ID
      });

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS Success:', response);

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', businessDescription: '' });
        alert('✅ شكرا ليك! تم إرسال الطلب بنجاح. غانكونطاكتيوك قريبا إن شاء الله 📱');
        
        setTimeout(() => {
          setShowPopup(false);
          setSubmitStatus('');
        }, 2000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      
      let errorMessage = 'حدث خطأ في إرسال الطلب. حاول مرة أخرى أو كونطاكتينا مباشرة';
      
      if (error.status === 422) {
        errorMessage = 'خطأ في إعدادات البريد الإلكتروني. تأكد من صحة المعلومات';
      } else if (error.status === 400) {
        errorMessage = 'خطأ في البيانات المرسلة. تأكد من ملء جميع الحقول بشكل صحيح';
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const templates = [
    {
      id: 1,
      title: "تصميم المدارس العصرية",
      description: "موقع احترافي للمدارس باش يجيب التلاميذ و يوري المستوى ديالك",
      image: "/092729_construire-des-ecoles-durables-avec-trespa--de-trespa.jpg",
      category: "مدرسة",
      icon: <BookOpen className="w-5 h-5" />,
      link:""
    },
    {
      id: 2,
      title: "فندق و رياض فاخر",
      description: "موقع راقي للفنادق و الرياضات باش تجيب السياح و تزيد الحجوزات",
      image: "/hotel maroc.jpg",
      category: "فندق",
      icon: <Building2 className="w-5 h-5" />,
      link:""
    },
    {
      id: 3,
      title: "مطعم و قهوة عصري",
      description: "تصميم جميل للمطاعم و القهاوي باش تجيب الزبائن و تبان محترف",
      image: "/snack.jpeg",
      category: "مطعم",
      icon: <Coffee className="w-5 h-5" />,
      link:""
    }
  ];

  const benefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "مصمم للسوق المغربي",
      description: "كلشي مفهوم بالدارجة المغربية و مناسب للثقافة ديالنا"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "توصيل سريع",
      description: "الموقع ديالك غايكون جاهز في أقل من 72 ساعة"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "يخدم في التيليفون",
      description: "الموقع غايبان زوين في الكمبيوتر و التيليفون"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-red-50">
      {/* Responsive Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
              ديجيتال المغرب
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                الصفحة الرئيسية
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                المميزات
              </button>
              <button onClick={() => scrollToSection('template')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                التصاميم
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                اتصل بنا
              </button>
              <button 
                onClick={() => setShowPopup(true)}
                className="bg-gradient-to-r from-amber-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-amber-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                ابدا مشروعك
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-4 py-2 space-y-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-right py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                الصفحة الرئيسية
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="block w-full text-right py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                المميزات
              </button>
              <button 
                onClick={() => scrollToSection('template')} 
                className="block w-full text-right py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                التصاميم
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-right py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                اتصل بنا
              </button>
              <button 
                onClick={() => {
                  setShowPopup(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full bg-gradient-to-r from-amber-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-amber-700 hover:to-blue-700 transition-all duration-300"
              >
                ابدا مشروعك
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="home"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-blue-600 to-red-600 bg-clip-text text-transparent"
            >
              دير بيزنس ديالك رقمي
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              مواقع احترافية للمدارس، الفنادق، المطاعم و القهاوي. 
              باش تجيب زبائن كثر و تبان محترف قدام الناس
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={() => scrollToSection('template')}
                className="bg-gradient-to-r from-amber-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-amber-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                شوف التصاميم
              </button>
              <button 
                className="border-2 border-amber-600 text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300"
                onClick={() => setShowPopup(true)}
              >
                ابدا دابا
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* About/Value Proposition */}
      <motion.section 
        className="py-16 sm:py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="benefits"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-gray-800"
            >
              علاش تختار التصاميم ديالنا؟
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-50 to-blue-50 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Templates Showcase */}
      <motion.section 
        className="py-16 sm:py-20 bg-gradient-to-br from-amber-50 to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="template"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              التصاميم المميزة ديالنا
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              كل تصميم مدروس بعناية باش يبرز البيزنس ديالك بطريقة احترافية 
              و يجيب لك زبائن كثر من الانترنت
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"
          >
            {templates.map((template, index) => (
              <motion.div 
                key={template.id}
                variants={fadeInUp}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                onMouseEnter={() => setActiveTemplate(template.id)}
                onMouseLeave={() => setActiveTemplate(null)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="bg-gradient-to-r from-amber-600 to-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 sm:gap-2">
                      {template.icon}
                      {template.category}
                    </span>
                  </div>
                  {/* <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTemplate === template.id ? 1 : 0 }}
                  >
                    <div className="flex gap-2 sm:gap-4">
                      <a href={template.link}>
                      <button className="bg-white text-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 hover:bg-gray-100 transition-colors text-xs sm:text-sm">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        شوف المثال
                      </button>
                      </a>
                    </div>
                  </motion.div> */}
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-800">{template.title}</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-amber-600"> درهم 1,999  </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        className="py-16 sm:py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                علاش نحن الأحسن؟
              </h2>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <motion.div variants={fadeInUp} className="text-center p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">توصيل فالوقت</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">الموقع ديالك غايكون جاهز في 72 ساعة. ما كاين لا تأخير ولا مشاكل</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">مساعدة و دعم</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">محتاج مساعدة؟ الفريق ديالنا كايساعدك فالتعديل و التخصيص</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">يخدم فكل مكان</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">يخدم مع جوجل، فيسبوك، انستغرام و جميع المنصات</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 sm:py-20 bg-gradient-to-r from-amber-600 via-blue-600 to-red-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              واش راك مستعد تدير البيزنس ديالك رقمي؟
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed">
              انضم لمئات الأعمال المغربية اللي غيرو الحضور ديالهم على الانترنت معانا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => setShowPopup(true)}
              >
                خود الموقع ديالك دابا
              </button>
         
              <button 
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300 flex items-center gap-2 justify-center"
                onClick={() => scrollToSection('contact')}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                كونطاكتينا
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-16 sm:py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="contact"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                كونطاكتينا
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                عندك أسئلة؟ احنا هنا باش نساعدوك تختار التصميم المناسب للبيزنس ديالك
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
            >
              <motion.div variants={fadeInUp} className="p-4 sm:p-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">واتساب</h3>
                <p className="text-gray-600 text-sm sm:text-base">سولنا مباشرة</p>
                <p className="text-amber-600 font-semibold text-sm sm:text-base">+212708140617</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="p-4 sm:p-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">إيميل</h3>
                <p className="text-gray-600 text-sm sm:text-base">صيفط لينا رسالة</p>
                <p className="text-amber-600 font-semibold text-sm sm:text-base">contact@hmwebs.com</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="p-4 sm:p-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">أوقات الخدمة</h3>
                <p className="text-gray-600 text-sm sm:text-base">خدامين جميع الأيام</p>
                <p className="text-amber-600 font-semibold text-sm sm:text-base">24/24 ساعة </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
                ديجيتال المغرب
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-base">
                مواقع احترافية مصممة خصيصا للأعمال المغربية. 
                حول الحضور ديالك على الانترنت بتصاميم جميلة و عصرية
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">التصاميم</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><button onClick={() => scrollToSection('template')} className="hover:text-amber-400 transition-colors">تصاميم المدارس</button></li>
                <li><button onClick={() => scrollToSection('template')} className="hover:text-amber-400 transition-colors">تصاميم الفنادق</button></li>
                <li><button onClick={() => scrollToSection('template')} className="hover:text-amber-400 transition-colors">تصاميم المطاعم</button></li>
                <li><button onClick={() => scrollToSection('template')} className="hover:text-amber-400 transition-colors">تصاميم القهاوي</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">المساعدة</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-amber-400 transition-colors">الشرح و التوضيح</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-amber-400 transition-colors">التخصيص</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-amber-400 transition-colors">كونطاكت</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2025 ديجيتال المغرب. جميع الحقوق محفوظة. مصنوع بـ ❤️ في المغرب</p>
          </div>
        </div>
      </footer>

      {/* Popup Form */}
      {showPopup && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPopup(false)}
        >
          <motion.div 
            className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">ابدا مشروعك الرقمي</h3>
              <p className="text-gray-600 text-sm sm:text-base">عمر المعلومات ديالك و غانكونطاكتيوك في أقرب وقت</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">السمية الكاملة *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="دخل السمية ديالك هنا"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">الإيميل *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">رقم التيليفون *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="+212708140617"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">وصف البيزنس ديالك *</label>
                <textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleFormChange}
                  required
                  disabled={isSubmitting}
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="قول لينا شنو كاتدير في البيزنس ديالك... مدرسة، فندق، مطعم، أو خدمة أخرى"
                />
              </div>

              <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    'صيفط الطلب'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  disabled={isSubmitting}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إلغاء
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">تم إرسال الطلب بنجاح!</span>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <X className="w-4 h-4" />
                    <span className="text-sm font-medium">حدث خطأ. حاول مرة أخرى</span>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>🔒 المعلومات ديالك محمية و ما غانشاركهاش مع حتا واحد</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MoroccanTemplatesLanding;
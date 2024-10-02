import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationEN = {
  drawer:{
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    login: 'Login',
  },
  home:{
    intro: {
      heading: "Grow Your Skills In",
      highlight: "A Few Minutes",
      paragraph: "Our courses are designed to help you grow your career, learn new skills, or explore new hobbies.",
    },
    future: {
      title: "Your Future Starts Now",
      subtitle: "Let Us Help You To build a Build Good One.",
    },
    courses: {
      sectionHeading: "Most Popular Courses",
      loadingText: "Loading...",
    },
    accordion: {
      eLearning: "What is E-Learning?",
      eLearningDescription: "E-Learning is an online learning platform dedicated to providing high-quality, accessible education to learners worldwide.",
      mission: "Our Mission",
      missionDescription: "Our mission is to empower individuals worldwide through accessible, high-quality education.",
      instructors: "Our Instructors",
      instructorsDescription: "Our courses are taught by industry experts.",
      uniqueness: "How E-Learning is Unique",
      uniquenessDescription: "E-learning stands out through quality-focused content and interactive learning.",
    },
  },
  settings: {
    account: 'Account',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    rateUs: 'Rate Us',
    more: 'More',
  },
  about: {
    title: 'About Us',
    content: 'At E-learning, we believe that learning should be accessible...',
    mission: 'Our Mission',
    missionContent: 'Our mission is simple: to democratize education...',
    ChooseBranch:'Choose a branch',
    benha: "Benha",
    alex: "Alexandria",
    smartVillage: "Smart Village",
    menoufia: "Menoufia"
  },
  contact:{
    contactUs:'Contact US',
    howCanIHelp: 'How Can I Help You?',
    fillFormOrEmail: 'Fill in the form or drop an email',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    submit: 'Submit',
  },
  profile:{
    aboutMe: 'About Me',
  }
};

const translationAR = {
  drawer:{
    home: 'الصفحة الرئيسية',
    profile: 'الملف الشخصى',
    settings: 'الاعدادات',
    login: 'تسجيل الدخول',
  },
  home:{
    intro: {
      heading: "طور مهاراتك في",
      highlight: "بضع دقائق",
      paragraph: "تم تصميم دوراتنا لمساعدتك على تنمية حياتك المهنية، أو تعلم مهارات جديدة، أو استكشاف هوايات جديدة.",
    },
    future: {
      title: "مستقبلك يبدأ الآن",
      subtitle: "دعنا نساعدك لبناء مستقبل جيد.",
    },
    courses: {
      sectionHeading: "أكثر الدورات شعبية",
      loadingText: "جاري التحميل...",
    },
    accordion: {
      eLearning: "ما هو E-Learning ؟",
      eLearningDescription: "E-Learning هو منصة تعليمية عبر الإنترنت تهدف إلى تقديم تعليم عالي الجودة ومتاح للمتعلمين في جميع أنحاء العالم.",
      mission: "مهمتنا",
      missionDescription: "مهمتنا هي تمكين الأفراد في جميع أنحاء العالم من خلال التعليم عالي الجودة المتاح.",
      instructors: "مدربونا",
      instructorsDescription: "دوراتنا تُدرس بواسطة خبراء في المجال.",
      uniqueness: "كيف يختلف E-Learning",
      uniquenessDescription: "موقعنا E-Learning يتميز بمحتوى يركز على الجودة وتعلم تفاعلي.",
    },
  },
  settings: {
    account: 'الحساب',
    darkMode: 'الوضع الليلي',
    lightMode: 'الوضع النهاري',
    language: 'اللغة',
    aboutUs: 'من نحن',
    contactUs: 'تواصل معنا',
    rateUs: 'قيّمنا',
    more: 'المزيد',
 },
  about: {
    title: 'من نحن',
    content: 'في E-Learning نؤمن أن التعلم يجب أن يكون متاحًا...',
    mission: 'مهمتنا',
    missionContent: 'مهمتنا بسيطة: توفير التعليم للجميع...',
    ChooseBranch:'اختار الفرع',
    benha: "بنها",
    alex: "الإسكندرية",
    smartVillage: "القرية الذكية",
    menoufia: "المنوفية"
  },
  contact:{
    contactUs:'تواصل معنا',
    howCanIHelp: 'كيف يمكنني مساعدتك؟',
    fillFormOrEmail: 'املأ النموذج أو أرسل بريدًا إلكترونيًا',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    subject: 'الموضوع',
    message: 'الرسالة',
    submit: 'إرسال',
  },
  profile:{
    aboutMe: 'نبذة عنى',
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

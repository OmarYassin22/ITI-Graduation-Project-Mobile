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
    courseDetails:{
      Rating:"Rating",
      BuyNow:"Buy Now"
    }
  },
  login: {
    header: 'Login',
    emailPlaceholder: 'Enter your Email',
    passwordPlaceholder: 'Enter your password',
    loginButton: 'Login',
    createAccount: "Don't have an account?",
    signup: 'Sign Up',
    errors: {
      general: 'Invalid email or password',
      email: 'Please enter a valid email.',
      password: 'Please enter a password!',
    },
  },
  signup: {
    title: 'Sign Up',
    firstNamePlaceholder: 'First Name',
    lastNamePlaceholder: 'Last Name',
    phoneNumberPlaceholder: 'Phone Number',
    emailPlaceholder: 'Enter your Email',
    passwordPlaceholder: 'Enter your password',
    signUpButton: 'Sign Up',
    errors: {
      email: 'Please enter a valid email address',
      password: 'Password must be at least 6 characters',
      fname: 'First name is required',
      lname: 'Last name is required',
      phoneNumber: 'Please enter a valid phone number',
    },
    haveAccountText: 'Already have an account?',
    signIn: 'Sign In',
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
  },

  buyer:{ 
    home :{
    courses: 'Courses',
    mycart: 'My Cart',
    wishlist: 'Wishlist',
    mylearning: 'My Learning',
    scholarship: 'Scholarship',
    courseDetailes: 'Course Details',
  },
  courses: {
    allCourses: 'All Courses in our App',
    searchPlaceholder: 'Search courses',
  },
  courseListlearning: {
    byInstructor: 'by',
    priceLabel: 'Price',
    durationLabel: 'Duration',
    WatchVideo:'Watch Video',
    StartLearning:'Start Learning'
  },
  myCart: {
    noCourses: 'No courses in your cart yet.',
    allCoursesInCart: 'All Courses in My Cart',
    searchPlaceholder: 'Search courses',
    totalLabel: 'Total',
    processingPayment: 'Processing...',
    buyNow: 'Buy Now',
  },
  wishlist: {
    noCourses: 'No courses in your wishlist yet.',
    allCourses: 'All Courses in Wishlist',
    searchPlaceholder: 'Search courses',
  },
  mylearning: {
    loading: 'Loading your courses...',
    error: 'Error',
    noCourses: 'No courses in your learning list yet.',
    allCourses: 'All Courses in My Learning',
    searchPlaceholder: 'Search courses',
  },
  courseList: {
    by: 'By',
    price: 'Price',
    duration: 'Duration',
    openCourse: 'Open Course',
  },
  courseListWish: {
    by: 'By',
    price: 'Price',
    duration: 'Duration',
    addToCart: 'Add to Cart',
    removeFromWishlist: 'Remove from Wishlist',
    removeCourse:'remove Course',
  },
  courseDetails: {
    loading: 'Loading course details...',
    error: 'Error',
    noData: 'No data available for this course.',
    details: 'Course Details',
    instructor: 'Instructor',
    price: 'Price',
    rating: 'Rating',
    track: 'Track',
    duration: 'Duration',
    addToCart: 'Add to Cart',
    addToWishlist: 'Add to Wishlist',
    courseAddedToCart: 'Course added to Cart:',
    courseAlreadyInCart: 'Course already in Cart:',
    courseAddedToWishlist: 'Course added to Wishlist:',
    courseAlreadyInWishlist: 'Course already in Wishlist:',
    },
  solarship: {
    alreadyApplicant: "Already an Applicant",
    cannotApply:"You cannot apply again",
    alreadyApplicantMessage: "You are already an applicant.",
    scholarshipApplication: "Scholarship Application",
    confirmSubmit: "Are you sure you want to submit the application?",
    cancel: "Cancel",
    submit: "Submit",
    documentIdMissing: "Document ID is missing. Please try again.",
    applicationSuccess: "You have become an applicant.",
    error: "Error",
    selectField: "Please select a field",
    answerAllQuestions: "Please answer all questions before submitting.",
    canceled: "Cancelled",
    applicationCanceledMessage: "Your application has been canceled.",
    applicationError: "There was an issue submitting your application.",
    noData: "No course data available.",
    fieldSelection: "Select Field you want",
    frontEnd: "Front-end",
    backEnd: "Back-end",
    mobileApp: "Mobile App",
    submittedText: "You have already submitted your application for the field :",
  }
},
  student:{
    home:{
      schedule:"Schedule",
      grades:"Grades",
      courses:"Courses"
    },
    courseDetails:{
      Instructor:"Instructor",
      StayTuned:"Stay tuned !!",
      instructorWill:"The instructor will upload the video soon."
    },
    Schedule:'Schedule',
    table:{
      name:"Name",
      percentage:"Percentage",
      status:"Status",
      instructor:"Instructor",
    }
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
    courseDetails:{
      Rating:"التقييم",
      BuyNow:"اشترى الان"
    }
  },
  login: {
    header: 'تسجيل الدخول',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    passwordPlaceholder: 'أدخل كلمة المرور',
    loginButton: 'تسجيل الدخول',
    createAccount: 'ليس لديك حساب؟',
    signup: 'سجل',
    errors: {
      general: 'بريد إلكتروني أو كلمة مرور غير صحيحة',
      email: 'يرجى إدخال بريد إلكتروني صحيح.',
      password: 'يرجى إدخال كلمة المرور!',
    },
  },
  signup: {
    title: 'إنشاء حساب',
    firstNamePlaceholder: 'الاسم الأول',
    lastNamePlaceholder: 'اسم العائلة',
    phoneNumberPlaceholder: 'رقم الهاتف',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    passwordPlaceholder: 'أدخل كلمة المرور',
    signUpButton: 'سجل',
    errors: {
      email: 'يرجى إدخال بريد إلكتروني صالح',
      password: 'يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل',
      fname: 'الاسم الأول مطلوب',
      lname: 'اسم العائلة مطلوب',
      phoneNumber: 'يرجى إدخال رقم هاتف صالح',
    },
    haveAccountText: 'هل لديك حساب؟',
    signIn: 'تسجيل الدخول',
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
  },

  buyer: {
    home: {
      courses: 'الدورات',
      mycart: 'عربة التسوق',
      wishlist: 'المفضلة',
      mylearning: 'تعلماتي',
      scholarship: 'المنح الدراسية',
      courseDetailes: 'تفاصيل الدورة',
    },
    courses: {
      allCourses: 'جميع الدورات في تطبيقنا',
      searchPlaceholder: 'ابحث عن الدورات',
    },
    courseListlearning: {
      byInstructor: 'بواسطة',
      priceLabel: 'السعر',
      durationLabel: 'المدة',
      WatchVideo:'شاهد الفيديو',
      StartLearning:'ابدأ التعلم'
    },
    myCart: {
      noCourses: 'لا توجد دورات في سلتك بعد.',
      allCoursesInCart: 'جميع الدورات في سلتي',
      searchPlaceholder: 'ابحث عن الدورات',
      totalLabel: 'المجموع',
      processingPayment: 'جارٍ المعالجة...',
      buyNow: 'اشترِ الآن',
    },
    wishlist: {
      noCourses: 'لا توجد دورات في قائمة الرغبات بعد.',
      allCourses: 'جميع الدورات في قائمة الرغبات',
      searchPlaceholder: 'ابحث عن الدورات',
    },
    mylearning: {
      loading: 'جارٍ تحميل دوراتك...',
      error: 'خطأ',
      noCourses: 'لا توجد دورات في قائمة التعلم بعد.',
      allCourses: 'جميع الدورات في قائمة تعلمي',
      searchPlaceholder: 'ابحث عن الدورات',
    },
    courseList: {
      by: 'بواسطة',
      price: 'السعر',
      duration: 'المدة',
      openCourse: 'افتح الدورة',
    },
    courseListWish: {
      by: 'بواسطة',
      price: 'السعر',
      duration: 'المدة',
      addToCart: 'أضف إلى العربة',
      removeFromWishlist: 'إزالة من المفضلة',
      removeCourse: 'إزالة الدورة',
    },
    courseDetails: {
      loading: 'جارٍ تحميل تفاصيل الدورة...',
      error: 'خطأ',
      noData: 'لا توجد بيانات متاحة لهذه الدورة.',
      details: 'تفاصيل الدورة',
      instructor: 'المدرب',
      price: 'السعر',
      rating: 'التقييم',
      track: 'المسار',
      duration: 'المدة',
      addToCart: 'أضف إلى عربة التسوق',
      addToWishlist: 'أضف إلى المفضلة',
      courseAddedToCart: 'تمت إضافة الدورة إلى عربة التسوق:',
      courseAlreadyInCart: 'الدورة موجودة بالفعل في عربة التسوق:',
      courseAddedToWishlist: 'تمت إضافة الدورة إلى المفضلة:',
      courseAlreadyInWishlist: 'الدورة موجودة بالفعل في المفضلة:',
    },
    solarship:{
      alreadyApplicant: "أنت بالفعل متقدم",
      cannotApply:"لا يمكنك التقديم مجددا",
      alreadyApplicantMessage: "أنت بالفعل متقدم.",
      scholarshipApplication: "طلب منحة",
      confirmSubmit: "هل أنت متأكد أنك تريد تقديم الطلب؟",
      cancel: "إلغاء",
      submit: "تقديم",
      documentIdMissing: "معرف الوثيقة مفقود. يرجى المحاولة مرة أخرى.",
      applicationSuccess: "لقد أصبحت متقدماً.",
      error: "خطأ",
      selectField: "يرجى اختيار المجال",
      answerAllQuestions: "يرجى الإجابة على جميع الأسئلة قبل التقديم.",
      canceled: "ملغى",
      applicationCanceledMessage: "لقد تم إلغاء طلبك.",
      applicationError: "كانت هناك مشكلة في تقديم طلبك.",
      noData: "لا توجد بيانات للدورة.",
      fieldSelection: "اختر المجال الذي تريده",
      frontEnd: "الواجهة الأمامية",
      backEnd: "الواجهة الخلفية",
      mobileApp: "تطبيق موبايل",
      submittedText: "لقد قمت بتقديم طلبك بالفعل لمجال .",
    }
  },
  student:{
    home:{
      schedule:"الجدول",
      grades:"الدرجات",
      courses:"الدورات"
    },
    courseDetails:{
      Instructor:"مدرب",
      StayTuned:"ترقبوا !!",
      instructorWill:"سيقوم المدرب برفع الفيديو قريبًا."
    },
    Schedule:'الجدول',
    table:{
      name:"الاسم",
      percentage:"النسبة المئوية",
      status:"الحالة",
      instructor:"المدرب",
    }
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
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Service } from '@/models/Service';
import { Client } from '@/models/Client';
import { Testimonial } from '@/models/Testimonial';
import { FAQ } from '@/models/FAQ';

export async function POST() {
  try {
    await connectDB();

    // Create default admin user
    const adminExists = await User.findOne({ email: 'admin@markline.sa' });
    if (!adminExists) {
      await User.create({
        email: 'admin@markline.sa',
        password: 'Admin@123',
        name: 'Mark Line Admin',
        role: 'admin',
      });
    }

    // Seed Services
    const servicesData = [
      {
        title: 'Real Estate Services',
        titleAr: 'الخدمات العقارية',
        description: `<p>Comprehensive real estate solutions covering:</p>
<ul>
<li>Sales and Purchase</li>
<li>Property Management</li>
<li>Real Estate Development</li>
<li>Property Marketing</li>
<li>Leasing Services</li>
<li>Maintenance Services</li>
<li>Real Estate Brokerage</li>
</ul>`,
        descriptionAr: `<p>حلول عقارية شاملة تغطي:</p>
<ul>
<li>بيع وشراء</li>
<li>إدارة الأملاك</li>
<li>تطوير عقاري</li>
<li>تسويق عقارات</li>
<li>تأجير</li>
<li>صيانة</li>
<li>وساطة عقارية</li>
</ul>`,
        icon: '🏢',
        category: 'Real Estate',
        order: 1,
        items: [
          { text: 'Sales and Purchase', textAr: 'بيع وشراء' },
          { text: 'Property Management', textAr: 'إدارة الأملاك' },
          { text: 'Real Estate Development', textAr: 'تطوير عقاري' },
          { text: 'Property Marketing', textAr: 'تسويق عقارات' },
          { text: 'Leasing Services', textAr: 'تأجير' },
          { text: 'Maintenance Services', textAr: 'صيانة' },
          { text: 'Real Estate Brokerage', textAr: 'وساطة عقارية' },
        ],
      },
      {
        title: 'Marketing',
        titleAr: 'التسويق',
        description: `<p>🎯 <strong>Strategic integrated marketing solutions including:</strong></p>
<ul>
<li>Developing integrated marketing strategies based on market and target audience analysis</li>
<li>Managing digital advertising campaigns across platforms (Google – Meta – Snapchat – TikTok)</li>
<li>Social media account management (design, content writing, scheduling, monitoring)</li>
<li>Performance analysis and periodic reporting to measure and improve campaign results</li>
<li>Building brand identity from logo design to long-term marketing plans</li>
<li>Public relations management and implementing marketing plans to enhance brand reputation</li>
</ul>`,
        descriptionAr: `<p>🎯 <strong>التسويق (Marketing)</strong></p>
<ul>
<li>إعداد استراتيجيات تسويقية متكاملة مبنية على تحليل السوق والجمهور المستهدف.</li>
<li>إدارة الحملات الإعلانية الرقمية على مختلف المنصات (Google – Meta – Snapchat – TikTok).</li>
<li>إدارة حسابات التواصل الاجتماعي (تصميم، كتابة محتوى، جدولة النشر، المتابعة).</li>
<li>تحليل الأداء وتقديم تقارير دورية لقياس نتائج الحملات وتحسينها.</li>
<li>بناء الهوية التجارية من تصميم الشعار إلى تطوير الخطط التسويقية طويلة المدى.</li>
<li>إدارة العلاقات العامة وتنفيذ خطط تسويقية تعزز من سمعة العلامة التجارية.</li>
</ul>`,
        icon: '🎯',
        category: 'Marketing',
        order: 2,
        items: [
          { text: 'Developing integrated marketing strategies based on market and target audience analysis', textAr: 'إعداد استراتيجيات تسويقية متكاملة مبنية على تحليل السوق والجمهور المستهدف' },
          { text: 'Managing digital advertising campaigns across platforms (Google – Meta – Snapchat – TikTok)', textAr: 'إدارة الحملات الإعلانية الرقمية على مختلف المنصات (Google – Meta – Snapchat – TikTok)' },
          { text: 'Social media account management (design, content writing, scheduling, monitoring)', textAr: 'إدارة حسابات التواصل الاجتماعي (تصميم، كتابة محتوى، جدولة النشر، المتابعة)' },
          { text: 'Performance analysis and periodic reporting to measure and improve campaign results', textAr: 'تحليل الأداء وتقديم تقارير دورية لقياس نتائج الحملات وتحسينها' },
          { text: 'Building brand identity from logo design to long-term marketing plans', textAr: 'بناء الهوية التجارية من تصميم الشعار إلى تطوير الخطط التسويقية طويلة المدى' },
          { text: 'Public relations management and implementing marketing plans to enhance brand reputation', textAr: 'إدارة العلاقات العامة وتنفيذ خطط تسويقية تعزز من سمعة العلامة التجارية' },
        ],
      },
      {
        title: 'Photography & Production',
        titleAr: 'التصوير والإنتاج الفني',
        description: `<p>🎥 <strong>Professional photography and artistic production services including:</strong></p>
<ul>
<li>Promotional and advertising photography for products, services, and brands</li>
<li>Photography and videography for events, activities, and marketing campaigns</li>
<li>Cinematic production including scriptwriting, directing, editing, and color correction</li>
<li>Creative content photography (UGC Content) for social media platforms</li>
<li>Shooting location management including coordination, site selection, and lighting</li>
<li>Complete technical supervision of video projects and commercial advertisements</li>
</ul>`,
        descriptionAr: `<p>🎥 <strong>التصوير والإنتاج الفني (Photography & Production)</strong></p>
<ul>
<li>تصوير دعائي وإعلاني للمنتجات، والخدمات، والعلامات التجارية.</li>
<li>تصوير فوتوغرافي ومرئي للمناسبات والفعاليات والحملات التسويقية.</li>
<li>إنتاج سينمائي يشمل كتابة النصوص، الإخراج، المونتاج، والتصحيح اللوني.</li>
<li>تصوير المحتوى الإبداعي (UGC Content) لمنصات التواصل الاجتماعي.</li>
<li>إدارة مواقع التصوير من حيث التنسيق الفني، اختيار المواقع، والإضاءة.</li>
<li>إشراف فني كامل على مشاريع الفيديوهات والإعلانات التجارية.</li>
</ul>`,
        icon: '🎥',
        category: 'Production',
        order: 3,
        items: [
          { text: 'Promotional and advertising photography for products, services, and brands', textAr: 'تصوير دعائي وإعلاني للمنتجات، والخدمات، والعلامات التجارية' },
          { text: 'Photography and videography for events, activities, and marketing campaigns', textAr: 'تصوير فوتوغرافي ومرئي للمناسبات والفعاليات والحملات التسويقية' },
          { text: 'Cinematic production including scriptwriting, directing, editing, and color correction', textAr: 'إنتاج سينمائي يشمل كتابة النصوص، الإخراج، المونتاج، والتصحيح اللوني' },
          { text: 'Creative content photography (UGC Content) for social media platforms', textAr: 'تصوير المحتوى الإبداعي (UGC Content) لمنصات التواصل الاجتماعي' },
          { text: 'Shooting location management including coordination, site selection, and lighting', textAr: 'إدارة مواقع التصوير من حيث التنسيق الفني، اختيار المواقع، والإضاءة' },
          { text: 'Complete technical supervision of video projects and commercial advertisements', textAr: 'إشراف فني كامل على مشاريع الفيديوهات والإعلانات التجارية' },
        ],
      },
      {
        title: 'Crowd Management',
        titleAr: 'إدارة الحشود',
        description: `<p>👥 <strong>Professional crowd management services including:</strong></p>
<ul>
<li>Planning and executing organizational plans for public events, exhibitions, and festivals</li>
<li>Providing professional organizers trained in dealing with visitors and crowds</li>
<li>Organizing entrances and exits ensuring smooth movement and attendee safety</li>
<li>Managing field teams and coordinating between all event stakeholders</li>
<li>Implementing safety standards in cooperation with security authorities and supervisors</li>
<li>Providing post-event organizational reports to measure efficiency and improve future performance</li>
</ul>`,
        descriptionAr: `<p>👥 <strong>إدارة الحشود (Crowd Management)</strong></p>
<ul>
<li>تخطيط وتنفيذ خطط التنظيم للفعاليات الجماهيرية والمعارض والمهرجانات.</li>
<li>توفير منظمين محترفين ومدربين على التعامل مع الزوار والجماهير.</li>
<li>تنظيم المداخل والمخارج بما يضمن انسيابية الحركة وسلامة الحضور.</li>
<li>إدارة الفرق الميدانية والتنسيق بين جميع الجهات المشاركة في الفعالية.</li>
<li>تطبيق معايير السلامة بالتعاون مع الجهات الأمنية والمشرفين.</li>
<li>تقديم تقارير تنظيمية بعد الحدث لقياس الكفاءة وتحسين الأداء مستقبلاً.</li>
</ul>`,
        icon: '👥',
        category: 'Events',
        order: 4,
        items: [
          { text: 'Planning and executing organizational plans for public events, exhibitions, and festivals', textAr: 'تخطيط وتنفيذ خطط التنظيم للفعاليات الجماهيرية والمعارض والمهرجانات' },
          { text: 'Providing professional organizers trained in dealing with visitors and crowds', textAr: 'توفير منظمين محترفين ومدربين على التعامل مع الزوار والجماهير' },
          { text: 'Organizing entrances and exits ensuring smooth movement and attendee safety', textAr: 'تنظيم المداخل والمخارج بما يضمن انسيابية الحركة وسلامة الحضور' },
          { text: 'Managing field teams and coordinating between all event stakeholders', textAr: 'إدارة الفرق الميدانية والتنسيق بين جميع الجهات المشاركة في الفعالية' },
          { text: 'Implementing safety standards in cooperation with security authorities and supervisors', textAr: 'تطبيق معايير السلامة بالتعاون مع الجهات الأمنية والمشرفين' },
          { text: 'Providing post-event organizational reports to measure efficiency and improve future performance', textAr: 'تقديم تقارير تنظيمية بعد الحدث لقياس الكفاءة وتحسين الأداء مستقبلاً' },
        ],
      },
      {
        title: 'Casting Services',
        titleAr: 'توفير الوجوه الإعلانية',
        description: `<p>🎭 <strong>Professional talent selection and management including:</strong></p>
<ul>
<li>Selecting and nominating suitable talent for advertising projects and promotional videos</li>
<li>Providing models and actors from various age groups and backgrounds</li>
<li>Managing casting process from interviews and auditions to contract signing and execution</li>
<li>Coordinating schedules and permits for production participants</li>
<li>Providing exclusive advertising faces matching brand identity and client campaign</li>
<li>Performance monitoring during filming to ensure quality and compliance with required standards</li>
</ul>`,
        descriptionAr: `<p>🎭 <strong>توفير الوجوه الإعلانية (Casting Services)</strong></p>
<ul>
<li>اختيار وترشيح المواهب المناسبة للمشاريع الإعلانية والفيديوهات الدعائية.</li>
<li>توفير مودلز وممثلين من مختلف الفئات العمرية والخلفيات.</li>
<li>إدارة عمليات الكاستنق من المقابلات والتجارب إلى توقيع العقود والتنفيذ.</li>
<li>تنسيق الجداول والتصاريح الخاصة بالمشاركين في الإنتاج.</li>
<li>توفير وجوه إعلانية حصرية تناسب هوية العلامة التجارية وحملة العميل.</li>
<li>متابعة الأداء أثناء التصوير لضمان الجودة والالتزام بالمعايير المطلوبة.</li>
</ul>`,
        icon: '🎭',
        category: 'Advertising',
        order: 5,
        items: [
          { text: 'Selecting and nominating suitable talent for advertising projects and promotional videos', textAr: 'اختيار وترشيح المواهب المناسبة للمشاريع الإعلانية والفيديوهات الدعائية' },
          { text: 'Providing models and actors from various age groups and backgrounds', textAr: 'توفير مودلز وممثلين من مختلف الفئات العمرية والخلفيات' },
          { text: 'Managing casting process from interviews and auditions to contract signing and execution', textAr: 'إدارة عمليات الكاستنق من المقابلات والتجارب إلى توقيع العقود والتنفيذ' },
          { text: 'Coordinating schedules and permits for production participants', textAr: 'تنسيق الجداول والتصاريح الخاصة بالمشاركين في الإنتاج' },
          { text: 'Providing exclusive advertising faces matching brand identity and client campaign', textAr: 'توفير وجوه إعلانية حصرية تناسب هوية العلامة التجارية وحملة العميل' },
          { text: 'Performance monitoring during filming to ensure quality and compliance with required standards', textAr: 'متابعة الأداء أثناء التصوير لضمان الجودة والالتزام بالمعايير المطلوبة' },
        ],
      },
      {
        title: 'Exhibitions & Conferences Management',
        titleAr: 'تنظيم المعارض والمؤتمرات',
        description: `<p>🏛️ <strong>Complete end-to-end management including:</strong></p>
<ul>
<li>Preparing complete organizational plan for exhibitions and conferences from start to finish</li>
<li>Designing and implementing pavilions and exhibitions according to event and brand identity</li>
<li>Managing registration, attendance, coordinating invitations, and scheduling sessions</li>
<li>Organizing accompanying events such as presentations, opening and closing ceremonies</li>
<li>Providing complete team of organizers, reception, technical support, and field supervisors</li>
<li>Coordinating with sponsors and exhibitors to ensure professional experience for visitors and participants</li>
<li>Media documentation of event through photography, media coverage, and live streaming</li>
</ul>`,
        descriptionAr: `<p>🏛️ <strong>تنظيم المعارض والمؤتمرات (Exhibitions & Conferences Management)</strong></p>
<ul>
<li>إعداد الخطة التنظيمية الكاملة للمعارض والمؤتمرات من البداية إلى النهاية.</li>
<li>تصميم وتنفيذ الأجنحة والمعارض وفق هوية الحدث والعلامة التجارية.</li>
<li>إدارة التسجيل والحضور وتنسيق الدعوات وجدولة الجلسات.</li>
<li>تنظيم الفعاليات المصاحبة مثل العروض التقديمية وحفلات الافتتاح والختام.</li>
<li>توفير فريق عمل متكامل من منظمين، استقبال، دعم فني، ومشرفين ميدانيين.</li>
<li>التنسيق مع الرعاة والعارضين لضمان تجربة احترافية للزوار والمشاركين.</li>
<li>توثيق الحدث إعلاميًا عبر التصوير والتغطية الإعلامية والبث المباشر.</li>
</ul>`,
        icon: '🏛️',
        category: 'Events',
        order: 6,
        items: [
          { text: 'Preparing complete organizational plan for exhibitions and conferences from start to finish', textAr: 'إعداد الخطة التنظيمية الكاملة للمعارض والمؤتمرات من البداية إلى النهاية' },
          { text: 'Designing and implementing pavilions and exhibitions according to event and brand identity', textAr: 'تصميم وتنفيذ الأجنحة والمعارض وفق هوية الحدث والعلامة التجارية' },
          { text: 'Managing registration, attendance, coordinating invitations, and scheduling sessions', textAr: 'إدارة التسجيل والحضور وتنسيق الدعوات وجدولة الجلسات' },
          { text: 'Organizing accompanying events such as presentations, opening and closing ceremonies', textAr: 'تنظيم الفعاليات المصاحبة مثل العروض التقديمية وحفلات الافتتاح والختام' },
          { text: 'Providing complete team of organizers, reception, technical support, and field supervisors', textAr: 'توفير فريق عمل متكامل من منظمين، استقبال، دعم فني، ومشرفين ميدانيين' },
          { text: 'Coordinating with sponsors and exhibitors to ensure professional experience for visitors and participants', textAr: 'التنسيق مع الرعاة والعارضين لضمان تجربة احترافية للزوار والمشاركين' },
          { text: 'Media documentation of event through photography, media coverage, and live streaming', textAr: 'توثيق الحدث إعلاميًا عبر التصوير والتغطية الإعلامية والبث المباشر' },
        ],
      },
    ];

    await Service.deleteMany({});
    await Service.insertMany(servicesData);

    // Seed Testimonials
    const testimonialsData = [
      {
        name: 'Eng. Taha Harqous',
        nameAr: 'م. طه حرقوص',
        position: 'CEO',
        positionAr: 'الرئيس التنفيذي',
        content: 'It was impressive to see my whole business encapsulated in one beautifully-made video.',
        contentAr: 'كان من المذهل رؤية عملي بأكمله محاطاً في فيديو واحد مصمم بشكل جميل.',
        rating: 5,
        order: 1,
      },
      {
        name: 'Khaled Al-Aseeri',
        nameAr: 'خالد العسيري',
        position: 'CEO',
        positionAr: 'الرئيس التنفيذي',
        content: 'For those who look for a one-stop service, Mark Line is the answer.',
        contentAr: 'لأولئك الذين يبحثون عن خدمة شاملة، مارك لاين هو الجواب.',
        rating: 5,
        order: 2,
      },
      {
        name: 'Maher Jawad',
        nameAr: 'ماهر جواد',
        position: 'CEO',
        positionAr: 'الرئيس التنفيذي',
        content: 'A highly-recommended agency. Great communication and amazing results.',
        contentAr: 'وكالة موصى بها بشدة. تواصل رائع ونتائج مذهلة.',
        rating: 5,
        order: 3,
      },
      {
        name: 'Ahmed Abdulmufti',
        nameAr: 'أحمد عبد المفتي',
        position: 'COO',
        positionAr: 'مدير العمليات',
        content: 'The company was very professional.',
        contentAr: 'كانت الشركة محترفة للغاية.',
        rating: 5,
        order: 4,
      },
    ];

    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonialsData);

    // Seed FAQs
    const faqsData = [
      {
        question: 'What is your typical working process?',
        questionAr: 'ما هي عملية العمل النموذجية الخاصة بكم؟',
        answer: 'We always start a project with analysis, learning the requirements, and making estimates that will be shared in the price proposal. Once an agreement is reached, a kick-off meeting will take place to pave the way to optimal delivery of your project.',
        answerAr: 'نبدأ دائماً المشروع بالتحليل، وفهم المتطلبات، وإعداد التقديرات التي سيتم مشاركتها في عرض السعر. بمجرد التوصل إلى اتفاق، سيتم عقد اجتماع تمهيدي لتمهيد الطريق للتسليم الأمثل لمشروعك.',
        order: 1,
      },
      {
        question: 'How long will it take to get an estimate from you?',
        questionAr: 'كم من الوقت سيستغرق الحصول على تقدير منكم؟',
        answer: 'We hate to keep you waiting. Setting up a team, making preliminary research and analysis, and getting back to you with the contract will take up to 24 hours from the moment we learn what\'s needed.',
        answerAr: 'نكره إبقاءك في انتظار. تشكيل فريق، وإجراء بحث وتحليل أولي، والرجوع إليك بالعقد سيستغرق حتى 24 ساعة من لحظة معرفة ما هو مطلوب.',
        order: 2,
      },
      {
        question: 'What\'s your average project duration?',
        questionAr: 'ما هي المدة المتوسطة للمشروع؟',
        answer: 'Our team works full-time on every project, so the overall duration will highly depend on the type and size of the project. On average, our projects last from 2 weeks to 3 months.',
        answerAr: 'يعمل فريقنا بدوام كامل على كل مشروع، لذا ستعتمد المدة الإجمالية بشكل كبير على نوع وحجم المشروع. في المتوسط، تستمر مشاريعنا من أسبوعين إلى 3 أشهر.',
        order: 3,
      },
      {
        question: 'What templates do you use to create design?',
        questionAr: 'ما هي القوالب التي تستخدمونها لإنشاء التصميم؟',
        answer: 'We don\'t use pre-built templates or kits because there\'s just no soul in them. We\'re committed to building fully customized and product-based solutions that will meet the expectations of the target users.',
        answerAr: 'لا نستخدم قوالب أو مجموعات جاهزة لأنه لا توجد روح فيها. نحن ملتزمون ببناء حلول مخصصة بالكامل وقائمة على المنتج تلبي توقعات المستخدمين المستهدفين.',
        order: 4,
      },
      {
        question: 'Do you work with big companies only? We\'re an early-stage startup',
        questionAr: 'هل تعملون مع الشركات الكبيرة فقط؟ نحن شركة ناشئة في مرحلة مبكرة',
        answer: 'We\'re all for building a borderless world, so we are open to working with any project that has potential for success.',
        answerAr: 'نحن نؤمن ببناء عالم بلا حدود، لذلك نحن منفتحون على العمل مع أي مشروع لديه إمكانات للنجاح.',
        order: 5,
      },
      {
        question: 'Where should I start with my business if I have an idea?',
        questionAr: 'من أين أبدأ مع عملي إذا كان لدي فكرة؟',
        answer: 'Hey, you\'ve come to the right place! Please get in touch and we\'ll help you with the ideation, design, and development. Full cycle on us, no hassle for you. Easy, right?',
        answerAr: 'مرحباً، لقد أتيت إلى المكان الصحيح! يرجى التواصل معنا وسنساعدك في التفكير والتصميم والتطوير. دورة كاملة علينا، لا متاعب لك. سهل، أليس كذلك؟',
        order: 6,
      },
      {
        question: 'Do you handle projects outside Saudi Arabia?',
        questionAr: 'هل تتعاملون مع المشاريع خارج المملكة العربية السعودية؟',
        answer: 'We are based in Saudi Arabia, but we provide our services to clients in GCC, Middle East, and beyond.',
        answerAr: 'نحن مقرنا في المملكة العربية السعودية، لكننا نقدم خدماتنا للعملاء في دول مجلس التعاون الخليجي والشرق الأوسط وما وراءها.',
        order: 7,
      },
      {
        question: 'Why should I hire an agency instead of developing and marketing my business by myself?',
        questionAr: 'لماذا يجب أن أستأجر وكالة بدلاً من تطوير وتسويق عملي بنفسي؟',
        answer: 'By choosing Mark Line as your success partner, you will have an entire team of experts to handle each aspect at the highest level.',
        answerAr: 'من خلال اختيار مارك لاين كشريك نجاحك، سيكون لديك فريق كامل من الخبراء للتعامل مع كل جانب بأعلى مستوى.',
        order: 8,
      },
    ];

    await FAQ.deleteMany({});
    await FAQ.insertMany(faqsData);

    // Seed some sample clients
    const clientsData = [
      { name: 'Automotive Client 1', category: 'Automotive', order: 1 },
      { name: 'Automotive Client 2', category: 'Automotive', order: 2 },
      { name: 'Communication Client 1', category: 'Communication', order: 1 },
      { name: 'Communication Client 2', category: 'Communication', order: 2 },
      { name: 'Corporate Client 1', category: 'Corporate', order: 1 },
      { name: 'Corporate Client 2', category: 'Corporate', order: 2 },
      { name: 'Food Client 1', category: 'Food & Beverages', order: 1 },
      { name: 'Food Client 2', category: 'Food & Beverages', order: 2 },
    ];

    await Client.deleteMany({});
    await Client.insertMany(clientsData);

    return NextResponse.json({
      message: 'Database seeded successfully',
      admin: {
        email: 'admin@markline.sa',
        password: 'Admin@123',
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}


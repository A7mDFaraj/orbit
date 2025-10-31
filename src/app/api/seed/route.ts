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
        title: 'Real Estate & Property Management',
        titleAr: 'العقارات وإدارة الممتلكات',
        description: 'Comprehensive property management services including marketing, leasing, maintenance, and tenant relations.',
        descriptionAr: 'خدمات إدارة الممتلكات الشاملة بما في ذلك التسويق والتأجير والصيانة وعلاقات المستأجرين.',
        category: 'Real Estate',
        order: 1,
      },
      {
        title: 'Marketing & Advertising',
        titleAr: 'التسويق والإعلان',
        description: 'Strategic marketing campaigns, brand development, digital advertising, and social media management.',
        descriptionAr: 'حملات تسويقية استراتيجية، تطوير العلامة التجارية، الإعلان الرقمي، وإدارة وسائل التواصل الاجتماعي.',
        category: 'Marketing',
        order: 2,
      },
      {
        title: 'Creative Production',
        titleAr: 'الإنتاج الإبداعي',
        description: 'High-quality video production, photography, graphic design, and multimedia content creation.',
        descriptionAr: 'إنتاج فيديو عالي الجودة، تصوير فوتوغرافي، تصميم جرافيك، وإنشاء محتوى متعدد الوسائط.',
        category: 'Creative',
        order: 3,
      },
      {
        title: 'Advertising Faces',
        titleAr: 'وجوه إعلانية',
        description: 'Professional brand ambassadors and promotional staff for events, exhibitions, and marketing campaigns.',
        descriptionAr: 'سفراء علامة تجارية محترفون وموظفو ترويج للفعاليات والمعارض والحملات التسويقية.',
        category: 'Advertising',
        order: 4,
      },
      {
        title: 'Crowd Management',
        titleAr: 'إدارة الحشود',
        description: 'Expert crowd control and management services for large events, ensuring safety and smooth operations.',
        descriptionAr: 'خدمات خبيرة في التحكم وإدارة الحشود للفعاليات الكبيرة، لضمان السلامة والعمليات السلسة.',
        category: 'Events',
        order: 5,
      },
      {
        title: 'Event & Exhibition Organization',
        titleAr: 'تنظيم الفعاليات والمعارض',
        description: 'Full-service event planning and execution, from concept to completion for corporate events and exhibitions.',
        descriptionAr: 'تخطيط وتنفيذ شامل للفعاليات، من الفكرة إلى الاكتمال للفعاليات المؤسسية والمعارض.',
        category: 'Events',
        order: 6,
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


/* MERAAS — site behaviour */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- keyboard focus intent ---------- */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
      var skipLink = document.querySelector('.skip');
      if (skipLink) skipLink.classList.remove('skip-dismissed');
    }
  }, true);
  document.addEventListener('pointerdown', function () {
    document.body.classList.remove('keyboard-nav');
    var skipLink = document.querySelector('.skip');
    if (skipLink) skipLink.classList.add('skip-dismissed');
    if (document.activeElement && document.activeElement.classList.contains('skip')) {
      document.activeElement.blur();
    }
  }, true);
  window.addEventListener('pageshow', function () {
    document.body.classList.remove('keyboard-nav');
    var skipLink = document.querySelector('.skip');
    if (skipLink) skipLink.classList.add('skip-dismissed');
    if (document.activeElement && document.activeElement.classList.contains('skip')) {
      document.activeElement.blur();
    }
  });

  /* ---------- opening reveal ---------- */
  var splash = document.querySelector('[data-splash]');
  if (splash && document.documentElement.classList.contains('show-splash')) {
    document.documentElement.style.overflow = 'hidden';
    var splashDone = false;
    var finishSplash = function () {
      if (splashDone) return;
      splashDone = true;
      splash.classList.add('is-leaving');
      window.setTimeout(function () {
        document.documentElement.style.overflow = '';
        document.documentElement.classList.remove('show-splash');
        splash.remove();
      }, 580);
    };
    window.setTimeout(finishSplash, reduce ? 120 : 2850);
  } else if (splash) {
    splash.remove();
  }

  /* ---------- language and RTL ---------- */
  var langButtons = document.querySelectorAll('.lang-toggle');

  var translations = {
  "Skip to content": "انتقل إلى المحتوى",
  "Home": "الرئيسية",
  "Projects": "المشاريع",
  "Company": "الشركة",
  "Our Services": "خدماتنا",
  "Capabilities": "خدماتنا",
  "Contact Us": "تواصل معنا",
  "Contact": "التواصل",
  "Menu": "القائمة",
  "Navigate": "التنقل",
  "Selected work": "أعمال مختارة",
  "Building with purpose.": "نبني بهدف.",
  "Delivering with pride.": "وننجز بفخر.",
  "Building with purpose. Delivering with pride.": "نبني بهدف. وننجز بفخر.",
  "Integrated engineering, coordinated execution, and lasting value — delivered across Libya since our first project.": "هندسة متكاملة وتنفيذ متناسق وقيمة مستدامة — ننجزها في كافة أنحاء ليبيا منذ مشروعنا الأول.",
  "Integrated engineering, coordinated execution, and lasting value &mdash; delivered across Libya since our first project.": "هندسة متكاملة وتنفيذ متناسق وقيمة مستدامة — ننجزها في كافة أنحاء ليبيا منذ مشروعنا الأول.",
  "MERAAS — Engineering & Construction, Libya": "مراس — للهندسة والإنشاءات، ليبيا",
  "MERAAS - Engineering & Construction, Libya": "مراس - للهندسة والإنشاءات، ليبيا",
  "Our Services — MERAAS Engineering & Construction": "خدماتنا — مراس للهندسة والإنشاءات",
  "Our Services &mdash; MERAAS Engineering &amp; Construction": "خدماتنا — مراس للهندسة والإنشاءات",
  "Company — MERAAS Engineering & Construction": "الشركة — مراس للهندسة والإنشاءات",
  "Company &mdash; MERAAS Engineering &amp; Construction": "الشركة — مراس للهندسة والإنشاءات",
  "Projects — MERAAS Engineering & Construction": "المشاريع — مراس للهندسة والإنشاءات",
  "Projects &mdash; MERAAS Engineering &amp; Construction": "المشاريع — مراس للهندسة والإنشاءات",
  "Contact — MERAAS Engineering & Construction": "اتصل بنا — مراس للهندسة والإنشاءات",
  "Contact &mdash; MERAAS Engineering &amp; Construction": "اتصل بنا — مراس للهندسة والإنشاءات",
  "Al-Watan Club — MERAAS Engineering & Construction": "نادي الوطن — مراس للهندسة والإنشاءات",
  "Al-Watan Club &mdash; MERAAS Engineering &amp; Construction": "نادي الوطن — مراس للهندسة والإنشاءات",
  "Benghazi University — MERAAS Engineering & Construction": "جامعة بنغازي — مراس للهندسة والإنشاءات",
  "Benghazi University &mdash; MERAAS Engineering &amp; Construction": "جامعة بنغازي — مراس للهندسة والإنشاءات",
  "Benghazi Corniche — MERAAS Engineering & Construction": "كورنيش بنغازي — مراس للهندسة والإنشاءات",
  "Benghazi Corniche &mdash; MERAAS Engineering &amp; Construction": "كورنيش بنغازي — مراس للهندسة والإنشاءات",
  "Play Ground - MJS — MERAAS Engineering & Construction": "بلاي غراوند - MJS — مراس للهندسة والإنشاءات",
  "Play Ground - MJS &mdash; MERAAS Engineering &amp; Construction": "بلاي غراوند - MJS — مراس للهندسة والإنشاءات",
  "Benghazi Skydive — MERAAS Engineering & Construction": "سكاي دايف بنغازي — مراس للهندسة والإنشاءات",
  "Benghazi Skydive &mdash; MERAAS Engineering &amp; Construction": "سكاي دايف بنغازي — مراس للهندسة والإنشاءات",
  "Benina VIP Lounges — MERAAS Engineering & Construction": "صالات كبار الزوار بمطار بنينا — مراس للهندسة والإنشاءات",
  "Benina VIP Lounges &mdash; MERAAS Engineering &amp; Construction": "صالات كبار الزوار بمطار بنينا — مراس للهندسة والإنشاءات",
  "Benina Airport — VIP Lounges": "صالات كبار الزوار بمطار بنينا",
  "Alsabri Administration — MERAAS Engineering & Construction": "مجمع إدارة الصابري — مراس للهندسة والإنشاءات",
  "Alsabri Administration &mdash; MERAAS Engineering &amp; Construction": "مجمع إدارة الصابري — مراس للهندسة والإنشاءات",
  "Alsabri Administration Complex": "مجمع إدارة الصابري",
  "TBZ Headquarters — MERAAS Engineering & Construction": "المقر الرئيسي لـ TBZ — مراس للهندسة والإنشاءات",
  "TBZ Headquarters &mdash; MERAAS Engineering &amp; Construction": "المقر الرئيسي لـ TBZ — مراس للهندسة والإنشاءات",
  "Aleziyat Complex — MERAAS Engineering & Construction": "مجمع العزيات — مراس للهندسة والإنشاءات",
  "Aleziyat Complex &mdash; MERAAS Engineering &amp; Construction": "مجمع العزيات — مراس للهندسة والإنشاءات",
  "Aleziyat Mixed-Use Complex": "مجمع العزيات متعدد الاستخدامات",
  "Al-Watan Club": "نادي الوطن",
  "Benghazi University": "جامعة بنغازي",
  "Benghazi Corniche": "كورنيش بنغازي",
  "Play Ground — MJS": "بلاي غراوند — MJS",
  "Play Ground &mdash; MJS": "بلاي غراوند — MJS",
  "Play Ground - MJS": "بلاي غراوند - MJS",
  "Benghazi Skydive": "سكاي دايف بنغازي",
  "Benina VIP Lounges": "صالات كبار الزوار ببنينا",
  "Alsabri Administration": "مجمع إدارة الصابري",
  "TBZ Headquarters": "المقر الرئيسي TBZ",
  "Aleziyat Complex": "مجمع العزيات",
  "Work that shapes a nation.": "أعمال تبني معالم الوطن.",
  "Engineering, construction, infrastructure, and heavy equipment — delivered across Libya with certainty, safety, and scale.": "الهندسة، الإنشاءات، البنية التحتية، والمعدات الثقيلة — ننفذها في كافة أنحاء ليبيا بثقة وأمان وكفاءة عالية.",
  "Explore Projects": "استكشف المشاريع",
  "Workforce": "القوى العاملة",
  "Projects completed": "مشروع مكتمل",
  "Regions of Libya": "مناطق في ليبيا",
  "The MERAAS Standard": "معايير مراس للتميز",
  "Engineered for scale.": "هندسة تواكب الحجم.",
  "Defined by excellence.": "ويقودها التميز.",
  "As one of Libya’s premier engineering and construction organisations, MERAAS bridges vision and reality with an unyielding commitment to precision, advanced plant capacity, and end-to-end operational mastery.": "باعتبارها إحدى كبرى المؤسسات الهندسية والإنشائية في ليبيا، تجمع مراس بين الرؤية والتنفيذ بالتزام راسخ بالدقة، وأسطول متطور، وتحكم تشغيلي متكامل في كافة مراحل المشروع.",
  "550+ In-House Workforce": "أكثر من 550 خبيراً ومتخصصاً",
  "150+ Heavy Machinery Units": "أكثر من 150 آلية ثقيلة",
  "100% Integrated Project Command": "إدارة وتحكم متكامل 100%",
  "Rigorous QA/QC & HSE Protocols": "أعلى بروتوكولات الجودة والسلامة",
  "End-to-End In-House Delivery": "تنفيذ متكامل بقدرات ذاتية",
  "We eliminate subcontractor fragmentation by housing all essential engineering, geotechnical, earthworks, and structural disciplines under one unified command structure.": "نقضي على تشتت المقاولين من الباطن عبر جمع كافة التخصصات الهندسية والجيوتقنية والأعمال الترابية والإنشائية تحت قيادة وإشراف موحد.",
  "150+ Heavy Machinery & Equipment": "أسطول يضم أكثر من 150 آلية ومعدة ثقيلة",
  "Our heavy equipment fleet—excavators, pavers, graders, and drilling rigs—ensures rapid mobilization, zero third-party delays, and absolute reliability on complex sites.": "يضمن أسطولنا الخاص من الحفارات والممهدات وآلات الرصف وأجهزة الحفر جاهزية وسرعة فائقة في الانتشار، دون تأخير أو اعتماد على أطراف خارجية.",
  "Certified QA/QC & Safety Standards": "معايير جودة ورقابة فنية معتمدة",
  "From comprehensive soil testing to rigorous structural stress analysis, our on-site laboratories and certified HSE teams ensure unmatched durability and zero-compromise safety.": "من اختبارات التربة الشاملة إلى التحليلات الإنشائية الدقيقة، تضمن مختبراتنا الميدانية وفرق السلامة والصحة المهنية أعلى مستويات المتانة والجودة والأمان.",
  "Shaping Libya’s Future Landmarks": "صناعة معالم المستقبل في ليبيا",
  "Shaping Libya&rsquo;s Future Landmarks": "صناعة معالم المستقبل في ليبيا",
  "With 100+ successfully delivered projects across sports, education, and civic infrastructure, MERAAS is actively rebuilding and revitalizing Libya’s modern architectural landscape.": "بأكثر من 100 مشروع منجز في قطاعات الرياضة والتعليم والمرافق المدنية، تسهم مراس بفاعلية في إعمار وتطوير المشهد المعماري الحديث في ليبيا.",
  "With 100+ successfully delivered projects across sports, education, and civic infrastructure, MERAAS is actively rebuilding and revitalizing Libya&rsquo;s modern architectural landscape.": "بأكثر من 100 مشروع منجز في قطاعات الرياضة والتعليم والمرافق المدنية، تسهم مراس بفاعلية في إعمار وتطوير المشهد المعماري الحديث في ليبيا.",
  "Integrated Capacity": "تكامل القدرات",
  "Direct Fleet Power": "قوة الأسطول الذاتي",
  "Engineering Rigor": "دقة هندسية صارمة",
  "National Impact": "أثر وطني ملموس",
  "Explore our capabilities": "استكشف قدراتنا الهندسية",
  "Explore our services": "استكشف خدماتنا الهندسية",
  "All services": "كافة الخدمات",
  "About MERAAS": "عن مراس",
  "Engineering,": "الهندسة،",
  "construction and": "الإنشاءات وكل",
  "everything between.": "ما بينهما.",
  "Engineering, construction and everything between.": "الهندسة، الإنشاءات وكل ما بينهما.",
  "MERAAS Engineering & Construction provides integrated engineering, construction, infrastructure, geotechnical, project management and heavy equipment services.": "تقدم مراس للهندسة والإنشاءات خدمات متكاملة في الهندسة والإنشاءات والبنية التحتية والهندسة الجيوتقنية وإدارة المشاريع والمعدات الثقيلة.",
  "MERAAS Engineering &amp; Construction provides integrated engineering, construction, infrastructure, geotechnical, project management and heavy equipment services.": "تقدم مراس للهندسة والإنشاءات خدمات متكاملة في الهندسة والإنشاءات والبنية التحتية والهندسة الجيوتقنية وإدارة المشاريع والمعدات الثقيلة.",
  "With approximately 550 employees, MERAAS combines engineering expertise, practical experience, modern equipment, quality management and strong project coordination to deliver reliable, efficient and high-quality solutions across Libya.": "بفريق يضم نحو 550 موظفاً، تجمع مراس بين الخبرة الهندسية والتجربة العملية والمعدات الحديثة وإدارة الجودة والتنسيق القوي للمشاريع لتقديم حلول موثوقة وفعالة وعالية الجودة في أنحاء ليبيا.",
  "We focus on delivering projects that meet today’s needs while shaping a better future through precision, resilience and innovation.": "نركز على تنفيذ مشاريع تلبي احتياجات اليوم وتسهم في صنع مستقبل أفضل بالدقة والمرونة والابتكار.",
  "We focus on delivering projects that meet today&rsquo;s needs while shaping a better future through precision, resilience and innovation.": "نركز على تنفيذ مشاريع تلبي احتياجات اليوم وتسهم في صنع مستقبل أفضل بالدقة والمرونة والابتكار.",
  "About the company": "عن الشركة",
  "MERAAS // ABOUT": "مراس // نبذة تعريفية",
  "MERAAS // CORPORATE OVERVIEW": "مراس // نظرة عامة",
  "Built across Libya.": "نبني في أنحاء ليبيا.",
  "Our project presence spans five regions, with the largest concentration in Benghazi and active work across key areas of the country.": "يمتد حضور مشاريعنا عبر خمس مناطق، مع التركيز الأكبر في بنغازي وأعمال نشطة في مناطق رئيسية من البلاد.",
  "Regions with project activity": "مناطق تشهد نشاطاً للمشاريع",
  "Partner companies": "الشركات الشريكة",
  "Select a logo to visit the company website.": "اختر شعاراً لزيارة موقع الشركة.",
  "MERAAS in numbers": "مراس بالأرقام",
  "Scale, resource and reach - measured.": "حجم وموارد وانتشار يمكن قياسه.",
  "Scale, resource and reach — measured.": "حجم وموارد وانتشار يمكن قياسه.",
  "Scale, resource and reach &mdash; measured.": "حجم وموارد وانتشار يمكن قياسه.",
  "Total workforce": "إجمالي القوى العاملة",
  "Engineers & specialists": "مهندسون ومتخصصون",
  "Engineers &amp; specialists": "مهندسون ومتخصصون",
  "Nationalities": "جنسيات",
  "Machinery & equipment": "آليات ومعدات",
  "Machinery &amp; equipment": "آليات ومعدات",
  "Active projects": "مشاريع نشطة",
  "Our clients": "عملاؤنا",
  "Trusted by national development organisations and engineering partners delivering complex work across Libya.": "موضع ثقة مؤسسات التنمية الوطنية والشركاء الهندسيين في تنفيذ الأعمال المعقدة في أنحاء ليبيا.",
  "Selected projects": "مشاريع مختارة",
  "Work that has": "أعمال صممت",
  "to stand up.": "لتصمد.",
  "All projects": "جميع المشاريع",
  "All Projects": "كافة المشاريع",
  "View project": "عرض المشروع",
  "Our expertise.": "خبراتنا وتخصصاتنا.",
  "Comprehensive engineering and construction services covering civil works, infrastructure and road construction, earthworks, geotechnical engineering, project management, technical services, and plant and machinery operations.": "خدمات هندسية وإنشائية شاملة تغطي الأعمال المدنية، والبنية التحتية، ورصف الطرق، والأعمال الترابية، والهندسة الجيوتقنية، وإدارة المشاريع، والخدمات الفنية، وتشغيل الآليات الثقيلة.",
  "Full-scope capability.": "قدرات شاملة ومتكاملة.",
  "Every discipline needed to take a project from early ground investigation through to handover — held and delivered in-house.": "كافة التخصصات اللازمة للمشروع من أولى مراحل فحص التربة وحتى التسليم النهائي — نوفرها بقدراتنا الذاتية.",
  "Civil Works & Construction": "الأعمال المدنية والإنشائية",
  "Civil Works &amp; Construction": "الأعمال المدنية والإنشائية",
  "Turnkey construction of residential, commercial, industrial and educational facilities, reinforced concrete structures, structural steel, architectural finishing and building restoration.": "تنفيذ متكامل للمباني السكنية والتجارية والصناعية والتعليمية، والهياكل الخرسانية المسلحة، والمنشآت الفولاذية، والتشطيبات المعمارية، وترميم المباني.",
  "Infrastructure & Road Construction": "البنية التحتية ورصف الطرق",
  "Infrastructure &amp; Road Construction": "البنية التحتية ورصف الطرق",
  "Highway and urban road construction, asphalt paving, storm water and drainage networks, potable water networks, sewage systems and utility infrastructure.": "إنشاء الطرق السريعة والحضرية، ورصف الأسفلت، وشبكات تصريف مياه الأمطار، وخطوط مياه الشرب، وشبكات الصرف الصحي، ومرافق البنية التحتية.",
  "Earthworks & Site Development": "الأعمال الترابية وتطوير المواقع",
  "Earthworks &amp; Site Development": "الأعمال الترابية وتطوير المواقع",
  "Bulk excavation, precision site grading, soil cut and fill, land reclamation, sub-base preparation and compaction testing for major infrastructure and building sites.": "الحفريات الكبرى، والتسوية الدقيقة للمواقع، والقطع والردم، واستصلاح الأراضي، وتجهيز طبقات الأساس، واختبارات الدمك لمواقع البنية التحتية والمباني.",
  "Geotechnical & Foundation Engineering": "الهندسة الجيوتقنية والأساسات",
  "Geotechnical &amp; Foundation Engineering": "الهندسة الجيوتقنية والأساسات",
  "Soil investigation, borehole drilling, deep foundation piling, retaining structures, slope stabilisation, groundwater control and comprehensive geotechnical laboratory testing.": "فحوصات التربة، وحفر الآبار الاستكشافية، والخوازيق العميقة، والجدران الاستنادية، وتثبيت المنحدرات، ونزح المياه الجوفية، والاختبارات المعملية الشاملة.",
  "Project Management & Engineering Services": "إدارة المشاريع والخدمات الهندسية",
  "Project Management &amp; Engineering Services": "إدارة المشاريع والخدمات الهندسية",
  "Detailed engineering design, BIM and CAD modeling, value engineering, project scheduling, cost control, procurement, on-site supervision and contract administration.": "التصميم الهندسي التفصيلي، والنمذجة بنظام BIM وCAD، والهندسة القيمة، والجداول الزمنية، وضبط التكاليف، والمشتريات، والإشراف الميداني، وإدارة العقود.",
  "Plant & Machinery Operations": "تشغيل وصيانة الآليات الثقيلة",
  "Plant &amp; Machinery Operations": "تشغيل وصيانة الآليات الثقيلة",
  "Deployment of heavy earthmoving machinery, asphalt paving trains, concrete batching and placement equipment, mobile cranes, and an extensive transport and logistics fleet.": "تشغيل أسطول الآليات الثقيلة، وقطارات رصف الأسفلت، ومعدات خلط وصب الخرسانة، والرافعات المتحركة، وشبكة النقل والخدمات اللوجستية.",
  "Direct Fleet Capability": "جاهزية الأسطول المباشرة",
  "Our Machinery Fleet": "أسطول آلياتنا ومعداتنا",
  "MERAAS maintains an extensive in-house fleet of modern heavy plant and equipment, ensuring rapid mobilization and independent operational capacity across Libya.": "تمتلك مراس أسطولاً ضخماً من المعدات والآليات الثقيلة الحديثة، مما يضمن سرعة الانتشار والقدرة التشغيلية المستقلة في كافة المواقع.",
  "Heavy Earthmoving": "معدات الحفر ونقل الأتربة",
  "Hydraulic excavators (20–45 ton), tracked bulldozers (D6–D8), wheel loaders, and motor graders with GPS grading systems.": "حفارات هيدروليكية (20-45 طن)، جرافات مجنزرة (D6-D8)، شاحنات تحميل، وممهدات مزودة بأنظمة توجيه GPS.",
  "Compaction & Soil": "معدات الدمك ومعالجة التربة",
  "Compaction &amp; Soil": "معدات الدمك ومعالجة التربة",
  "Single drum vibratory rollers, pneumatic tyre rollers, tandem asphalt compactors, and trench compactors for certified density.": "مداحل اهتزازية أحادية، مداحل إطارات هوائية، مداحل أسفلت مزدوجة، ومداحل خنادق لتحقيق أعلى نسب الدمك.",
  "Paving & Surfacing": "معدات رصف الأسفلت والسطوح",
  "Paving &amp; Surfacing": "معدات رصف الأسفلت والسطوح",
  "Tracked asphalt pavers with electronic screed controls, bitumen pressure distributors, cold milling planers, and road sweepers.": "آلات رصف أسفلت مجنزرة بأنظمة تسوية إلكترونية، موزعات البيتومين المضغوط، قاشطات الأسفلت، ومكانس الطرق.",
  "Transport & Logistics": "النقل والإمداد اللوجستي",
  "Transport &amp; Logistics": "النقل والإمداد اللوجستي",
  "Heavy tipper trucks (18–32m³), low-bed heavy equipment transporters, fuel and water tankers, and site service support vehicles.": "شاحنات قلابة ثقيلة (18-32 م³)، ناقلات معدات ثقيلة منخفضة السطح، صهاريج وقود ومياه، ومركبات دعم ميداني.",
  "Lifting & Cranes": "الرافعات ومعدات الرفع",
  "Lifting &amp; Cranes": "الرافعات ومعدات الرفع",
  "Mobile all-terrain telescopic cranes, rough terrain cranes, knuckle-boom truck-mounted cranes, and telehandlers.": "رافعات تلسكوبية لكافة التضاريس، رافعات الأراضي الوعرة، رافعات شاحنات مفصلية، ورافعات شوكية تلسكوبية.",
  "Power & Utilities": "المولدات والمرافق الميدانية",
  "Power &amp; Utilities": "المولدات والمرافق الميدانية",
  "Heavy-duty diesel generators (50–500 kVA), mobile lighting towers, high-volume dewatering pumps, and site batching equipment.": "مولدات ديزل ثقيلة (50-500 ك.ف.أ)، أبراج إضاءة متحركة، مضخات نزح مياه عالية السعة، ومعدات خلط ميدانية.",
  "Strong foundations. Lasting impact.": "أسس راسخة. أثر يدوم.",
  "Strong": "أسس",
  "foundations.": "راسخة.",
  "Lasting impact.": "أثر يدوم.",
  "A Libya-based engineering and construction company built to hold every discipline a project needs under one roof.": "شركة هندسية وإنشائية ليبية تأسست لتجمع كافة التخصصات التي يحتاجها المشروع تحت سقف واحد.",
  "About us": "من نحن",
  "MERAAS Engineering & Construction.": "مراس للهندسة والإنشاءات.",
  "MERAAS Engineering &amp; Construction.": "مراس للهندسة والإنشاءات.",
  "A Libya-based engineering and construction company providing integrated engineering, construction, infrastructure, geotechnical, project management and heavy equipment services.": "شركة هندسية وإنشائية ليبية تقدم خدمات متكاملة في الهندسة، الإنشاءات، البنية التحتية، الهندسة الجيوتقنية، إدارة المشاريع، والآليات الثقيلة.",
  "At MERAAS we believe in building with purpose. Our multidisciplinary team combines international experience, technical expertise and a strong commitment to quality — and we focus on delivering projects that not only meet today’s needs but also shape a better future through precision, resilience and innovation.": "نؤمن في مراس بالبناء الهادف. يجمع فريقنا متعدد التخصصات بين الخبرة الدولية والمهارة الفنية والالتزام الراسخ بالجودة — لنقدم مشاريع تلبي متطلبات الحاضر وتصنع مستقبلاً أفضل بالدقة والابتكار.",
  "At MERAAS we believe in building with purpose. Our multidisciplinary team combines international experience, technical expertise and a strong commitment to quality &mdash; and we focus on delivering projects that not only meet today&rsquo;s needs but also shape a better future through precision, resilience and innovation.": "نؤمن في مراس بالبناء الهادف. يجمع فريقنا متعدد التخصصات بين الخبرة الدولية والمهارة الفنية والالتزام الراسخ بالجودة — لنقدم مشاريع تلبي متطلبات الحاضر وتصنع مستقبلاً أفضل بالدقة والابتكار.",
  "Guiding principles": "المبادئ التوجيهية",
  "Purpose-driven vision. Measurable mission.": "رؤية هادفة. ورسالة قابلة للقياس.",
  "Purpose-driven vision.": "رؤية هادفة.",
  "Measurable mission.": "ورسالة قابلة للقياس.",
  "Purpose-driven vision.<br>Measurable mission.": "رؤية هادفة.<br>ورسالة قابلة للقياس.",
  "Our mission": "رسالتنا",
  "Turning ideas into durable environments.": "تحويل الأفكار إلى بيئات عمرانية مستدامة.",
  "Our mission is to deliver integrated engineering and construction solutions that combine creativity, technical excellence and practical expertise.": "رسالتنا هي تقديم حلول هندسية وإنشائية متكاملة تجمع بين الإبداع والتميز الفني والخبرة التطبيقية.",
  "We are committed to transforming ideas into efficient, durable and high-quality built environments through coordinated design, advanced engineering and reliable project execution — maintaining high standards of quality, safety, sustainability and technical performance.": "نلتزم بتحويل الأفكار إلى بيئات عمرانية عالية الجودة وعالية الكفاءة من خلال التصميم المتناسق والهندسة المتقدمة والتنفيذ الموثوق — مع الحفاظ على أعلى معايير الجودة والسلامة والاستدامة والأداء الفني.",
  "We are committed to transforming ideas into efficient, durable and high-quality built environments through coordinated design, advanced engineering and reliable project execution &mdash; maintaining high standards of quality, safety, sustainability and technical performance.": "نلتزم بتحويل الأفكار إلى بيئات عمرانية عالية الجودة وعالية الكفاءة من خلال التصميم المتناسق والهندسة المتقدمة والتنفيذ الموثوق — مع الحفاظ على أعلى معايير الجودة والسلامة والاستدامة والأداء الفني.",
  "Our vision": "رؤيتنا",
  "Shaping the future of the built environment.": "صياغة مستقبل البيئة العمرانية.",
  "Our vision is to shape the future of the built environment through engineering excellence, innovation and integrated project delivery.": "رؤيتنا هي قيادة وتطوير مستقبل البيئة العمرانية من خلال التميز الهندسي والابتكار والتنفيذ المتكامل للمشاريع.",
  "We aim to be a leading engineering and construction partner known for quality, reliability and technical competence across Libya — delivering complex projects safely, on time and to the highest standards.": "نهدف إلى أن نكون الشريك الهندسي والإنشائي الرائد المعروف بالجودة والموثوقية والكفاءة الفنية في كافة أنحاء ليبيا — وإنجاز المشاريع المعقدة بأمان وفي الوقت المحدد ووفق أعلى المعايير.",
  "We aim to be a leading engineering and construction partner known for quality, reliability and technical competence across Libya &mdash; delivering complex projects safely, on time and to the highest standards.": "نهدف إلى أن نكون الشريك الهندسي والإنشائي الرائد المعروف بالجودة والموثوقية والكفاءة الفنية في كافة أنحاء ليبيا — وإنجاز المشاريع المعقدة بأمان وفي الوقت المحدد ووفق أعلى المعايير.",
  "QHSE Commitment": "التزامنا بالجودة والسلامة والبيئة",
  "Quality, Health, Safety & Environment": "الجودة، الصحة، السلامة، والبيئة",
  "Quality, Health, Safety &amp; Environment": "الجودة، الصحة، السلامة، والبيئة",
  "At MERAAS, QHSE is not a department — it is the operating system for everything we build. Our integrated management framework ensures zero compromise on safety and precision across all job sites.": "في مراس، لا تعد الجودة والسلامة مجرد إدارة — بل هي نظام التشغيل لكافة أعمالنا. يضمن إطار إدارتنا المتكامل عدم التهاون إطلاقاً في معايير الأمان والدقة في جميع المواقع.",
  "At MERAAS, QHSE is not a department &mdash; it is the operating system for everything we build. Our integrated management framework ensures zero compromise on safety and precision across all job sites.": "في مراس، لا تعد الجودة والسلامة مجرد إدارة — بل هي نظام التشغيل لكافة أعمالنا. يضمن إطار إدارتنا المتكامل عدم التهاون إطلاقاً في معايير الأمان والدقة في جميع المواقع.",
  "ISO 9001:2015 Quality Management": "ISO 9001:2015 إدارة الجودة",
  "Certified quality assurance processes covering material testing, structural tolerances, execution protocols, and independent third-party audits.": "إجراءات ضمان جودة معتمدة تشمل فحص المواد، ومطابقة التفاوتات الإنشائية، وبروتوكولات التنفيذ، والتدقيق المستقل.",
  "ISO 45001:2018 Occupational Health & Safety": "ISO 45001:2018 الصحة والسلامة المهنية",
  "ISO 45001:2018 Occupational Health &amp; Safety": "ISO 45001:2018 الصحة والسلامة المهنية",
  "Proactive hazard identification, mandatory PPE compliance, continuous site safety training, and an unyielding zero-accident culture.": "تحديد استباقي للمخاطر، والالتزام الصارم بمعدات الوقاية، والتدريب المستمر على السلامة، وثقافة عمل تستهدف صفر حوادث.",
  "ISO 14001:2015 Environmental Stewardship": "ISO 14001:2015 الإدارة البيئية",
  "Sustainable construction methodologies, responsible dust and runoff control, waste recycling programs, and optimized fuel utilization across plant equipment.": "منهجيات بناء مستدامة، وتحكم مسؤول في الغبار والمياه، وبرامج إعادة تدوير المخلفات، وكفاءة استهلاك الوقود في كافة الآليات.",
  "Leadership & Governance": "القيادة والحوكمة",
  "Leadership &amp; Governance": "القيادة والحوكمة",
  "Experienced direction across every discipline.": "إدارة خبيرة تقود كافة التخصصات الهندسية.",
  "General Director": "المدير العام",
  "Strategic direction, operational coordination and client relations.": "التوجيه الاستراتيجي، والتنسيق التشغيلي، وعلاقات العملاء والشركاء.",
  "Technical Director": "المدير الفني",
  "Engineering standards, technical oversight and project delivery.": "المعايير الهندسية، والإشراف الفني، وضمان تسليم المشاريع.",
  "Head of Operations": "رئيس العمليات",
  "Site execution, resource planning, plant deployment and safety compliance.": "التنفيذ الميداني، وتخطيط الموارد، وتشغيل الأسطول، والامتثال للسلامة.",
  "Head of Geotechnical": "رئيس قسم الهندسة الجيوتقنية",
  "Soil investigation, laboratory testing and foundation engineering.": "فحوصات التربة، والاختبارات المعملية، وهندسة الأساسات.",
  "All": "الكل",
  "Sports & Leisure": "الرياضة والترفيه",
  "Sports &amp; Leisure": "الرياضة والترفيه",
  "Education": "التعليم",
  "Civic & Urban": "مدني وحضري",
  "Civic &amp; Urban": "مدني وحضري",
  "Institutional & Civic": "مؤسسي ومدني",
  "Institutional &amp; Civic": "مؤسسي ومدني",
  "Interiors & Aviation": "تصميم داخلي وطيران",
  "Interiors &amp; Aviation": "تصميم داخلي وطيران",
  "Commercial & Corporate": "تجاري وإداري",
  "Commercial &amp; Corporate": "تجاري وإداري",
  "Commercial & Residential": "تجاري وسكني",
  "Commercial &amp; Residential": "تجاري وسكني",
  "Let’s build something lasting.": "معاً.. لنبني إنجازاً يدوم.",
  "Let’s build": "معاً..",
  "something lasting.": "لنبني إنجازاً يدوم.",
  "Every project we take on begins with understanding the site, the programme and what success actually looks like for you.": "كل مشروع نتولاه يبدأ بفهم دقيق للموقع والبرنامج والهدف الحقيقي لنجاح رؤيتكم.",
  "Get in touch": "تواصل معنا",
  "Tell us about your project.": "أخبرنا عن تفاصيل مشروعك.",
  "Tell us about": "أخبرنا عن",
  "your project.": "تفاصيل مشروعك.",
  "Reach the right division.": "تواصل مع القسم المعني.",
  "Write directly to the division that handles your request.": "راسل القسم المختص بطلبكم مباشرةً.",
  "Engineering Division": "الإدارة الهندسية",
  "Technical enquiries, project scopes, design and engineering coordination.": "الاستفسارات الفنية ونطاقات المشاريع والتصميم والتنسيق الهندسي.",
  "Finance Division": "الإدارة المالية",
  "Invoices, payments, accounts and financial matters.": "الفواتير والمدفوعات والحسابات والشؤون المالية.",
  "Contracts Office": "مكتب العقود",
  "Contracts, tenders, agreements and commercial documentation.": "العقود والمناقصات والاتفاقيات والمستندات التجارية.",
  "General information": "معلومات عامة",
  "We are not hiring right now. New roles across MERAAS departments will be listed here as they open.": "لا يوجد توظيف حالياً. ستُعرض الوظائف الجديدة في إدارات مراس هنا فور فتح باب التقديم.",
  "No open positions at the moment.": "لا توجد وظائف شاغرة حالياً.",
  "Please check back soon for new opportunities.": "يرجى معاودة الزيارة قريباً للاطلاع على الفرص الجديدة.",
  "Page not found — MERAAS Engineering & Construction": "الصفحة غير موجودة — مراس للهندسة والإنشاءات",
  "Page not found &mdash; MERAAS Engineering &amp; Construction": "الصفحة غير موجودة — مراس للهندسة والإنشاءات",
  "Page not": "الصفحة",
  "found.": "غير موجودة.",
  "The page you are looking for has moved or no longer exists.": "الصفحة التي تبحث عنها نُقلت أو لم تعد موجودة.",
  "Back to home": "العودة إلى الرئيسية",
  "Corporate Email": "البريد المؤسسي",
  "Official Domain": "الموقع الرسمي",
  "Headquarters": "المقر الرئيسي",
  "Head Office": "المقر الرئيسي",
  "Qaryounis Golden Square": "المربع الذهبي قاريونس",
  "Qaryounis Golden Square, Benghazi": "المربع الذهبي قاريونس، بنغازي",
  "Get directions": "الحصول على الاتجاهات",
  "Working Hours": "ساعات العمل",
  "Sat – Thu: 09:00 – 17:00": "السبت - الخميس: 09:00 - 17:00",
  "Sat &ndash; Thu: 09:00 &ndash; 17:00": "السبت - الخميس: 09:00 - 17:00",
  "Active Regional Project Presence": "حضور وانتشار المشاريع الإقليمي النشط",
  "Benghazi HQ": "المقر الرئيسي - بنغازي",
  "Tripoli Region": "منطقة طرابلس",
  "Misrata & Central": "مصراتة والمنطقة الوسطى",
  "Misrata &amp; Central": "مصراتة والمنطقة الوسطى",
  "Southern Libya": "المنطقة الجنوبية",
  "Eastern Region": "المنطقة الشرقية",
  "Name *": "الاسم *",
  "Email *": "البريد الإلكتروني *",
  "Phone": "رقم الهاتف",
  "Project type": "نوع المشروع",
  "Civil works": "أعمال مدنية",
  "Infrastructure / roads": "بنية تحتية / طرق",
  "Earthworks & site development": "أعمال ترابية وتطوير مواقع",
  "Earthworks &amp; site development": "أعمال ترابية وتطوير مواقع",
  "Geotechnical investigation": "تحريات وفحوصات جيوتقنية",
  "Architecture & interiors": "عمارة وتصميم داخلي",
  "Architecture &amp; interiors": "عمارة وتصميم داخلي",
  "Master planning": "مخططات عامة",
  "Project management": "إدارة مشاريع",
  "Other": "أخرى",
  "Project details *": "تفاصيل المشروع *",
  "Send enquiry": "إرسال الاستفسار",
  "Thank you": "شكراً لتواصلكم",
  "Your message has been received. Our engineering team will review your project details and respond within 24 hours.": "تم استلام رسالتكم بنجاح. سيقوم فريقنا الهندسي بمراجعة تفاصيل المشروع والتواصل معكم خلال 24 ساعة.",
  "Project Overview": "نظرة عامة على المشروع",
  "Visual Documentation": "التوثيق المرئي والمعماري",
  "Architectural & Facility Showcase": "معرض الصور والمعالم المعمارية",
  "Architectural &amp; Facility Showcase": "معرض الصور والمعالم المعمارية",
  "Architectural Showcase": "معرض الصور المعمارية",
  "Comprehensive photographic documentation of completed facilities, structural elements, materials and landscape integration. Click any image to view in high resolution.": "توثيق فوتوغرافي شامل للمرافق المكتملة والعناصر الإنشائية والمواد وتنسيق الموقع. انقر على أي صورة لعرضها بدقة عالية.",
  "High-resolution photographic record of completed works. Click any photo to expand into the fullscreen viewer.": "سجل فوتوغرافي عالي الدقة للأعمال المنجزة. انقر على أي صورة للتكبير.",
  "Key Engineering Highlights": "أبرز المنجزات الهندسية",
  "Technical Datasheet": "بطاقة البيانات الفنية",
  "Inquire on Similar Project": "استفسر عن مشروع مماثل",
  "MERAAS Execution Capabilities": "قدرات التنفيذ لدى مراس",
  "Disciplines Deployed on Site": "التخصصات الهندسية المنفذة في الموقع",
  "Executed entirely through our in-house workforce, specialized plant machinery, and certified quality management systems.": "نُفذت بالكامل عبر كفاءاتنا الذاتية، وأسطول آلياتنا التخصصي، وأنظمة إدارة الجودة المعتمدة.",
  "Next Case Study": "المشروع التالي",
  "Turnkey Delivery": "تسليم متكامل مفتاح باليد",
  "Location": "الموقع",
  "Client": "الجهة المالكة",
  "Year": "السنة",
  "Year Completed": "سنة الإنجاز",
  "Category": "التصنيف",
  "Primary Scope": "نطاق العمل الرئيسي",
  "Scope": "نطاق العمل",
  "Expand View": "تكبير الصورة",
  "Master Perspective": "المشهد الرئيسي للموقع",
  "Perspective 1": "المشهد المعماري 1",
  "Perspective 2": "المشهد المعماري 2",
  "Perspective 3": "المشهد المعماري 3",
  "Perspective 4": "المشهد المعماري 4",
  "Perspective 5": "المشهد المعماري 5",
  "Perspective 6": "المشهد المعماري 6",
  "Perspective 7": "المشهد المعماري 7",
  "Perspective 8": "المشهد المعماري 8",
  "Perspective 9": "المشهد المعماري 9",
  "Perspective 10": "المشهد المعماري 10",
  "Architectural View 1": "مشهد معماري 1",
  "Architectural View 2": "مشهد معماري 2",
  "Detail View 3": "تفصيل معماري 3",
  "Detail View 4": "تفصيل معماري 4",
  "Detail View 5": "تفصيل معماري 5",
  "Facility View 6": "مشهد المرفق 6",
  "Facility View 7": "مشهد المرفق 7",
  "Facility View 8": "مشهد المرفق 8",
  "Facility View 9": "مشهد المرفق 9",
  "Facility View 10": "مشهد المرفق 10",
  "01 / DISCIPLINE": "01 / التخصص",
  "02 / DISCIPLINE": "02 / التخصص",
  "03 / DISCIPLINE": "03 / التخصص",
  "04 / DISCIPLINE": "04 / التخصص",
  "Al-Watan Shooting & Equestrian Club": "نادي الوطن للرماية والفروسية",
  "Al-Watan Shooting &amp; Equestrian Club": "نادي الوطن للرماية والفروسية",
  "Harmonious design for horse and landscape — an exceptional equine and sporting environment.": "تصميم متناسق يجمع بين الخيل والطبيعة — بيئة استثنائية للفروسية والرياضة.",
  "Harmonious design for horse and landscape &mdash; an exceptional equine environment.": "تصميم متناسق يجمع بين الخيل والطبيعة — بيئة استثنائية للفروسية.",
  "Integrated equestrian architecture engineered for separated equine, spectator, and service circulation.": "عمارة فروسية متكاملة مصممة بمسارات حركة منفصلة للخيول والجمهور والخدمات.",
  "A comprehensive equestrian and shooting complex that integrates professional training, horse care, international competition, and visitor amenities inside a single coherent master plan.": "مجمع متكامل للفروسية والرماية يجمع بين التدريب الاحترافي ورعاية الخيل والمسابقات الدولية ومرافق الزوار ضمن مخطط عام موحد.",
  "The development brings together riding tracks, 4 internal air-conditioned stables, 18 external ventilated stables, saddling areas, veterinary and clinic facilities, VIP and public viewing grandstands, cafes, fine dining, a competition shooting range, and supporting infrastructure.": "يضم المشروع مسارات وحلبات ركوب، 4 إسطبلات داخلية مكيفة، 18 إسطبلاً خارجياً، مناطق تجهيز وسروج، مرافق عيادة بيطرية، منصات مشاهدة لكبار الزوار والجمهور، مقاهي ومطاعم، ميدان رماية، وبنية تحتية داعمة.",
  "Circulation was the primary organising principle. Equine transit routes, spectator walkways, and logistical service arteries are strictly isolated from end to end, ensuring seamless operations on tournament and training days alike. The grandstand, clubhouse, and stables share a cohesive material language of stone, render, and dark tile.": "شكلت مسارات الحركة المبدأ التنظيمي الأساسي للمشروع؛ حيث فُصلت مسارات الخيول وممشى الجمهور ومسارات الخدمات اللوجستية فصلاً تاماً لضمان سلاسة التشغيل. تتكامل المنصة والمبنى الرئيسي والإسطبلات بلغة معمارية موحدة من الحجر والطلاء والآجر الداكن.",
  "Separate Equine & Spectator Circulation Arteries": "مسارات حركة مستقلة للخيول والجمهور والخدمات",
  "Separate Equine &amp; Spectator Circulation Arteries": "مسارات حركة مستقلة للخيول والجمهور والخدمات",
  "100% In-House Earthworks, Grading & Foundations": "تنفيذ ذاتي 100% للأعمال الترابية والتسوية والأساسات",
  "100% In-House Earthworks, Grading &amp; Foundations": "تنفيذ ذاتي 100% للأعمال الترابية والتسوية والأساسات",
  "Specialized Veterinary Care & Isolation Units": "عيادة بيطرية متخصصة ووحدات عزل ورعاية متكاملة",
  "Specialized Veterinary Care &amp; Isolation Units": "عيادة بيطرية متخصصة ووحدات عزل ورعاية متكاملة",
  "Competition-Grade Riding Arenas & Shooting Ranges": "حلبات ركوب وميادين رماية بمواصفات المنافسات الدولية",
  "Competition-Grade Riding Arenas &amp; Shooting Ranges": "حلبات ركوب وميادين رماية بمواصفات المنافسات الدولية",
  "Master Plan, Architecture, Civil Works & Landscaping": "مخطط عام، عمارة، أعمال مدنية وتنسيق مواقع",
  "Master Plan, Architecture, Civil Works &amp; Landscaping": "مخطط عام، عمارة، أعمال مدنية وتنسيق مواقع",
  "Full Turnkey EPC Delivery": "تسليم متكامل للمشروع بنظام الهندسة والتوريد والإنشاء",
  "Competition & Training Tracks": "حلبات ومسارات سباق وتدريب",
  "Competition &amp; Training Tracks": "حلبات ومسارات سباق وتدريب",
  "4 Internal · 18 External": "4 إسطبلات داخلية · 18 إسطبلاً خارجياً",
  "4 Internal &middot; 18 External": "4 إسطبلات داخلية · 18 إسطبلاً خارجياً",
  "Veterinary Clinic, Shooting Range, Cafes": "عيادة بيطرية، ميدان رماية، ومقاهي",
  "VIP Lounge & Public Stadium": "منصة كبار الزوار ومدرجات عامة",
  "VIP Lounge &amp; Public Stadium": "منصة كبار الزوار ومدرجات عامة",
  "ISO 9001 & ISO 45001 Certified": "معتمد وفق معايير ISO 9001 وISO 45001",
  "ISO 9001 &amp; ISO 45001 Certified": "معتمد وفق معايير ISO 9001 وISO 45001",
  "Benghazi University — College of Law & Planetarium": "جامعة بنغازي — كلية القانون والقبة السماوية",
  "Benghazi University &mdash; College of Law &amp; Planetarium": "جامعة بنغازي — كلية القانون والقبة السماوية",
  "Adhering to international standards — excellence in modern academic and scientific architecture.": "التزام بأعلى المعايير الدولية — تميز في العمارة الأكاديمية والعلمية الحديثة.",
  "Adhering to international standards &mdash; excellence in academic design.": "التزام بالمعايير الدولية — تميز في التصميم الأكاديمي.",
  "A dual-programme landmark uniting structured legal academia with an immersive astronomical dome.": "صرح مزدوج يجمع بين كلية القانون وقبة فلكية تفاعلية غامرة.",
  "A landmark educational complex comprising the College of Law and a public Planetarium, designed to give the University of Benghazi campus a distinct academic identity and state-of-the-art learning facilities.": "مجمع تعليمي بارز يضم كلية القانون وقبة فلكية عامة، صُمم ليمنح الحرم الجامعي هوية أكاديمية فريدة ومرافق تعليمية متطورة.",
  "The two structures respond to complementary spatial needs: The College of Law is disciplined and rhythmic — featuring louvred academic wings around a central courtyard, tiered lecture halls, administrative suites, and a fully equipped moot court. The Planetarium forms a dramatic spherical counterpoint, clad in geometric mashrabiya-inspired patterns.": "يستجيب المبنيان لمتطلبات وظيفية متكاملة؛ فكلية القانون تتسم بالانضباط المعماري والأجنحة التعليمية المظللة حول فناء وسطي، مع قاعات محاضرات مدرجة ومحكمة صورية، بينما تشكل القبة السماوية معلماً كروياً مبهراً مكسواً بزخارف هندسية مستوحاة من المشربيات.",
  "The planetarium dome features a 360-degree cylindrical concave auditorium designed for seamless immersive projection of celestial mechanics, scientific films, and public exhibitions. MERAAS executed comprehensive structural reinforcement, specialized acoustics, and precision mechanical systems.": "تتميز القبة السماوية بقاعة أسطوانية مقعرة بزاوية 360 درجة مخصصة للعروض الفلكية والأفلام العلمية التفاعلية. نفذت مراس تدعيماً إنشائياً شاملاً، ومعالجات صوتية متخصصة، وأنظمة ميكانيكية فائقة الدقة.",
  "Multi-Tier Lecture Auditoriums & Moot Court": "مدرجات محاضرات متعددة المستويات ومحكمة صورية",
  "Multi-Tier Lecture Auditoriums &amp; Moot Court": "مدرجات محاضرات متعددة المستويات ومحكمة صورية",
  "Spherical Geometric Screen with Cultural Motifs": "قبة هندسية كروية مستوحاة من الزخارف المعمارية",
  "Structural Strengthening & Seismic Verification": "تدعيم إنشائي واختبارات السلامة الزلزالية",
  "Structural Strengthening &amp; Seismic Verification": "تدعيم إنشائي واختبارات السلامة الزلزالية",
  "Acoustic Ceiling Systems & Climate Control": "أنظمة أسقف صوتية وعزل حراري وتكييف متطور",
  "Acoustic Ceiling Systems &amp; Climate Control": "أنظمة أسقف صوتية وعزل حراري وتكييف متطور",
  "Libyan Construction & Stabilization Fund": "صندوق إعادة إعمار واستقرار ليبيا",
  "Libyan Construction &amp; Stabilization Fund": "صندوق إعادة إعمار واستقرار ليبيا",
  "Libyan Construction Fund": "صندوق إعادة إعمار ليبيا",
  "Higher Education & Civic": "تعليم عالي ومرافق مدنية",
  "Higher Education &amp; Civic": "تعليم عالي ومرافق مدنية",
  "Reconstruction & Turnkey Finishing": "إعادة إعمار وتشطيبات متكاملة",
  "Reconstruction &amp; Turnkey Finishing": "إعادة إعمار وتشطيبات متكاملة",
  "College of Law + Planetarium": "كلية القانون + القبة السماوية",
  "Lecture Theatres, Moot Court, Dome": "قاعات محاضرات، محكمة صورية، وقبة فلكية",
  "1,500+ Students & Visitors": "سعة تستوعب أكثر من 1500 طالب وزائر",
  "1,500+ Students &amp; Visitors": "سعة تستوعب أكثر من 1500 طالب وزائر",
  "ISO 9001 Quality Assurance": "ضمان الجودة وفق ISO 9001",
  "Benghazi Corniche — Coastal Light": "كورنيش بنغازي — ضوء الساحل",
  "Benghazi Corniche &mdash; Coastal Light": "كورنيش بنغازي — ضوء الساحل",
  "The \"Diamond Night\" waterfront revitalisation — transforming the coastline into a vibrant public hub.": "مشروع \"الليلة الماسية\" لتطوير الواجهة البحرية — تحويل الساحل إلى مركز جذب حضري نابض.",
  "The \"Diamond Night\" waterfront revitalisation &mdash; transforming the coastline into a vibrant public hub.": "مشروع \"الليلة الماسية\" لتطوير الواجهة البحرية — تحويل الساحل إلى مركز جذب حضري نابض.",
  "Reconnecting the city to the Mediterranean with luminous public spaces and resilient coastal engineering.": "إعادة ربط المدينة بالبحر الأبيض المتوسط بمساحات عامة مضيئة وهندسة ساحلية متينة.",
  "The revitalisation of Benghazi’s historic waterfront for the Ramadan season and long-term public recreation, turning a damaged coastline into a brightly lit, safe, and culturally vibrant coastal boulevard.": "تطوير الواجهة البحرية التاريخية لمدينة بنغازي لموسم رمضان والتنزه العام المستدام، وتحويل الشريط الساحلي إلى بوليفارد مضيء وآمن ونابض بالحياة.",
  "The project encompassed complete shoreline stabilization, decorative promenade paving, continuous illuminated streetscapes, floating sea lanterns, festive pavilions, and community plazas. MERAAS coordinated civil works, marine edge reinforcement, electrical distribution, and event-ready utilities.": "شمل المشروع تثبيت خط الشاطئ، ورصف الممشى البحري، وأعمدة الإنارة التجميلية، والفوانيس البحرية العائمة، وأجنحة الفعاليات، والساحات الترفيهية مع شبكات كهرباء وخدمات متكاملة.",
  "Engineered to withstand coastal marine exposure, all lighting fixtures, marine railings, and surface materials utilize corrosion-resistant finishes. The corniche welcomed thousands of families nightly, restoring civic vitality to Benghazi’s historic maritime core.": "صُممت كافة التجهيزات والأسوار ومواد التشطيب بمواصفات مقاومة للبيئة البحرية والتآكل. استقبل الكورنيش آلاف العائلات يومياً ليعيد الحيوية لقلب بنغازي الساحلي.",
  "Over 2.5 km of Continuous Coastal Promenade": "ممشى ساحلي متصل بطول يتجاوز 2.5 كم",
  "Marine-Grade Corrosion-Resistant Lighting & Hardware": "تجهيزات وإنارة بحرية مقاومة للرطوبة والتآكل",
  "Marine-Grade Corrosion-Resistant Lighting &amp; Hardware": "تجهيزات وإنارة بحرية مقاومة للرطوبة والتآكل",
  "Floating Illumination Features & Civic Plazas": "فوانيس بحرية عائمة وساحات عامة للاحتفالات",
  "Floating Illumination Features &amp; Civic Plazas": "فوانيس بحرية عائمة وساحات عامة للاحتفالات",
  "Rapid Turnaround Ahead of Ramadan Festivities": "إنجاز قياسي سريع قبل انطلاق فعاليات شهر رمضان",
  "Municipal & Public Authorities": "الجهات البلدية والعامة",
  "Municipal &amp; Public Authorities": "الجهات البلدية والعامة",
  "Master Plan & Urban Renewal": "مخطط عام وتطوير حضري",
  "Master Plan &amp; Urban Renewal": "مخطط عام وتطوير حضري",
  "Civil, Promenade & Event Infrastructure": "أعمال مدنية، ممشى ساحلي وبنية تحتية للفعاليات",
  "Civil, Promenade &amp; Event Infrastructure": "أعمال مدنية، ممشى ساحلي وبنية تحتية للفعاليات",
  "2.5+ km Waterfront Line": "واجهة بحرية بطول أكثر من 2.5 كم",
  "Floating Lanterns, Public Plazas, Cafes": "فوانيس عائمة، ساحات عامة، ومقاهي",
  "Marine Exposure Grade Standards": "معايير مقاومة البيئة البحرية",
  "Play Ground — MJS Arcade Zone": "بلاي غراوند — منطقة ألعاب MJS",
  "Play Ground &mdash; MJS Arcade Zone": "بلاي غراوند — منطقة ألعاب MJS",
  "Play Ground - MJS Arcade Zone": "بلاي غراوند - منطقة ألعاب MJS",
  "A recreational destination that brings play, sport and nighttime entertainment together.": "وجهة ترفيهية متكاملة تجمع بين اللعب والرياضة والترفيه الليلي.",
  "A high-energy urban family park engineered with go-karting tracks, sports courts, and dynamic illumination.": "مدينة ترفيهية عائلية مجهزة بحلبات سباق الكارتينغ والملاعب الرياضية والإضاءة التفاعلية.",
  "A premier leisure destination designed to offer comprehensive recreational sports, family entertainment, and outdoor gaming across an expansive, beautifully landscaped multi-zone complex.": "وجهة ترفيهية رائدة تقدم باقة متكاملة من الأنشطة الرياضية والترفيه العائلي والألعاب في الهواء الطلق ضمن مجمع فسيح ومنسق باحترافية.",
  "The project features an engineered asphalt karting circuit with safety barriers, professional multi-sport pitches, indoor arcade facilities, food and beverage kiosks, gazebos, and synchronized color-changing LED lighting that transforms the park’s character after dusk.": "يضم المشروع حلبة سباق كارتينغ أسفلتية بحواجز أمان، ملاعب رياضية متعددة، صالات ألعاب مغطاة، أكشاك للمطاعم والمقاهي، وجلسات مظللة مع إضاءة LED تفاعلية مبهرة.",
  "MERAAS provided turnkey delivery starting from rough site grading through asphalt paving, steel shade canopies, underground electrical networks, high-output floodlighting, and synthetic turf installation.": "قدمت مراس تنفيذاً متكاملاً بدأ من التسوية العامة ورصف الأسفلت والهياكل المظللة وشبكات الكهرباء الأرضية وأبراج الإنارة وحتى فرش العشب الصناعي المعتمد.",
  "Precision-Graded Asphalt Karting Circuit": "حلبة كارتينغ أسفلتية منفذة بدقة هندسية عالية",
  "Multi-Sport Synthetic Turf & Fenced Courts": "ملاعب عشب صناعي متعددة الرياضات ومسورة بالكامل",
  "Multi-Sport Synthetic Turf &amp; Fenced Courts": "ملاعب عشب صناعي متعددة الرياضات ومسورة بالكامل",
  "Dynamic Architectural & Landscape LED Lighting": "إضاءة معمارية وتفاعلية متطورة للموقع والحدائق",
  "Dynamic Architectural &amp; Landscape LED Lighting": "إضاءة معمارية وتفاعلية متطورة للموقع والحدائق",
  "Turnkey Commercial & Family Leisure Kiosks": "مرافق تجارية وأكشاك ترفيه عائلي متكاملة",
  "Turnkey Commercial &amp; Family Leisure Kiosks": "مرافق تجارية وأكشاك ترفيه عائلي متكاملة",
  "Private Investment Group": "مجموعة استثمار خاصة",
  "Private Leisure Group": "مجموعة ترفيه خاصة",
  "Entertainment & Sports Complex": "مجمع رياضي وترفيهي",
  "Entertainment &amp; Sports Complex": "مجمع رياضي وترفيهي",
  "Turnkey EPC & Landscape": "تسليم متكامل وتنسيق مواقع",
  "Turnkey EPC &amp; Landscape": "تسليم متكامل وتنسيق مواقع",
  "Go-Kart Track, Sport Courts, Arcade": "حلبة كارتينغ، ملاعب، وصالة ألعاب",
  "Footprint": "المساحة الإجمالية",
  "18,000+ sqm Total Site Area": "أكثر من 18,000 متر مربع مساحة الموقع",
  "Safety & Impact Tested Surfaces": "أسطح وأرضيات معتمدة ومختبرة لامتصاص الصدمات",
  "Safety &amp; Impact Tested Surfaces": "أسطح وأرضيات معتمدة ومختبرة لامتصاص الصدمات",
  "Benghazi Skydive — Dropzone & Airfield": "سكاي دايف بنغازي — مهبط ومنطقة القفز المظلي",
  "Benghazi Skydive &mdash; Dropzone &amp; Airfield": "سكاي دايف بنغازي — مهبط ومنطقة القفز المظلي",
  "Specialized aviation engineering — building North Africa’s premier civilian parachuting facility.": "هندسة طيران تخصصية — إنشاء مركز القفز المظلي المدني الرائد في شمال إفريقيا.",
  "Specialized aviation engineering &mdash; building North Africa’s premier civilian parachuting facility.": "هندسة طيران تخصصية — إنشاء مركز القفز المظلي المدني الرائد في شمال إفريقيا.",
  "Strict FAA/ICAO alignment for landing dropzones, aircraft taxiways, and aeronautical training suites.": "مطابقة تامة لمعايير الطيران الدولية لمهابط الهبوط ومسارات الطائرات وقاعات التدريب الجوي.",
  "A purpose-built skydiving dropzone and light aviation center featuring certified aircraft aprons, pilot briefings, parachute preparation halls, student training academies, and spectator observation zones.": "مركز متكامل للقفز المظلي والطيران الخفيف يضم ساحات وقوف طائرات معتمدة، قاعات إيجاز الطيارين، صالات تجهيز المظلات، أكاديمية تدريب، ومنصات مشاهدة.",
  "Aviation projects demand uncompromising precision. MERAAS engineered the heavy-duty reinforced aircraft apron, smooth asphalt taxiways, high-clearance steel aircraft hangars, and the central dropzone target area with specialized soft-landing turf and drainage.": "تتطلب مشاريع الطيران دقة استثنائية؛ نفذت مراس ساحة وقوف الطائرات الخرسانية، ومسارات التدحرج الأسفلتية، وحظائر الطائرات الفولاذية، ومنطقة الهبوط المجهزة بعشب امتصاص الصدمات.",
  "The project supports international sporting events and pilot training, establishing eastern Libya on the regional map for aeronautical and extreme sports tourism.": "يدعم المشروع الفعاليات الرياضية الدولية وتدريب الطيارين، واضعاً شرق ليبيا على خارطة سياحة الرياضات الجوية والمغامرات.",
  "Heavy-Load Aircraft Apron & Taxiway Pavements": "أرضيات مدرجات وساحات وقوف طائرات تتحمل الحمولات الثقيلة",
  "Heavy-Load Aircraft Apron &amp; Taxiway Pavements": "أرضيات مدرجات وساحات وقوف طائرات تتحمل الحمولات الثقيلة",
  "Clear-Span Structural Steel Aircraft Hangars": "حظائر طائرات فولاذية ببحور واسعة بدون أعمدة وسطية",
  "Precision-Engineered Parachute Dropzone Matrix": "منطقة هبوط مظلي مجهزة بدقة هندسية وأنظمة تصريف",
  "Integrated Control Office & Pilot Briefing Rooms": "برج تحكم وغرف إيجاز وتدريب طيارين مجهزة",
  "Integrated Control Office &amp; Pilot Briefing Rooms": "برج تحكم وغرف إيجاز وتدريب طيارين مجهزة",
  "Aviation Club / Sports Federation": "نادي طيران / اتحاد الرياضات الجوية",
  "Aviation & Extreme Sports": "طيران ورياضات هوائية",
  "Aviation &amp; Extreme Sports": "طيران ورياضات هوائية",
  "Civil, Pavements & Structural Hangars": "أعمال مدنية، رصف وحظائر طائرات فولاذية",
  "Civil, Pavements &amp; Structural Hangars": "أعمال مدنية، رصف وحظائر طائرات فولاذية",
  "Aircraft Load Class B-II Paving": "رصف مدرجات معتمد فئة B-II لحمولات الطائرات",
  "Aircraft Hangars, Parachute Bay, Cafe": "حظائر طائرات، صالة مظلات، ومقهى",
  "ICAO/Aviation Ground Standards": "مطابق لمعايير منظمة الطيران المدني الدولي ICAO",
  "Benina Airport &mdash; VIP Lounges": "صالات كبار الزوار بمطار بنينا",
  "Refined hospitality at international transit gateways — luxury architectural interiors.": "ضيافة فاخرة في بوابات السفر الدولية — تصميم داخلي معماري راقٍ.",
  "Refined hospitality at international transit gateways &mdash; luxury architectural interiors.": "ضيافة فاخرة في بوابات السفر الدولية — تصميم داخلي معماري راقٍ.",
  "Sculptural wood cladding, integrated ambient lighting, and bespoke terrazzo flooring for dignitary reception.": "كسوات خشبية منحنية وإضاءة محيطية تفاعلية وأرضيات تيرازو مخصصة لاستقبال كبار الشخصيات.",
  "The complete architectural design and turnkey fit-out of the dignitary and executive VIP reception lounges at Benina International Airport in Benghazi, blending Libyan hospitality with timeless contemporary luxury.": "التصميم المعماري المتكامل والتجهيز الداخلي لصالات كبار الشخصيات والوفود الرسمية بمطار بنينا الدولي في بنغازي، بمزيج يجمع بين كرم الضيافة الليبية والفخامة المعاصرة.",
  "The interior architecture is characterized by sweeping curved American walnut walls, cove LED lighting, custom acoustic plaster ceilings, high-traffic terrazzo flooring, and bespoke modular seating designed for utmost privacy and acoustic tranquility.": "تتميز العمارة الداخلية بجدران منحنية من خشب الجوز الأمريكي، وإضاءة LED مدمجة، وأسقف جبسية عازلة للصوت، وأرضيات تيرازو مصقولة، وجلسات مريحة تضمن أعلى درجات الخصوصية.",
  "MERAAS managed all bespoke millwork fabrication, specialized security glass, independent HVAC zoning for air quality and silence, private meeting suites, and discreet diplomatic reception counters.": "أشرفت مراس على تصنيع الأعمال الخشبية الفاخرة، والزجاج الأمني الخاص، وأنظمة التكييف الصامتة، وأجنحة الاجتماعات الخاصة، ومكاتب الاستقبال الدبلوماسية.",
  "Sculptural Curved Timber Wall Architecture": "جدران خشبية منحنية مشغولة بدقة معمارية فائقة",
  "Seamless Terrazzo Poured Flooring with Brass Inlays": "أرضيات تيرازو مصبوبة بدون فواصل مع تطعيمات نحاسية",
  "Ultra-Quiet Acoustic Ceiling & HVAC Zoning": "أسقف عازلة للصوت وتكييف هواء فائق الهدوء",
  "Ultra-Quiet Acoustic Ceiling &amp; HVAC Zoning": "أسقف عازلة للصوت وتكييف هواء فائق الهدوء",
  "Private Diplomatic Suites & Executive Meeting Rooms": "أجنحة دبلوماسية خاصة وقاعات اجتماعات تنفيذية",
  "Private Diplomatic Suites &amp; Executive Meeting Rooms": "أجنحة دبلوماسية خاصة وقاعات اجتماعات تنفيذية",
  "Civil Aviation Authority": "مصلحة الطيران المدني",
  "Civil Aviation Authority & Airport Management": "مصلحة الطيران المدني وإدارة المطار",
  "Civil Aviation Authority &amp; Airport Management": "مصلحة الطيران المدني وإدارة المطار",
  "Luxury Interior Architecture": "عمارة وتصميم داخلي فاخر",
  "Turnkey Interior Fit-Out & MEP": "تشطيب داخلي متكامل وأعمال كهروميكانيكية",
  "Turnkey Interior Fit-Out &amp; MEP": "تشطيب داخلي متكامل وأعمال كهروميكانيكية",
  "VVIP Royal Suite, Executive Lounge, Boardroom": "جناح كبار الزوار الملكي، صالة تنفيذية، وقاعة اجتماعات",
  "Walnut Panelling, Terrazzo, Italian Leather": "كسوات خشب جوز، أرضيات تيرازو، وجلود إيطالية فاخرة",
  "Aviation Secure Zone Protocol": "بروتوكول المنطقة الأمنية المعتمد بالمطارات",
  "Rebuilding civic institutions — delivering robust, modern governmental administrative centers.": "إعادة إعمار المؤسسات المدنية — تشييد مراكز إدارية وحكومية حديثة ومتينة.",
  "Rebuilding civic institutions &mdash; delivering robust, modern governmental administrative centers.": "إعادة إعمار المؤسسات المدنية — تشييد مراكز إدارية وحكومية حديثة ومتينة.",
  "Restoring essential municipal services with resilient civil construction and dignified architecture.": "استعادة الخدمات البلدية الأساسية بإنشاءات مدنية متينة وعمارة تليق بالمؤسسات الحكومية.",
  "A multi-department civic administration center constructed to restore essential municipal government operations, citizen service centers, and administrative departments in the revitalized Alsabri district.": "مجمع إداري متعدد الإدارات شُيد لاستعادة الخدمات الحكومية والبلدية ومراكز خدمة المواطنين في حي الصابري بعد إعادة تأهيله.",
  "The building incorporates reinforced concrete frame engineering, thermal-insulated curtain walling, local stone exterior cladding, energy-efficient building management systems, and secure citizen service reception halls.": "يتكون المبنى من هيكل خرساني مسلح، وواجهات زجاجية عازلة للحرارة، وكسوات حجرية خارجية، وأنظمة ذكية لإدارة المباني، وصالات استقبال مجهزة للمواطنين.",
  "MERAAS completed the project as a full turnkey package from foundation piling to final commissioning, setting high quality benchmarks for public civic infrastructure across eastern Libya.": "أنجزت مراس المشروع كحزمة متكاملة من الأساسات وحتى التشغيل النهائي، واضعة معايير جودة متقدمة للبنية التحتية والمباني العامة.",
  "Multi-Story Reinforced Concrete Structural Frame": "هيكل خرساني مسلح متعدد الطوابق عالي المتانة",
  "Thermally Insulated Stone & Glass Curtain Façades": "واجهات حجرية وستائر زجاجية عازلة للحرارة",
  "Thermally Insulated Stone &amp; Glass Curtain Façades": "واجهات حجرية وستائر زجاجية عازلة للحرارة",
  "High-Capacity Public Service & Registration Halls": "صالات خدمة مواطنين وتسجيل عالية الاستيعاب",
  "High-Capacity Public Service &amp; Registration Halls": "صالات خدمة مواطنين وتسجيل عالية الاستيعاب",
  "Turnkey Building Management & Backup Power Systems": "أنظمة إدارة مباني ذكية ومولدات طاقة احتياطية",
  "Turnkey Building Management &amp; Backup Power Systems": "أنظمة إدارة مباني ذكية ومولدات طاقة احتياطية",
  "Benghazi Reconstruction & Stabilization Agency": "جهاز إعادة إعمار واستقرار بنغازي",
  "Benghazi Reconstruction &amp; Stabilization Agency": "جهاز إعادة إعمار واستقرار بنغازي",
  "Benghazi Reconstruction Fund": "صندوق إعادة إعمار بنغازي",
  "Civic & Government": "مباني حكومية ومدنية",
  "Civic &amp; Government": "مباني حكومية ومدنية",
  "Full Turnkey Civil & MEP Delivery": "تنفيذ متكامل للأعمال المدنية والكهروميكانيكية",
  "Full Turnkey Civil &amp; MEP Delivery": "تنفيذ متكامل للأعمال المدنية والكهروميكانيكية",
  "Ground + 3 Administrative Levels": "طابق أرضي + 3 طوابق إدارية",
  "Citizen Counters, Archives, Executive Offices": "مكاتب خدمة مواطنين، أرشيف مركزي، ومكاتب تنفيذية",
  "ISO 9001 Structural Assurance": "ضمان الجودة الإنشائية وفق معايير ISO 9001",
  "Contemporary corporate architecture — an inspiring headquarters for modern business.": "عمارة تجارية معاصرة — مقر ملهم وبيئة أعمال حديثة ومتكاملة.",
  "Contemporary corporate architecture &mdash; an inspiring headquarters for modern business.": "عمارة تجارية معاصرة — مقر ملهم وبيئة أعمال حديثة ومتكاملة.",
  "High-performance structural glazing, open-plan collaborative floors, and executive boardroom suites.": "واجهات زجاجية هيكلية عازلة، مساحات مكتبية مرنة، وأجنحة اجتماعات تنفيذية فاخرة.",
  "A striking commercial headquarters engineered to project modern corporate leadership, featuring floor-to-ceiling panoramic glass, flexible open-plan workspaces, and robust infrastructure.": "مقر رئيسي بارز يعكس ريادة الأعمال الحديثة، يتميز بواجهات زجاجية بانورامية من الأرض للسقف، ومساحات عمل مرنة، وبنية تحتية قوية.",
  "The architectural design emphasizes natural daylight, thermal efficiency, and acoustic separation between executive zones and operational trading floors. MERAAS handled all structural engineering, façade installation, interior construction, and high-security access controls.": "يركز التصميم المعماري على الاستفادة القصوى من ضوء النهار، وكفاءة العزل الحراري والصوتي بين الطوابق التنفيذية والتشغيلية. نفذت مراس الهيكل الإنشائي والواجهات والتشطيبات وأنظمة الأمان.",
  "Constructed to top international corporate standards, the building integrates central IT server rooms with redundant power, conference telepresence suites, and sustainable LED lighting.": "شُيد المبنى وفق أعلى المعايير المؤسسية العالمية، مدمجاً غرف خوادم تقنية مركزية بطاقة احتياطية، وقاعات مؤتمرات مرئية، وإنارة ذكية موفرة للطاقة.",
  "High-Performance Acoustic Structural Glazing": "واجهات زجاجية هيكلية عازلة للصوت والحرارة",
  "Flexible Open-Plan Office Floorplates": "مساحات طوابق مكتبية مفتوحة ومرنة الاستخدام",
  "Tier-2 Redundant Power & Server Facilities": "غرف خوادم وطاقة احتياطية متواصلة من المستوى Tier-2",
  "Tier-2 Redundant Power &amp; Server Facilities": "غرف خوادم وطاقة احتياطية متواصلة من المستوى Tier-2",
  "Executive Penthouse Boardroom & Terraces": "قاعة اجتماعات تنفيذية علوية مع تراسات بانورامية",
  "Executive Penthouse Boardroom &amp; Terraces": "قاعة اجتماعات تنفيذية علوية مع تراسات بانورامية",
  "TBZ Corporate Group": "مجموعة TBZ القابضة",
  "Commercial Office Building": "مبنى مكاتب تجاري وإداري",
  "Design, Civil, Façade & Interior Fit-Out": "تصميم، أعمال مدنية، واجهات وتشطيب داخلي",
  "Design, Civil, Façade &amp; Interior Fit-Out": "تصميم، أعمال مدنية، واجهات وتشطيب داخلي",
  "Corporate HQ & Executive Center": "مقر رئيسي ومركز أعمال تنفيذي",
  "Corporate HQ &amp; Executive Center": "مقر رئيسي ومركز أعمال تنفيذي",
  "Boardrooms, Server Room, Secure Parking": "قاعات اجتماعات، غرفة خوادم، ومواقف سيارات آمنة",
  "ISO 9001 & ISO 14001 Standards": "مطابق لمعايير ISO 9001 وISO 14001",
  "ISO 9001 &amp; ISO 14001 Standards": "مطابق لمعايير ISO 9001 وISO 14001",
  "Integrated mixed-use urban development — combining commerce, retail, and contemporary living.": "تطوير حضري متعدد الاستخدامات — يجمع بين الأعمال والتسوق والعيش العصري.",
  "Integrated mixed-use urban development &mdash; combining commerce, retail, and contemporary living.": "تطوير حضري متعدد الاستخدامات — يجمع بين الأعمال والتسوق والعيش العصري.",
  "High-density commercial podium with residential towers and multi-level underground parking.": "قاعدة تجارية حيوية تعلوها أبراج سكنية ومواقف سيارات سفلية متعددة الطوابق.",
  "A large-scale urban development integrating ground-floor retail promenades, commercial office floors, and residential apartments above an engineered multi-level subterranean parking facility.": "مشروع تطوير عقاري ضخم يجمع بين محلات تجارية ومكاتب إدارية وشقق سكنية فوق مواقف سيارات تحت الأرض متعددة المستويات.",
  "MERAAS executed deep basement excavation, retaining wall shoring, heavy foundation raft pouring, and rapid post-tensioned slab construction utilizing our heavy in-house machinery fleet and concrete batching logistics.": "نفذت مراس أعمال الحفر العميق، وتدعيم الجدران الاستنادية، وصب اللبشة الخرسانية الضخمة، والأسقف سابقة الإجهاد بأسطولنا الخاص ومحطات الخرسانة المتطورة.",
  "The project stands as an exemplar of coordinated urban density in Benghazi, delivering durable structural integrity, modern MEP utility shafts, and high-traffic public pedestrian avenues.": "يمثل المشروع نموذجاً للتطوير العمراني المتكامل في بنغازي، موفراً متانة إنشائية فائقة، ومسارات خدمات كهروميكانيكية حديثة، وممرات مشاة فسيحة.",
  "Deep Shored Basement Excavation & Retaining Walls": "حفر عميق مدعم وجدران استنادية مسلحة",
  "Deep Shored Basement Excavation &amp; Retaining Walls": "حفر عميق مدعم وجدران استنادية مسلحة",
  "Heavy Raft Foundations & Post-Tensioned Slabs": "أساسات لبشة ضخمة وأسقف خرسانية سابقة الإجهاد",
  "Heavy Raft Foundations &amp; Post-Tensioned Slabs": "أساسات لبشة ضخمة وأسقف خرسانية سابقة الإجهاد",
  "Multi-Level Underground Parking Logistics": "مواقف سيارات سفلية متعددة الطوابق وميسرة الحركة",
  "High-Speed Vertical Transportation & Core Shafts": "مصاعد عالية السرعة وقلوب خرسانية متينة",
  "High-Speed Vertical Transportation &amp; Core Shafts": "مصاعد عالية السرعة وقلوب خرسانية متينة",
  "Private Real Estate Developer": "مطور عقاري خاص",
  "Mixed-Use Retail & Residential": "تجاري، محلات تجارية وسكني",
  "Mixed-Use Retail &amp; Residential": "تجاري، محلات تجارية وسكني",
  "Turnkey Civil, Structure & Shell": "أعمال مدنية متكاملة، هيكل وتشطيبات",
  "Turnkey Civil, Structure &amp; Shell": "أعمال مدنية متكاملة، هيكل وتشطيبات",
  "32,000+ sqm Gross Floor Area": "أكثر من 32,000 متر مربع مسطحات بناء",
  "2 Basements + Podium + 7 Towers": "طابقا قبو + طابق أرضي تجاري + 7 طوابق",
  "ISO 9001 Heavy Civil QA/QC": "رقابة جودة الأعمال الإنشائية الثقيلة ISO 9001",
  "Master Planning & Architecture": "المخطط العام والتصميم المعماري",
  "Master Planning &amp; Architecture": "المخطط العام والتصميم المعماري",
  "Coordinated campus master plan integrating distinct functional zones and equine circulation.": "مخطط عام متناسق يدمج المناطق الوظيفية ومسارات حركة الخيول.",
  "Civil & Structural Engineering": "الهندسة المدنية والإنشائية",
  "Civil &amp; Structural Engineering": "الهندسة المدنية والإنشائية",
  "High-tolerance foundations, reinforced masonry, grandstands, and steel roof structures.": "أساسات دقيقة، مباني مسلحة، مدرجات، وهياكل أسقف فولاذية.",
  "Earthworks & Site Utilities": "الأعمال الترابية والمرافق الميدانية",
  "Earthworks &amp; Site Utilities": "الأعمال الترابية والمرافق الميدانية",
  "Bulk earthmoving, precision arena grading, site drainage, and dedicated power/water grids.": "حفريات كبرى، تسوية دقيقة للحلبات، تصريف مياه، وشبكات كهرباء ومياه متكاملة.",
  "Landscape & Finishing": "تنسيق المواقع والتشطيبات المعمارية",
  "Landscape &amp; Finishing": "تنسيق المواقع والتشطيبات المعمارية",
  "Durable architectural finishes, external stone paving, paddock fencing, and lighting.": "تشطيبات معمارية متينة، رصف حجري خارجي، أسوار للميادين، وشبكات إنارة.",
  "Structural Reconstruction": "إعادة الإعمار والتدعيم الإنشائي",
  "Restoration, underpinning, and carbon-fiber reinforcement of existing educational frameworks.": "ترميم وتدعيم القواعد والأعمدة بألياف الكربون للهياكل التعليمية القائمة.",
  "Specialized Dome Engineering": "هندسة القباب الهندسية المتخصصة",
  "Complex geometric steel framework and composite cladding for the spherical planetarium.": "هيكل فولاذي هندسي معقد وكسوات مركبة للقبة السماوية الكروية.",
  "Acoustics & Interior Fit-Out": "المعالجات الصوتية والتشطيب الداخلي",
  "Acoustics &amp; Interior Fit-Out": "المعالجات الصوتية والتشطيب الداخلي",
  "Auditorium tiered seating, soundproofing, and custom acoustic ceiling panelling.": "مدرجات جلوس متدرجة، عزل صوتي، وأسقف صوتية متخصصة.",
  "MEP Infrastructure": "البنية التحتية الكهروميكانيكية",
  "High-efficiency HVAC chillers, lighting control, and digital audio-visual integration.": "محطات تبريد وتكييف عالية الكفاءة، تحكم بالإنارة، وأنظمة سمعية وبصرية متطورة.",
  "Urban & Landscape Architecture": "التخطيط الحضري وعمارة البيئة",
  "Urban &amp; Landscape Architecture": "التخطيط الحضري وعمارة البيئة",
  "Public space design, pedestrian flow optimization, and waterfront amenity layout.": "تصميم المساحات العامة، وتدفق المشاة، وتوزيع المرافق والخدمات الشاطئية.",
  "Coastal Civil Engineering": "الهندسة المدنية والساحلية",
  "Shoreline rock revetment stabilization, storm drainage, and reinforced paving.": "حماية صخرية للشواطئ، تصريف مياه الأمطار، ورصف خرساني وأسفلتي مقوى.",
  "Specialized Electrical & Lighting": "الشبكات الكهربائية والإنارة المتخصصة",
  "Specialized Electrical &amp; Lighting": "الشبكات الكهربائية والإنارة المتخصصة",
  "Submersible cabling, power distribution substations, and festive illumination.": "كابلات غاطسة، محطات توزيع كهرباء، وإنارة ديكورية مبهجة.",
  "Rapid Project Management": "إدارة المشاريع ذات الإنجاز السريع",
  "Accelerated procurement and 24/7 site management for on-schedule milestone delivery.": "توريد سريع وإدارة موقع على مدار الساعة للإنجاز وفق أعلى معايير الالتزام الزمني.",
  "Earthworks & Grading": "الأعمال الترابية والتسوية",
  "Earthworks &amp; Grading": "الأعمال الترابية والتسوية",
  "Excavation, base course stabilization, and high-precision asphalt paving.": "حفريات، تثبيت طبقات الأساس، ورصف أسفلتي فائق النعومة والدقة.",
  "Structural Steelwork": "المنشآت والهياكل الفولاذية",
  "Arcade pavilions, spectator canopies, and perimeter security fencing.": "مظلات صالات الألعاب، مظلات الجمهور، والأسوار الأمنية المحيطة.",
  "Low-Voltage & Smart Lighting": "أنظمة التيار الخفيف والإنارة الذكية",
  "Low-Voltage &amp; Smart Lighting": "أنظمة التيار الخفيف والإنارة الذكية",
  "Programmable RGB floodlighting, safety cameras, and audio distribution.": "إنارة RGB قابلة للبرمجة، كاميرات مراقبة، وأنظمة صوتية مركزية.",
  "Sports Flooring Installation": "تركيب الأرضيات والملاعب الرياضية",
  "Certified synthetic turf, shock pads, and acrylic court surfacing.": "عشب صناعي معتمد، وسائد امتصاص صدمات، وأرضيات ملاعب أكريليك.",
  "Aviation Pavement Engineering": "هندسة أرضيات ورصف المطارات",
  "Sub-base soil compaction, asphalt paving, and fuel-resistant apron sealants.": "دمك طبقات التربة، رصف أسفلتي، وعوازل ومواد سد مقاومة لوقود الطائرات.",
  "Clear-Span Steel Structures": "هياكل فولاذية واسعة البحور",
  "Engineered aircraft hangars with heavy sliding door systems.": "حظائر طائرات مهندسة بأبواب سحاب عملاقة.",
  "Earthworks & Surface Drainage": "الأعمال الترابية وتصريف المياه السطحية",
  "Earthworks &amp; Surface Drainage": "الأعمال الترابية وتصريف المياه السطحية",
  "Runoff management across vast open airfields to prevent ponding.": "تصريف مياه السيول والأمطار عبر مساحات المهبط الشاسعة لمنع تجمع المياه.",
  "Building Systems & Finishes": "أنظمة المباني والتشطيبات الفنية",
  "Building Systems &amp; Finishes": "أنظمة المباني والتشطيبات الفنية",
  "Classrooms, locker facilities, rigging benches, and observation terraces.": "قاعات تدريب، غرف تبديل ملابس، طاولات تجهيز المظلات، وشرفات مراقبة.",
  "Interior Architecture & Design": "العمارة والتصميم الداخلي",
  "Interior Architecture &amp; Design": "العمارة والتصميم الداخلي",
  "Space planning, ergonomic flow, acoustic modeling, and material specification.": "تخطيط المساحات، حركة وراحة الزوار، العزل الصوتي، وتوصيف المواد الفاخرة.",
  "Precision Millwork & Joinery": "أعمال النجارة والتكسيات الخشبية الدقيقة",
  "Precision Millwork &amp; Joinery": "أعمال النجارة والتكسيات الخشبية الدقيقة",
  "Custom CNC-machined curved timber paneling and bespoke reception desks.": "ألواح خشبية منحنية مقطوعة بالكمبيوتر CNC ومكاتب استقبال مخصصة.",
  "Specialized Flooring & Masonry": "الأرضيات والأعمال الرخامية التخصصية",
  "Specialized Flooring &amp; Masonry": "الأرضيات والأعمال الرخامية التخصصية",
  "Diamond-polished terrazzo and acoustic underlayment.": "أرضيات تيرازو مصقولة بالألماس وطبقات عزل صوتي تحتية.",
  "Silent MEP & Smart Automation": "الأنظمة الكهروميكانيكية الصامتة والتحكم الذكي",
  "Silent MEP &amp; Smart Automation": "الأنظمة الكهروميكانيكية الصامتة والتحكم الذكي",
  "Low-decibel variable air volume HVAC, smart lighting scenes, and access control.": "تكييف هواء متغير التدفق فائق الهدوء، سيناريوهات إنارة ذكية، وأنظمة تحكم بالدخول.",
  "Civil & Foundation Engineering": "الهندسة المدنية وهندسة الأساسات",
  "Civil &amp; Foundation Engineering": "الهندسة المدنية وهندسة الأساسات",
  "Deep excavation, groundwater control, and reinforced concrete superstructures.": "حفر عميق، سحب مياه جوفية، وهياكل خرسانية مسلحة فائقة القوة.",
  "Façade Systems": "أنظمة الواجهات المعمارية",
  "Ventilated stone rainscreen cladding and double-glazed thermal curtain walls.": "كسوات حجرية مهواة وستائر زجاجية مزدوجة عازلة للحرارة.",
  "Building Services (MEP)": "خدمات المباني الكهروميكانيكية",
  "Integrated fire protection, data networks, backup diesel generators, and HVAC.": "مكافحة حرائق متكاملة، شبكات بيانات، مولدات ديزل احتياطية، وتكييف مركزي.",
  "Turnkey Project Execution": "التنفيذ المتكامل للمشاريع",
  "End-to-end command ensuring strict timeline compliance and cost control.": "إدارة وتحكم متكامل يضمن الالتزام التام بالجداول الزمنية والميزانيات.",
  "Commercial Structural Design": "التصميم الإنشائي للمباني التجارية",
  "Cast-in-place concrete slabs allowing wide open pillar-free floorplans.": "بلاطات خرسانية مصبوبة تتيح مساحات مفتوحة واسعة بدون أعمدة.",
  "Architectural Glazing & Cladding": "الزجاج والكسوات المعمارية",
  "Architectural Glazing &amp; Cladding": "الزجاج والكسوات المعمارية",
  "Solar-reflective low-E double glazing and composite panels.": "زجاج مزدوج عاكس لأشعة الشمس ومنخفض الانبعاث وألواح مركبة.",
  "Commercial Interior Fit-Out": "التشطيب الداخلي للمساحات التجارية",
  "Glass partitions, raised access flooring, and acoustic ceilings.": "قواطع زجاجية، أرضيات مرتفعة لتمرير الشبكات، وأسقف صوتية.",
  "Smart Building Infrastructure": "البنية التحتية للمباني الذكية",
  "Building automation, energy monitoring, and IP surveillance.": "أتمتة المباني، مراقبة استهلاك الطاقة، وكاميرات مراقبة رقمية IP.",
  "Geotechnical & Shoring": "الهندسة الجيوتقنية وأعمال التدعيم",
  "Geotechnical &amp; Shoring": "الهندسة الجيوتقنية وأعمال التدعيم",
  "Secant pile retaining walls, soil dewatering, and bulk excavation.": "جدران خوازيق استنادية متداخلة، نزح مياه، وحفريات كبرى.",
  "Heavy Concrete Works": "الأعمال الخرسانية الثقيلة",
  "Mass concrete foundation rafts, columns, shear walls, and flat slabs.": "لبشات خرسانية ضخمة، أعمدة، جدران قص، وبلاطات مصمتة.",
  "Site Utilities & Drainage": "شبكات المرافق وتصريف مياه الموقع",
  "Site Utilities &amp; Drainage": "شبكات المرافق وتصريف مياه الموقع",
  "High-capacity storm stormwater retention, sewage, and electrical feeder routing.": "خزانات استيعاب مياه الأمطار، شبكات صرف صحي، وخطوط تغذية كهربائية رئيسية.",
  "Project Command & Craneage": "إدارة المشروع وتشغيل الرافعات البرجية",
  "Project Command &amp; Craneage": "إدارة المشروع وتشغيل الرافعات البرجية",
  "Coordinated tower crane operations and strict site safety management.": "تشغيل منسق للرافعات البرجية وإدارة صارمة لسلامة الموقع.",
  "Benghazi, Libya": "بنغازي، ليبيا",
  "Tripoli, Libya": "طرابلس، ليبيا",
  "Misrata, Libya": "مصراتة، ليبيا",
  "Tobruk, Libya": "طبرق، ليبيا",
  "Derna, Libya": "درنة، ليبيا",
  "Sabha, Libya": "سبها، ليبيا",
  "Sirte, Libya": "سرت، ليبيا",
  "Teka, Libya": "تيكا، ليبيا",
  "Benina, Libya": "بنينا، ليبيا",
  "Sidi Farag, Libya": "سيدي فرج، ليبيا",
  "Aleziyat, Libya": "العزيات، ليبيا",
  "MERAAS Engineering & Construction": "مراس للهندسة والإنشاءات",
  "MERAAS Engineering &amp; Construction": "مراس للهندسة والإنشاءات",
  "info@meraaslibya.com": "info@meraaslibya.com",
  "www.meraaslibya.com": "www.meraaslibya.com",
  "AR": "AR",
  "EN": "EN",
  "&copy;": "©",
  "&times;": "×",
  "&#8249;": "‹",
  "&#8250;": "›",
  "Our selected": "أعمالنا ومشاريعنا",
  "projects.": "المختارة.",
  "Our selected projects.": "أعمالنا ومشاريعنا المختارة.",
  "Education, civic and urban, sports and leisure, interiors and institutional work — delivered across five regions of Libya.": "مشاريع تعليمية ومدنية ورياضية وتصميم داخلي ومرافق حكومية — نفذناها عبر خمس مناطق في ليبيا.",
  "Education, civic and urban, sports and leisure, interiors and institutional work &mdash; delivered across five regions of Libya.": "مشاريع تعليمية ومدنية ورياضية وتصميم داخلي ومرافق حكومية — نفذناها عبر خمس مناطق في ليبيا.",
  "Institutional": "مؤسسي ومدني",
  "Interiors": "تصميم داخلي",
  "Landscape": "تنسيق مواقع",
  "Benghazi, Libya / Master Plan & Architecture": "بنغازي، ليبيا / مخطط عام وعمارة",
  "Benghazi, Libya &nbsp;/&nbsp; Master Plan & Architecture": "بنغازي، ليبيا / مخطط عام وعمارة",
  "Benghazi, Libya / Education": "بنغازي، ليبيا / تعليم",
  "Benghazi, Libya &nbsp;/&nbsp; Education": "بنغازي، ليبيا / تعليم",
  "Benghazi, Libya / Master Plan & Event Infrastructure": "بنغازي، ليبيا / مخطط عام وبنية تحتية للفعاليات",
  "Benghazi, Libya &nbsp;/&nbsp; Master Plan & Event Infrastructure": "بنغازي، ليبيا / مخطط عام وبنية تحتية للفعاليات",
  "Benghazi, Libya / Architecture & Landscape": "بنغازي، ليبيا / عمارة وتنسيق مواقع",
  "Benghazi, Libya &nbsp;/&nbsp; Architecture & Landscape": "بنغازي، ليبيا / عمارة وتنسيق مواقع",
  "Teka, Libya / Architecture": "تيكا، ليبيا / عمارة",
  "Teka, Libya &nbsp;/&nbsp; Architecture": "تيكا، ليبيا / عمارة",
  "Benina Airport VIP Lounges": "صالات كبار الزوار بمطار بنينا",
  "Benina, Libya / Architecture & Interior": "بنينا، ليبيا / عمارة وتصميم داخلي",
  "Benina, Libya &nbsp;/&nbsp; Architecture & Interior": "بنينا، ليبيا / عمارة وتصميم داخلي",
  "AlSabri Administration Building": "مبنى مجمع إدارة الصابري",
  "Benghazi, Libya / Adaptive Reuse": "بنغازي، ليبيا / إعادة تأهيل واستخدام",
  "Benghazi, Libya &nbsp;/&nbsp; Adaptive Reuse": "بنغازي، ليبيا / إعادة تأهيل واستخدام",
  "Sidi Farag, Libya / Master Plan": "سيدي فرج، ليبيا / مخطط عام",
  "Sidi Farag, Libya &nbsp;/&nbsp; Master Plan": "سيدي فرج، ليبيا / مخطط عام",
  "Aleziyat Training & Range Complex": "مجمع العزيات للتدريب والرماية",
  "Aleziyat, Libya / Master Plan": "العزيات، ليبيا / مخطط عام",
  "Aleziyat, Libya &nbsp;/&nbsp; Master Plan": "العزيات، ليبيا / مخطط عام",
  "Have a project in mind?": "هل لديك مشروع قيد التخطيط؟",
  "Tell us the site, the programme and the deadline. We will tell you how we would build it.": "أخبرنا بموقع المشروع والبرنامج الزمني، وسنوضح لك كيف نبنيه ونحققه بأعلى كفاءة.",
  "Start a project": "ابدأ مشروعك معنا",
  "QA/QC Standard": "معايير الجودة والرقابة",
  "Programmes": "البرامج والقطاعات",
  "Key Facilities": "المرافق الرئيسية",
  "Capacity": "السعة الاستيعابية",
  "Lounge Zones": "مناطق الصالات",
  "Materials": "المواد والتشطيبات",
  "Features": "المميزات الإنشائية",
  "Building Type": "نوع المبنى",
  "Runway/Apron": "المدرج وساحة الطائرات",
  "Facilities": "المرافق والخدمات",
  "Civic & Urban · Benghazi, Libya": "مدني وحضري · بنغازي، ليبيا",
  "Civic &amp; Urban &middot; Benghazi, Libya": "مدني وحضري · بنغازي، ليبيا",
  "Sports & Leisure · Benghazi, Libya": "الرياضة والترفيه · بنغازي، ليبيا",
  "Sports &amp; Leisure &middot; Benghazi, Libya": "الرياضة والترفيه · بنغازي، ليبيا",
  "Interiors & Aviation · Benghazi, Libya": "تصميم داخلي وطيران · بنغازي، ليبيا",
  "Interiors &amp; Aviation &middot; Benghazi, Libya": "تصميم داخلي وطيران · بنغازي، ليبيا",
  "Institutional & Civic · Benghazi, Libya": "مؤسسي ومدني · بنغازي، ليبيا",
  "Institutional &amp; Civic &middot; Benghazi, Libya": "مؤسسي ومدني · بنغازي، ليبيا",
  "Commercial & Residential · Benghazi, Libya": "تجاري وسكني · بنغازي، ليبيا",
  "Commercial &amp; Residential &middot; Benghazi, Libya": "تجاري وسكني · بنغازي، ليبيا",
  "General Sports & Aviation Club": "نادي الرياضات العامة والطيران",
  "General Sports &amp; Aviation Club": "نادي الرياضات العامة والطيران",
  "Civil Works, Structural Reconstruction & Modern Architectural Finishing": "أعمال مدنية، تدعيم إنشائي وتشطيبات معمارية حديثة",
  "Civil Works, Structural Reconstruction &amp; Modern Architectural Finishing": "أعمال مدنية، تدعيم إنشائي وتشطيبات معمارية حديثة",
  "Aviation Pavements, Aircraft Hangars, Packing Bays & Terminal Facilities": "أرضيات مطارات، حظائر طائرات، صالات تجهيز ومرافق استقبال",
  "Aviation Pavements, Aircraft Hangars, Packing Bays &amp; Terminal Facilities": "أرضيات مطارات، حظائر طائرات، صالات تجهيز ومرافق استقبال",
  "Ultra-Luxury Interior Fit-Out, Curved Timber Panelling & MEP Systems": "تجهيز داخلي فاخر، كسوات خشبية منحنية وأنظمة كهروميكانيكية متطورة",
  "Ultra-Luxury Interior Fit-Out, Curved Timber Panelling &amp; MEP Systems": "تجهيز داخلي فاخر، كسوات خشبية منحنية وأنظمة كهروميكانيكية متطورة",
  "Turnkey Design, Structural Engineering, Paving & Illuminated Landscape": "تصميم متكامل، هندسة إنشائية، رصف وتنسيق مواقع مضاء",
  "Turnkey Design, Structural Engineering, Paving &amp; Illuminated Landscape": "تصميم متكامل، هندسة إنشائية، رصف وتنسيق مواقع مضاء",
  "Corporate Office Building, Structural Glazing & Executive Workspace": "مبنى مكاتب إدارية، واجهات زجاجية هيكلية ومساحات عمل تنفيذية",
  "Corporate Office Building, Structural Glazing &amp; Executive Workspace": "مبنى مكاتب إدارية، واجهات زجاجية هيكلية ومساحات عمل تنفيذية",
  "Subterranean Parking, Raft Foundations & Post-Tensioned Structure": "مواقف سيارات سفلية، أساسات لبشة وهياكل سابقة الإجهاد",
  "Subterranean Parking, Raft Foundations &amp; Post-Tensioned Structure": "مواقف سيارات سفلية، أساسات لبشة وهياكل سابقة الإجهاد",
  "Civic Administration Facility, Reinforced Concrete & High-Security Access": "مبنى إدارة حكومية، خرسانة مسلحة وأنظمة تحكم أمنية",
  "Civic Administration Facility, Reinforced Concrete &amp; High-Security Access": "مبنى إدارة حكومية، خرسانة مسلحة وأنظمة تحكم أمنية",
  "Facility View 3": "مشهد المرفق 3",
  "Facility View 4": "مشهد المرفق 4",
  "Facility View 5": "مشهد المرفق 5",
  "Master Aerial Perspective": "مشهد جوي عام للموقع",
  "Promenade & Lighting Perspective": "مشهد الممشى وأنظمة الإنارة",
  "Pavilion & Plaza Detail": "تفصيل الجناح والساحة العامة",
  "Marine Edge Detail": "تفصيل الواجهة البحرية الحجرية",
  "Seating & Illuminated Avenue": "جلسات ومسار المشاة المضاء",
  "Coastal Walkway & Sea Lanterns": "ممشى الشاطئ والفوانيس البحرية",
  "Central Gathering Plaza": "ساحة التجمع المركزية",
  "Atmospheric Dusk Lighting": "إضاءة الغروب البانورامية",
  "Nighttime Waterfront Splendor": "مشهد الواجهة البحرية الليلي",
  "Promenade Terminus & Vista": "نهاية الممشى والإطلالة البحرية",
  "What we do": "مجالات عملنا",
  "Ten disciplines.": "عشرة تخصصات هندسية.",
  "One chain of": "بسلسلة مسؤولية",
  "responsibility.": "واحدة متكاملة.",
  "Ten disciplines. One chain of responsibility.": "عشرة تخصصات هندسية بسلسلة مسؤولية واحدة متكاملة.",
  "Our integrated approach covers projects from planning and engineering through construction, testing, completion and handover.": "يغطي نهجنا المتكامل كافة مراحل المشروع من التخطيط والهندسة إلى الإنشاءات والاختبارات والتسليم النهائي.",
  "It is supported by close coordination between technical, project management, procurement, quality and HSE teams — which is what turns a list of services into a single accountable delivery.": "يدعمه تنسيق وثيق بين الفرق الفنية وإدارة المشاريع والمشتريات والجودة والسلامة — وهو ما يحول باقة الخدمات إلى تنفيذ متكامل ومسؤول.",
  "It is supported by close coordination between technical, project management, procurement, quality and HSE teams &mdash; which is what turns a list of services into a single accountable delivery.": "يدعمه تنسيق وثيق بين الفرق الفنية وإدارة المشاريع والمشتريات والجودة والسلامة — وهو ما يحول باقة الخدمات إلى تنفيذ متكامل ومسؤول.",
  "Civil Works": "الأعمال المدنية",
  "Structural and civil construction across residential, commercial, institutional and mixed-use developments — from substructure to handover.": "الإنشاءات الهيكلية والمدنية للمشاريع السكنية والتجارية والمؤسسية ومتعددة الاستخدامات — من الأساسات وحتى التسليم.",
  "Structural and civil construction across residential, commercial, institutional and mixed-use developments &mdash; from substructure to handover.": "الإنشاءات الهيكلية والمدنية للمشاريع السكنية والتجارية والمؤسسية ومتعددة الاستخدامات — من الأساسات وحتى التسليم.",
  "Infrastructure Development": "تطوير البنية التحتية",
  "Utilities, drainage, site services and the coordinated infrastructure that makes large developments operable.": "شبكات المرافق، وتصريف المياه، والخدمات الميدانية المتناسقة التي تجعل المشاريع الكبرى قابلة للتشغيل بكفاءة.",
  "Road Construction & Paving": "إنشاء ورصف الطرق",
  "Road Construction &amp; Paving": "إنشاء ورصف الطرق",
  "Highway construction, urban road networks, asphalt paving and durable access routes built with in-house machinery.": "إنشاء الطرق السريعة وشبكات الطرق الحضرية والرصف الأسفلتي والمسارات المتينة المنفذة بآلياتنا الذاتية.",
  "Earthworks & Site Preparation": "الأعمال الترابية وتجهيز المواقع",
  "Earthworks &amp; Site Preparation": "الأعمال الترابية وتجهيز المواقع",
  "Bulk excavation, site grading, ground leveling, cut-and-fill and subgrade preparation across challenging terrain.": "الحفريات الكبرى، وتسوية المواقع، والقطع والردم، وتجهيز طبقات التربة التحتية في التضاريس المعقدة.",
  "Geotechnical Engineering": "الهندسة الجيوتقنية",
  "Soil investigation, borehole drilling, deep foundation piling, retaining structures and geotechnical laboratory testing.": "فحوصات التربة، وحفر الآبار الاستكشافية، والخوازيق العميقة، والجدران الاستنادية، والاختبارات المعملية الشاملة.",
  "Project Management": "إدارة المشاريع",
  "End-to-end management covering scheduling, resource planning, procurement, site coordination, cost control and reporting.": "إدارة متكاملة تغطي الجداول الزمنية، وتخطيط الموارد، والمشتريات، والتنسيق الميداني، وضبط التكاليف، والتقارير الدورية.",
  "Technical Services": "الخدمات الفنية والاستشارية",
  "Engineering design review, value engineering, surveying, quantity takeoff, materials testing and construction methodology.": "مراجعة التصاميم الهندسية، والهندسة القيمة، والأعمال المساحية، وحساب الكميات، وفحص المواد، ومنهجيات التنفيذ.",
  "Plant & Machinery Services": "خدمات الآليات والمعدات الثقيلة",
  "Plant &amp; Machinery Services": "خدمات الآليات والمعدات الثقيلة",
  "Deployment of an owned, maintained fleet of heavy machinery, earthmoving equipment, paving trains and transport vehicles.": "تشغيل أسطول ذاتي متكامل ومصان من المعدات الثقيلة، وآليات الحفر، وقطارات الرصف، ومركبات النقل.",
  "Quality Management & QA/QC": "إدارة الجودة وضبط المعايير",
  "Quality Management &amp; QA/QC": "إدارة الجودة وضبط المعايير",
  "Systematic quality control across materials, methods and finishes, aligned to ISO 9001 and international standards.": "رقابة جودة منهجية على المواد وطرق التنفيذ والتشطيبات، متوافقة مع معايير ISO 9001 والمواصفات الدولية.",
  "Health, Safety & Environment": "الصحة والسلامة والبيئة",
  "Health, Safety &amp; Environment": "الصحة والسلامة والبيئة",
  "Comprehensive HSE management on every site, maintaining safe working conditions and responsible environmental practices.": "إدارة شاملة للصحة والسلامة والبيئة في كافة المواقع، لضمان بيئة عمل آمنة وممارسات بيئية مسؤولة.",
  "Equipment fleet": "أسطول المعدات والآليات",
  "Direct plant capacity.": "جاهزية وقوة تشغيلية مباشرة.",
  "Direct plant": "جاهزية وقوة",
  "capacity.": "تشغيلية مباشرة.",
  "MERAAS operates an extensive owned fleet of modern construction machinery, reducing reliance on third-party hire, protecting project schedules and ensuring equipment is maintained to our own operating standard.": "تمتلك مراس أسطولاً ضخماً من آليات البناء الحديثة، مما يقلل الاعتماد على الاستئجار الخارجي ويحمي الجداول الزمنية ويضمن صيانة المعدات بأعلى معاييرنا الخاصة.",
  "Machinery Category": "فئة الآليات والمعدات",
  "Primary Applications": "أبرز الاستخدامات والتطبيقات",
  "Excavators & Earthmovers": "الحفارات وآليات تحريك التربة",
  "Excavators &amp; Earthmovers": "الحفارات وآليات تحريك التربة",
  "Site excavation, trenching, bulk loading, foundation digging and material rehandling. Tracked and wheeled configurations.": "حفريات المواقع، وحفر الخنادق، والتحميل، وحفر الأساسات، ومناولة المواد. بنسخ مجنزرة ومدولبة.",
  "Bulldozers & Motor Graders": "الجرافات والممهدات",
  "Bulldozers &amp; Motor Graders": "الجرافات والممهدات",
  "Site clearing, bulk cut-and-fill, subgrade leveling, precision road grading and final trim before paving.": "تسوية المواقع، والقطع والردم، وتجهيز طبقات التأسيس، والتمهيد الدقيق للطرق قبل الرصف.",
  "Asphalt Pavers & Compactors": "آلات ومداحل رصف الأسفلت",
  "Asphalt Pavers &amp; Compactors": "آلات ومداحل رصف الأسفلت",
  "Road surfacing, highway paving, base and asphalt compaction, joint sealing and surface finishing.": "رصف الطرق والشوارع السريعة، ودمك طبقات الأساس والأسفلت، وختم الفواصل والتشطيب السطحي.",
  "Loaders & Tipper Trucks": "شاحنات التحميل والقلابات",
  "Loaders &amp; Tipper Trucks": "شاحنات التحميل والقلابات",
  "Bulk material haulage, aggregate supply, spoil removal and site distribution across active project zones.": "نقل المواد السائبة، وتوريد الركام، وترحيل المخلفات، والتوزيع الداخلي عبر مناطق العمل النشطة.",
  "Geotechnical & Drilling Rigs": "حفارات التربة والأعمال الجيوتقنية",
  "Geotechnical &amp; Drilling Rigs": "حفارات التربة والأعمال الجيوتقنية",
  "Soil sampling, borehole drilling, deep foundation piling, anchor installation and ground improvement.": "أخذ عينات التربة، وحفر الآبار الاستكشافية، ودق الخوازيق العميقة، وتركيب المراسي وتثبيت التربة.",
  "Mobile Cranes & Lifting Plant": "الرافعات المتحركة ومعدات الرفع",
  "Mobile Cranes &amp; Lifting Plant": "الرافعات المتحركة ومعدات الرفع",
  "Structural steel erection, precast placement, heavy equipment handling, formwork movement and high-reach installation.": "تركيب الهياكل الفولاذية، والخرسانة مسبقة الصب، ومناولة المعدات الثقيلة، ونقل الشدات والرفع العالي.",
  "Generators & Power Units": "المولدات ووحدات الطاقة",
  "Generators &amp; Power Units": "المولدات ووحدات الطاقة",
  "Site power generation, auxiliary lighting, high-demand equipment supply and emergency backup across remote sites.": "توليد الطاقة الميدانية، وأبراج الإنارة، وتغذية المعدات الكبرى، والطاقة الاحتياطية في المواقع النائية.",
  "The Client": "الجهة المالكة للمشروع",
  "The Challenge": "التحدي الهندسي والتشغيلي",
  "The Delivery": "التنفيذ والإنجاز الميداني",
  "The Outcome": "النتائج والأثر المتحقق",
  "Key Data": "البيانات الرئيسية",
  "Project Specs": "المواصفات الفنية للمشروع",
  "Scope of Work": "نطاق العمل الهندسي",
  "Key Metrics": "المؤشرات الرئيسية",
  "Next project": "المشروع التالي",
  "Previous project": "المشروع السابق",
  "Back to projects": "العودة إلى المشاريع",
  "Back to all projects": "العودة لكافة المشاريع",
  "See all projects": "شاهد كافة المشاريع",
  "Request Project Datasheet": "طلب الملف التعريفي للمشروع",
  "Company profile": "الملف التعريفي للشركة",
  "Integrated engineering and construction.": "هندسة وإنشاءات متكاملة.",
  "Founded with the conviction that complex projects are best delivered when engineering, construction, earthworks, geotechnical investigation, heavy plant and project management are coordinated under one roof.": "تأسست بإيمان راسخ بأن المشاريع المعقدة تُنجز بأفضل صورة عندما تتكامل الهندسة والإنشاءات والأعمال الترابية والفحوصات الجيوتقنية والآليات الثقيلة تحت سقف واحد.",
  "Quality and Safety": "الجودة والسلامة",
  "High standards. Built into every step.": "معايير رفيعة.. مدمجة في كل خطوة.",
  "At MERAAS, quality management and safety are not separate departments — they are built into our operating procedures, our procurement, our site supervision and the way our teams work every day.": "في مراس، لا تعد الجودة والسلامة مجرد إدارات منفصلة — بل هي جزء أصيل من إجراءاتنا التشغيلية ومشترياتنا وإشرافنا الميداني اليومي.",
  "Quality Management System": "نظام إدارة الجودة",
  "Our quality management system is aligned to ISO 9001:2015, covering materials testing, inspection and test plans, structural tolerances and final handover documentation.": "يتوافق نظام إدارة الجودة لدينا مع معايير ISO 9001:2015، شاملاً فحص المواد وخطط التفتيش والاختبار والتفاوتات الإنشائية ووثائق التسليم النهائي.",
  "Occupational Health and Safety": "الصحة والسلامة المهنية",
  "Our health and safety protocols follow ISO 45001:2018 principles — with mandatory PPE, toolbox talks, hazard identification, equipment inspection and a commitment to zero accidents.": "تتبع بروتوكولات الصحة والسلامة مبادئ ISO 45001:2018 — مع الالتزام الصارم بمعدات الوقاية، والمحادثات الميدانية الدورية، وتحديد المخاطر، وفحص المعدات، واستهداف صفر حوادث.",
  "Environmental Responsibility": "المسؤولية البيئية",
  "We manage our site environmental impact in line with ISO 14001:2015 — controlling dust and runoff, disposing of construction waste responsibly, and maintaining our plant to minimise emissions.": "ندير الأثر البيئي لمواقعنا وفق ISO 14001:2015 — بالتحكم في الغبار ومياه الجريان، والتخلص المسؤول من المخلفات، وصيانة الآليات لتقليل الانبعاثات.",
  "Company leadership": "قيادة الشركة",
  "Experienced professionals. Practical direction.": "خبرات قيادية.. وتوجيه تطبيقي سديد.",
  "General Manager": "المدير العام",
  "Technical Manager": "المدير الفني",
  "Operations Manager": "مدير العمليات",
  "Geotechnical Manager": "مدير الهندسة الجيوتقنية",
  "Project location": "موقع المشروع",
  "Estimated timeline": "الجدول الزمني التقديري",
  "Estimated budget": "الميزانية التقديرية",
  "Upload project brief (optional)": "إرفاق نبذة عن المشروع (اختياري)",
  "How did you hear about us?": "كيف سمعت عنا؟",
  "Select a project type": "اختر نوع المشروع",
  "Select location": "اختر الموقع",
  "Benghazi": "بنغازي",
  "Tripoli": "طرابلس",
  "Misrata": "مصراتة",
  "Tobruk": "طبرق",
  "Derna": "درنة",
  "Sabha": "سبها",
  "Sirte": "سرت",
  "Other region in Libya": "منطقة أخرى في ليبيا",
  "All rights reserved.": "جميع الحقوق محفوظة.",
  "Engineering & Construction, Libya": "للهندسة والإنشاءات، ليبيا",
  "Engineering &amp; Construction, Libya": "للهندسة والإنشاءات، ليبيا",
  "150+ machines.": "أكثر من 150 آلية.",
  "Direct plant power.": "قوة تشغيلية مباشرة.",
  "150+ machines. Direct plant power.": "أكثر من 150 آلية بقوة تشغيلية مباشرة.",
  "MERAAS maintains a substantial fleet of construction plant and machinery to support its projects and eliminate dependence on external suppliers.": "تمتلك مراس أسطولاً كبيراً من آليات ومعدات البناء لدعم مشاريعها والقضاء على الاعتماد على الموردين الخارجيين.",
  "Our equipment supports excavation, earthmoving, grading, compaction, transportation, lifting, road construction and general site activities. The availability of dedicated machinery, together with experienced operators and mobile maintenance units, gives MERAAS unmatched operational agility.": "تدعم معداتنا أعمال الحفر، والقطع، والتسوية، والدمك، والنقل، والرفع، ورصف الطرق، والأنشطة الميدانية العامة. تمنحنا وفرة الآليات الذاتية مع المشغلين الخبراء ووحدات الصيانة المتنقلة مرونة تشغيلية لا تضاهى.",
  "Category 01": "الفئة 01",
  "Earthmoving & Excavation": "تحريك التربة والحفريات",
  "Earthmoving &amp; Excavation": "تحريك التربة والحفريات",
  "Heavy hydraulic crawler excavators (20t–45t)": "حفارات هيدروليكية مجنزرة ثقيلة (20-45 طن)",
  "Heavy hydraulic crawler excavators (20t&ndash;45t)": "حفارات هيدروليكية مجنزرة ثقيلة (20-45 طن)",
  "Wheel loaders & tracked bulldozers": "شاحنات تحميل وجرافات مجنزرة",
  "Wheel loaders &amp; tracked bulldozers": "شاحنات تحميل وجرافات مجنزرة",
  "Motor graders & heavy dump trucks": "ممهدات طرق وشاحنات قلابة ثقيلة",
  "Motor graders &amp; heavy dump trucks": "ممهدات طرق وشاحنات قلابة ثقيلة",
  "Category 02": "الفئة 02",
  "Paving & Roadworks Train": "قطارات رصف وتمهيد الطرق",
  "Paving &amp; Roadworks Train": "قطارات رصف وتمهيد الطرق",
  "Tracked asphalt pavers with laser screeds": "آلات رصف أسفلت مجنزرة بمسطرات ليزرية",
  "Tandem vibratory & pneumatic rollers": "مداحل اهتزازية ومداحل إطارات هوائية",
  "Tandem vibratory &amp; pneumatic rollers": "مداحل اهتزازية ومداحل إطارات هوائية",
  "Bitumen emulsion sprayers & cold planers": "رشاشات مستحلب البيتومين وقاشطات باردة",
  "Bitumen emulsion sprayers &amp; cold planers": "رشاشات مستحلب البيتومين وقاشطات باردة",
  "Category 03": "الفئة 03",
  "Geotechnical & Site Investigation": "الأعمال الجيوتقنية وتحريات المواقع",
  "Geotechnical &amp; Site Investigation": "الأعمال الجيوتقنية وتحريات المواقع",
  "Hydraulic rotary borehole drilling rigs": "حفارات آبار استكشافية هيدروليكية دوارة",
  "In-situ SPT & CPT sampling units": "وحدات أخذ عينات واختبارات SPT وCPT الميدانية",
  "In-situ SPT &amp; CPT sampling units": "وحدات أخذ عينات واختبارات SPT وCPT الميدانية",
  "Field compaction & rock coring equipment": "معدات اختبارات الدمك الميداني وحفر الصخور",
  "Field compaction &amp; rock coring equipment": "معدات اختبارات الدمك الميداني وحفر الصخور",
  "Category 04": "الفئة 04",
  "Lifting, Transport & Support": "الرفع، النقل والدعم اللوجستي",
  "Lifting, Transport &amp; Support": "الرفع، النقل والدعم اللوجستي",
  "All-terrain mobile telescopic cranes": "رافعات تلسكوبية متحركة لكافة التضاريس",
  "Heavy lowbed transport trailers": "مقطورات نقل ثقيلة منخفضة السطح (لوبد)",
  "Transit concrete mixers & mobile service trucks": "خلاطات خرسانة متنقلة ومركبات خدمة ميدانية",
  "Transit concrete mixers &amp; mobile service trucks": "خلاطات خرسانة متنقلة ومركبات خدمة ميدانية",
  "Bring us the difficult one.": "ائتمنّا على مشاريعك الأكثر تعقيداً.",
  "Tight programme, difficult ground, or a scope nobody wants to own end-to-end — those are the projects this structure was built for.": "البرامج الزمنية الدقيقة، والأراضي الصعبة، ونطاقات العمل الكبرى التي تتطلب تنفيذاً متكاملاً — تلك هي المشاريع التي صُمم هيكلنا لإنجازها.",
  "Tight programme, difficult ground, or a scope nobody wants to own end-to-end &mdash; those are the projects this structure was built for.": "البرامج الزمنية الدقيقة، والأراضي الصعبة، ونطاقات العمل الكبرى التي تتطلب تنفيذاً متكاملاً — تلك هي المشاريع التي صُمم هيكلنا لإنجازها.",
  "MERAAS Engineering": "مراس للهندسة",
  "& Construction.": "والإنشاءات.",
  "We aspire to be recognised as a leading engineering and construction company, delivering sustainable, high-quality solutions that respond to the evolving needs of our clients and communities — continuously advancing our technical capabilities and setting higher standards for every project we undertake.": "نطمح لأن نكون الشركة الهندسية والإنشائية الرائدة، بتقديم حلول مستدامة وعالية الجودة تلبي تطلعات عملائنا ومجتمعنا — مع التطوير المستمر لقدراتنا الفنية ووضع معايير أعلى لكل مشروع نتولاه.",
  "We aspire to be recognised as a leading engineering and construction company, delivering sustainable, high-quality solutions that respond to the evolving needs of our clients and communities &mdash; continuously advancing our technical capabilities and setting higher standards for every project we undertake.": "نطمح لأن نكون الشركة الهندسية والإنشائية الرائدة، بتقديم حلول مستدامة وعالية الجودة تلبي تطلعات عملائنا ومجتمعنا — مع التطوير المستمر لقدراتنا الفنية ووضع معايير أعلى لكل مشروع نتولاه.",
  "The resource behind the promise.": "الموارد الحقيقية وراء كل وعد نقطعه.",
  "Our people": "فريقنا وكوادرنا",
  "550 people.": "550 كادراً متخصصاً.",
  "14 nationalities.": "14 جنسية متنوعة.",
  "One method.": "بمنهجية عمل واحدة.",
  "550 people. 14 nationalities. One method.": "550 كادراً متخصصاً من 14 جنسية بمنهجية عمل واحدة.",
  "Our people are one of the key strengths of MERAAS Engineering & Construction.": "كوادرنا البشرية هي الركيزة الأساسية لقوة وتميز مراس للهندسة والإنشاءات.",
  "Our people are one of the key strengths of MERAAS Engineering &amp; Construction.": "كوادرنا البشرية هي الركيزة الأساسية لقوة وتميز مراس للهندسة والإنشاءات.",
  "The organisation brings together experienced engineers, project managers, technical specialists, supervisors, skilled workers, equipment operators, mechanics, QA/QC professionals, HSE personnel and administrative staff.": "تجمع المؤسسة نخبة من المهندسين الخبراء، ومديري المشاريع، والمختصين الفنيين، والمشرفين، والعمالة الماهرة، ومشغلي الآليات، والميكانيكيين، وخبراء الجودة والسلامة والكوادر الإدارية.",
  "This multidisciplinary workforce allows MERAAS to mobilise the appropriate technical and operational resources according to project requirements, and to maintain effective control throughout project execution.": "تتيح هذه القوى العاملة المتنوعة لمراس حشد الموارد الفنية والتشغيلية المناسبة بدقة وفق متطلبات المشروع، وضمان التحكم الفعال طوال فترة التنفيذ.",
  "Our services": "خدماتنا الهندسية",
  "Turnkey, from": "تنفيذ متكامل من",
  "concept to handover.": "الفكرة إلى التسليم.",
  "Turnkey, from concept to handover.": "تنفيذ متكامل من الفكرة إلى التسليم.",
  "We provide turnkey construction and engineering solutions across residential, commercial, hospitality and mixed-use developments.": "نقدم حلولاً هندسية وإنشائية متكاملة للمشاريع السكنية والتجارية والفندقية ومتعددة الاستخدامات.",
  "Design & Engineering": "التصميم والهندسة",
  "Design &amp; Engineering": "التصميم والهندسة",
  "Multidisciplinary design and engineering through specialised technical disciplines, ensuring integrated and coordinated project development.": "تصميم وهندسة متكاملة عبر تخصصات فنية متطورة، لضمان تطوير متناسق وشامل لكافة تفاصيل المشروع.",
  "Construction & Execution": "الإنشاء والتنفيذ الميداني",
  "Construction &amp; Execution": "الإنشاء والتنفيذ الميداني",
  "Construction services that turn design concepts into high-quality built environments through efficient execution and quality control.": "خدمات إنشائية تحول المفاهيم التصميمية إلى بيئات عمرانية رفيعة المستوى من خلال التنفيذ المتقن ورقابة الجودة الصارمة.",
  "Seamless coordination between all engineering disciplines to achieve integrated and optimised project outcomes.": "تنسيق سلس بين كافة التخصصات الهندسية لتحقيق أفضل النتائج الإنشائية والتشغيلية الممكنة.",
  "Geotechnical Engineering & Investigation": "الهندسة والتحريات الجيوتقنية",
  "Geotechnical Engineering &amp; Investigation": "الهندسة والتحريات الجيوتقنية",
  "Reliable site investigation through integrated field investigation, laboratory testing and engineering analysis.": "تحريات موقع موثوقة عبر الفحوصات الميدانية المتكاملة والاختبارات المعملية والتحليلات الهندسية الدقيقة.",
  "Our commitment": "التزامنا الراسخ",
  "Professionalism.": "احترافية مهنية.",
  "Integrity. Safety.": "ونزاهة.. وسلامة.",
  "Professionalism. Integrity. Safety.": "احترافية مهنية. ونزاهة.. وسلامة.",
  "MERAAS is committed to professionalism, integrity, technical competence, quality and safety.": "تلتزم مراس بأعلى معايير الاحترافية، والنزاهة، والكفاءة الفنية، والجودة، والسلامة المهنية.",
  "We continuously strengthen our engineering capabilities, workforce, resources and project delivery systems to successfully deliver projects, build long-term client relationships, and contribute to the development of Libya’s infrastructure and construction sector.": "نواصل باستمرار تعزيز قدراتنا الهندسية وكوادرنا وأنظمتنا التنفيذية لإنجاز المشاريع بنجاح، وبناء شراكات دائمة، والمساهمة الفعالة في تنمية قطاع البنية التحتية والإنشاءات في ليبيا.",
  "We continuously strengthen our engineering capabilities, workforce, resources and project delivery systems to successfully deliver projects, build long-term client relationships, and contribute to the development of Libya&rsquo;s infrastructure and construction sector.": "نواصل باستمرار تعزيز قدراتنا الهندسية وكوادرنا وأنظمتنا التنفيذية لإنجاز المشاريع بنجاح، وبناء شراكات دائمة، والمساهمة الفعالة في تنمية قطاع البنية التحتية والإنشاءات في ليبيا.",
  "MERAAS has an expanding project presence across five regions of Libya. The largest concentration is in Benghazi, supported by additional projects across key regions of the country.": "تمتلك مراس حضوراً متنامياً للمشاريع عبر خمس مناطق في ليبيا، يتركز أكبرها في بنغازي مع مشاريع استراتيجية إضافية في مختلف مناطق البلاد.",
  "QA / QC": "الجودة والرقابة الفنية",
  "ISO 9001 Alignment": "معايير ISO 9001",
  "Standardized testing & inspection checklists on every stage.": "قوائم فحص واختبارات قياسية في كافة مراحل التنفيذ.",
  "Standardized testing &amp; inspection checklists on every stage.": "قوائم فحص واختبارات قياسية في كافة مراحل التنفيذ.",
  "HSE": "السلامة والصحة المهنية",
  "ISO 45001 Safety": "سلامة ISO 45001",
  "Proactive risk assessment and zero-compromise site welfare.": "تقييم استباقي للمخاطر وتوفير بيئة عمل آمنة بدون تهاون.",
  "ENV": "الاستدامة والبيئة",
  "ISO 14001 Impact": "بيئة ISO 14001",
  "Sustainable resource usage and environmental stewardship.": "استخدام مستدام للموارد وحماية مسؤولة للبيئة المحيطة.",
  "Work with us": "اعمل معنا",
  "This opens your email client with the details filled in. To receive submissions directly, connect the form to your host’s form handler.": "سيتم فتح تطبيق البريد الإلكتروني مع تعبئة كافة التفاصيل تلقائياً.",
  "This opens your email client with the details filled in. To receive submissions directly, connect the form to your host&rsquo;s form handler.": "سيتم فتح تطبيق البريد الإلكتروني مع تعبئة كافة التفاصيل تلقائياً.",
  "MERAAS": "مراس",
  "Engineering & Construction": "للهندسة والإنشاءات",
  "Engineering &amp; Construction": "للهندسة والإنشاءات",
  "MERAAS is a Libya-based engineering and construction company - integrated engineering, coordinated execution, and lasting value across civil works, infrastructure, geotechnical engineering and project management.": "مراس شركة هندسية وإنشائية ليبية - تقدم هندسة متكاملة وتنفيذاً متناسقاً وقيمة مستدامة عبر الأعمال المدنية والبنية التحتية والهندسة الجيوتقنية وإدارة المشاريع.",
  "MERAAS is a Libya-based engineering and construction company &mdash; integrated engineering, coordinated execution, and lasting value across civil works, infrastructure, geotechnical engineering and project management.": "مراس شركة هندسية وإنشائية ليبية - تقدم هندسة متكاملة وتنفيذاً متناسقاً وقيمة مستدامة عبر الأعمال المدنية والبنية التحتية والهندسة الجيوتقنية وإدارة المشاريع.",
  "01 - Sports & Leisure": "01 - الرياضة والترفيه",
  "01 - Sports &amp; Leisure": "01 - الرياضة والترفيه",
  "02 - Education": "02 - التعليم",
  "03 - Civic & Urban": "03 - مدني وحضري",
  "03 - Civic &amp; Urban": "03 - مدني وحضري",
  "04 - Sports & Leisure": "04 - الرياضة والترفيه",
  "04 - Sports &amp; Leisure": "04 - الرياضة والترفيه",
  "05 - Interiors & Aviation": "05 - تصميم داخلي وطيران",
  "05 - Interiors &amp; Aviation": "05 - تصميم داخلي وطيران",
  "06 - Civic & Government": "06 - مباني حكومية ومدنية",
  "06 - Civic &amp; Government": "06 - مباني حكومية ومدنية",
  "07 - Commercial & Corporate": "07 - تجاري وإداري",
  "07 - Commercial &amp; Corporate": "07 - تجاري وإداري",
  "08 - Mixed-Use": "08 - متعدد الاستخدامات",
  "09 - Sports & Extreme": "09 - رياضة ومغامرات",
  "09 - Sports &amp; Extreme": "09 - رياضة ومغامرات",
  "Benghazi University - College of Law & Planetarium": "جامعة بنغازي - كلية القانون والقبة السماوية",
  "Benghazi University - College of Law &amp; Planetarium": "جامعة بنغازي - كلية القانون والقبة السماوية",
  "A landmark educational complex comprising the College of Law and a public Planetarium, designed to give the campus a distinct academic identity.": "مجمع تعليمي بارز يضم كلية القانون وقبة فلكية عامة، صُمم ليمنح الحرم الجامعي هوية أكاديمية فريدة.",
  "Benghazi Corniche - Coastal Light": "كورنيش بنغازي - ضوء الساحل",
  "The &ldquo;Diamond Night&rdquo; revitalisation of Benghazi’s waterfront for Ramadan 2026, turning a deserted post-war coastline into a light-filled public hub.": "مشروع \"الليلة الماسية\" لتطوير الواجهة البحرية لمدينة بنغازي لموسم رمضان، وتحويل الشريط الساحلي إلى مركز جذب حضري مضيء.",
  "The “Diamond Night” revitalisation of Benghazi’s waterfront for Ramadan 2026, turning a deserted post-war coastline into a light-filled public hub.": "مشروع \"الليلة الماسية\" لتطوير الواجهة البحرية لمدينة بنغازي لموسم رمضان، وتحويل الشريط الساحلي إلى مركز جذب حضري مضيء.",
  "The “Diamond Night” revitalisation of Benghazi&rsquo;s waterfront for Ramadan 2026, turning a deserted post-war coastline into a light-filled public hub.": "مشروع \"الليلة الماسية\" لتطوير الواجهة البحرية لمدينة بنغازي لموسم رمضان، وتحويل الشريط الساحلي إلى مركز جذب حضري مضيء.",
  "Benina Airport - VIP Lounges": "مطار بنينا - صالات كبار الزوار",
  "Benghazi Skydive - Dropzone": "سكاي دايف بنغازي - مهبط القفز",
  "Specialized aviation engineering &mdash; building North Africa&rsquo;s premier civilian parachuting facility.": "هندسة طيران تخصصية — إنشاء مركز القفز المظلي المدني الرائد في شمال إفريقيا.",
  "Harmonious design for horse and landscape &mdash; an exceptional equine and sporting environment.": "تصميم متناسق يجمع بين الخيل والطبيعة — بيئة استثنائية للفروسية والرياضة.",
  "Road Construction": "إنشاء ورصف الطرق",
  "Earthworks, sub-base, paving and surfacing for urban and inter-urban routes, delivered with our own plant.": "الأعمال الترابية وطبقات الأساس والرصف السطحي للطرق الحضرية والسريعة المنفذة بآلياتنا الذاتية.",
  "Excavation, grading, compaction and bulk earthmoving, supported by a dedicated machinery fleet and experienced operators.": "الحفريات والتسوية والدمك والتحريك الشامل للتربة، مدعومة بأسطول معدات مخصص ومشغلين محترفين.",
  "Borehole drilling, SPT/CPT, soil and rock testing, geotechnical investigation, topographic and as-built survey, and construction setting-out.": "حفر الآبار الاستكشافية، واختبارات SPT/CPT، وفحص التربة والصخور، والتحريات الجيوتقنية، والمسح الطبوغرافي والتنفيذي، وتوقيع المنشآت.",
  "Coordination across every engineering discipline, procurement and site team to keep programme, cost and quality under one command.": "التنسيق الشامل بين كافة التخصصات الهندسية والمشتريات والفرق الميدانية لإبقاء البرنامج والتكلفة والجودة تحت قيادة موحدة.",
  "Engineering & Technical Services": "الخدمات الهندسية والفنية",
  "Engineering &amp; Technical Services": "الخدمات الهندسية والفنية",
  "Design review, technical documentation, shop drawing coordination, material submittals, method statements and site engineering support.": "مراجعة التصاميم، والتوثيق الفني، ومطابقة المخططات التنفيذية، واعتماد المواد، ومنهجيات التنفيذ، والدعم الهندسي الميداني.",
  "Machinery & Equipment Operations": "تشغيل وصيانة الآليات والمعدات",
  "Machinery &amp; Equipment Operations": "تشغيل وصيانة الآليات والمعدات",
  "A substantial owned fleet for excavation, earthmoving, grading, compaction, lifting and transport — reducing dependence on external resources.": "أسطول ذاتي ضخم للحفر ونقل الأتربة والتسوية والدمك والرفع والنقل — يقضي على الاعتماد على الموارد الخارجية.",
  "A substantial owned fleet for excavation, earthmoving, grading, compaction, lifting and transport &mdash; reducing dependence on external resources.": "أسطول ذاتي ضخم للحفر ونقل الأتربة والتسوية والدمك والرفع والنقل — يقضي على الاعتماد على الموارد الخارجية.",
  "Quality Assurance & Quality Control": "ضمان الجودة والرقابة النوعية",
  "Quality Assurance &amp; Quality Control": "ضمان الجودة والرقابة النوعية",
  "Documented QA/QC across materials, workmanship and testing, integrated with project management rather than bolted on.": "أنظمة جودة ورقابة موثقة تشمل المواد والتنفيذ والاختبارات، مدمجة عضوياً في إدارة المشروع.",
  "HSE planning and enforcement on every site, treated as a delivery requirement and not a compliance exercise.": "تخطيط وتطبيق صارم للسلامة والصحة والبيئة في كل موقع، كمتطلب تنفيذي جوهري وليس مجرد إجراء شكلي.",
  "Engineering & technical capability": "القدرات والخبرات الفنية والهندسية",
  "Engineering &amp; technical capability": "القدرات والخبرات الفنية والهندسية",
  "The technical": "الإدارة",
  "department.": "الفنية والهندسية.",
  "The technical department.": "الإدارة الفنية والهندسية.",
  "Our technical teams provide engineering coordination, design review, technical documentation, surveying, structural and civil engineering support, and geotechnical input.": "تقدم فرقنا الفنية التنسيق الهندسي، ومراجعة التصاميم، والتوثيق الفني، والأعمال المساحية، والدعم الإنشائي والمدني والجيوتقني.",
  "They handle shop drawing coordination, material submittals, method statements, technical clarifications and site engineering assistance. Working closely with project management, the technical department translates engineering requirements into practical, controlled construction activities.": "يتولى القسم مطابقة المخططات التنفيذية، واعتماد المواد، وإعداد منهجيات العمل، والإيضاحات الفنية، والمساندة الميدانية لترجمة المتطلبات الهندسية إلى أعمال إنشائية عملية ومنضبطة.",
  "Geotechnical engineering": "الهندسة الجيوتقنية",
  "What is under": "ما تحت",
  "the building.": "أساسات المبنى.",
  "What is under the building.": "ما تحت أساسات المبنى.",
  "MERAAS provides integrated geotechnical engineering and surveying services through experienced professionals and modern technology.": "تقدم مراس خدمات جيوتقنية ومساحية متكاملة عبر نخبة من الخبراء وأحدث التقنيات الهندسية.",
  "Capabilities include borehole drilling, SPT/CPT, soil and rock testing, geotechnical investigations, topographic and as-built surveys, and construction setting-out. Supported by advanced drilling rigs, GNSS/RTK GPS, total stations, drones/UAVs and modern testing equipment, we deliver accurate and reliable solutions for buildings, roads, infrastructure and major development projects.": "تشمل قدراتنا حفر الآبار، واختبارات SPT/CPT، وفحص التربة والصخور، والمسح الطبوغرافي والتنفيذي، وتوقيع المنشآت بدعم من أحدث أجهزة الحفر وGPS والمحطات الشاملة والطائرات المسيرة لمشاريع المباني والطرق والبنية التحتية.",
  "Heavy machinery department": "إدارة الأسطول والمعدات الثقيلة",
  "Architecture & Landscape": "العمارة وتنسيق المواقع",
  "Architecture &amp; Landscape": "العمارة وتنسيق المواقع",
  "A recreational destination that brings play, sport and entertainment together in a landscape designed to change character after dark.": "وجهة ترفيهية متكاملة تجمع بين اللعب والرياضة والترفيه ضمن بيئة طبيعية مصممة لتتألق بحلة مبهرة بعد الغروب.",
  "One organisation,": "مؤسسة واحدة..",
  "every discipline.": "لكافة التخصصات.",
  "One organisation, every discipline.": "مؤسسة واحدة.. لكافة التخصصات.",
  "MERAAS combines engineering expertise, construction experience, geotechnical capability, heavy equipment resources, project management, quality assurance and HSE management within one integrated organisation.": "تجمع مراس بين الخبرة الهندسية والتجربة الإنشائية والقدرة الجيوتقنية وأسطول المعدات الثقيلة وإدارة المشاريع وضمان الجودة والسلامة في كيان متكامل موحد.",
  "That combination lets us keep strong control over resources, technical requirements, quality, safety and delivery, instead of coordinating it across four contractors.": "يمنحنا هذا التكامل تحكماً محكماً بالموارد والمتطلبات الفنية والجودة والسلامة ومواعيد التسليم، بدلاً من تشتيت العمل بين مقاولين متعددين.",
  "Structural and civil construction across residential, commercial, institutional and mixed-use developments, from substructure to handover.": "الإنشاءات الهيكلية والمدنية للمشاريع السكنية والتجارية والمؤسسية ومتعددة الاستخدامات، من الأساسات وحتى التسليم.",
  "Why MERAAS": "لماذا مراس",
  "A dependable": "شريك موثوق..",
  "partner, not just": "وليس مجرد",
  "a contractor.": "شركة مقاولات.",
  "A dependable partner, not just a contractor.": "شريك موثوق.. وليس مجرد شركة مقاولات.",
  "Our focus on professional communication, reliable execution and long-term client relationships allows us to build confidence and establish MERAAS as a dependable engineering and construction partner.": "تركيزنا على التواصل المهني والتنفيذ الموثوق والشراكات طويلة الأمد يعزز الثقة ويرسخ مكانة مراس كشريك هندسي وإنشائي يعتمد عليه.",
  "We are committed to professionalism, integrity, technical competence, quality and safety. We continuously strengthen our engineering capabilities, workforce, resources and project delivery systems to deliver projects successfully, build long-term client relationships, and contribute to the development of Libya’s infrastructure and construction sector.": "نلتزم بالاحترافية والنزاهة والكفاءة والجودة والسلامة، ونواصل تعزيز قدراتنا وكوادرنا ومواردنا لإنجاز المشاريع بنجاح وبناء علاقات راسخة والإسهام في إعمار ليبيا.",
  "Integrated engineering, coordinated execution, and lasting value, delivered across Libya since our first project.": "هندسة متكاملة وتنفيذ متناسق وقيمة مستدامة ننجزها في كافة أنحاء ليبيا منذ مشروعنا الأول.",
  "Private Development": "تطوير عقاري خاص",
  "Riding Arenas": "حلبات الركوب والتدريب",
  "Stables Capacity": "سعة الإسطبلات",
  "Amenities": "المرافق والخدمات",
  "Grandstands": "المدرجات ومنصات المشاهدة",
  "Education · Benghazi, Libya": "تعليم · بنغازي، ليبيا",
  "Education &middot; Benghazi, Libya": "تعليم · بنغازي، ليبيا",
  "Large-Scale Multi-Story Civil Construction, Basements & Infrastructure": "إنشاءات خرسانية ضخمة متعددة الطوابق، طوابق قبو وبنية تحتية",
  "Large-Scale Multi-Story Civil Construction, Basements &amp; Infrastructure": "إنشاءات خرسانية ضخمة متعددة الطوابق، طوابق قبو وبنية تحتية",
  "Built-up Area": "المساحة المبنية",
  "Levels": "عدد الطوابق",
  "Full Structural Civil Works, Modern Stone Façades & Administrative Fit-Out": "أعمال مدنية إنشائية متكاملة، واجهات حجرية حديثة وتشطيبات إدارية",
  "Full Structural Civil Works, Modern Stone Façades &amp; Administrative Fit-Out": "أعمال مدنية إنشائية متكاملة، واجهات حجرية حديثة وتشطيبات إدارية",
  "Floors": "عدد الطوابق",
  "Commercial & Corporate · Benghazi, Libya": "تجاري وإداري · بنغازي، ليبيا",
  "Commercial &amp; Corporate &middot; Benghazi, Libya": "تجاري وإداري · بنغازي، ليبيا",
  "Waterfront Master Plan, Promenade Reconstruction & Event Infrastructure": "مخطط عام للواجهة البحرية، إعادة تأهيل الممشى وبنية تحتية للفعاليات",
  "Waterfront Master Plan, Promenade Reconstruction &amp; Event Infrastructure": "مخطط عام للواجهة البحرية، إعادة تأهيل الممشى وبنية تحتية للفعاليات",
  "Waterfront Length": "طول الواجهة البحرية",
  "Master Plan & Architecture": "مخطط عام وعمارة",
  "Master Plan &amp; Architecture": "مخطط عام وعمارة",
  "A comprehensive equestrian and shooting complex that integrates training, care, competition and visitor amenities inside a single coherent master plan.": "مجمع متكامل للفروسية والرماية يجمع بين التدريب والرعاية والمسابقات الدولية ومرافق الزوار ضمن مخطط عام موحد.",
  "Master Plan & Event Infrastructure": "مخطط عام وبنية تحتية للفعاليات",
  "Master Plan &amp; Event Infrastructure": "مخطط عام وبنية تحتية للفعاليات",
  "Careers | MERAAS Engineering & Construction": "الوظائف | مراس للهندسة والإنشاءات",
  "Careers": "الوظائف",
  "Career paths": "المسارات المهنية",
  "Build what": "ابنِ ما",
  "comes next.": "سيأتي بعد ذلك.",
  "Join the people shaping Libya’s next generation of places and infrastructure.": "انضم إلى الكفاءات التي تسهم في بناء الجيل القادم من المشاريع والبنية التحتية في ليبيا.",
  "Explore career paths": "استكشف المسارات المهنية",
  "Explore careers": "استكشف الوظائف",
  "MERAAS engineers reviewing project drawings at a site": "مهندسو مراس يراجعون مخططات المشروع في الموقع",
  "people across the organisation": "موظفاً في مختلف أقسام المؤسسة",
  "engineers and specialists": "مهندساً ومتخصصاً",
  "nationalities working as one team": "جنسية تعمل بروح فريق واحد",
  "One integrated organisation gives every discipline a direct line to the work.": "تمنح المؤسسة المتكاملة كل تخصص صلة مباشرة بالعمل الفعلي.",
  "Find your place": "اكتشف مكانك",
  "in the project.": "ضمن المشروع.",
  "Open roles across MERAAS departments. Select the position closest to your experience and introduce yourself.": "وظائف شاغرة في إدارات مراس. اختر الوظيفة الأقرب إلى خبرتك وعرّفنا بنفسك.",
  "Human Resources": "الموارد البشرية",
  "Onboarding Specialist": "أخصائي تهيئة الموظفين الجدد",
  "Project Management Department": "إدارة المشاريع",
  "Civil Engineer": "مهندس مدني",
  "Technical Affairs Department": "إدارة الشؤون الفنية",
  "Architectural Engineer": "مهندس معماري",
  "Logistics Department": "إدارة الخدمات اللوجستية",
  "Driver": "سائق",
  "IT Department": "إدارة تقنية المعلومات",
  "IT Support Technician": "فني دعم تقني",
  "Engineering & Design": "الهندسة والتصميم",
  "Turn requirements into buildable answers.": "حوّل المتطلبات إلى حلول قابلة للتنفيذ.",
  "Civil and structural engineering": "الهندسة المدنية والإنشائية",
  "Architecture and MEP coordination": "العمارة وتنسيق الأعمال الميكانيكية والكهربائية والصحية",
  "Quantity surveying and cost control": "حصر الكميات وضبط التكاليف",
  "Geotechnical, surveying and technical office": "الهندسة الجيوتقنية والمساحة والمكتب الفني",
  "Project Delivery": "تنفيذ المشاريع",
  "Coordinate people, quality and programme on site.": "نسّق الفرق والجودة والبرنامج الزمني في الموقع.",
  "Project management and planning": "إدارة المشاريع والتخطيط",
  "Site engineering and supervision": "الهندسة الميدانية والإشراف",
  "Quality assurance and quality control": "ضمان الجودة والرقابة النوعية",
  "Health, safety and environmental management": "إدارة الصحة والسلامة والبيئة",
  "Operations & Support": "العمليات والدعم",
  "Keep every resource ready and every team moving.": "حافظ على جاهزية الموارد واستمرارية حركة الفرق.",
  "Plant, equipment and fleet operations": "تشغيل الآليات والمعدات والأسطول",
  "Logistics, maintenance and procurement": "الخدمات اللوجستية والصيانة والمشتريات",
  "Finance and administration": "المالية والإدارة",
  "People, communications and business support": "الموارد البشرية والاتصالات ودعم الأعمال",
  "Select this path": "اختر هذا المسار",
  "Apply for career": "تقدم للمسار المهني",
  "Technical specialists collaborating on project quality": "متخصصون فنيون يتعاونون لضمان جودة المشروع",
  "How the work moves.": "كيف يتقدم العمل.",
  "Every role connects to a shared delivery method, from the first technical decision to the final handover.": "يرتبط كل دور بمنهج تنفيذ مشترك، من أول قرار فني حتى التسليم النهائي.",
  "Think together": "نفكر معاً",
  "Bring disciplines into the conversation before decisions become site problems.": "نجمع التخصصات في الحوار قبل أن تتحول القرارات إلى مشكلات ميدانية.",
  "Plan precisely": "نخطط بدقة",
  "Translate intent into coordinated information, resources and safe methods.": "نحوّل الرؤية إلى معلومات وموارد وأساليب آمنة ومنسقة.",
  "Build responsibly": "نبني بمسؤولية",
  "Protect quality, safety and programme through visible ownership at every stage.": "نحمي الجودة والسلامة والبرنامج الزمني عبر مسؤولية واضحة في كل مرحلة.",
  "Finish with care": "ننجز بعناية",
  "Close the work properly and leave lasting value behind.": "نختتم الأعمال بالشكل الصحيح ونترك قيمة مستدامة.",
  "What matters on every team.": "ما يهم في كل فريق.",
  "Technical judgement": "الحكم الفني",
  "Know the detail, test assumptions and make decisions the project can depend on.": "افهم التفاصيل واختبر الافتراضات واتخذ قرارات يعتمد عليها المشروع.",
  "Shared responsibility": "المسؤولية المشتركة",
  "Own your part of the work while staying connected to the people around it.": "تحمل مسؤولية دورك مع البقاء على اتصال بالفرق المحيطة بالعمل.",
  "Safety in practice": "السلامة في الممارسة",
  "Treat safe planning and safe execution as part of professional quality.": "اعتبر التخطيط والتنفيذ الآمنين جزءاً أصيلاً من الجودة المهنية.",
  "Respect for the result": "احترام النتيجة",
  "Build for the people who will use the place long after the team leaves site.": "ابنِ من أجل الأشخاص الذين سيستخدمون المكان بعد مغادرة فريق التنفيذ.",
  "Submit your profile.": "أرسل ملفك المهني.",
  "Tell us where your experience fits. If a relevant opportunity becomes available, the MERAAS team can review your profile.": "أخبرنا أين تناسب خبرتك. عند توفر فرصة ملائمة يمكن لفريق مراس مراجعة ملفك المهني.",
  "No suitable path?": "لا تجد مساراً مناسباً؟",
  "Choose General application and tell us what you do best.": "اختر طلباً عاماً وأخبرنا بما تتقنه.",
  "Full name *": "الاسم الكامل *",
  "Email address *": "البريد الإلكتروني *",
  "Phone number": "رقم الهاتف",
  "Current location": "مكان الإقامة الحالي",
  "Career path *": "المسار المهني *",
  "Choose a career path": "اختر مساراً مهنياً",
  "General application": "طلب عام",
  "Experience level *": "مستوى الخبرة *",
  "Choose your level": "اختر مستوى خبرتك",
  "Graduate or early career": "خريج أو في بداية المسار المهني",
  "Experienced professional": "مهني ذو خبرة",
  "Senior specialist or leader": "متخصص أول أو قائد فريق",
  "Skilled trade or equipment operator": "فني ماهر أو مشغل معدات",
  "CV or portfolio link *": "رابط السيرة الذاتية أو ملف الأعمال *",
  "Introduce yourself *": "عرّفنا بنفسك *",
  "Your discipline, experience and the work you want to contribute to": "تخصصك وخبرتك ونوع العمل الذي ترغب في المساهمة فيه",
  "I agree to share these details with MERAAS for recruitment consideration.": "أوافق على مشاركة هذه البيانات مع مراس للنظر في فرص التوظيف.",
  "Prepare application": "جهّز الطلب",
  "This opens your email app with the application details filled in. Add any attachments before sending.": "سيتم فتح تطبيق البريد الإلكتروني مع تعبئة تفاصيل الطلب. أضف المرفقات قبل الإرسال."
};

  var translatedNodes = [];
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      var parent = node.parentElement;
      if (!parent || parent.closest('script,style')) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  var textNode;
  while ((textNode = walker.nextNode())) {
    translatedNodes.push({ node: textNode, original: textNode.nodeValue });
  }

  var translatedAttributes = [];
  document.querySelectorAll('[alt],[aria-label],[placeholder]').forEach(function (el) {
    ['alt', 'aria-label', 'placeholder'].forEach(function (attr) {
      if (el.hasAttribute(attr)) translatedAttributes.push({ el: el, attr: attr, original: el.getAttribute(attr) });
    });
  });

  function normalized(value) {
    if (!value) return '';
    return value.replace(/&amp;/g, '&')
                .replace(/&mdash;/g, '—')
                .replace(/&ndash;/g, '–')
                .replace(/&rsquo;/g, '’')
                .replace(/&lsquo;/g, '‘')
                .replace(/&nbsp;/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
  }
  function withOriginalSpacing(original, value) {
    return (original.match(/^\s*/) || [''])[0] + value + (original.match(/\s*$/) || [''])[0];
  }

  var navLinksMap = {
    'index.html': { en: 'Home', ar: 'الرئيسية' },
    'projects.html': { en: 'Projects', ar: 'المشاريع' },
    'company.html': { en: 'Company', ar: 'الشركة' },
    'capabilities.html': { en: 'Our Services', ar: 'خدماتنا' },
    'careers.html': { en: 'Careers', ar: 'الوظائف' },
    'contact.html': { en: 'Contact Us', ar: 'تواصل معنا' }
  };

  function updateNavigation(lang) {
    document.querySelectorAll('.nav a, .ftr ul a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && navLinksMap[href]) {
        if (href === 'contact.html' && a.classList.contains('nav__cta')) {
          a.textContent = lang === 'ar' ? 'تواصل معنا' : 'Contact Us';
        } else if (href === 'contact.html' && !a.classList.contains('nav__cta')) {
          a.textContent = lang === 'ar' ? 'التواصل' : 'Contact';
        } else {
          a.textContent = lang === 'ar' ? navLinksMap[href].ar : navLinksMap[href].en;
        }
      }
    });
  }

  function updatePageTitle(lang) {
    if (!document.documentElement.getAttribute('data-orig-title')) {
      document.documentElement.setAttribute('data-orig-title', document.title);
    }
    var baseTitle = document.documentElement.getAttribute('data-orig-title');
    var cleanT = normalized(baseTitle);
    if (lang === 'ar' && translations[cleanT]) {
      document.title = translations[cleanT];
    } else {
      document.title = baseTitle;
    }
  }

  var currentLanguage = 'en';
  function applyLanguage(language) {
    currentLanguage = language === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

    // 1. Direct explicit navigation and title updates
    updateNavigation(currentLanguage);
    updatePageTitle(currentLanguage);

    // 2. Translate all captured text nodes
    translatedNodes.forEach(function (entry) {
      var key = normalized(entry.original);
      var trans = translations[key];
      if (!trans) {
        var unescaped = key.replace(/&amp;/g, '&').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘').replace(/&nbsp;/g, ' ');
        trans = translations[unescaped];
      }
      entry.node.nodeValue = currentLanguage === 'ar' && trans
        ? withOriginalSpacing(entry.original, trans)
        : entry.original;
    });

    // 3. Translate attributes (alt, aria-label, placeholder)
    translatedAttributes.forEach(function (entry) {
      var key = normalized(entry.original);
      var translated = translations[key] || translations[entry.original];
      entry.el.setAttribute(entry.attr, currentLanguage === 'ar' && translated ? translated : entry.original);
    });

    // 4. Update language toggle buttons
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = currentLanguage === 'ar' ? 'EN' : 'AR';
      btn.setAttribute('aria-label', currentLanguage === 'ar' ? 'View website in English' : 'تبديل إلى العربية');
      btn.setAttribute('aria-pressed', currentLanguage === 'ar' ? 'true' : 'false');
    });

    // 5. Update numbers & counters
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var value = parseInt(el.getAttribute('data-count'), 10);
      if (!isNaN(value)) el.textContent = value.toLocaleString(currentLanguage === 'ar' ? 'ar-LY' : 'en-US');
    });

    try {
      localStorage.setItem('meraas-language', currentLanguage);
      localStorage.setItem('site_lang', currentLanguage);
    } catch (error) {}
  }

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
      document.body.classList.remove('menu-open');
      var menuButton = document.querySelector('.burger');
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  var savedLanguage = 'en';
  try {
    savedLanguage = localStorage.getItem('site_lang') || localStorage.getItem('meraas-language') || 'en';
  } catch (error) {}
  applyLanguage(savedLanguage);

  /* ---------- header state ---------- */
  var hdr = document.querySelector('.hdr');
  var overlayHero = document.querySelector('.hero, .phero, .careers-hero');
  if (hdr && overlayHero && 'IntersectionObserver' in window) {
    hdr.classList.add('hdr--over');
    new IntersectionObserver(function (entries) {
      var overHero = entries[0].isIntersecting;
      hdr.classList.toggle('hdr--over', overHero);
      hdr.classList.toggle('hdr--solid', !overHero);
    }, { rootMargin: '-90px 0px 0px 0px', threshold: 0 }).observe(overlayHero);
  } else if (hdr) {
    hdr.classList.add('hdr--solid');
  }

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.body.classList.remove('menu-open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      closeLightbox();
    }
  });

  /* ---------- partner rail ---------- */
  var partnerTrack = document.querySelector('[data-partner-track]');
  if (partnerTrack) {
    var partnerSet = partnerTrack.querySelector('.partners__set');
    if (partnerSet) {
      var partnerClone = partnerSet.cloneNode(true);
      partnerClone.setAttribute('aria-hidden', 'true');
      partnerClone.querySelectorAll('a').forEach(function (a) { a.tabIndex = -1; });
      partnerTrack.appendChild(partnerClone);
    }
  }

  /* ---------- scroll reveal ---------- */
  var rv = document.querySelectorAll('[data-rv]');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var d = en.target.getAttribute('data-d');
        if (d) en.target.style.transitionDelay = d + 'ms';
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    rv.forEach(function (el) { io.observe(el); });
  }

  /* ---------- counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1400, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString(document.documentElement.lang === 'ar' ? 'ar-LY' : 'en-US');
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- project filters ---------- */
  var filterBar = document.querySelector('.filters');
  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var f = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-on', b === btn); });
      document.querySelectorAll('.pcard').forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(' ');
        card.classList.toggle('is-hidden', f !== 'all' && tags.indexOf(f) === -1);
      });
    });
  }

  /* ---------- lightbox ---------- */
  var lb = document.querySelector('.lb');
  var lbImg = lb && lb.querySelector('img');
  var lbCount = lb && lb.querySelector('.lb__c');
  var galleryFigures = [].slice.call(document.querySelectorAll('.gallery figure'));
  var items = galleryFigures.map(function (fig) { return fig.querySelector('img'); }).filter(Boolean);
  var idx = 0;

  function show(i) {
    if (!items.length) return;
    idx = (i + items.length) % items.length;
    var src = items[idx].getAttribute('data-full') || items[idx].currentSrc || items[idx].src;
    lbImg.src = src;
    lbImg.alt = items[idx].alt || '';
    if (lbCount) lbCount.textContent = (idx + 1) + ' / ' + items.length;
  }
  function openLightbox(i) {
    if (!lb) return;
    show(i);
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { lb.classList.add('is-vis'); });
  }
  function closeLightbox() {
    if (!lb || !lb.classList.contains('is-open')) return;
    lb.classList.remove('is-vis');
    document.body.style.overflow = '';
    setTimeout(function () { lb.classList.remove('is-open'); }, 380);
  }
  galleryFigures.forEach(function (fig, i) {
    fig.addEventListener('click', function () { openLightbox(i); });
  });
  if (lb) {
    lb.querySelector('.lb__x').addEventListener('click', closeLightbox);
    lb.querySelector('.lb__n').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.querySelector('.lb__p').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- hero video: pause when off-screen ---------- */
  var hv = document.querySelector('.hero__media video');
  if (hv) {
    if (reduce) { hv.pause(); }
    else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        en[0].isIntersecting ? hv.play().catch(function () {}) : hv.pause();
      }, { threshold: 0.05 }).observe(hv);
    }
  }

  /* ---------- year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- careers application ---------- */
  var careerForm = document.querySelector('form[data-career-form]');
  var careerSelect = careerForm ? careerForm.querySelector('select[name="career"]') : null;
  var careerStatus = careerForm ? careerForm.querySelector('[data-career-status]') : null;

  document.querySelectorAll('[data-career-path]').forEach(function (button) {
    button.addEventListener('click', function () {
      var path = button.getAttribute('data-career-path');
      if (!careerForm || !careerSelect || !path) return;

      careerSelect.value = path;
      document.querySelectorAll('.career-path').forEach(function (row) {
        row.classList.toggle('is-selected', row.contains(button));
      });
      if (careerStatus) {
        careerStatus.textContent = document.documentElement.lang === 'ar' ?
          'تم اختيار المسار. أكمل بياناتك أدناه.' :
          'Career path selected. Complete your details below.';
        careerStatus.classList.add('is-ready');
      }
      careerForm.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      window.setTimeout(function () { careerSelect.focus({ preventScroll: true }); }, reduce ? 0 : 420);
    });
  });

  if (careerForm) {
    careerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!careerForm.checkValidity()) {
        if (careerStatus) {
          careerStatus.textContent = document.documentElement.lang === 'ar' ?
            'أكمل الحقول المطلوبة وصحح البيانات المميزة.' :
            'Complete the required fields and correct the highlighted details.';
          careerStatus.classList.remove('is-ready');
        }
        careerForm.reportValidity();
        return;
      }

      var d = new FormData(careerForm);
      var subject = 'Career application - ' + (d.get('career') || 'General') + ' - ' + (d.get('name') || '');
      var body =
        'Name: ' + (d.get('name') || '') + '\n' +
        'Email: ' + (d.get('email') || '') + '\n' +
        'Phone: ' + (d.get('phone') || '') + '\n' +
        'Current location: ' + (d.get('location') || '') + '\n' +
        'Career path: ' + (d.get('career') || '') + '\n' +
        'Experience level: ' + (d.get('experience') || '') + '\n' +
        'CV or portfolio: ' + (d.get('portfolio') || '') + '\n\n' +
        (d.get('message') || '');

      if (careerStatus) {
        careerStatus.textContent = document.documentElement.lang === 'ar' ?
          'طلبك جاهز. سيتم الآن فتح تطبيق البريد الإلكتروني.' :
          'Your application is ready. Your email app should open now.';
        careerStatus.classList.add('is-ready');
      }
      window.location.href = 'mailto:' + careerForm.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------- contact form (mailto fallback) ---------- */
  var form = document.querySelector('form[data-mailto]:not([data-career-form])');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = 'Project enquiry - ' + (d.get('name') || '');
      var body =
        'Name: ' + (d.get('name') || '') + '\n' +
        'Company: ' + (d.get('company') || '') + '\n' +
        'Email: ' + (d.get('email') || '') + '\n' +
        'Phone: ' + (d.get('phone') || '') + '\n' +
        'Project type: ' + (d.get('type') || '') + '\n\n' +
        (d.get('message') || '');
      window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();

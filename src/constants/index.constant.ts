export const imageTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp']
export const fileTypes = [
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
]
export const videoTypes = ['video/mp4', 'video/webm']

interface IGovernorates {
    [key: string]: {
        labelAr: string;
        labelEn: string;
        value: string;
    }[];
}

interface IYears {
    [key: string]: {
        labelAr: string;
        labelEn: string;
        value: string;
    }[];
}

interface ICurrencyLocales {
    [key: string]: { locale: string; currency: string; };
}

export const regions = [
    { labelAr: 'مصر', labelEn: 'Egypt', value: 'egypt' },
    { labelAr: 'الكويت', labelEn: 'Kuwait', value: 'kuwait' },
    { labelAr: 'السعودية', labelEn: 'Saudi Arabia', value: 'saudi_arabia' },
    { labelAr: 'الإمارات', labelEn: 'United Arab Emirates', value: 'uae' },
    { labelAr: 'قطر', labelEn: 'Qatar', value: 'qatar' },
    { labelAr: 'البحرين', labelEn: 'Bahrain', value: 'bahrain' },
    { labelAr: 'عمان', labelEn: 'Oman', value: 'oman' },
    { labelAr: 'العراق', labelEn: 'Iraq', value: 'iraq' },
    { labelAr: 'الأردن', labelEn: 'Jordan', value: 'jordan' },
    { labelAr: 'لبنان', labelEn: 'Lebanon', value: 'lebanon' },
    { labelAr: 'سوريا', labelEn: 'Syria', value: 'syria' },
    { labelAr: 'اليمن', labelEn: 'Yemen', value: 'yemen' },
    { labelAr: 'فلسطين', labelEn: 'Palestine', value: 'palestine' },
    { labelAr: 'تركيا', labelEn: 'Turkey', value: 'turkey' },
    { labelAr: 'الولايات المتحدة', labelEn: 'United States', value: 'united_states' },
    { labelAr: 'المملكة المتحدة', labelEn: 'United Kingdom', value: 'united_kingdom' },
    { labelAr: 'كندا', labelEn: 'Canada', value: 'canada' },
    { labelAr: 'أستراليا', labelEn: 'Australia', value: 'australia' },
    { labelAr: 'ألمانيا', labelEn: 'Germany', value: 'germany' },
    { labelAr: 'فرنسا', labelEn: 'France', value: 'france' },
    { labelAr: 'إيطاليا', labelEn: 'Italy', value: 'italy' },
    { labelAr: 'إسبانيا', labelEn: 'Spain', value: 'spain' },
    { labelAr: 'الصين', labelEn: 'China', value: 'china' },
    { labelAr: 'اليابان', labelEn: 'Japan', value: 'japan' }
];


export const currencyLocales: ICurrencyLocales = {
    egypt: { locale: 'en-EG', currency: 'EGP' },
    kuwait: { locale: 'en-KW', currency: 'KWD' },
    saudi_arabia: { locale: 'en-SA', currency: 'SAR' },
    uae: { locale: 'en-AE', currency: 'AED' },
    qatar: { locale: 'en-QA', currency: 'QAR' },
    bahrain: { locale: 'en-BH', currency: 'BHD' },
    oman: { locale: 'en-OM', currency: 'OMR' },
    iraq: { locale: 'en-IQ', currency: 'IQD' },
    jordan: { locale: 'en-JO', currency: 'JOD' },
    lebanon: { locale: 'en-LB', currency: 'LBP' },
    syria: { locale: 'en-SY', currency: 'SYP' },
    yemen: { locale: 'en-YE', currency: 'YER' },
    palestine: { locale: 'en-PS', currency: 'ILS' },
    turkey: { locale: 'tr-TR', currency: 'TRY' },
    united_states: { locale: 'en-US', currency: 'USD' },
    united_kingdom: { locale: 'en-GB', currency: 'GBP' },
    canada: { locale: 'en-CA', currency: 'CAD' },
    australia: { locale: 'en-AU', currency: 'AUD' },
    germany: { locale: 'de-DE', currency: 'EUR' },
    france: { locale: 'fr-FR', currency: 'EUR' },
    italy: { locale: 'it-IT', currency: 'EUR' },
    spain: { locale: 'es-ES', currency: 'EUR' },
    china: { locale: 'zh-CN', currency: 'CNY' },
    japan: { locale: 'ja-JP', currency: 'JPY' },
};


export const governorates: IGovernorates = {
    egypt: [
        { labelAr: 'القاهرة', labelEn: 'Cairo', value: 'cairo' },
        { labelAr: 'الجيزة', labelEn: 'Giza', value: 'giza' },
        { labelAr: 'الإسكندرية', labelEn: 'Alexandria', value: 'alexandria' },
        { labelAr: 'الدقهلية', labelEn: 'Dakahlia', value: 'dakahlia' },
        { labelAr: 'البحر الأحمر', labelEn: 'Red Sea', value: 'red_sea' },
        { labelAr: 'البحيرة', labelEn: 'Beheira', value: 'beheira' },
        { labelAr: 'الفيوم', labelEn: 'Fayoum', value: 'fayoum' },
        { labelAr: 'الغربية', labelEn: 'Gharbia', value: 'gharbia' },
        { labelAr: 'الإسماعيلية', labelEn: 'Ismailia', value: 'ismailia' },
        { labelAr: 'المنوفية', labelEn: 'Menofia', value: 'menofia' },
        { labelAr: 'المنيا', labelEn: 'Minya', value: 'minya' },
        { labelAr: 'القليوبية', labelEn: 'Qalyubia', value: 'qalyubia' },
        { labelAr: 'الأقصر', labelEn: 'Luxor', value: 'luxor' },
        { labelAr: 'بورسعيد', labelEn: 'Port Said', value: 'port_said' },
        { labelAr: 'قنا', labelEn: 'Qena', value: 'qena' },
        { labelAr: 'شمال سيناء', labelEn: 'North Sinai', value: 'north_sinai' },
        { labelAr: 'سوهاج', labelEn: 'Sohag', value: 'sohag' },
        { labelAr: 'جنوب سيناء', labelEn: 'South Sinai', value: 'south_sinai' },
        { labelAr: 'السويس', labelEn: 'Suez', value: 'suez' },
        { labelAr: 'أسوان', labelEn: 'Aswan', value: 'aswan' },
        { labelAr: 'أسيوط', labelEn: 'Asyut', value: 'asyut' },
        { labelAr: 'بني سويف', labelEn: 'Beni Suef', value: 'beni_suef' },
        { labelAr: 'دمياط', labelEn: 'Damietta', value: 'damietta' },
        { labelAr: 'الشرقية', labelEn: 'Sharqia', value: 'sharqia' },
        { labelAr: 'كفر الشيخ', labelEn: 'Kafr El Sheikh', value: 'kafr_el_sheikh' },
        { labelAr: 'مطروح', labelEn: 'Matrouh', value: 'matrouh' },
        { labelAr: 'الوادي الجديد', labelEn: 'New Valley', value: 'new_valley' }
    ],
    kuwait: [
        { labelAr: 'الكويت', labelEn: 'Kuwait City', value: 'kuwait_city' },
        { labelAr: 'الجهراء', labelEn: 'Al Jahra', value: 'al_jahra' },
        { labelAr: 'الأحمدي', labelEn: 'Ahmadi', value: 'ahmadi' },
        { labelAr: 'الفروانية', labelEn: 'Farwaniyah', value: 'farwaniyah' },
        { labelAr: 'حولي', labelEn: 'Hawalli', value: 'hawalli' }
    ],
    saudi_arabia: [
        { labelAr: 'الرياض', labelEn: 'Riyadh', value: 'riyadh' },
        { labelAr: 'جدة', labelEn: 'Jeddah', value: 'jeddah' },
        { labelAr: 'مكة المكرمة', labelEn: 'Mecca', value: 'mecca' },
        { labelAr: 'المدينة المنورة', labelEn: 'Medina', value: 'medina' },
        { labelAr: 'الدمام', labelEn: 'Dammam', value: 'dammam' },
        { labelAr: 'الظهران', labelEn: 'Dhahran', value: 'dhahran' },
        { labelAr: 'الخبر', labelEn: 'Khobar', value: 'khobar' },
        { labelAr: 'الجبيل', labelEn: 'Jubail', value: 'jubail' },
        { labelAr: 'تبوك', labelEn: 'Tabuk', value: 'tabuk' },
        { labelAr: 'حائل', labelEn: 'Hail', value: 'hail' }
    ],
    uae: [
        { labelAr: 'أبوظبي', labelEn: 'Abu Dhabi', value: 'abu_dhabi' },
        { labelAr: 'دبي', labelEn: 'Dubai', value: 'dubai' },
        { labelAr: 'الشارقة', labelEn: 'Sharjah', value: 'sharjah' },
        { labelAr: 'عجمان', labelEn: 'Ajman', value: 'ajman' },
        { labelAr: 'أم القيوين', labelEn: 'Umm Al Quwain', value: 'umm_al_quwain' },
        { labelAr: 'رأس الخيمة', labelEn: 'Ras Al Khaimah', value: 'ras_al_khaimah' },
        { labelAr: 'الفجيرة', labelEn: 'Fujairah', value: 'fujairah' }
    ],
    united_states: [
        { labelAr: 'كاليفورنيا', labelEn: 'California', value: 'california' },
        { labelAr: 'نيويورك', labelEn: 'New York', value: 'new_york' },
        { labelAr: 'تكساس', labelEn: 'Texas', value: 'texas' },
        { labelAr: 'فلوريدا', labelEn: 'Florida', value: 'florida' },
        { labelAr: 'إلينوي', labelEn: 'Illinois', value: 'illinois' }
    ],
    united_kingdom: [
        { labelAr: 'إنجلترا', labelEn: 'England', value: 'england' },
        { labelAr: 'اسكتلندا', labelEn: 'Scotland', value: 'scotland' },
        { labelAr: 'ويلز', labelEn: 'Wales', value: 'wales' },
        { labelAr: 'أيرلندا الشمالية', labelEn: 'Northern Ireland', value: 'northern_ireland' }
    ],
    canada: [
        { labelAr: 'أونتاريو', labelEn: 'Ontario', value: 'ontario' },
        { labelAr: 'كيبيك', labelEn: 'Quebec', value: 'quebec' },
        { labelAr: 'بريتيش كولومبيا', labelEn: 'British Columbia', value: 'british_columbia' },
        { labelAr: 'ألبرتا', labelEn: 'Alberta', value: 'alberta' },
        { labelAr: 'مانيتوبا', labelEn: 'Manitoba', value: 'manitoba' }
    ],
    qatar: [
        { labelAr: 'الدوحة', labelEn: 'Doha', value: 'doha' },
        { labelAr: 'الريان', labelEn: 'Al Rayyan', value: 'al_rayyan' },
        { labelAr: 'الخور', labelEn: 'Al Khor', value: 'al_khor' },
        { labelAr: 'الوكرة', labelEn: 'Al Wakrah', value: 'al_wakrah' },
        { labelAr: 'أم صلال', labelEn: 'Umm Salal', value: 'umm_salal' }
    ],
    bahrain: [
        { labelAr: 'المنامة', labelEn: 'Manama', value: 'manama' },
        { labelAr: 'المحرق', labelEn: 'Muharraq', value: 'muharraq' },
        { labelAr: 'الرفاع', labelEn: 'Riffa', value: 'riffa' },
        { labelAr: 'عيسى', labelEn: 'Isa Town', value: 'isa_town' },
        { labelAr: 'الحورة', labelEn: 'Hoora', value: 'hoora' }
    ],
    oman: [
        { labelAr: 'مسقط', labelEn: 'Muscat', value: 'muscat' },
        { labelAr: 'صلالة', labelEn: 'Salalah', value: 'salalah' },
        { labelAr: 'السيب', labelEn: 'Seeb', value: 'seeb' },
        { labelAr: 'صحار', labelEn: 'Sohar', value: 'sohar' },
        { labelAr: 'نزوى', labelEn: 'Nizwa', value: 'nizwa' }
    ],
    iraq: [
        { labelAr: 'بغداد', labelEn: 'Baghdad', value: 'baghdad' },
        { labelAr: 'البصرة', labelEn: 'Basra', value: 'basra' },
        { labelAr: 'الموصل', labelEn: 'Mosul', value: 'mosul' },
        { labelAr: 'أربيل', labelEn: 'Erbil', value: 'erbil' },
        { labelAr: 'كربلاء', labelEn: 'Karbala', value: 'karbala' }
    ],
    jordan: [
        { labelAr: 'عمان', labelEn: 'Amman', value: 'amman' },
        { labelAr: 'الزرقاء', labelEn: 'Zarqa', value: 'zarqa' },
        { labelAr: 'إربد', labelEn: 'Irbid', value: 'irbid' },
        { labelAr: 'السلط', labelEn: 'Salt', value: 'salt' },
        { labelAr: 'العقبة', labelEn: 'Aqaba', value: 'aqaba' }
    ],
    lebanon: [
        { labelAr: 'بيروت', labelEn: 'Beirut', value: 'beirut' },
        { labelAr: 'طرابلس', labelEn: 'Tripoli', value: 'tripoli' },
        { labelAr: 'صيدا', labelEn: 'Sidon', value: 'sidon' },
        { labelAr: 'جبيل', labelEn: 'Byblos', value: 'byblos' },
        { labelAr: 'بعلبك', labelEn: 'Baalbek', value: 'baalbek' }
    ],
    syria: [
        { labelAr: 'دمشق', labelEn: 'Damascus', value: 'damascus' },
        { labelAr: 'حلب', labelEn: 'Aleppo', value: 'aleppo' },
        { labelAr: 'حمص', labelEn: 'Homs', value: 'homs' },
        { labelAr: 'اللاذقية', labelEn: 'Latakia', value: 'latakia' },
        { labelAr: 'حماة', labelEn: 'Hama', value: 'hama' }
    ],
    yemen: [
        { labelAr: 'صنعاء', labelEn: 'Sanaa', value: 'sanaa' },
        { labelAr: 'عدن', labelEn: 'Aden', value: 'aden' },
        { labelAr: 'تعز', labelEn: 'Taiz', value: 'taiz' },
        { labelAr: 'الحديدة', labelEn: 'Hodeidah', value: 'hodeidah' },
        { labelAr: 'المكلا', labelEn: 'Mukalla', value: 'mukalla' }
    ],
    palestine: [
        { labelAr: 'القدس', labelEn: 'Jerusalem', value: 'jerusalem' },
        { labelAr: 'رام الله', labelEn: 'Ramallah', value: 'ramallah' },
        { labelAr: 'غزة', labelEn: 'Gaza', value: 'gaza' },
        { labelAr: 'الخليل', labelEn: 'Hebron', value: 'hebron' },
        { labelAr: 'نابلس', labelEn: 'Nablus', value: 'nablus' }
    ],
    turkey: [
        { labelAr: 'إسطنبول', labelEn: 'Istanbul', value: 'istanbul' },
        { labelAr: 'أنقرة', labelEn: 'Ankara', value: 'ankara' },
        { labelAr: 'إزمير', labelEn: 'Izmir', value: 'izmir' },
        { labelAr: 'بورصة', labelEn: 'Bursa', value: 'bursa' },
        { labelAr: 'أنطاليا', labelEn: 'Antalya', value: 'antalya' }
    ],
    australia: [
        { labelAr: 'نيو ساوث ويلز', labelEn: 'New South Wales', value: 'new_south_wales' },
        { labelAr: 'فيكتوريا', labelEn: 'Victoria', value: 'victoria' },
        { labelAr: 'كوينزلاند', labelEn: 'Queensland', value: 'queensland' },
        { labelAr: 'أستراليا الغربية', labelEn: 'Western Australia', value: 'western_australia' },
        { labelAr: 'أستراليا الجنوبية', labelEn: 'South Australia', value: 'south_australia' },
        { labelAr: 'تسمانيا', labelEn: 'Tasmania', value: 'tasmania' },
        { labelAr: 'إقليم العاصمة الأسترالية', labelEn: 'Australian Capital Territory', value: 'australian_capital_territory' },
        { labelAr: 'إقليم الشمال الأسترالي', labelEn: 'Northern Territory', value: 'northern_territory' }
    ],
    germany: [
        { labelAr: 'برلين', labelEn: 'Berlin', value: 'berlin' },
        { labelAr: 'ميونخ', labelEn: 'Munich', value: 'munich' },
        { labelAr: 'فرانكفورت', labelEn: 'Frankfurt', value: 'frankfurt' },
        { labelAr: 'هامبورغ', labelEn: 'Hamburg', value: 'hamburg' },
        { labelAr: 'كولونيا', labelEn: 'Cologne', value: 'cologne' }
    ],
    france: [
        { labelAr: 'باريس', labelEn: 'Paris', value: 'paris' },
        { labelAr: 'مارسيليا', labelEn: 'Marseille', value: 'marseille' },
        { labelAr: 'ليون', labelEn: 'Lyon', value: 'lyon' },
        { labelAr: 'تولوز', labelEn: 'Toulouse', value: 'toulouse' },
        { labelAr: 'نيس', labelEn: 'Nice', value: 'nice' }
    ],
    italy: [
        { labelAr: 'روما', labelEn: 'Rome', value: 'rome' },
        { labelAr: 'ميلانو', labelEn: 'Milan', value: 'milan' },
        { labelAr: 'نابولي', labelEn: 'Naples', value: 'naples' },
        { labelAr: 'تورينو', labelEn: 'Turin', value: 'turin' },
        { labelAr: 'البندقية', labelEn: 'Venice', value: 'venice' }
    ],
    spain: [
        { labelAr: 'مدريد', labelEn: 'Madrid', value: 'madrid' },
        { labelAr: 'برشلونة', labelEn: 'Barcelona', value: 'barcelona' },
        { labelAr: 'فالنسيا', labelEn: 'Valencia', value: 'valencia' },
        { labelAr: 'إشبيلية', labelEn: 'Seville', value: 'seville' },
        { labelAr: 'سرقسطة', labelEn: 'Zaragoza', value: 'zaragoza' }
    ],
    china: [
        { labelAr: 'بكين', labelEn: 'Beijing', value: 'beijing' },
        { labelAr: 'شنغهاي', labelEn: 'Shanghai', value: 'shanghai' },
        { labelAr: 'قوانغتشو', labelEn: 'Guangzhou', value: 'guangzhou' },
        { labelAr: 'شنتشن', labelEn: 'Shenzhen', value: 'shenzhen' },
        { labelAr: 'هانغتشو', labelEn: 'Hangzhou', value: 'hangzhou' }
    ],
    japan: [
        { labelAr: 'طوكيو', labelEn: 'Tokyo', value: 'tokyo' },
        { labelAr: 'أوساكا', labelEn: 'Osaka', value: 'osaka' },
        { labelAr: 'ناغويا', labelEn: 'Nagoya', value: 'nagoya' },
        { labelAr: 'كيوتو', labelEn: 'Kyoto', value: 'kyoto' },
        { labelAr: 'فوكوكا', labelEn: 'Fukuoka', value: 'fukuoka' }
    ]
};

export const years: IYears = {
    egypt: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    kuwait: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    saudi_arabia: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    uae: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    qatar: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    bahrain: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    oman: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    iraq: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول المتوسط', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني المتوسط', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث المتوسط', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    jordan: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    lebanon: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    syria: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    yemen: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    palestine: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    turkey: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    united_states: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    united_kingdom: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    australia: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    germany: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    france: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    italy: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    spain: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    china: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ],
    japan: [
        { labelAr: 'الصف الأول الابتدائي', labelEn: 'First Grade', value: 'first_grade' },
        { labelAr: 'الصف الثاني الابتدائي', labelEn: 'Second Grade', value: 'second_grade' },
        { labelAr: 'الصف الثالث الابتدائي', labelEn: 'Third Grade', value: 'third_grade' },
        { labelAr: 'الصف الرابع الابتدائي', labelEn: 'Fourth Grade', value: 'fourth_grade' },
        { labelAr: 'الصف الخامس الابتدائي', labelEn: 'Fifth Grade', value: 'fifth_grade' },
        { labelAr: 'الصف السادس الابتدائي', labelEn: 'Sixth Grade', value: 'sixth_grade' },
        { labelAr: 'الصف الأول الإعدادي', labelEn: 'Seventh Grade', value: 'seventh_grade' },
        { labelAr: 'الصف الثاني الإعدادي', labelEn: 'Eighth Grade', value: 'eighth_grade' },
        { labelAr: 'الصف الثالث الإعدادي', labelEn: 'Ninth Grade', value: 'ninth_grade' },
        { labelAr: 'الصف الأول الثانوي', labelEn: 'Tenth Grade', value: 'tenth_grade' },
        { labelAr: 'الصف الثاني الثانوي', labelEn: 'Eleventh Grade', value: 'eleventh_grade' },
        { labelAr: 'الصف الثالث الثانوي', labelEn: 'Twelfth Grade', value: 'twelfth_grade' }
    ]
};

export const subjects = {
    englishExam: [
        { labelAr: 'IELTS', labelEn: 'IELTS', value: 'ielts' },
        { labelAr: 'TOEFL', labelEn: 'TOEFL', value: 'toefl' },
        { labelAr: 'TOEIC', labelEn: 'TOEIC', value: 'toeic' },
        { labelAr: 'PTE', labelEn: 'PTE', value: 'pte' },
    ],
    school: [
        { labelAr: 'عربي', labelEn: 'Arabic', value: 'arabic' },
        { labelAr: 'انجليزي', labelEn: 'English', value: 'english' },
        { labelAr: 'رياضيات', labelEn: 'Math', value: 'math' },
        { labelAr: 'علوم', labelEn: 'Sience', value: 'sience' },
        { labelAr: 'أحياء', labelEn: 'Bology', value: 'bology' },
        { labelAr: 'الكيمياء', labelEn: 'Chemistry', value: 'chemistry' },
        { labelAr: 'الفيزياء', labelEn: 'Physics', value: 'physics' },
        { labelAr: 'الجغرافيا', labelEn: 'Geography', value: 'geography' },
        { labelAr: 'التاريخ', labelEn: 'History', value: 'history' },
        { labelAr: 'الجيولوجيا', labelEn: 'Geology', value: 'geology' },
        { labelAr: 'الدين', labelEn: 'Religion', value: 'religion' },
    ]
};


export const studentContexts = [
    { labelAr: 'طالب مدرسي', labelEn: 'School Student', value: 'school' },
    { labelAr: 'طالب اختبارات اللغه الانجليزية', labelEn: 'English Exams student', value: 'englishExam' },
]

export const courseContexts = [
    { labelAr: 'دورة مرحلة درسية', labelEn: 'School Grades Course', value: 'school' },
    { labelAr: 'دورة اختبارات اللغه الانجليزية', labelEn: 'English Exams Course', value: 'englishExam' },
]

export const subjectContexts = [
    { labelAr: 'مادة مرحلة مدرسية', labelEn: 'School subject', value: 'school' },
    { labelAr: 'مادة اختبارات اللغه الانجليزية', labelEn: 'English Exam subject', value: 'englishExam' },
]

export const specialties = [
    ...subjects.englishExam,
    ...subjects.school,
]

export const courseStatuses = [
    { labelAr: 'منشور', labelEn: 'Published', value: 'published' },
    { labelAr: 'غير منشور', labelEn: 'Unpublished', value: 'unpublished' },
    { labelAr: 'مجدول', labelEn: 'Scheduled', value: 'scheduled' }
]

export const videoStatuses = [
    { labelAr: 'منشور', labelEn: 'Published', value: 'published' },
    { labelAr: 'غير منشور', labelEn: 'Unpublished', value: 'unpublished' },
    { labelAr: 'مجدول', labelEn: 'Scheduled', value: 'scheduled' }
]

export const playlistStatuses = [
    { labelAr: 'منشور', labelEn: 'Published', value: 'published' },
    { labelAr: 'غير منشور', labelEn: 'Unpublished', value: 'unpublished' },
    { labelAr: 'مجدول', labelEn: 'Scheduled', value: 'scheduled' }
]

export const fileStatuses = [
    { labelAr: 'منشور', labelEn: 'Published', value: 'published' },
    { labelAr: 'غير منشور', labelEn: 'Unpublished', value: 'unpublished' },
    { labelAr: 'مجدول', labelEn: 'Scheduled', value: 'scheduled' }
]

export const examStatuses = [
    { labelAr: 'منشور', labelEn: 'Published', value: 'published' },
    { labelAr: 'غير منشور', labelEn: 'Unpublished', value: 'unpublished' },
    { labelAr: 'مجدول', labelEn: 'Scheduled', value: 'scheduled' },
    { labelAr: 'مسودة', labelEn: 'Draft', value: 'draft' }
]

export const questionTypes = [
    { labelAr: 'اختياري', labelEn: 'Choose', value: 'choose', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" class="styles__QuizIllustration-sc-lcau33-0 gOWtgr"><g fill="none" fill-rule="evenodd"><path fill="#F2F2F2" d="M24,43.9996101 L24,43.9996101 C12.954,43.9996101 4,35.0456101 4,23.9996101 C4,12.9546101 12.954,3.9996101 24,3.9996101 C35.046,3.9996101 44,12.9546101 44,23.9996101 C44,35.0456101 35.046,43.9996101 24,43.9996101"></path><path fill="#333" d="M39.6035,43.9772101 L15.7985,47.9832101 C15.1675,48.0892101 14.5705,47.6652101 14.4645,47.0342101 L7.4475,5.3562101 C7.3415,4.7262101 7.7665,4.1282101 8.3965,4.0222101 L32.2015,0.0162100999 C32.8325,-0.0897899001 33.4295,0.3352101 33.5355,0.9652101 L40.5525,42.6442101 C40.6595,43.2742101 40.2335,43.8712101 39.6035,43.9772101"></path><path fill="#FFF" d="M38.1655,41.2228101 L16.2545,44.9108101 C15.9015,44.9698101 15.5674942,44.7318101 15.5085,44.3788101 L9.0765,6.1808101 C9.0175,5.8268101 9.2545,5.4928101 9.6085,5.4328101 L31.5185,1.7448101 C31.8715,1.6858101 32.2065,1.9238101 32.2655,2.2778101 L38.6975,40.4758101 C38.7565,40.8288101 38.5185,41.1638101 38.1655,41.2228101"></path><path fill="#26890C" class="cls-4" d="M36.9971,40.1002101 L27.6971,41.6652101 C27.5791,41.6852101 27.4671,41.6052101 27.4471,41.4872101 L24.6121,24.6492101 C24.5921,24.5312101 24.6721,24.4182101 24.7901,24.3982101 L34.0901,22.8332101 C34.2081,22.8132101 34.3201,22.8932101 34.3401,23.0122101 L37.1751,39.8502101 C37.1951,39.9682101 37.1151,40.0802101 36.9971,40.1002101"></path><path fill="#FFA602" class="cls-3" d="M25.9351,41.9620101 L16.6351,43.5270101 C16.5171,43.5470101 16.4051,43.4670101 16.3851,43.3490101 L13.5501,26.5110101 C13.5301,26.3930101 13.6101,26.2800101 13.7281,26.2600101 L23.0271,24.6950101 C23.1461,24.6750101 23.2581,24.7550101 23.2781,24.8740101 L26.1131,41.7120101 C26.1331,41.8300101 26.0531,41.9420101 25.9351,41.9620101"></path><path fill="#1368CE" class="cls-2" d="M33.8936,21.6701101 L24.5946,23.2351101 C24.4766,23.2551101 24.3636,23.1751101 24.3436,23.0571101 L21.2806,4.8671101 C21.2616,4.7481101 21.3406,4.6361101 21.4596,4.6161101 L30.7586,3.0511101 C30.8776,3.0311101 30.9896,3.1111101 31.0096,3.2291101 L34.0726,21.4201101 C34.0916,21.5381101 34.0126,21.6501101 33.8936,21.6701101"></path><path fill="#E11C3C" class="cls-1" d="M22.8315,23.5314101 L13.5325,25.0964101 C13.4135,25.1164101 13.3015,25.0364101 13.2815,24.9184101 L10.2185,6.7284101 C10.1985,6.6104101 10.2785,6.4974101 10.3975,6.4774101 L19.6965,4.9124101 C19.8145,4.8924101 19.9275,4.9724101 19.9475,5.0914101 L23.0095,23.2814101 C23.0295,23.3994101 22.9505,23.5114101 22.8315,23.5314101"></path><polygon fill="#FFF" points="14.635 17.353 16.215 13.008 19.088 16.631"></polygon><polygon fill="#FFF" points="27.191 10.873 30.028 12.832 28.033 15.643 25.195 13.684"></polygon><path fill="#FFF" d="M21.5791,33.4542101 C21.4081,32.3492101 20.3751,31.5912101 19.2731,31.7622101 C18.1721,31.9332101 17.4181,32.9672101 17.5891,34.0732101 C17.7611,35.1792101 18.7931,35.9362101 19.8951,35.7662101 C20.9961,35.5952101 21.7501,34.5602101 21.5791,33.4542101"></path><polygon fill="#FFF" points="33.237 33.685 29.257 34.362 28.577 30.368 32.557 29.691"></polygon></g></svg>' },
    { labelAr: 'صح او غلط', labelEn: 'True Or False', value: 'trueOrFalse', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" class="styles__QuizIllustration-sc-lcau33-0 gOWtgr"><g fill="none" fill-rule="evenodd"><path fill="#F2F2F2" d="M24,43.9996101 L24,43.9996101 C12.954,43.9996101 4,35.0456101 4,23.9996101 C4,12.9546101 12.954,3.9996101 24,3.9996101 C35.046,3.9996101 44,12.9546101 44,23.9996101 C44,35.0456101 35.046,43.9996101 24,43.9996101"></path><path fill="#333" d="M39.6035,43.9772101 L15.7985,47.9832101 C15.1675,48.0892101 14.5705,47.6652101 14.4645,47.0342101 L7.4475,5.3562101 C7.3415,4.7262101 7.7665,4.1282101 8.3965,4.0222101 L32.2015,0.0162100999 C32.8325,-0.0897899001 33.4295,0.3352101 33.5355,0.9652101 L40.5525,42.6442101 C40.6595,43.2742101 40.2335,43.8712101 39.6035,43.9772101"></path><path fill="#FFF" d="M38.1655,41.2228101 L16.2545,44.9108101 C15.9015,44.9698101 15.5674942,44.7318101 15.5085,44.3788101 L9.0765,6.1808101 C9.0175,5.8268101 9.2545,5.4928101 9.6085,5.4328101 L31.5185,1.7448101 C31.8715,1.6858101 32.2065,1.9238101 32.2655,2.2778101 L38.6975,40.4758101 C38.7565,40.8288101 38.5185,41.1638101 38.1655,41.2228101"></path><path fill="#26890C" class="cls-4" d="M36.9971,40.1002101 L27.6971,41.6652101 C27.5791,41.6852101 27.4671,41.6052101 27.4471,41.4872101 L24.6121,24.6492101 C24.5921,24.5312101 24.6721,24.4182101 24.7901,24.3982101 L34.0901,22.8332101 C34.2081,22.8132101 34.3201,22.8932101 34.3401,23.0122101 L37.1751,39.8502101 C37.1951,39.9682101 37.1151,40.0802101 36.9971,40.1002101"></path><path fill="#FFA602" class="cls-3" d="M25.9351,41.9620101 L16.6351,43.5270101 C16.5171,43.5470101 16.4051,43.4670101 16.3851,43.3490101 L13.5501,26.5110101 C13.5301,26.3930101 13.6101,26.2800101 13.7281,26.2600101 L23.0271,24.6950101 C23.1461,24.6750101 23.2581,24.7550101 23.2781,24.8740101 L26.1131,41.7120101 C26.1331,41.8300101 26.0531,41.9420101 25.9351,41.9620101"></path><path fill="#1368CE" class="cls-2" d="M33.8936,21.6701101 L24.5946,23.2351101 C24.4766,23.2551101 24.3636,23.1751101 24.3436,23.0571101 L21.2806,4.8671101 C21.2616,4.7481101 21.3406,4.6361101 21.4596,4.6161101 L30.7586,3.0511101 C30.8776,3.0311101 30.9896,3.1111101 31.0096,3.2291101 L34.0726,21.4201101 C34.0916,21.5381101 34.0126,21.6501101 33.8936,21.6701101"></path><path fill="#E11C3C" class="cls-1" d="M22.8315,23.5314101 L13.5325,25.0964101 C13.4135,25.1164101 13.3015,25.0364101 13.2815,24.9184101 L10.2185,6.7284101 C10.1985,6.6104101 10.2785,6.4974101 10.3975,6.4774101 L19.6965,4.9124101 C19.8145,4.8924101 19.9275,4.9724101 19.9475,5.0914101 L23.0095,23.2814101 C23.0295,23.3994101 22.9505,23.5114101 22.8315,23.5314101"></path><polygon fill="#FFF" points="14.635 17.353 16.215 13.008 19.088 16.631"></polygon><polygon fill="#FFF" points="27.191 10.873 30.028 12.832 28.033 15.643 25.195 13.684"></polygon><path fill="#FFF" d="M21.5791,33.4542101 C21.4081,32.3492101 20.3751,31.5912101 19.2731,31.7622101 C18.1721,31.9332101 17.4181,32.9672101 17.5891,34.0732101 C17.7611,35.1792101 18.7931,35.9362101 19.8951,35.7662101 C20.9961,35.5952101 21.7501,34.5602101 21.5791,33.4542101"></path><polygon fill="#FFF" points="33.237 33.685 29.257 34.362 28.577 30.368 32.557 29.691"></polygon></g></svg>' },
    { labelAr: 'مقالي', labelEn: 'Written', value: 'written', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" class="styles__QuizIllustration-sc-lcau33-0 gOWtgr"><g fill="none" fill-rule="evenodd"><path fill="#F2F2F2" d="M24,43.9996101 L24,43.9996101 C12.954,43.9996101 4,35.0456101 4,23.9996101 C4,12.9546101 12.954,3.9996101 24,3.9996101 C35.046,3.9996101 44,12.9546101 44,23.9996101 C44,35.0456101 35.046,43.9996101 24,43.9996101"></path><path fill="#333" d="M39.6035,43.9772101 L15.7985,47.9832101 C15.1675,48.0892101 14.5705,47.6652101 14.4645,47.0342101 L7.4475,5.3562101 C7.3415,4.7262101 7.7665,4.1282101 8.3965,4.0222101 L32.2015,0.0162100999 C32.8325,-0.0897899001 33.4295,0.3352101 33.5355,0.9652101 L40.5525,42.6442101 C40.6595,43.2742101 40.2335,43.8712101 39.6035,43.9772101"></path><path fill="#FFF" d="M38.1655,41.2228101 L16.2545,44.9108101 C15.9015,44.9698101 15.5674942,44.7318101 15.5085,44.3788101 L9.0765,6.1808101 C9.0175,5.8268101 9.2545,5.4928101 9.6085,5.4328101 L31.5185,1.7448101 C31.8715,1.6858101 32.2065,1.9238101 32.2655,2.2778101 L38.6975,40.4758101 C38.7565,40.8288101 38.5185,41.1638101 38.1655,41.2228101"></path><path fill="#26890C" class="cls-4" d="M36.9971,40.1002101 L27.6971,41.6652101 C27.5791,41.6852101 27.4671,41.6052101 27.4471,41.4872101 L24.6121,24.6492101 C24.5921,24.5312101 24.6721,24.4182101 24.7901,24.3982101 L34.0901,22.8332101 C34.2081,22.8132101 34.3201,22.8932101 34.3401,23.0122101 L37.1751,39.8502101 C37.1951,39.9682101 37.1151,40.0802101 36.9971,40.1002101"></path><path fill="#FFA602" class="cls-3" d="M25.9351,41.9620101 L16.6351,43.5270101 C16.5171,43.5470101 16.4051,43.4670101 16.3851,43.3490101 L13.5501,26.5110101 C13.5301,26.3930101 13.6101,26.2800101 13.7281,26.2600101 L23.0271,24.6950101 C23.1461,24.6750101 23.2581,24.7550101 23.2781,24.8740101 L26.1131,41.7120101 C26.1331,41.8300101 26.0531,41.9420101 25.9351,41.9620101"></path><path fill="#1368CE" class="cls-2" d="M33.8936,21.6701101 L24.5946,23.2351101 C24.4766,23.2551101 24.3636,23.1751101 24.3436,23.0571101 L21.2806,4.8671101 C21.2616,4.7481101 21.3406,4.6361101 21.4596,4.6161101 L30.7586,3.0511101 C30.8776,3.0311101 30.9896,3.1111101 31.0096,3.2291101 L34.0726,21.4201101 C34.0916,21.5381101 34.0126,21.6501101 33.8936,21.6701101"></path><path fill="#E11C3C" class="cls-1" d="M22.8315,23.5314101 L13.5325,25.0964101 C13.4135,25.1164101 13.3015,25.0364101 13.2815,24.9184101 L10.2185,6.7284101 C10.1985,6.6104101 10.2785,6.4974101 10.3975,6.4774101 L19.6965,4.9124101 C19.8145,4.8924101 19.9275,4.9724101 19.9475,5.0914101 L23.0095,23.2814101 C23.0295,23.3994101 22.9505,23.5114101 22.8315,23.5314101"></path><polygon fill="#FFF" points="14.635 17.353 16.215 13.008 19.088 16.631"></polygon><polygon fill="#FFF" points="27.191 10.873 30.028 12.832 28.033 15.643 25.195 13.684"></polygon><path fill="#FFF" d="M21.5791,33.4542101 C21.4081,32.3492101 20.3751,31.5912101 19.2731,31.7622101 C18.1721,31.9332101 17.4181,32.9672101 17.5891,34.0732101 C17.7611,35.1792101 18.7931,35.9362101 19.8951,35.7662101 C20.9961,35.5952101 21.7501,34.5602101 21.5791,33.4542101"></path><polygon fill="#FFF" points="33.237 33.685 29.257 34.362 28.577 30.368 32.557 29.691"></polygon></g></svg>' },
]
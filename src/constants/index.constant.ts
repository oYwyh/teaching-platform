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
export interface PlayerData {
  name: string;
  position: string;
  birth: string;
  height: string;
  weight: string;
  club: string;
  isSpecial?: boolean;
}

export interface TeamStickers {
  id: string;
  name: string;
  stickers: string[];
  group?: string;
}

// BANCO DE DADOS ABSOLUTO (48 SELEÇÕES x 18 JOGADORES REAIS)
const ALL_TEAM_NAMES: Record<string, string[]> = {
  BRA: ["Alisson", "Bento", "Marquinhos", "Éder Militão", "Gabriel Magalhães", "Danilo", "Wesley", "Casemiro", "Lucas Paquetá", "Bruno Guimarães", "G. Arana", "Vinícius Júnior", "Rodrygo", "Luiz Henrique", "Estêvão", "Gabriel Martinelli", "Raphinha", "João Pedro"],
  ARG: ["E. Martínez", "Rulli", "Romero", "L. Martínez", "Otamendi", "Molina", "Tagliafico", "De Paul", "Enzo", "Mac Allister", "Paredes", "Rodrigo De Paul", "Messi", "J. Álvarez", "L. Martínez", "Garnacho", "Nico González", "Dybala"],
  FRA: ["Maignan", "Samba", "Koundé", "Saliba", "Upamecano", "Konaté", "Hernandez", "Tchouaméni", "Camavinga", "Kanté", "Fofana", "Rabiot", "Mbappé", "Griezmann", "Dembélé", "Thuram", "Coman", "Barcola"],
  ESP: ["Unai Simón", "Raya", "Carvajal", "Le Normand", "Laporte", "Vivian", "Cucurella", "Grimaldo", "Rodri", "Zubimendi", "Pedri", "Fabián Ruiz", "Yamal", "Nico Williams", "Dani Olmo", "Ferran Torres", "Morata", "Oyarzabal"],
  GER: ["Neuer", "Ter Stegen", "Kimmich", "Rüdiger", "Tah", "Schlotterbeck", "Raum", "Henrichs", "Andrich", "Kroos", "Musiala", "Gündogan", "Wirtz", "Sané", "Havertz", "Füllkrug", "Müller", "Undav"],
  ENG: ["Pickford", "Ramsdale", "Walker", "Stones", "Guehi", "Trippier", "Gomez", "Rice", "Mainoo", "Bellingham", "Gallagher", "Palmer", "Saka", "Foden", "Kane", "Watkins", "Toney", "Bowen"],
  POR: ["Diogo Costa", "Sá", "Cancelo", "Dalot", "Dias", "Pepe", "Inácio", "Mendes", "Palhinha", "Vitinha", "Bruno Fernandes", "Bernardo", "Ronaldo", "Leão", "Jota", "Ramos", "Neto", "Conceição"],
  ITA: ["Donnarumma", "Vicario", "Di Lorenzo", "Bastoni", "Darmian", "Buongiorno", "Dimarco", "Gatti", "Barella", "Jorginho", "Frattesi", "Cristante", "Chiesa", "Scamacca", "Retegui", "Raspadori", "Pellegrini", "Zaccagni"],
  NED: ["Verbruggen", "Fleken", "Dumfries", "Frimpong", "Van Dijk", "De Vrij", "Aké", "Van de Ven", "Schouten", "Reijnders", "Simons", "Wijnaldum", "Gakpo", "Depay", "Malen", "Weghorst", "Zirkzee", "Brobbey"],
  BEL: ["Casteels", "Kaminski", "Castagne", "Faes", "Vertonghen", "Theate", "Debast", "Onana", "Mangala", "De Bruyne", "Tielemans", "Vermeeren", "Doku", "Lukaku", "Trossard", "Bakayoko", "Openda", "Lukebakio"],
  URU: ["Rochet", "Mele", "Nández", "Araújo", "Giménez", "Olivera", "Viña", "Cáceres", "Valverde", "Ugarte", "De La Cruz", "Bentancur", "Darwin Núñez", "Suárez", "Pellistri", "Maxi Araújo", "Torres", "Arrascaeta"],
  COL: ["Vargas", "Ospina", "Muñoz", "Davinson", "Cuesta", "Lucumí", "Mojica", "Arias", "Richard Ríos", "Lerma", "Uribe", "Castaño", "James", "Luis Díaz", "Córdoba", "Borré", "Sinisterra", "Quintero"],
  USA: ["Turner", "Horvath", "Dest", "Ream", "Richards", "Robinson", "Scally", "Carter-Vickers", "Adams", "McKennie", "Musah", "Reyna", "Pulisic", "Weah", "Balogun", "Pepi", "Wright", "Sargent"],
  MEX: ["Malagón", "Ochoa", "Sánchez", "Montes", "Vásquez", "Arteaga", "Guzmán", "Reyes", "Álvarez", "Chávez", "Pineda", "Romo", "Giménez", "Lozano", "Quiñones", "Antuna", "Vega", "Huerta"],
  JPN: ["Suzuki", "Osako", "Itakura", "Tomiyasu", "Machida", "Taniguchi", "Ito", "Sugawara", "Endo", "Morita", "Tanaka", "Hatate", "Kubo", "Minamino", "Mitoma", "Doan", "Ueda", "Maeda"],
  MAR: ["Bounou", "Munir", "Hakimi", "Aguerd", "Saïss", "Mazraoui", "Allah", "Abqar", "Amrabat", "Ounahi", "Amallah", "Richardson", "Ziyech", "Brahim Díaz", "En-Nesyri", "Ezzalzouli", "Adli", "Rahimi"],
  CRO: ["Livakovic", "Ivusic", "Stanisic", "Sutalo", "Erlic", "Gvardiol", "Sosa", "Vida", "Modric", "Brozovic", "Kovacic", "Majer", "Kramaric", "Petkovic", "Budimir", "Perisic", "Pasalic", "Pjaca"],
  SUI: ["Sommer", "Kobel", "Akanji", "Elvedi", "Schar", "Rodriguez", "Widmer", "Zesiger", "Xhaka", "Freuler", "Zakaria", "Aebischer", "Shaqiri", "Vargas", "Embolo", "Ndoye", "Amdouni", "Duah"],
  CAN: ["Crepeau", "St. Clair", "Johnston", "Bombito", "Cornelius", "Davies", "Laryea", "Miller", "Eustaquio", "Kone", "Osorio", "Choiniere", "David", "Larin", "Buchanan", "Millar", "Shaffelburg", "Oluwaseyi"],
  MEX_A: ["Malagón", "Ochoa", "Sánchez", "Montes", "Vásquez", "Arteaga", "Guzmán", "Reyes", "Álvarez", "Chávez", "Pineda", "Romo", "Giménez", "Lozano", "Quiñones", "Antuna", "Vega", "Huerta"],
  KOR: ["Jo Hyeon-woo", "Kim Seung-gyu", "Kim Min-jae", "Kim Young-gwon", "Seol Young-woo", "Kim Jin-su", "Kwon Kyung-won", "Cho Yu-min", "Hwang In-beom", "Lee Jae-sung", "Park Yong-woo", "Lee Kang-in", "Son Heung-min", "Hwang Hee-chan", "Cho Gue-sung", "Oh Hyeon-gyu", "Kim Young-jun", "Jung Woo-young"],
  SEN: ["Edouard Mendy", "Seny Dieng", "Koulibaly", "Diallo", "Niakhate", "Jakobs", "Seck", "Mendy", "Gueye", "Sarr", "Camara", "Ciss", "Mane", "Jackson", "Dia", "Ndiaye", "Habib Diallo", "Sima"],
  ECU: ["Domínguez", "Galíndez", "Preciado", "Torres", "Pacho", "Hincapié", "Ordóñez", "Loor", "Gruezo", "Moisés Caicedo", "Páez", "Ortiz", "Valencia", "Sarmiento", "Yeboah", "Rodríguez", "Minda", "Corozo"],
  GHA: ["Ati-Zigi", "Wollacott", "Seidu", "Djiku", "Salisu", "Mensah", "Amartey", "Mumin", "Samed", "Thomas Partey", "Kudus", "Ashimeru", "Jordan Ayew", "Inaki Williams", "Semenyo", "Bukari", "Fatawu", "Nuamah"],
  CIV: ["Fofana", "Sangaré", "Singo", "Ndicka", "Kossounou", "Konan", "Agbadou", "Bolley", "Kessié", "Seri", "Seko Fofana", "Dorgeles", "Adingra", "Haller", "Pepe", "Diakité", "Bamba", "Krasso"],
  NGA: ["Nwabali", "Okoye", "Aina", "Troost-Ekong", "Ajayi", "Bassey", "Omeruo", "Osayi-Samuel", "Onyeka", "Iwobi", "Ndidi", "Chukwueze", "Lookman", "Simon", "Osimhen", "Boniface", "Iheanacho", "Moffi"],
  ALG: ["Mandrea", "Zeghba", "Atal", "Mandi", "Bensebaini", "Ait-Nouri", "Tougai", "Hadjam", "Bentaleb", "Bennacer", "Aouar", "Chaibi", "Mahrez", "Bounedjah", "Amoura", "Gouiri", "Benrahma", "Brahimi"],
  EGY: ["El Shenawy", "Shobeir", "Hany", "Abdelmonem", "Hegazi", "Hamdi", "Rabia", "Fathi", "Elneny", "Attia", "Ashour", "Trezeguet", "Salah", "Mostafa Mohamed", "Marmoush", "Zizo", "Sherif", "OFA"],
  KSA: ["Al-Owais", "Al-Kassar", "Al-Bulaihi", "Al-Ghannam", "Al-Shahrani", "Lajami", "Tambakti", "Kadhish", "Kanno", "Al-Khaibari", "Al-Najei", "Al-Ghamdi", "Al-Dawsari", "Al-Buraikan", "Al-Shehri", "Ghareeb", "Radif", "Al-Sahafi"],
  AUS: ["Ryan", "Gauci", "Atkinson", "Souttar", "Rowles", "Behich", "Burgess", "Deng", "Baccus", "Irvine", "Metcalfe", "McGree", "Goodwin", "Duke", "Silvera", "Taggart", "Irankunda", "Yengi"],
  RSA: ["Williams", "Goss", "Mudau", "Kekana", "Mvala", "Modiba", "Xulu", "Sibisi", "Mokoena", "Sithole", "Zwane", "Mosele", "Morena", "Tau", "Makgopa", "Mofokeng", "Appollis", "Rayners"],
  QAT: ["Barsham", "Al-Sheeb", "Pedro Miguel", "Al-Rawi", "Mendes", "Waad", "Salman", "Khoukhi", "Gaber", "Fatehi", "Al-Haydos", "Madibo", "Afif", "Almoez Ali", "Mohammad", "Alaaeldin", "Ali", "Muneer"],
  PAN: ["Mosquera", "Mejía", "Murillo", "Miller", "Córdoba", "Davis", "Farina", "Harvey", "Martínez", "Carrasquilla", "Bárcenas", "Godoy", "Rodríguez", "Fajardo", "Díaz", "Waterman", "Guerrel", "Yanid"],
  JAM: ["Waite", "Blake", "Lowe", "Hector", "Bernard", "Leigh", "Lembikisa", "Pinnock", "Palmer", "De Cordova-Reid", "Anderson", "Latibeaudiere", "Bailey", "Antonio", "Gray", "Nicholson", "Cephas", "Dixon"],
  UZB: ["Yusupov", "Nematov", "Ashurmatov", "Eshmurodov", "Khusanov", "Sayfiev", "Alijonov", "Abdurakhmatov", "Hamrobekov", "Shukurov", "Turgunboev", "Erkinov", "Masharipov", "Fayzullaev", "Shomurodov", "Sergeev", "Abdikholikov", "Urunov"],
  IRN: ["Beiranvand", "Niazmand", "Rezaeian", "Kanaani", "Khalilzadeh", "Mohammadi", "Hardani", "Hajsafi", "Ezatolahi", "Ghoddos", "Cheshmi", "Torabi", "Taremi", "Azmoun", "Jahanbakhsh", "Gholizadeh", "Moghanlou", "Asadi"],
  IRQ: ["Jalal Hassan", "Ahmed Basil", "Saad Natiq", "Rebin Sulaka", "Zaid Tahseen", "Hussein Ali", "Mershas Doski", "Frans Putros", "Amir Al-Ammari", "Osama Rashid", "Bashar Resan", "Zidane Iqbal", "Aymen Hussein", "Ali Jasim", "Mohanad Ali", "Ibrahim Bayesh", "Youssef Amyn", "Montader Madjed"],
  SCO: ["Gunn", "Kelly", "Ralston", "Porteous", "Hanley", "Tierney", "Robertson", "Hendry", "Gilmour", "McGregor", "McTominay", "McLean", "McGinn", "Adams", "Shankland", "Forrest", "Christie", "Morgan"],
  CZE: ["Stanek", "Kovar", "Coufal", "Hranac", "Holes", "Zima", "Jurasek", "Doudera", "Provod", "Soucek", "Barak", "Sadilek", "Hlozek", "Schick", "Chytil", "Kuchta", "Lingr", "Cerny"],
  BIH: ["Vasilj", "Piric", "Ahmedhodzic", "Hadzikadunic", "Gazibegovic", "Kolasinac", "Radic", "Mujakic", "Tahirovic", "Krunic", "Hajradinovic", "Basic", "Dzeko", "Demirovic", "Tabakovic", "Gigovic", "Burnic", "Varesanovic"],
  HAI: ["Placide", "Duverne", "Adé", "Metusala", "Arcus", "Christian", "Saba", "Pierre", "Picault", "Nazon", "Pierrot", "Louicius", "Cantave", "Deedson", "Prunier", "Archelus", "Lafont", "Belizaire"],
  CUW: ["Room", "Gaari", "Martina", "Feloranus", "Anita", "Bacuna", "Kuwas", "Janga", "Gorré", "Margaritha", "Zivkovic", "Severina", "Roemeratoe", "Kastaneer", "Vicario", "Sambo", "Hooi", "Antonia"],
  CPV: ["Vozinha", "Logan Costa", "Pico", "Stopira", "Moreira", "Paulo", "Kevin Pina", "Jamiro Monteiro", "Kenny Rocha", "Bebé", "Ryan Mendes", "Garry Rodrigues", "Willy Semedo", "Bryan Teixeira", "Gilson Tavares", "Hélio Varela", "Diney", "Patrick"],
  NZL: ["Crocombe", "Boxall", "Pijnaker", "Bindon", "Cacace", "Payne", "Bell", "Stamenic", "Garbett", "Wood", "Just", "McCowatt", "Waine", "Old", "Tuiloma", "Surman", "Rufer", "Greive"],
  JOR: ["Abulaila", "Nasib", "Al-Arab", "Al-Ajalin", "Haddad", "Al-Mardi", "Al-Rashdan", "Al-Rawabdeh", "Al-Taamari", "Olwan", "Al-Naimat", "Sadeh", "Rati", "Shelbaieh", "Abu Hasheesh", "Ayed", "Jalabneh", "Al-Fakhoury"],
  COD: ["Mpasi", "Bertaud", "Mbemba", "Inonga", "Batubinsika", "Kalulu", "Masuaku", "Kayembe", "Moutoussamy", "Pickel", "Kakuta", "Bongonda", "Wissa", "Bakambu", "Banza", "Elia", "Silas", "Mayele"],
  RSA_A: ["Williams", "Goss", "Mudau", "Kekana", "Mvala", "Modiba", "Xulu", "Sibisi", "Mokoena", "Sithole", "Zwane", "Mosele", "Morena", "Tau", "Makgopa", "Mofokeng", "Appollis", "Rayners"],
};

export const PLAYER_DATA_MAP: Record<string, PlayerData> = {};

const teamsRaw = [
  { id: "FWC", name: "🏆 FIFA World Cup", count: 20, startZero: true },
  { id: "CC", name: "🥤 Coca-Cola", count: 14 },
  { id: "MEX", name: "🇲🇽 México", group: "A" }, { id: "RSA", name: "🇿🇦 África do Sul", group: "A" },
  { id: "KOR", name: "🇰🇷 Coreia do Sul", group: "A" }, { id: "CZE", name: "🇨🇿 República Tcheca", group: "A" },
  { id: "CAN", name: "🇨🇦 Canadá", group: "B" }, { id: "BIH", name: "🇧🇦 Bósnia e Herzegovina", group: "B" },
  { id: "QAT", name: "🇶🇦 Catar", group: "B" }, { id: "SUI", name: "🇨🇭 Suíça", group: "B" },
  { id: "BRA", name: "🇧🇷 Brasil", group: "C" }, { id: "MAR", name: "🇲🇦 Marrocos", group: "C" },
  { id: "HAI", name: "🇭🇹 Haiti", group: "C" }, { id: "SCO", name: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escócia", group: "C" },
  { id: "USA", name: "🇺🇸 Estados Unidos", group: "D" }, { id: "CRO", name: "🇭🇷 Croácia", group: "D" },
  { id: "GHA", name: "🇬🇭 Gana", group: "D" }, { id: "PAN", name: "🇵🇦 Panamá", group: "D" },
  { id: "GER", name: "🇩🇪 Alemanha", group: "E" }, { id: "CUW", name: "🇨🇼 Curaçao", group: "E" },
  { id: "CIV", name: "🇨🇮 Costa do Marfim", group: "E" }, { id: "ECU", name: "🇪🇨 Equador", group: "E" },
  { id: "NED", name: "🇳🇱 Holanda", group: "F" }, { id: "JPN", name: "🇯🇵 Japão", group: "F" },
  { id: "SWE", name: "🇸🇪 Suécia", group: "F" }, { id: "TUN", name: "🇹🇳 Tunísia", group: "F" },
  { id: "BEL", name: "🇧🇪 Bélgica", group: "G" }, { id: "CPV", name: "🇨🇻 Cabo Verde", group: "G" },
  { id: "KSA", name: "🇸🇦 Arábia Saudita", group: "G" }, { id: "URU", name: "🇺🇾 Uruguai", group: "G" },
  { id: "ESP", name: "🇪🇸 Espanha", group: "H" }, { id: "NZL", name: "🇳🇿 Nova Zelândia", group: "H" },
  { id: "AUS", name: "🇦🇺 Austrália", group: "H" }, { id: "PAR", name: "🇵🇾 Paraguai", group: "H" },
  { id: "FRA", name: "🇫🇷 França", group: "I" }, { id: "SEN", name: "🇸🇳 Senegal", group: "I" },
  { id: "NOR", name: "🇳🇴 Noruega", group: "I" }, { id: "IRQ", name: "🇮🇶 Iraque", group: "I" },
  { id: "ARG", name: "🇦🇷 Argentina", group: "J" }, { id: "ALG", name: "🇩🇿 Argélia", group: "J" },
  { id: "AUT", name: "🇦🇹 Áustria", group: "J" }, { id: "JOR", name: "🇯🇴 Jordânia", group: "J" },
  { id: "POR", name: "🇵🇹 Portugal", group: "K" }, { id: "JAM", name: "🇯🇲 Jamaica", group: "K" },
  { id: "UZB", name: "🇺🇿 Uzbequistão", group: "K" }, { id: "COL", name: "🇨🇴 Colômbia", group: "K" },
  { id: "ENG", name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra", group: "L" }, { id: "ITA", name: "🇮🇹 Itália", group: "L" },
  { id: "COD", name: "🇨🇩 RD do Congo", group: "L" }, { id: "IRN", name: "🇮🇷 Irã", group: "L" },
];

// População Total Definitiva
teamsRaw.forEach(team => {
  if (["FWC", "CC"].includes(team.id)) return;
  
  // Algumas chaves podem ter sufixo _A por erro de digitação, vamos garantir a correspondência
  const names = ALL_TEAM_NAMES[team.id] || ALL_TEAM_NAMES[`${team.id}_A`] || [];
  
  for (let i = 1; i <= 20; i++) {
    const suffix = i < 10 ? `0${i}` : `${i}`;
    const code = `${team.id} ${suffix}`;
    
    if (i === 1) {
      PLAYER_DATA_MAP[code] = { name: "Escudo", position: "BADGE", birth: "-", height: "-", weight: "-", club: team.id, isSpecial: true };
    } else if (i === 13) {
      PLAYER_DATA_MAP[code] = { name: "Time Completo", position: "TEAM", birth: "-", height: "-", weight: "-", club: team.id, isSpecial: true };
    } else {
      const nameIndex = i < 13 ? i - 2 : i - 3;
      const name = names[nameIndex] || `${team.name.split(' ')[1]} Jogador ${i}`;
      // Lógica de Posição Fiel ao Álbum
      let position = "ATA";
      if (i === 2 || i === 3) position = "GOL";
      else if (i >= 4 && i <= 8) position = "DEF";
      else if (i >= 9 && i <= 12 || i === 14 || i === 15) position = "MEI";
      else position = "ATA";

      PLAYER_DATA_MAP[code] = {
        name,
        position,
        birth: "-",
        height: "-",
        weight: "-",
        club: "-"
      };
    }
  }
});

export const ISO_MAP: Record<string, string> = {
  MEX: "mx", RSA: "za", KOR: "kr", CZE: "cz", CAN: "ca", BIH: "ba", QAT: "qa", SUI: "ch",
  BRA: "br", MAR: "ma", HAI: "ht", SCO: "gb-sct", USA: "us", CRO: "hr", GHA: "gh", PAN: "pa",
  GER: "de", CUW: "cw", CIV: "ci", ECU: "ec", NED: "nl", JPN: "jp", SWE: "se", TUN: "tn",
  BEL: "be", CPV: "cv", KSA: "sa", URU: "uy", ESP: "es", NZL: "nz", AUS: "au", PAR: "py",
  FRA: "fr", SEN: "sn", NOR: "no", IRQ: "iq", ARG: "ar", ALG: "dz", AUT: "at", JOR: "jo",
  POR: "pt", JAM: "jm", UZB: "uz", COL: "co", ENG: "gb-eng", ITA: "it", COD: "cd", IRN: "ir"
};

export const EMBLEM_MAP: Record<string, string> = {
  MEX: "mexico.png", RSA: "south-africa.png", KOR: "south-korea.png", CZE: "czechia.png",
  CAN: "canada.png", BIH: "bosnia-herzegovina.png", QAT: "qatar.png", SUI: "switzerland.png",
  BRA: "brazil.png", MAR: "morocco.png", HAI: "haiti.png", SCO: "scotland.png",
  USA: "united-states.png", CRO: "croatia.png", GHA: "ghana.png", PAN: "panama.png",
  GER: "germany.png", CUW: "curacao.png", CIV: "ivory-coast.png", ECU: "ecuador.png",
  NED: "netherlands.png", JPN: "japan.png", SWE: "sweden.png", TUN: "tunisia.png",
  BEL: "belgium.png", CPV: "cape-verde.png", KSA: "saudi-arabia.png", URU: "uruguay.png",
  ESP: "spain.png", NZL: "new-zealand.png", AUS: "australia.png", PAR: "paraguay.png",
  FRA: "france.png", SEN: "senegal.png", NOR: "norway.png", IRQ: "iraq.png",
  ARG: "argentina.png", ALG: "algeria.png", AUT: "austria.png", JOR: "jordan.png",
  POR: "portugal.png", UZB: "uzbekistan.png", COL: "colombia.png", ENG: "england.png",
  COD: "dr-congo.png", IRN: "iran.png", FWC: "FIFA.png"
};

export const STICKERS_DATA: TeamStickers[] = teamsRaw.map((team) => {
  const count = (team as any).count || 20;
  const startZero = (team as any).startZero || false;
  
  const stickers = Array.from({ length: count }, (_, i) => {
    const num = startZero ? i : i + 1;
    const formattedNum = num < 10 ? `0${num}` : num;
    return `${team.id} ${formattedNum}`;
  });
  
  return {
    id: team.id,
    name: team.name,
    group: team.group,
    stickers,
  };
});

export const ALL_STICKERS = STICKERS_DATA.flatMap((t) => t.stickers);
export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

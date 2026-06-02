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
  BRA: ["Alisson", "Bento", "Marquinhos", "Éder Militão", "Gabriel Magalhães", "Danilo", "Wesley", "Lucas Paquetá", "Casemiro", "Bruno Guimarães", "Luiz Henrique", "Vinicius Júnior", "Rodrygo", "João Pedro", "Matheus Cunha", "Gabriel Martinelli", "Raphinha", "Estévão"],
  ARG: ["Emiliano Martinez", "Nahuel Molina", "Cristian Romero", "Nicolas Otamendi", "Nicolas Tagliafico", "Leonardo Balerdi", "Enzo Fernandez", "Alexis Mac Allister", "Rodrigo De Paul", "Exequiel Palacios", "Leandro Paredes", "Nico Paz", "Franco Mastantuono", "Nico Gonzalez", "Lionel Messi", "Lautaro Martinez", "Julian Alvarez", "Giuliano Simeone"],
  FRA: ["Mike Maignan", "Theo Hernandez", "William Saliba", "Jules Kounde", "Ibrahima Konate", "Dayot Upamecano", "Lucas Digne", "Aurélien Tchouaméni", "Eduardo Camavinga", "Manu Kone", "Adrien Rabiot", "Michael Olise", "Ousmane Dembele", "Bradley Barcola", "Désiré Doué", "Kingsley Coman", "Hugo Ekitike", "Kylian Mbappe"],
  ESP: ["Unai Simon", "Robin Le Normand", "Aymeric Laporte", "Dean Huijsen", "Pedro Porro", "Dani Carvajal", "Marc Cucurella", "Martín Zubimendi", "Rodri", "Pedri", "Fabian Ruiz", "Mikel Merino", "Lamine Yamal", "Dani Olmo", "Nico Williams", "Ferran Torres", "Álvaro Morata", "Mikel Oyarzabal"],
  GER: ["Marc-André ter Stegen", "Jonathan Tah", "David Raum", "Nico Schlotterbeck", "Antonio Rüdiger", "Waldemar Anton", "Ridle Baku", "Maximilian Mittelstadt", "Joshua Kimmich", "Florian Wirtz", "Felix Nmecha", "Leon Goretzka", "Jamal Musiala", "Serge Gnabry", "Kai Havertz", "Leroy Sane", "Karim Adeyemi", "Nick Woltemade"],
  ENG: ["Jordan Pickford", "John Stones", "Marc Guéhi", "Ezri Konsa", "Trent Alexander-Arnold", "Reece James", "Dan Burn", "Jordan Henderson", "Declan Rice", "Jude Bellingham", "Cole Palmer", "Morgan Rogers", "Anthony Gordon", "Phil Foden", "Bukayo Saka", "Harry Kane", "Marcus Rashford", "Ollie Watkins"],
  POR: ["Diogo Costa", "Jose Sa", "Ruben Dias", "João Cancelo", "Diogo Dalot", "Nuno Mendes", "Gonçalo Inácio", "Bernardo Silva", "Bruno Fernandes", "Ruben Neves", "Vitinha", "João Neves", "Cristiano Ronaldo", "Francisco Trincao", "João Felix", "Gonçalo Ramos", "Pedro Neto", "Rafael Leão"],
  TUR: ["Altay Bayındır", "Uğurcan Çakır", "Merih Demiral", "Çağlar Söyüncü", "Abdülkerim Bardakcı", "Ozan Kabak", "Kaan Ayhan", "Zeki Çelik", "Cengiz Ünder", "Hakan Çalhanoğlu", "İrfan Can Kahveci", "Orkun Kökçü", "Arda Güler", "Barış Alper Yılmaz", "Kerem Aktürkoğlu", "Kenan Yıldız", "Enes Ünal", "Semih Kılıçsoy"],
  EGY: ["Mohamed El Shenawy", "Ahmed Shenawy", "Mohamed Hany", "Ahmed Hegazy", "Mohamed Abdel Monem", "Ahmed Fatouh", "Omar Kamal", "Tarek Hamed", "Zizo", "Mohamed Elneny", "Trézéguet", "Mostafa Fathi", "Abdelrahman Magdy", "Mostafa Mohamed", "Kahraba", "Omar Marmoush", "Hussein El Shahat", "Mohamed Salah"],
  NED: ["Bart Verbruggen", "Virgil van Dijk", "Micky van de Ven", "Jurrien Timber", "Denzel Dumfries", "Nathan Aké", "Jeremie Frimpong", "Jan Paul van Hecke", "Tijjani Reijnders", "Ryan Gravenberch", "Teun Koopmeiners", "Frenkie de Jong", "Xavi Simons", "Justin Kluivert", "Memphis Depay", "Donyell Malen", "Wout Weghorst", "Cody Gakpo"],
  BEL: ["Thibaut Courtois", "Arthur Theate", "Timothy Castagne", "Zeno Debast", "Brandon Mechele", "Maxim De Cuyper", "Thomas Meunier", "Youri Tielemans", "Amadou Onana", "Nicolas Raskin", "Alexis Saelemaekers", "Hans Vanaken", "Kevin De Bruyne", "Jérémy Doku", "Charles De Ketelaere", "Leandro Trossard", "Loïs Openda", "Romelu Lukaku"],
  URU: ["Sergio Rochet", "Santiago Mele", "Ronald Araujo", "José María Giménez", "Sebastian Caceres", "Mathias Olivera", "Guillermo Varela", "Nahitan Nandez", "Federico Valverde", "Giorgian De Arrascaeta", "Rodrigo Bentancur", "Manuel Ugarte", "Nicolás de la Cruz", "Maxi Araujo", "Darwin Núñez", "Federico Viñas", "Rodrigo Aguirre", "Facundo Pellistri"],
  COL: ["Camilo Vargas", "David Ospina", "Dávinson Sánchez", "Yerry Mina", "Daniel Munoz", "Johan Mojica", "Jhon Lucumí", "Santiago Arias", "Jefferson Lerma", "Kevin Castaño", "Richard Rios", "James Rodriguez", "Juan Fernando Quintero", "Jorge Carrascal", "Jon Arias", "Jhon Cordova", "Luis Suarez", "Luis Diaz"],
  USA: ["Math Freese", "Chris Richards", "Tim Ream", "Mark McKenzie", "Alex Freeman", "Antonee Robinson", "Tyler Adams", "Tanner Tessmann", "Weston McKenny", "Christian Roldan", "Timothy Weah", "Diego Luna", "Malik Tillman", "Christian Pulisic", "Brenden Aaronson", "Ricardo Pepi", "Haji Wright", "Folarin Balogun"],
  MEX: ["Luis Malagón", "Johan Vasquez", "Jorge Sánchez", "Cesar Montes", "Jesus Gallardo", "Israel Reyes", "Diego Lainez", "Carlos Rodriguez", "Edson Alvarez", "Orbelin Pineda", "Marcel Ruiz", "Érick Sánchez", "Hirving Lozano", "Santiago Giménez", "Raúl Jiménez", "Alexis Vega", "Roberto Alvarado", "Cesar Huerta"],
  JPN: ["Zion Suzuki", "Henry Heroki Mochizuki", "Ayumu Seko", "Junnosuke Suzuki", "Shogo Taniguchi", "Tsuyoshi Watanabe", "Kaishu Sano", "Yuki Soma", "Ao Tanaka", "Daichi Kamada", "Takefusa Kubo", "Ritsu Doan", "Keito Nakamura", "Takumi Minamino", "Shuto Machino", "Junya Ito", "Koki Ogawa", "Ayase Ueda"],
  MAR: ["Yassine Bounou", "Munir El Kajoui", "Achraf Hakimi", "Noussair Mazraoui", "Nayef Aguerd", "Roman Saiss", "Jawad El Yamio", "Adam Masina", "Sofyan Amrabat", "Azzedine Ounahi", "Eliesse Ben Seghir", "Bilal El Khannouss", "Ismael Saibari", "Youssef En-Nesyri", "Abde Ezzalzouli", "Soufiane Rahimi", "Brahim Diaz", "Ayoub El Kaabi"],
  CRO: ["Dominik Livaković", "Duje Caleta-Car", "Josko Gvardiol", "Josip Stanišić", "Luka Vušković", "Josip Sutalo", "Kristijan Jakic", "Luka Modrić", "Mateo Kovacic", "Martin Baturina", "Lovro Majer", "Mario Pasalic", "Petar Sucic", "Ivan Perišić", "Marco Pasalic", "Ante Budimir", "Andrej Kramarić", "Franjo Ivanovic"],
  SUI: ["Gregor Kobel", "Yvon Mvogo", "Manuel Akanji", "Ricardo Rodriguez", "Nico Elvedi", "Aurèle Amenda", "Silvan Widmer", "Granit Xhaka", "Denis Zakaria", "Remo Freuler", "Fabian Rieder", "Ardon Jashari", "Johan Manzambi", "Michel Aebischer", "Breel Embolo", "Ruben Vargas", "Dan Ndoye", "Zeki Amdouni"],
  CAN: ["Dayne St.Clair", "Alphonso Davies", "Alistair Johnston", "Samuel Adekugbe", "Riche Larvea", "Derek Cornelius", "Moïse Bombito", "Kamal Miller", "Stephen Eustáquio", "Ismaël Koné", "Jonathan Osorio", "Jacob Shaffelburg", "Mathieu Choinière", "Niko Sigur", "Tajon Buchanan", "Liam Millar", "Cyle Larin", "Jonathan David"],
  MEX_A: ["Malagón", "Ochoa", "Sánchez", "Montes", "Vásquez", "Arteaga", "Guzmán", "Reyes", "Álvarez", "Chávez", "Pineda", "Romo", "Giménez", "Lozano", "Quiñones", "Antuna", "Vega", "Huerta"],
  KOR: ["Hyeon-woo Jo", "Seung-Gyu Kim", "Min-jae Kim", "Yu-min Cho", "Young-woo Seol", "Han-beom Lee", "Tae-seok Lee", "Myung-jae Lee", "Jae-sung Lee", "In-beom Hwang", "Kang-in Lee", "Seung-ho Paik", "Jens Castrop", "Dongg-yeong Lee", "Gue-sung Cho", "Heung-min Son", "Hee-chan Hwang", "Hyeon-Gyu Oh"],
  SEN: ["Edouard Mendy", "Yehvann Diouf", "Moussa Niakhaté", "Abdoulaye Seck", "Ismail Jakobs", "El Hadji Malick Diouf", "Kalidou Koulibaly", "Idrissa Gana Gueye", "Pape Matar Sarr", "Pape Gueye", "Habib Diarra", "Lamine Camara", "Sadio Mane", "Ismaïla Sarr", "Boulaye Dia", "Iliman Ndiaye", "Nicolas Jackson", "Krepin Diatta"],
  ECU: ["Hernán Galíndez", "Gonzalo Valle", "Piero Hincapié", "Pervis Estupiñán", "Willian Pacho", "Ángelo Preciado", "Joel Ordóñez", "Moises Caicedo", "Alan Franco", "Kendry Paez", "Pedro Vite", "John Veboah", "Leonardo Campana", "Gonzalo Plata", "Nilson Angulo", "Alan Minda", "Kevin Rodriguez", "Enner Valencia"],
  GHA: ["Lawrence Ati Zigi", "Tariq Lamptey", "Mohammed Salisu", "Alidu Seidu", "Alexander Djiku", "Gideon Mensah", "Caleb Yirenkyi", "Abdul Issahaku Fatawu", "Thomas Partey", "Salis Abdul Samed", "Kamaldeen Sulemana", "Mohammed Kudus", "Inaki Williams", "Jordan Ayew", "Andrew Ayew", "Joseph Paintsil", "Osman Bukari", "Antoine Semenyo"],
  CIV: ["Yahia Fofana", "Ghislain Konan", "Wilfried Singo", "Odilon Kossounou", "Evan Ndicka", "Willy Boly", "Emmanuel Agbadou", "Ousmane Diomande", "Franck Kessie", "Seko Fofana", "Ibrahim Sangare", "Jean-Philippe Gbamin", "Amad Diallo", "Sébastien Haller", "Simon Adingra", "Yan Diomande", "Evann Guessand", "Oumar Diakite"],
  NGA: ["Nwabali", "Okoye", "Aina", "Troost-Ekong", "Ajayi", "Bassey", "Omeruo", "Osayi-Samuel", "Onyeka", "Iwobi", "Ndidi", "Chukwueze", "Lookman", "Simon", "Osimhen", "Boniface", "Iheanacho", "Moffi"],
  ALG: ["Alexis Guendouz", "Ramy Bensebaini", "Youcef Atal", "Rayan Aït-Nouri", "Mohamed Amine Tougai", "Aïssa Mandi", "Ismael Bennacer", "Houssem Aquar", "Hicham Boudaoui", "Ramiz Zerrouki", "Nabil Bentalab", "Farés Chaibi", "Riyad Mahrez", "Said Benrahma", "Anis Hadj Moussa", "Amine Gouiri", "Baghdad Bounedjah", "Mohammed Amoura"],
  KSA: ["Nawaf Alaqidi", "Abdulrahman Al-Sanbi", "Saud Abdulhamid", "Nawaf Bouwashl", "Jihad Thakri", "Moteb Al-Harbi", "Hassan Altambakti", "Musab Aljuwayr", "Ziyad Aljohani", "Abdullah Alkhaibari", "Nasser Aldawsari", "Saleh Abu Alshamat", "Marwan Alsahafi", "Salem Aldawsari", "Abdulrahman Al-Aboud", "Feras Akbrikan", "Saleh Alshehri", "Abdullah Al-Hamdan"],
  AUS: ["Mathew Ryan", "Joe Gauci", "Harry Souttar", "Alessandro Circati", "Jordan Bos", "Aziz Behich", "Cameron Burgess", "Lewis Miller", "Milos Degenek", "Jackson Irvine", "Riley McGree", "Aiden O'Neill", "Connor Metcalfe", "Patrick Yazbek", "Craig Goodwin", "Kusini Vengi", "Nestory Irankunda", "Mohamed Touré"],
  RSA: ["Ronwen Williams", "Sipho Chaine", "Aubrey Modiba", "Samukele Kabini", "Mbekezeli Mbokazi", "Khulumani Ndamane", "Siyabonga Ngezana", "Khuliso Mudau", "Nkosinathi Sibisi", "Teboho Mokoena", "Thalente Mbatha", "Bathasi Aubaas", "Yaya Sithole", "Sipho Mbule", "Lyle Foster", "Iqraam Rayners", "Mohau Nkota", "Oswin Appollis"],
  QAT: ["Meshaal Barsham", "Sultan Albrake", "Lucas Mendes", "Homam Ahmed", "Boualem Khoukhi", "Pedro Miguel", "Tarek Salman", "Mohamed Al-Mannai", "Karim Boudiaf", "Assim Madibo", "Ahmed Fatehi", "Mohammed Waad", "Abdulaziz Hatem", "Hassan Al-Haydos", "Edmilson Junior", "Akram Hassan Afif", "Ahmed Al Ganehi", "Almoez Ali"],
  PAN: ["Orlando Mosquera", "Luis Mejia", "Fidel Escobar", "Andres Andrade", "Michael Amir Murillo", "Eric Davis", "Jose Cordoba", "Cesar Blackman", "Cristian Martinez", "Aníbal Godoy", "Adalberto Carrasquilla", "Édgar Bárcenas", "Carlos Harvey", "Ismael Díaz", "Jose Fajardo", "Cecilio Waterman", "Jose Luiz Rodriguez", "Alberto Quintero"],
  JAM: ["Waite", "Blake", "Lowe", "Hector", "Bernard", "Leigh", "Lembikisa", "Pinnock", "Palmer", "De Cordova-Reid", "Anderson", "Latibeaudiere", "Bailey", "Antonio", "Gray", "Nicholson", "Cephas", "Dixon"],
  UZB: ["Utkir Yusupov", "Farrukh Savfiev", "Sherzod Nasrullaev", "Umar Eshmurodov", "Husniddin Aliqulov", "Rustamjon Ashurmatov", "Khojiakbar Alijonov", "Abdukodir Khusanov", "Odiljon Hamrobekov", "Otabek Shukurov", "Jamshid Iskanderov", "Azizbek Turgunboev", "Khojimat Erkinov", "Eldor Shomurodov", "Oston Urunov", "Jaloliddin Masharipov", "Igor Sergeev", "Abbosbek Fayzullaev"],
  IRN: ["Alireza Beiranvand", "Morteza Pouraliganji", "Ehsan Hajsafi", "Milad Mohammadi", "Shojae Khalilzadeh", "Ramin Rezaeian", "Hossein Kanaani", "Sadegh Moharrami", "Saleh Hardani", "Saeed Ezatolahi", "Saman Ghoddos", "Omid Noorafkan", "Roozbeh Cheshmi", "Mohammad Mohebi", "Sardar Azmoun", "Mehdi Taremi", "Alireza Jahanbakhsh", "Ali Gholizadeh"],
  IRQ: ["Jalal Hassan", "Rebin Sulaka", "Hussein Ali", "Akam Hashem", "Merchas Doski", "Zaid Tahseen", "Manaf Younis", "Zidane Iqbal", "Amir Al-Ammari", "Ibrahim Bavesh", "Ali Jasim", "Youssef Amyn", "Aimar Sher", "Marko Farji", "Osama Rashid", "Ali Al-Hamadi", "Aymen Hussein", "Mohanad Ali"],
  SCO: ["Angus Gunn", "Jack Hendry", "Kieran Tierney", "Aaron Hickey", "Andrew Robertson", "Scott McKenna", "John Souttar", "Anthony Ralston", "Grant Hanley", "Scott McTominay", "Billy Gilmour", "Lewis Ferguson", "Ryan Christie", "Kenny McLean", "John McGinn", "Lyndon Dykes", "Che Adams", "Ben Gannon-Doak"],
  CZE: ["Matej Kovar", "Jindrich Stanek", "Ladislav Krejci", "Vladimir Coufal", "Jaroslav Zeleny", "Tomas Holes", "David Zima", "Michal Sadilek", "Lukas Provod", "Lukas Cerv", "Tomas Soucek", "Pavel Sulc", "Matej Vydra", "Vasil Kusej", "Tomas Chory", "Vaclav Cerny", "Adam Hlozek", "Patrik Schick"],
  BIH: ["Nikola Vasilj", "Amer Dedic", "Sead Kolasinac", "Tarik Muharemovic", "Nihad Mujakic", "Nikola Katic", "Amir Hadziahmetovic", "Benjamin Tahirovic", "Armin Gigovic", "Ivan Sunjic", "Ivan Basic", "Dzenis Burnic", "Esmir Bajraktarevic", "Amar Memic", "Ermedin Demirovic", "Edin Dzeko", "Samed Bazdar", "Haris Tabakovic"],
  HAI: ["Johny Placide", "Carlens Arcus", "Martin Expérience", "Jean-Kevin Duverne", "Ricardo Adé", "Duke Lacroix", "Garven Metusala", "Hannes Delcroix", "Leverton Pierre", "Danley Jean Jacques", "Jean-Ricner Bellegarde", "Christopher Attys", "Derrick Etienne Jr", "Josue Casimir", "Ruben Providence", "Duckens Nazon", "Louicius Deedson", "Frantzdy Pierrot"],
  CUW: ["Eloy Room", "Armando Obispo", "Sherel Floranus", "Jurien Gaari", "Joshua Brenet", "Roshon Van Eijma", "Shurandy Sambo", "Livano Comenencia", "Godfried Roemeratoe", "Juninho Bacuna", "Leandro Bacuna", "Tahith Chong", "Kenji Gorre", "Jearl Margaritha", "Jurgen Locadia", "Jeremy Antonisse", "Gervane Kastaneer", "Sontje Hansen"],
  CPV: ["Vozinha", "Logan Costa", "Pico", "Diney", "Steven Moreira", "Wagner Pina", "Joao Paulo", "Yannick Semedo", "Kevin Pina", "Patrick Andrade", "Jamiro Monteiro", "Deroy Duarte", "Garry Rodrigues", "Jovane Cabral", "Ryan Mendes", "Dailon Livramento", "Willy Semedo", "Bebe"],
  NZL: ["Max Crocombe Payne", "Alex Paulsen", "Michael Boxall", "Liberato Cacace", "Tim Payne", "Tyler Bindon", "Francis de Vries", "Finn Surman", "Joe Bell", "Sarpreet Singh", "Ryan Thomas", "Matthew Garbett", "Marko Stamenić", "Ben Old", "Chris Wood", "Elijah Just", "Callum McCowatt", "Kosta Barbarouses"],
  JOR: ["Yazeed Abulaila", "Ihsan Haddad", "Mohammad Abu Hashish", "Yazan Al-Arab", "Abdallah Nasib", "Saleem Obaid", "Mohammad Abualnadi", "Ibrahim Saadeh", "Nizar Al-Rashdan", "Noor Al-Rawabdeh", "Mohannad Abu Taha", "Amer Jamous", "Musa Al-Taamari", "Yazan Al-Naimat", "Mahmoud Al-Mardi", "Ali Olwan", "Mohammad Abu Zrayq", "Ibrahim Sabra"],
  COD: ["Lionel Mpasi", "Aaron Wan-Bissaka", "Axel Tuanzebe", "Arthur Masuaku", "Chancel Mbemba", "Joris Kayembe", "Charles Pickel", "Ngal'ayel Mukau", "Edo Kayembe", "Samuel Moutoussamy", "Noah Sadiki", "Théo Bongonda", "Meschak Elia", "Yoane Wissa", "Brian Cipenga", "Fiston Mayele", "Cédric Bakambu", "Nathanaël Mbuku"],
  RSA_A: ["Williams", "Goss", "Mudau", "Kekana", "Mvala", "Modiba", "Xulu", "Sibisi", "Mokoena", "Sithole", "Zwane", "Mosele", "Morena", "Tau", "Makgopa", "Mofokeng", "Appollis", "Rayners"],
  PAR: ["Roberto Fernandez", "Orlando Gill", "Gustavo Gomez", "Fabián Balbuena", "Juan José Cáceres", "Omar Alderete", "Junior Alonso", "Mathías Villasanti", "Diego Gomez", "Damián Bobadilla", "Andres Cubas", "Matias Galarza Fonda", "Julio Enciso", "Alejandro Romero Gamarra", "Miguel Almirón", "Ramon Sosa", "Angel Romero", "Antonio Sanabria"],
  SWE: ["Victor Johansson", "Isak Hien", "Gabriel Gudmundsson", "Emil Holm", "Victor Nilsson Lindelöf", "Gustaf Lagerbielke", "Lucas Bergvall", "Hugo Larsson", "Jesper Karlström", "Yasin Ayari", "Mattias Svanberg", "Daniel Svensson", "Ken Sema", "Roony Bardghji", "Dejan Kulusevski", "Anthony Elanga", "Alexander Isak", "Viktor Gyökeres"],
  TUN: ["Bechir Ben Said", "Aymen Dahmen", "Yan Valery", "Montassar Talbi", "Yassine Meriah", "Ali Abdi", "Dylan Bronn", "Ellyes Skhiri", "Aissa Laidouni", "Ferjani Sassi", "Mohamed Ali Ben Romdhane", "Hannibal Mejbri", "Elias Achouri", "Elias Saad", "Hazem Mastouri", "Ismael Gharbi", "Sayfallah Ltaief", "Naim Sliti"],
  NOR: ["Orjan Nyland", "Julian Ryerson", "Leo Ostigård", "Kristoffer Vassbakk Ajer", "Marcus Holmgren Pedersen", "David Møller Wolfe", "Torbjørn Heggem", "Morten Thorsby", "Martin Ødegaard", "Sander Berge", "Andreas Schjelderup", "Patrick Berg", "Erling Haaland", "Alexander Sørloth", "Aron Dønnum", "Jorgen Strand Larsen", "Antonio Nusa", "Oscar Bobb"],
  AUT: ["Alexander Schlager", "Patrick Pentz", "David Alaba", "Kevin Danso", "Philipp Lienhart", "Stefan Posch", "Phillipp Mwene", "Alexander Prass", "Xaver Schlager", "Marcel Sabitzer", "Konrad Laimer", "Florian Grillitsch", "Nicolas Seiwald", "Romano Schmid", "Patrick Wimmer", "Christoph Baumgartner", "Michael Gregoritsch", "Marko Arnautović"],
};

export const PLAYER_DATA_MAP: Record<string, PlayerData> = {};

const teamsRaw = [
  { id: "FWC", name: "🏆 FIFA World Cup", count: 20, startZero: true },
  { id: "CC", name: "🥤 Coca-Cola", count: 14 },
  { id: "MEX", name: "🇲🇽 México", group: "A" },  { id: "RSA", name: "🇿🇦 África do Sul", group: "A" },
  { id: "KOR", name: "🇰🇷 Coreia do Sul", group: "A" },  { id: "CZE", name: "🇨🇿 República Tcheca", group: "A" },
  { id: "CAN", name: "🇨🇦 Canadá", group: "B" },  { id: "BIH", name: "🇧🇦 Bósnia e Herzegovina", group: "B" },
  { id: "QAT", name: "🇶🇦 Catar", group: "B" },  { id: "SUI", name: "🇨🇭 Suíça", group: "B" },
  { id: "BRA", name: "🇧🇷 Brasil", group: "C" },  { id: "MAR", name: "🇲🇦 Marrocos", group: "C" },
  { id: "HAI", name: "🇭🇹 Haiti", group: "C" },  { id: "SCO", name: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escócia", group: "C" },
  { id: "USA", name: "🇺🇸 Estados Unidos", group: "D" },  { id: "PAR", name: "🇵🇾 Paraguai", group: "D" },
  { id: "AUS", name: "🇦🇺 Austrália", group: "D" },  { id: "TUR", name: "🇹🇷 Turquia", group: "D" },
  { id: "GER", name: "🇩🇪 Alemanha", group: "E" },  { id: "CUW", name: "🇨🇼 Curaçao", group: "E" },
  { id: "CIV", name: "🇨🇮 Costa do Marfim", group: "E" },  { id: "ECU", name: "🇪🇨 Equador", group: "E" },
  { id: "NED", name: "🇳🇱 Holanda", group: "F" },  { id: "JPN", name: "🇯🇵 Japão", group: "F" },
  { id: "SWE", name: "🇸🇪 Suécia", group: "F" },  { id: "TUN", name: "🇹🇳 Tunísia", group: "F" },
  { id: "BEL", name: "🇧🇪 Bélgica", group: "G" },  { id: "EGY", name: "🇪🇬 Egito", group: "G" },
  { id: "IRN", name: "🇮🇷 Irã", group: "G" },  { id: "NZL", name: "🇳🇿 Nova Zelândia", group: "G" },
  { id: "ESP", name: "🇪🇸 Espanha", group: "H" },  { id: "CPV", name: "🇨🇻 Cabo Verde", group: "H" },
  { id: "KSA", name: "🇸🇦 Arábia Saudita", group: "H" },  { id: "URU", name: "🇺🇾 Uruguai", group: "H" },
  { id: "FRA", name: "🇫🇷 França", group: "I" },  { id: "SEN", name: "🇸🇳 Senegal", group: "I" },
  { id: "IRQ", name: "🇮🇶 Iraque", group: "I" },  { id: "NOR", name: "🇳🇴 Noruega", group: "I" },
  { id: "ARG", name: "🇦🇷 Argentina", group: "J" },  { id: "ALG", name: "🇩🇿 Argélia", group: "J" },
  { id: "AUT", name: "🇦🇹 Áustria", group: "J" },  { id: "JOR", name: "🇯🇴 Jordânia", group: "J" },
  { id: "POR", name: "🇵🇹 Portugal", group: "K" },  { id: "COD", name: "🇨🇩 RD do Congo", group: "K" },
  { id: "UZB", name: "🇺🇿 Uzbequistão", group: "K" },  { id: "COL", name: "🇨🇴 Colômbia", group: "K" },
  { id: "ENG", name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra", group: "L" },  { id: "CRO", name: "🇭🇷 Croácia", group: "L" },
  { id: "GHA", name: "🇬🇭 Gana", group: "L" },  { id: "PAN", name: "🇵🇦 Panamá", group: "L" },
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
      PLAYER_DATA_MAP[code] = { name: `Brasão Time`, position: "BADGE", birth: "-", height: "-", weight: "-", club: team.id, isSpecial: true };
    } else if (i === 13) {
      PLAYER_DATA_MAP[code] = { name: `Foto Time`, position: "TEAM", birth: "-", height: "-", weight: "-", club: team.id, isSpecial: true };
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


PLAYER_DATA_MAP['FWC 00'] = { name: 'Panini Logo', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 01'] = { name: 'Emblema Oficial', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 02'] = { name: 'Emblema Oficial', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 03'] = { name: 'Mascotes', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 04'] = { name: 'Slogan', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 05'] = { name: 'Bola Oficial', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 06'] = { name: 'Canada\nPaíses Sedes', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 07'] = { name: 'Mexico\nPaíses Sedes', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 08'] = { name: 'USA\nPaíses Sedes', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 09'] = { name: 'Itália 1934\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 10'] = { name: 'Uruguai 1950\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 11'] = { name: 'Alemanha 1954\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 12'] = { name: 'Brasil 1962\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 13'] = { name: 'Alemanha 1974\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 14'] = { name: 'Argentina 1986\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 15'] = { name: 'Brasil 1994\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 16'] = { name: 'Brasil 2002\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 17'] = { name: 'Itália 2006\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 18'] = { name: 'Alemanha 2014\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['FWC 19'] = { name: 'Argentina 2022\nHistória', position: 'Metálica', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 01'] = { name: 'Lamine Yamal', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 02'] = { name: 'Joshua Kimmich', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 03'] = { name: 'Harry Kane', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 04'] = { name: 'Santiago Giménez', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 05'] = { name: 'Josko Gvardiol', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 06'] = { name: 'Federico Valverde', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 07'] = { name: 'Jefferson Lerma', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 08'] = { name: 'Enner Valencia', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 09'] = { name: 'Gabriel Magalhães', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 10'] = { name: 'Virgil Van Dijk', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 11'] = { name: 'Alphonso Davies', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 12'] = { name: 'Emiliano Martínez', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 13'] = { name: 'Raúl Jiménez', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };
PLAYER_DATA_MAP['CC 14'] = { name: 'Lautaro Martínez', position: 'Coca Cola', birth: '-', height: '-', weight: '-', club: 'FWC', isSpecial: true };

export const ISO_MAP: Record<string, string> = {
  MEX: "mx", RSA: "za", KOR: "kr", CZE: "cz", CAN: "ca", BIH: "ba", QAT: "qa", SUI: "ch",
  BRA: "br", MAR: "ma", HAI: "ht", SCO: "gb-sct", USA: "us", CRO: "hr", GHA: "gh", PAN: "pa",
  GER: "de", CUW: "cw", CIV: "ci", ECU: "ec", NED: "nl", JPN: "jp", SWE: "se", TUN: "tn",
  BEL: "be", CPV: "cv", KSA: "sa", URU: "uy", ESP: "es", NZL: "nz", AUS: "au", PAR: "py",
  FRA: "fr", SEN: "sn", NOR: "no", IRQ: "iq", ARG: "ar", ALG: "dz", AUT: "at", JOR: "jo",
  POR: "pt", JAM: "jm", UZB: "uz", COL: "co", ENG: "gb-eng", ITA: "it", COD: "cd", IRN: "ir",
  EGY: "eg", TUR: "tr",
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
  COD: "dr-congo.png", IRN: "iran.png", FWC: "FIFA.png", EGY: "egypt.png", TUR: "turkiye.png",
};

export const STICKERS_DATA: TeamStickers[] = teamsRaw.map((team) => {
  const count = (team as any).count || 20;
  const startZero = (team as any).startZero || false;
  
  const stickers = Array.from({ length: count }, (_, i) => {
    const num = startZero ? i : i + 1;
    const formattedNum = num < 10 ? `0${num}` : num;
    if (team.id === "FWC" && num === 0) return "FWC 00";
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

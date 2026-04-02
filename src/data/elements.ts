export interface Element {
  z: number; // atomic number
  sym: string;
  name: string;
  mass: number;
  cat: Cat;
  en: number | null; // electronegativity
  econf: string;
  ox: number[];
  mp: number | null;
  bp: number | null;
  density: number | null;
  phase: 'solid' | 'liquid' | 'gas';
  group: number;
  period: number;
  block: string;
  desc: string;
}

export type Cat =
  | 'alkali' | 'alkaline' | 'transition' | 'post-transition'
  | 'metalloid' | 'nonmetal' | 'halogen' | 'noble' | 'lanthanide' | 'actinide';

export const catColor: Record<Cat, string> = {
  alkali: 'bg-elem-alkali',
  alkaline: 'bg-elem-alkaline',
  transition: 'bg-elem-transition',
  'post-transition': 'bg-elem-post-transition',
  metalloid: 'bg-elem-metalloid',
  nonmetal: 'bg-elem-nonmetal',
  halogen: 'bg-elem-halogen',
  noble: 'bg-elem-noble',
  lanthanide: 'bg-elem-lanthanide',
  actinide: 'bg-elem-actinide',
};

export const catLabel: Record<Cat, string> = {
  alkali: 'Alkali Metal',
  alkaline: 'Alkaline Earth',
  transition: 'Transition Metal',
  'post-transition': 'Post-Transition',
  metalloid: 'Metalloid',
  nonmetal: 'Nonmetal',
  halogen: 'Halogen',
  noble: 'Noble Gas',
  lanthanide: 'Lanthanide',
  actinide: 'Actinide',
};

// Full 118 elements with standard periodic table positions
// [row, col] where row 0-6 for main, 8-9 for lanthanides/actinides
type EData = [number, string, string, number, Cat, number | null, string, number[], number | null, number | null, number | null, 'solid'|'liquid'|'gas', number, number, string, string];

const raw: EData[] = [
  [1,'H','Hydrogen',1.008,'nonmetal',2.20,'1s¹',[-1,1],-259,-253,0.00009,'gas',1,1,'s','Lightest element. Highly flammable.'],
  [2,'He','Helium',4.003,'noble',null,'1s²',[0],-272,-269,0.00018,'gas',18,1,'s','Inert noble gas. Second most abundant in universe.'],
  [3,'Li','Lithium',6.941,'alkali',0.98,'[He]2s¹',[1],181,1342,0.534,'solid',1,2,'s','Lightest metal. Reacts with water.'],
  [4,'Be','Beryllium',9.012,'alkaline',1.57,'[He]2s²',[2],1287,2470,1.85,'solid',2,2,'s','Light, strong, toxic metal.'],
  [5,'B','Boron',10.81,'metalloid',2.04,'[He]2s²2p¹',[3],2076,3927,2.34,'solid',13,2,'p','Hard metalloid. Essential for plants.'],
  [6,'C','Carbon',12.011,'nonmetal',2.55,'[He]2s²2p²',[-4,4],3550,4027,2.27,'solid',14,2,'p','Basis of organic chemistry.'],
  [7,'N','Nitrogen',14.007,'nonmetal',3.04,'[He]2s²2p³',[-3,3,5],-210,-196,0.0013,'gas',15,2,'p','78% of atmosphere. Essential for life.'],
  [8,'O','Oxygen',15.999,'nonmetal',3.44,'[He]2s²2p⁴',[-2],-219,-183,0.0014,'gas',16,2,'p','Essential for respiration.'],
  [9,'F','Fluorine',18.998,'halogen',3.98,'[He]2s²2p⁵',[-1],-220,-188,0.0017,'gas',17,2,'p','Most electronegative element.'],
  [10,'Ne','Neon',20.180,'noble',null,'[He]2s²2p⁶',[0],-249,-246,0.0009,'gas',18,2,'p','Used in neon signs.'],
  [11,'Na','Sodium',22.990,'alkali',0.93,'[Ne]3s¹',[1],98,883,0.971,'solid',1,3,'s','Reacts violently with water.'],
  [12,'Mg','Magnesium',24.305,'alkaline',1.31,'[Ne]3s²',[2],650,1091,1.738,'solid',2,3,'s','Burns with brilliant white flame.'],
  [13,'Al','Aluminum',26.982,'post-transition',1.61,'[Ne]3s²3p¹',[3],660,2519,2.70,'solid',13,3,'p','Most abundant metal in crust.'],
  [14,'Si','Silicon',28.086,'metalloid',1.90,'[Ne]3s²3p²',[-4,4],1414,3265,2.33,'solid',14,3,'p','Semiconductor. Basis of electronics.'],
  [15,'P','Phosphorus',30.974,'nonmetal',2.19,'[Ne]3s²3p³',[-3,3,5],44,281,1.82,'solid',15,3,'p','Essential for life. White P is pyrophoric.'],
  [16,'S','Sulfur',32.06,'nonmetal',2.58,'[Ne]3s²3p⁴',[-2,4,6],115,445,2.07,'solid',16,3,'p','Yellow nonmetal. Essential for proteins.'],
  [17,'Cl','Chlorine',35.45,'halogen',3.16,'[Ne]3s²3p⁵',[-1,1,5,7],-102,-34,0.003,'gas',17,3,'p','Toxic yellow-green gas.'],
  [18,'Ar','Argon',39.948,'noble',null,'[Ne]3s²3p⁶',[0],-189,-186,0.0018,'gas',18,3,'p','Third most abundant gas.'],
  [19,'K','Potassium',39.098,'alkali',0.82,'[Ar]4s¹',[1],63,759,0.862,'solid',1,4,'s','Essential nutrient. Reacts violently with water.'],
  [20,'Ca','Calcium',40.078,'alkaline',1.00,'[Ar]4s²',[2],842,1484,1.54,'solid',2,4,'s','Essential for bones and teeth.'],
  [21,'Sc','Scandium',44.956,'transition',1.36,'[Ar]3d¹4s²',[3],1541,2836,2.99,'solid',3,4,'d','Soft silvery transition metal.'],
  [22,'Ti','Titanium',47.867,'transition',1.54,'[Ar]3d²4s²',[2,3,4],1668,3287,4.54,'solid',4,4,'d','Strong, lightweight, corrosion-resistant.'],
  [23,'V','Vanadium',50.942,'transition',1.63,'[Ar]3d³4s²',[2,3,4,5],1910,3407,6.11,'solid',5,4,'d','Used in steel alloys.'],
  [24,'Cr','Chromium',51.996,'transition',1.66,'[Ar]3d⁵4s¹',[2,3,6],1907,2671,7.15,'solid',6,4,'d','Used in stainless steel.'],
  [25,'Mn','Manganese',54.938,'transition',1.55,'[Ar]3d⁵4s²',[2,4,7],1246,2061,7.44,'solid',7,4,'d','Essential trace element.'],
  [26,'Fe','Iron',55.845,'transition',1.83,'[Ar]3d⁶4s²',[2,3],1538,2862,7.87,'solid',8,4,'d','Most common element on Earth.'],
  [27,'Co','Cobalt',58.933,'transition',1.88,'[Ar]3d⁷4s²',[2,3],1495,2927,8.86,'solid',9,4,'d','Used in batteries and alloys.'],
  [28,'Ni','Nickel',58.693,'transition',1.91,'[Ar]3d⁸4s²',[2,3],1455,2913,8.91,'solid',10,4,'d','Corrosion-resistant metal.'],
  [29,'Cu','Copper',63.546,'transition',1.90,'[Ar]3d¹⁰4s¹',[1,2],1085,2562,8.96,'solid',11,4,'d','Excellent conductor.'],
  [30,'Zn','Zinc',65.38,'transition',1.65,'[Ar]3d¹⁰4s²',[2],420,907,7.13,'solid',12,4,'d','Essential trace element.'],
  [31,'Ga','Gallium',69.723,'post-transition',1.81,'[Ar]3d¹⁰4s²4p¹',[3],30,2204,5.91,'solid',13,4,'p','Melts near room temperature.'],
  [32,'Ge','Germanium',72.63,'metalloid',2.01,'[Ar]3d¹⁰4s²4p²',[2,4],938,2833,5.32,'solid',14,4,'p','Semiconductor metalloid.'],
  [33,'As','Arsenic',74.922,'metalloid',2.18,'[Ar]3d¹⁰4s²4p³',[-3,3,5],817,614,5.78,'solid',15,4,'p','Toxic metalloid.'],
  [34,'Se','Selenium',78.971,'nonmetal',2.55,'[Ar]3d¹⁰4s²4p⁴',[-2,4,6],221,685,4.81,'solid',16,4,'p','Essential trace element.'],
  [35,'Br','Bromine',79.904,'halogen',2.96,'[Ar]3d¹⁰4s²4p⁵',[-1,1,5],-7,59,3.12,'liquid',17,4,'p','Reddish-brown liquid.'],
  [36,'Kr','Krypton',83.798,'noble',3.00,'[Ar]3d¹⁰4s²4p⁶',[0,2],-157,-153,0.0037,'gas',18,4,'p','Used in lighting.'],
  [37,'Rb','Rubidium',85.468,'alkali',0.82,'[Kr]5s¹',[1],39,688,1.53,'solid',1,5,'s','Ignites in air.'],
  [38,'Sr','Strontium',87.62,'alkaline',0.95,'[Kr]5s²',[2],777,1382,2.64,'solid',2,5,'s','Red flame in fireworks.'],
  [39,'Y','Yttrium',88.906,'transition',1.22,'[Kr]4d¹5s²',[3],1526,3345,4.47,'solid',3,5,'d','Used in LEDs.'],
  [40,'Zr','Zirconium',91.224,'transition',1.33,'[Kr]4d²5s²',[4],1855,4409,6.51,'solid',4,5,'d','Used in nuclear reactors.'],
  [41,'Nb','Niobium',92.906,'transition',1.6,'[Kr]4d⁴5s¹',[3,5],2477,4744,8.57,'solid',5,5,'d','Superconducting metal.'],
  [42,'Mo','Molybdenum',95.95,'transition',2.16,'[Kr]4d⁵5s¹',[4,6],2623,4639,10.22,'solid',6,5,'d','Essential trace element.'],
  [43,'Tc','Technetium',98,'transition',1.9,'[Kr]4d⁵5s²',[4,7],2157,4265,11.5,'solid',7,5,'d','First artificially produced element.'],
  [44,'Ru','Ruthenium',101.07,'transition',2.2,'[Kr]4d⁷5s¹',[3,4],2334,4150,12.37,'solid',8,5,'d','Catalyst in chemistry.'],
  [45,'Rh','Rhodium',102.91,'transition',2.28,'[Kr]4d⁸5s¹',[3],1964,3695,12.41,'solid',9,5,'d','Used in catalytic converters.'],
  [46,'Pd','Palladium',106.42,'transition',2.20,'[Kr]4d¹⁰',[2,4],1555,2963,12.02,'solid',10,5,'d','Used in catalysis.'],
  [47,'Ag','Silver',107.87,'transition',1.93,'[Kr]4d¹⁰5s¹',[1],962,2162,10.5,'solid',11,5,'d','Highest electrical conductivity.'],
  [48,'Cd','Cadmium',112.41,'transition',1.69,'[Kr]4d¹⁰5s²',[2],321,767,8.69,'solid',12,5,'d','Toxic heavy metal.'],
  [49,'In','Indium',114.82,'post-transition',1.78,'[Kr]4d¹⁰5s²5p¹',[3],157,2072,7.31,'solid',13,5,'p','Used in touchscreens.'],
  [50,'Sn','Tin',118.71,'post-transition',1.96,'[Kr]4d¹⁰5s²5p²',[2,4],232,2602,7.29,'solid',14,5,'p','Known since antiquity.'],
  [51,'Sb','Antimony',121.76,'metalloid',2.05,'[Kr]4d¹⁰5s²5p³',[-3,3,5],631,1587,6.68,'solid',15,5,'p','Used in flame retardants.'],
  [52,'Te','Tellurium',127.60,'metalloid',2.1,'[Kr]4d¹⁰5s²5p⁴',[-2,4,6],450,988,6.24,'solid',16,5,'p','Rare semiconductor.'],
  [53,'I','Iodine',126.90,'halogen',2.66,'[Kr]4d¹⁰5s²5p⁵',[-1,1,5,7],114,184,4.93,'solid',17,5,'p','Purple-black solid.'],
  [54,'Xe','Xenon',131.29,'noble',2.60,'[Kr]4d¹⁰5s²5p⁶',[0,2,4,6],-112,-108,0.0059,'gas',18,5,'p','Can form compounds.'],
  [55,'Cs','Cesium',132.91,'alkali',0.79,'[Xe]6s¹',[1],28,671,1.87,'solid',1,6,'s','Most reactive metal.'],
  [56,'Ba','Barium',137.33,'alkaline',0.89,'[Xe]6s²',[2],727,1897,3.59,'solid',2,6,'s','Green flame in fireworks.'],
  [72,'Hf','Hafnium',178.49,'transition',1.3,'[Xe]4f¹⁴5d²6s²',[4],2233,4603,13.31,'solid',4,6,'d','Used in nuclear reactors.'],
  [73,'Ta','Tantalum',180.95,'transition',1.5,'[Xe]4f¹⁴5d³6s²',[5],3017,5458,16.65,'solid',5,6,'d','Very hard, corrosion-resistant.'],
  [74,'W','Tungsten',183.84,'transition',2.36,'[Xe]4f¹⁴5d⁴6s²',[4,6],3422,5555,19.25,'solid',6,6,'d','Highest melting point of all metals.'],
  [75,'Re','Rhenium',186.21,'transition',1.9,'[Xe]4f¹⁴5d⁵6s²',[4,7],3186,5596,21.02,'solid',7,6,'d','Very dense, high melting point.'],
  [76,'Os','Osmium',190.23,'transition',2.2,'[Xe]4f¹⁴5d⁶6s²',[4,8],3033,5012,22.59,'solid',8,6,'d','Densest naturally occurring element.'],
  [77,'Ir','Iridium',192.22,'transition',2.20,'[Xe]4f¹⁴5d⁷6s²',[3,4],2466,4428,22.56,'solid',9,6,'d','Most corrosion-resistant metal.'],
  [78,'Pt','Platinum',195.08,'transition',2.28,'[Xe]4f¹⁴5d⁹6s¹',[2,4],1768,3825,21.46,'solid',10,6,'d','Noble metal. Important catalyst.'],
  [79,'Au','Gold',196.97,'transition',2.54,'[Xe]4f¹⁴5d¹⁰6s¹',[1,3],1064,2856,19.28,'solid',11,6,'d','Noble metal. Highly valued.'],
  [80,'Hg','Mercury',200.59,'transition',2.00,'[Xe]4f¹⁴5d¹⁰6s²',[1,2],-39,357,13.53,'liquid',12,6,'d','Only metal liquid at room temp.'],
  [81,'Tl','Thallium',204.38,'post-transition',1.62,'[Xe]4f¹⁴5d¹⁰6s²6p¹',[1,3],304,1473,11.85,'solid',13,6,'p','Extremely toxic.'],
  [82,'Pb','Lead',207.2,'post-transition',1.87,'[Xe]4f¹⁴5d¹⁰6s²6p²',[2,4],327,1749,11.34,'solid',14,6,'p','Dense, toxic, known since antiquity.'],
  [83,'Bi','Bismuth',208.98,'post-transition',2.02,'[Xe]4f¹⁴5d¹⁰6s²6p³',[3,5],271,1564,9.78,'solid',15,6,'p','Iridescent crystals. Low toxicity.'],
  [84,'Po','Polonium',209,'metalloid',2.0,'[Xe]4f¹⁴5d¹⁰6s²6p⁴',[2,4],254,962,9.32,'solid',16,6,'p','Extremely radioactive.'],
  [85,'At','Astatine',210,'halogen',2.2,'[Xe]4f¹⁴5d¹⁰6s²6p⁵',[-1,1],302,337,null,'solid',17,6,'p','Rarest naturally occurring element.'],
  [86,'Rn','Radon',222,'noble',null,'[Xe]4f¹⁴5d¹⁰6s²6p⁶',[0,2],-71,-62,0.0097,'gas',18,6,'p','Radioactive noble gas.'],
  [87,'Fr','Francium',223,'alkali',0.7,'[Rn]7s¹',[1],27,677,null,'solid',1,7,'s','Most unstable natural element.'],
  [88,'Ra','Radium',226,'alkaline',0.9,'[Rn]7s²',[2],700,1737,5.5,'solid',2,7,'s','Radioactive. Discovered by Curie.'],
  [104,'Rf','Rutherfordium',267,'transition',null,'[Rn]5f¹⁴6d²7s²',[4],null,null,null,'solid',4,7,'d','Synthetic element.'],
  [105,'Db','Dubnium',268,'transition',null,'[Rn]5f¹⁴6d³7s²',[5],null,null,null,'solid',5,7,'d','Synthetic element.'],
  [106,'Sg','Seaborgium',269,'transition',null,'[Rn]5f¹⁴6d⁴7s²',[6],null,null,null,'solid',6,7,'d','Synthetic element.'],
  [107,'Bh','Bohrium',270,'transition',null,'[Rn]5f¹⁴6d⁵7s²',[7],null,null,null,'solid',7,7,'d','Synthetic element.'],
  [108,'Hs','Hassium',277,'transition',null,'[Rn]5f¹⁴6d⁶7s²',[8],null,null,null,'solid',8,7,'d','Synthetic element.'],
  [109,'Mt','Meitnerium',278,'transition',null,'[Rn]5f¹⁴6d⁷7s²',[],null,null,null,'solid',9,7,'d','Synthetic element.'],
  [110,'Ds','Darmstadtium',281,'transition',null,'[Rn]5f¹⁴6d⁸7s²',[],null,null,null,'solid',10,7,'d','Synthetic element.'],
  [111,'Rg','Roentgenium',282,'transition',null,'[Rn]5f¹⁴6d⁹7s²',[],null,null,null,'solid',11,7,'d','Synthetic element.'],
  [112,'Cn','Copernicium',285,'transition',null,'[Rn]5f¹⁴6d¹⁰7s²',[2],null,null,null,'liquid',12,7,'d','Synthetic element.'],
  [113,'Nh','Nihonium',286,'post-transition',null,'[Rn]5f¹⁴6d¹⁰7s²7p¹',[],null,null,null,'solid',13,7,'p','Synthetic element.'],
  [114,'Fl','Flerovium',289,'post-transition',null,'[Rn]5f¹⁴6d¹⁰7s²7p²',[],null,null,null,'solid',14,7,'p','Synthetic element.'],
  [115,'Mc','Moscovium',290,'post-transition',null,'[Rn]5f¹⁴6d¹⁰7s²7p³',[],null,null,null,'solid',15,7,'p','Synthetic element.'],
  [116,'Lv','Livermorium',293,'post-transition',null,'[Rn]5f¹⁴6d¹⁰7s²7p⁴',[],null,null,null,'solid',16,7,'p','Synthetic element.'],
  [117,'Ts','Tennessine',294,'halogen',null,'[Rn]5f¹⁴6d¹⁰7s²7p⁵',[],null,null,null,'solid',17,7,'p','Synthetic element.'],
  [118,'Og','Oganesson',294,'noble',null,'[Rn]5f¹⁴6d¹⁰7s²7p⁶',[],null,null,null,'solid',18,7,'p','Synthetic element. Heaviest known.'],
  // Lanthanides
  [57,'La','Lanthanum',138.91,'lanthanide',1.1,'[Xe]5d¹6s²',[3],920,3464,6.15,'solid',3,6,'f','Gives name to lanthanide series.'],
  [58,'Ce','Cerium',140.12,'lanthanide',1.12,'[Xe]4f¹5d¹6s²',[3,4],799,3443,6.77,'solid',4,6,'f','Most abundant rare earth.'],
  [59,'Pr','Praseodymium',140.91,'lanthanide',1.13,'[Xe]4f³6s²',[3],931,3520,6.77,'solid',5,6,'f','Used in magnets.'],
  [60,'Nd','Neodymium',144.24,'lanthanide',1.14,'[Xe]4f⁴6s²',[3],1021,3074,7.01,'solid',6,6,'f','Strong permanent magnets.'],
  [61,'Pm','Promethium',145,'lanthanide',null,'[Xe]4f⁵6s²',[3],1042,3000,7.26,'solid',7,6,'f','Radioactive rare earth.'],
  [62,'Sm','Samarium',150.36,'lanthanide',1.17,'[Xe]4f⁶6s²',[2,3],1074,1794,7.52,'solid',8,6,'f','Used in magnets.'],
  [63,'Eu','Europium',151.96,'lanthanide',null,'[Xe]4f⁷6s²',[2,3],822,1527,5.24,'solid',9,6,'f','Used in TV phosphors.'],
  [64,'Gd','Gadolinium',157.25,'lanthanide',1.20,'[Xe]4f⁷5d¹6s²',[3],1313,3273,7.90,'solid',10,6,'f','Used in MRI contrast.'],
  [65,'Tb','Terbium',158.93,'lanthanide',null,'[Xe]4f⁹6s²',[3],1356,3230,8.23,'solid',11,6,'f','Used in green phosphors.'],
  [66,'Dy','Dysprosium',162.50,'lanthanide',1.22,'[Xe]4f¹⁰6s²',[3],1412,2567,8.55,'solid',12,6,'f','Used in lasers and magnets.'],
  [67,'Ho','Holmium',164.93,'lanthanide',1.23,'[Xe]4f¹¹6s²',[3],1474,2700,8.80,'solid',13,6,'f','Highest magnetic moment.'],
  [68,'Er','Erbium',167.26,'lanthanide',1.24,'[Xe]4f¹²6s²',[3],1529,2868,9.07,'solid',14,6,'f','Used in fiber optics.'],
  [69,'Tm','Thulium',168.93,'lanthanide',1.25,'[Xe]4f¹³6s²',[3],1545,1950,9.32,'solid',15,6,'f','Rarest lanthanide.'],
  [70,'Yb','Ytterbium',173.05,'lanthanide',null,'[Xe]4f¹⁴6s²',[2,3],819,1196,6.90,'solid',16,6,'f','Used in atomic clocks.'],
  [71,'Lu','Lutetium',174.97,'lanthanide',1.27,'[Xe]4f¹⁴5d¹6s²',[3],1663,3402,9.84,'solid',17,6,'f','Hardest lanthanide.'],
  // Actinides
  [89,'Ac','Actinium',227,'actinide',1.1,'[Rn]6d¹7s²',[3],1050,3200,10.07,'solid',3,7,'f','Gives name to actinide series.'],
  [90,'Th','Thorium',232.04,'actinide',1.3,'[Rn]6d²7s²',[4],1750,4788,11.72,'solid',4,7,'f','Potential nuclear fuel.'],
  [91,'Pa','Protactinium',231.04,'actinide',1.5,'[Rn]5f²6d¹7s²',[5],1572,4000,15.37,'solid',5,7,'f','Rare radioactive actinide.'],
  [92,'U','Uranium',238.03,'actinide',1.38,'[Rn]5f³6d¹7s²',[3,4,5,6],1132,4131,19.1,'solid',6,7,'f','Used as nuclear fuel.'],
  [93,'Np','Neptunium',237,'actinide',1.36,'[Rn]5f⁴6d¹7s²',[3,4,5,6],644,3902,20.45,'solid',7,7,'f','First transuranic element.'],
  [94,'Pu','Plutonium',244,'actinide',1.28,'[Rn]5f⁶7s²',[3,4,5,6],640,3228,19.84,'solid',8,7,'f','Used in nuclear weapons.'],
  [95,'Am','Americium',243,'actinide',1.3,'[Rn]5f⁷7s²',[3],1176,2011,13.69,'solid',9,7,'f','Used in smoke detectors.'],
  [96,'Cm','Curium',247,'actinide',1.3,'[Rn]5f⁷6d¹7s²',[3],1345,3110,13.51,'solid',10,7,'f','Named after Marie Curie.'],
  [97,'Bk','Berkelium',247,'actinide',1.3,'[Rn]5f⁹7s²',[3,4],1050,null,14.79,'solid',11,7,'f','Synthetic actinide.'],
  [98,'Cf','Californium',251,'actinide',1.3,'[Rn]5f¹⁰7s²',[3],900,null,15.1,'solid',12,7,'f','Used in neutron sources.'],
  [99,'Es','Einsteinium',252,'actinide',1.3,'[Rn]5f¹¹7s²',[3],860,null,null,'solid',13,7,'f','Named after Einstein.'],
  [100,'Fm','Fermium',257,'actinide',1.3,'[Rn]5f¹²7s²',[3],1527,null,null,'solid',14,7,'f','Synthetic actinide.'],
  [101,'Md','Mendelevium',258,'actinide',1.3,'[Rn]5f¹³7s²',[2,3],827,null,null,'solid',15,7,'f','Named after Mendeleev.'],
  [102,'No','Nobelium',259,'actinide',1.3,'[Rn]5f¹⁴7s²',[2,3],827,null,null,'solid',16,7,'f','Named after Alfred Nobel.'],
  [103,'Lr','Lawrencium',266,'actinide',null,'[Rn]5f¹⁴7s²7p¹',[3],1627,null,null,'solid',17,7,'f','Last actinide.'],
];

export const elements: Element[] = raw.map(r => ({
  z: r[0], sym: r[1], name: r[2], mass: r[3], cat: r[4], en: r[5],
  econf: r[6], ox: r[7], mp: r[8], bp: r[9], density: r[10],
  phase: r[11], group: r[12], period: r[13], block: r[14], desc: r[15],
}));

export const getEl = (sym: string) => elements.find(e => e.sym === sym);

// Standard periodic table grid: [row][col] = atomic number
// row 0-6 = periods 1-7, row 7 = gap, row 8 = lanthanides, row 9 = actinides
export const ptGrid: (number | null)[][] = [
  [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2],
  [3,4,null,null,null,null,null,null,null,null,null,null,5,6,7,8,9,10],
  [11,12,null,null,null,null,null,null,null,null,null,null,13,14,15,16,17,18],
  [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
  [37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],
  [55,56,null,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86],
  [87,88,null,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], // gap
  [null,null,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,null], // lanthanides
  [null,null,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,null], // actinides
];

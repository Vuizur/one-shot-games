export const objects = {
  jablko: ['Pomačkané jablko', 'Zbylo z dneška. Pořád se dá rozdělit.'],
  tuzka: ['Krátká tužka', 'Na velká rozhodnutí bohatě stačí.'],
  caj: ['Čaj v papírovém kelímku', 'Hřeje i potom, co už by neměl.'],
  nota: ['Nedokončená melodie', 'Čtyři takty. Další může přijít později.'],
  klic: ['Mosazný klíč', 'Od dveří, které se otevírají jen zevnitř.'],
  semeno: ['Semínko javoru', 'Něco, co potřebuje budoucnost.'],
  pravda: ['Přiznaná vzpomínka', 'Dopis není obvinění. Je to omluva, kterou jsi ještě nenapsal.'],
};
export const endings = {
  domu: {
    number: '01', label: 'NÁVRAT', title: 'Nástupiště číslo jedna.',
    text: [
      'Vystoupíš na svém nádraží. Automat pořád nabízí kávu, kterou nikdo nepovažuje za dobrý nápad. Na displeji svítí 00:38. Tentokrát to není jízdní řád. Je to obyčejný čas, který se konečně někam posunul.',
      'Na mobilu najdeš Eliščinu zprávu. „Nemusíš mít připravenou řeč. Stačí zvednout telefon.“ Chvíli na ni hledíš. Potom zavoláš.',
      '„Ahoj,“ řekneš. Všechno ostatní se do toho slova nevejde. Naštěstí nemusí.',
      'Za zády uslyšíš vzdálené zahoukání. Vlak odjíždí. Nevyřešil jsi všechny cizí příběhy, ale svůj jsi přestal odkládat. I to je místo, kde se dá začít.',
    ],
    last: 'Ráno není odměna za správné rozhodnutí. Prostě přichází. Tentokrát u toho budeš.',
  },
  vcera: {
    number: '02', label: 'ZPÁTEČNÍ JÍZDENKA', title: 'Den bez jedné věty.',
    text: [
      'Vlak tě vysadí před včerejší kavárnou. Znáš její vůni, skvrnu na ubrusu i větu, která přijde za okamžik. Tentokrát ji neřekneš.',
      'Eliška se usměje. Domluvíte se, kdy se uvidíte. Žádné prásknutí dveřmi, žádný dopis v kapse. Je to přesně to, co jsi chtěl.',
      'A přece: když cestou zahlédneš housle ve výloze, na okamžik tě píchne u srdce. Nevíš proč. Jméno Ada ti nic neříká. Mosazný klíč v dlani se rozpadne na rez. I ta se ti vzápětí vykouří z paměti.',
      'Upravený den je klidný a čistý. Nikde po něm nezůstala jizva. Některé jizvy ale ukazují, kudy jsme se dostali k druhým lidem.',
    ],
    last: 'V kapse máš novou jízdenku. Na rubu není napsáno vůbec nic.',
  },
  sluzba: {
    number: '03', label: 'STŘÍDÁNÍ SMĚN', title: 'Příští stanice: někdo další.',
    text: [
      'Vezmeš od Kláry kleštičky. Jsou lehčí, než vypadají. „Na tom člověk vždycky naletí,“ řekne. Poprvé se nejistě usměje a vypadá mnohem mladší.',
      'U posledních dveří se otočí. „Kdybych se ptala, kam jedu, řekni mi: domů.“ Přikývneš. Poprvé od chvíle, kdy jsi ji potkal, si sedne jako obyčejná cestující.',
      'Nejsi trestaný a nejsi zachránce. Jen někdo, kdo si na čas vybral tuhle práci. Na dveře služebního kupé přilepíš tužkou psaný vzkaz: „Přestávky jsou povoleny. I vám.“ Tužku najdeš za uchem, přestože tam před chvílí nebyla.',
      'Na příštím nástupišti stojí žena s úplně prázdným kufrem. „To je v pořádku,“ řekneš, když ho zvedá. „Tady člověk občas něco najde.“',
    ],
    last: 'Světla ve vagonech se rozsvěcují jedno po druhém. Nemusíš dnes obsloužit celý svět.',
  },
  zitra: {
    number: '04', label: 'ZMĚNA JÍZDNÍHO ŘÁDU', title: 'První spoj do Zítřka.',
    text: [
      'Ada zahraje první čtyři takty. Oldřich otočí klíčem. Paní Vrbová položí semínko na strojvůdcův pult. Ty do prázdné kolonky napíšeš to jediné, co můžeš slíbit: „Nevím, co bude. Pojedu.“',
      'Vlak sebou škubne. Za okny se objeví město, jaké nikdo z vás nezná. Není nádherné. U podchodu stojí kontejner a někdo právě nakládá rohlíky. Klára se rozesměje tak hlasitě, až se lekne sama sebe.',
      'Ada hledá na telefonu nový termín konkurzu. Oldřich konečně vytáčí synovo číslo. Paní Vrbová studuje plácek mezi dvěma paneláky a přemýšlí, jestli by tam šel zasadit javor. Nikdo z nich nemá jistotu, že to vyjde.',
      'Elišce napíšeš: „Mrzí mě to. Můžeme si promluvit?“ Pak se přidáš k ostatním. Před nádražím se hádají dvě holubice o hranolek. Je to nejpřesvědčivější budoucnost, jakou jsi kdy viděl.',
    ],
    last: 'Nápis VČERA na tabuli zhasne. Pod ním zůstane obyčejné: ODJEZD VČAS.',
  },
};
export const scenes = {
  nastupiste: {
    label: '00:37 · NÁDRAŽÍ BEZ JMÉNA', title: 'Tenhle spoj v aplikaci není.',
    text: [
      'Poslední normální vlak ujel před dvaceti minutami. Nádražní rozhlas si odkašle, přestože už dávno nemá hlasatele. „Na druhou kolej přijede osobní vlak do Včera. Cestující upozorňujeme, že tam už jednou byli.“',
      'Položíš mobil displejem dolů. Eliška volala třikrát. Na další hovor nemáš připravenou větu. V kapse nahmatáš zalepenou obálku, kterou si nepamatuješ. Je na ní tvoje jméno a pod ním: OTEVŘÍT AŽ ZA TUNELEM.',
      'Z mlhy vyjede zelený vůz. Žádné skřípění brzd. Jen zvuk lžičky, kterou někdo položil na podšálek. Dveře se otevřou přesně před tebou.',
      'Na lavičce leží pomačkané jablko a krátká tužka. Obojí by mohlo být tvoje. Obojí je trochu zanedbané.',
    ],
    quote: '„Cílovou stanici určujte opatrně. Přání není totéž co adresa.“',
    choices: [
      { id: 'jablko', label: 'Vzít jablko a nastoupit.', next: 'pruvodci', add: ['jablko'], result: 'Jablko je na jedné straně otlačené. Otočíš ho hezčí stranou nahoru. Tenhle zvyk máš i u jiných věcí.' },
      { id: 'tuzka', label: 'Vzít tužku. Něco ti říká, že bude co přepsat.', next: 'pruvodci', add: ['tuzka'], result: 'Tužka nemá gumu. Připadá ti to jako technická závada. Později tomu začneš říkat vlastnost.' },
      { id: 'nic', label: 'Nechat obojí na lavičce. Třeba to ještě někdo potřebuje.', next: 'pruvodci', result: 'Dveře chvíli počkají. Není to zvyk, na který by tě česká železnice připravila.' },
    ],
  },
  pruvodci: {
    label: 'VŮZ 1 · KONTROLA JÍZDENEK', title: 'Průvodčí, která už ví.',
    text: [
      'Žena v tmavomodré uniformě ti podá prázdnou jízdenku. Na štítku má jméno KLÁRA. Pod ním drobným písmem: ZÁSTUP ZA DOBROU PŘÍLEŽITOST.',
      '„Tam, kam jedeme, se platí vzpomínkou,“ řekne. „Za jednu malou chybu můžete dostat celý den zpátky.“',
      '„A co s tou vzpomínkou uděláte?“',
      'Klára sklopí oči k brašně. „Já osobně už ji nějak využiju.“ Za oknem projede totéž návěstidlo podruhé. Předstíráte oba, že je to běžné.',
    ],
    choices: [
      { id: 'jmeno', label: 'Představit se a zeptat se, jak dlouho tu Klára pracuje.', next: 'chodba', flag: 'klara', result: '„Dost dlouho na to, abych přestala počítat neděle.“ Když vyslovíš její jméno, lehce sebou trhne. Jako by na něj někdo dlouho nezavolal.' },
      { id: 'cil', label: 'Zeptat se, jestli se dá vystoupit i někde jinde než v minulosti.', next: 'chodba', flag: 'otazka', result: '„Dá,“ řekne Klára. „Ale lidi se většinou bojí míst, která nemají na starých fotografiích.“' },
      { id: 'cena', label: 'Říct, že zatím nic prodávat nechceš.', next: 'chodba', result: '„Dobře. Aspoň někdo čte podmínky.“ Jízdenku ti nechá. Vzadu má drobný nápis: PŘESTUP JE MOŽNÝ.' },
    ],
  },
  bufet: {
    label: 'JÍDELNÍ VŮZ · OTEVŘENO OD NEPAMĚTI', title: 'Něco teplého, něco na psaní.',
    text: [
      'Bufet je prázdný. Vedle konvice stojí cedulka: „Čaj je zdarma. Vzít si ho můžete i bez předchozího utrpení.“ Na důkaz, že jde o neobvyklý podnik, nikde nevidíš cenu za kelímek.',
      'Na stolku leží tužky a formulář pro stížnosti na osud. Někdo do kolonky DŮVOD napsal „no právě“.',
      'Za oknem běží les pozpátku. Je to skoro uklidňující. Všechno v něm ví, kam má couvat.',
    ],
    choices: [
      { id: 'caj', label: 'Nalít čaj. Teplo se může hodit i někomu jinému.', next: 'chodba', add: ['caj'], flag: 'bufet', result: 'Vůně čaje připomíná kuchyň, ve které tě nikdo nenutil vysvětlovat, proč jsi přišel tak pozdě.' },
      { id: 'tuzka', label: 'Vzít tužku. Stížnost necháš prozatím rozepsanou.', next: 'chodba', add: ['tuzka'], flag: 'bufet', result: 'Na horní okraj formuláře napíšeš „zatím“. Zní to mnohem míň definitivně než většina věcí, které jsi dnes řekl.' },
    ],
  },
  ada: {
    label: 'KUPÉ 2 · ŽENA S HOUSLEMI', title: 'Čtyři takty před začátkem.',
    text: [
      'Mladá žena drží housle tak pevně, jako by jí mohly utéct. Na pouzdře má nálepku ADA a pod ní roztrženou pozvánku na konkurz.',
      '„Nešla jsem tam,“ řekne dřív, než se zeptáš. „Člověk by řekl, že budu mít strach z neúspěchu. Ale já se bála, že mě vezmou. Pak už bych se neměla na co vymlouvat.“',
      'Zahraje čtyři takty. Jsou krásné. Pátý nepřijde.',
      '„Když půjdu znovu do toho dne, třeba to opravím. Jen potřebuju nejdřív vědět, že to nebude chyba.“',
    ],
    choices: [
      { id: 'poslech', label: 'Sednout si. „Nemusíš dohrát. Můžeš jenom chvíli hrát.“', next: 'ada_dal', result: 'Ada se na tebe podívá, jako by tuhle možnost v žádné z přihlášek nenašla.' },
      { id: 'zaruka', label: 'Slíbit jí, že to tentokrát určitě vyjde.', next: 'ada_dal', flag: 'slib', result: '„Ty to víš?“ zeptá se. Zavrtíš hlavou. „Tak to prosím neslibuj. To už umím i sama.“ Vezmeš větu zpátky, dokud je ještě čas.' },
    ],
  },
  ada_dal: {
    label: 'KUPÉ 2 · NEDOKONČENÁ MELODIE', title: 'Hudba nepotřebuje omluvenku.',
    text: [
      'Ada ti ukáže kus notového papíru. Poslední řádek je prázdný. „Pořád čekám na konec, abych se mohla rozhodnout, jestli měl cenu začátek.“',
      'Za sklem se objeví nádraží. Na všech lavičkách sedí Ada. Všechny čekají s pouzdrem na klíně. Jen jedna se dívá ven.',
      'V tu chvíli ti dojde, že ten vlak nepřeváží lidi do jednoho ztraceného dne. Vozí je pořád dokola kolem místa, kde se zastavili.',
    ],
    choices: [
      { id: 'zapis', label: 'Zapsat pod noty: „Další takt může přijít zítra.“', needs: ['tuzka'], next: 'chodba', add: ['nota'], flag: 'ada', result: 'Ada se zasměje. „To je hrozně banální.“ Pak papír přeloží a polovinu ti podá. „Někdy potřebuju, aby mi to někdo napsal.“' },
      { id: 'ticho', label: 'Poslouchat bez další rady. Počkat i přes dlouhé ticho.', next: 'chodba', add: ['nota'], flag: 'ada', result: 'Pátý takt přijde nedokonale. O to víc zní jako něco živého. Ada ti dá polovinu papíru: „Abych věděla, že to někdo slyšel.“' },
      { id: 'odejit', label: 'Říct, že se potřebuješ postarat hlavně o svůj den.', next: 'chodba', flag: 'ada', result: 'Ada přikývne. Nic ti nevyčte. To na tom budeš později považovat za nejtěžší.' },
    ],
  },
  oldrich: {
    label: 'KUPÉ 4 · MUŽ S HODINAMI', title: 'Pořád sedm minut do zavolání.',
    text: [
      'Starší muž rozebírá kapesní hodinky nad čistým kapesníkem. „Oldřich,“ představí se. „Výpravčí. Teda bývalý. Tady na tom rozdílu moc nezáleží.“',
      'Hodinky ukazují 16:42. Jejich tikání zní spíš jako naléhání.',
      '„V tu dobu mi zavolal syn. Nezvedl jsem to. Byl jsem naštvaný. Pět let už si říkám, že mu zavolám za sedm minut.“',
      '„A ví, že jste naštvaný?“',
      '„To je právě ono. On už možná neví ani, že tu pořád jsem.“ Oldřich se pokusí zasmát. Hodinky se urazí a přestanou tikat.',
    ],
    choices: [
      { id: 'jablko', label: 'Rozdělit jablko. „U hovoru se dá klidně i jíst.“', needs: ['jablko'], next: 'oldrich_dal', remove: ['jablko'], result: 'Oldřich vytáhne kapesní nůž. Půlku ti vrátí, aniž bys musel říct. Existují pravidla pohostinnosti starší než všechny jízdní řády.' },
      { id: 'caj', label: 'Položit před něj čaj. Na sedm minut je ještě teplý.', needs: ['caj'], next: 'oldrich_dal', remove: ['caj'], result: 'Obejme kelímek oběma rukama. „U nás doma se čaj zásadně pil v kuchyni. V obýváku už to byla návštěva.“' },
      { id: 'sednout', label: 'Sednout si naproti. „Já taky někomu nezvedám telefon.“', next: 'oldrich_dal', result: 'Oldřich zvedne oči. Poprvé za celý rozhovor nepůsobí jako člověk čekající na rozsudek.' },
    ],
  },
  oldrich_dal: {
    label: 'KUPÉ 4 · MOSAZNÝ KLÍČ', title: 'Věci se neopravují jen dozadu.',
    text: [
      'Oldřich ti ukáže drobný klíč, který nenápadně používal místo šroubováku. „Od strojovny. Býval jsem tady strojvůdce. Klára mě vystřídala. Myslela, že tak někoho přiveze zpátky.“',
      'Na jeho telefonu je otevřený synův kontakt. Číslo má uložené pod celým jménem, jako by telefonoval na ministerstvo.',
      '„Já nechci, aby se ten hovor stal znovu,“ řekne po chvíli. „Chtěl bych, aby se stal nový.“',
    ],
    choices: [
      { id: 'novy', label: '„Tak mu nemusíte volat včera.“ Nabídnout, že půjdeš kus cesty s ním.', next: 'chodba', add: ['klic'], flag: 'oldrich', result: 'Podá ti klíč. „Odemkne, až budeš opravdu chtít dál. Je to dost nepohodlný druh zámku.“ Synův kontakt přejmenuje na Tomáš.' },
      { id: 'hodiny', label: 'Navrhnout, aby nejprve dokonale seřídil hodinky.', next: 'chodba', flag: 'oldrich', result: '„To jsem právě dělal celou dobu,“ řekne Oldřich. Hodinky zabalí zpátky do kapesníku. Klíč zůstane v jeho ruce.' },
    ],
  },
  vrbova: {
    label: 'KUPÉ 6 · SKLENICE HLÍNY', title: 'Zahrada na kolečkách.',
    text: [
      'Paní Vrbová cestuje se sklenicí hlíny a jedním javorovým semínkem. Připomíná člověka, který si vyrazil na vandr a vzal si pro jistotu vlastní svět.',
      '„Naše zahrada bude parkoviště,“ řekne. „Rok jsem se hádala. Potom jsem se jedno ráno prostě nechtěla probudit do dne, kdy ji zbourají.“',
      'Ze sklenice voní déšť. Slyšíš děti, které se hádají, komu patří lopatka. „To je zvuk, který se do petice moc špatně zapisuje.“',
      'Máš chuť říct, že všechno určitě dobře dopadne. Po tom, co jsi v tomhle vlaku viděl, to ale zní skoro nezdvořile.',
    ],
    choices: [
      { id: 'semeno', label: 'Zeptat se, jestli se z toho semínka může stát jiný javor.', next: 'vrbova_dal', result: '„Může,“ řekne. „Ale nebude to ten starý.“ Opatrně mu udělá místo na víčku. „To ovšem ještě neznamená, že nebude stát za to.“' },
      { id: 'zachovat', label: 'Zeptat se, jestli vlak dokáže uchovat zahradu navždy.', next: 'vrbova_dal', result: '„Uchovat ano. Žít v ní ne.“ Poklepe na sklenici. Děti na okamžik ztichnou. Je to nesnesitelně malý prostor pro celé léto.' },
    ],
  },
  vrbova_dal: {
    label: 'KUPÉ 6 · NĚCO, CO JEŠTĚ NEBYLO', title: 'Semínko není vzpomínka.',
    text: [
      'Paní Vrbová vysype semínko do dlaně. „Všechno ostatní v tomhle vlaku už se někdy stalo. Tohle ještě ne.“',
      '„A co když nevyroste?“',
      '„Pak budeme mít malou skvrnu hlíny a o něco víc zkušeností se zálivkou. Lidi pořád říkají, že jim jde o jistotu. Já už bych zase jednou chtěla mít starost.“',
      'Nabídne ti semínko. Působí lehčeji než jízdenka.',
    ],
    choices: [
      { id: 'vzít', label: 'Vzít semínko. Něco můžeš zkusit, aniž bys znal výsledek.', next: 'chodba', add: ['semeno'], flag: 'vrbova', result: '„Hlavně ho nenoste tři roky v kapse,“ řekne paní Vrbová. „To už jsem za vás vyzkoušela.“' },
      { id: 'nechat', label: 'Nechat ho u ní. Tvůj příběh teď potřebuje obě ruce.', next: 'chodba', flag: 'vrbova', result: 'Přikývne a semínko vrátí na hlínu. Nic se nezmění. Právě to je na tomhle vlaku tak svůdné.' },
    ],
  },
  dopis: {
    label: 'ZA TUNELEM · OBÁLKA S TVÝM JMÉNEM', title: 'Tvoje vlastní písmo.',
    text: [
      'Vlak vjede do tunelu. Obálka se v kapse náhle zahřeje. Otevřeš ji. První věta je napsaná tvým písmem: „Jestli tohle čteš, zase ses rozhodl zapomenout.“',
      'Vrátí se ti včerejší kavárna. Eliška ti oznámila, že se stěhuje. Ne do jiné země. O dvě města dál. Ale v tobě se ozvalo všechno, co někdy odešlo bez vysvětlení. Řekl jsi jí, že si nemusí vymýšlet důvody, proč s tebou nechce mít nic společného.',
      'Potom se ti omluvila ona. Za něco, co neudělala. A to je vzpomínka, kterou jsi nedokázal snést.',
      'Dopis pokračuje: „Nikdo tě nenutil nastoupit. Vrátil ses sem už třikrát. Pokaždé jsi odjel do Včera, smazal ten rozhovor a potom ho řekl znovu. Zkus tentokrát nechat ten den být.“',
    ],
    choices: [
      { id: 'priznat', label: 'Přečíst dopis až do konce. Nepříjemná vzpomínka může zůstat tvoje.', next: 'strojovna', add: ['pravda'], result: 'Na posledním řádku není rada. Jen Eliščino telefonní číslo, které znáš nazpaměť. Omluva se nedá poslat do minulosti. Ale pořád se dá poslat.' },
      { id: 'slozit', label: 'Složit dopis. Pořád chceš šanci udělat ten rozhovor znovu.', next: 'strojovna', result: 'Papír protestuje jen tichým šustnutím. Není tu nikdo, kdo by za tebe mohl rozhodnout, kolikrát je ještě „naposledy“.' },
    ],
  },
  strojovna: {
    label: 'ČELO VLAKU · DVEŘE DO STROJOVNY', title: 'Na druhé straně nikdo nesedí.',
    text: [
      'Dveře nemají okénko. Pod klikou je malá cedulka: „Za řízení odpovídá ten, kdo si vybral směr.“',
      'Z reproduktoru se ozve Klára. „Do strojovny se nepouštějí cestující.“',
      '„A kdo ji řídí?“',
      'Dlouho je slyšet jen pohyb kol. „To přání,“ odpoví nakonec. „To, se kterým jste nastoupil. Já jen hlídám, aby vám ho nic nepřipomnělo jinak.“',
    ],
    choices: [
      { id: 'klic', label: 'Použít Oldřichův klíč. Už víš, proč ho měl u sebe.', needs: ['klic'], next: 'kabina', result: 'Klíč se otočí lehce. Žádné tajné slovo. Jen ochota vzít za kliku.' },
      { id: 'prosit', label: 'Zavolat na Kláru jménem a požádat ji, aby přišla.', next: 'klara', result: 'Ve vlaku něco cvakne. Klára vystoupí ze svého kupé, jako by tím překročila víc než jednu chodbu.' },
    ],
  },
  klara: {
    label: 'PŘED STROJOVNOU · POSLEDNÍ PRŮVODČÍ', title: 'I někdo, kdo pomáhá, může uvíznout.',
    text: [
      '„Měla jsem jet za mámou,“ řekne Klára. „Nešlo o žádný velký příběh. Jen normální neděli. Místo toho jsem vzala směnu. A pak ještě jednu.“',
      'Nedopoví, co se stalo potom. Není potřeba přikládat k bolesti úřední doklad.',
      '„Myslela jsem, že když lidem dám zpátky ztracený den, třeba jednou dostanu ten svůj. Ale nikdo odsud nikdy neodjede spokojený. Jen na chvíli úlevou zapomene.“',
      'Podá ti náhradní klíč. „Neumím řídit jinam. Třeba to dokážeš ty.“',
    ],
    choices: [
      { id: 'spolu', label: 'Vzít klíč a nabídnout jí, ať jde s tebou.', next: 'kabina', add: ['klic'], flag: 'klara', result: '„Můžu?“ zeptá se. Překvapí tě, že to neví. Překvapí ji, že na tom trváš.' },
      { id: 'sam', label: 'Vzít klíč. Nechat ji rozhodnout, jestli se přidá.', next: 'kabina', add: ['klic'], result: 'Klára ustoupí ode dveří. Zůstane stát dost blízko, aby nemusela klepat, kdyby si to rozmyslela.' },
    ],
  },
  kabina: {
    label: 'STROJOVNA · ROZHODNUTÍ', title: 'Koleje končí tam, kam se díváš.',
    text: [
      'Strojovna je malá. Žádný kotel, žádné jiskry. Na pultu leží jízdní řád a vedle něj čtyři prázdné řádky. Za předním sklem je dlouhá trať, která se stáčí do kruhu.',
      'Teď už víš, co vlak umí: vymazat důvod bolesti. A s ním i všechno, co ses kvůli ní mohl naučit o sobě a o jiných lidech.',
      'Jenomže v kapse možná neseš i něco, co se nedá přehrát pozpátku. Nedokončenou hudbu. Klíč od dalšího hovoru. Semínko. Přiznání, které nepotřebuje lepší včerejšek.',
      'Z chodby doléhá tiché čekání. Žádná možnost není zadarmo. Konečně se ale můžeš rozhodnout, kam vlastně jedeš.',
    ],
    choices: [
      { id: 'domu', label: 'Vrátit se do dneška. Zavolat Elišce a začít tím, co se opravdu stalo.', ending: 'domu' },
      { id: 'vcera', label: 'Využít jízdenku do Včera. Opravit rozhovor za cenu vzpomínek na tuhle cestu.', ending: 'vcera' },
      { id: 'sluzba', label: 'Vystřídat Kláru. Prozatím pomoct dalším cestujícím najít cestu.', ending: 'sluzba' },
      { id: 'zitra', label: 'Přepsat společně směr vlaku. Vyjet do dne, který ještě nikdo nezná.', needs: ['nota', 'klic', 'semeno', 'pravda'], ending: 'zitra' },
    ],
  },
};

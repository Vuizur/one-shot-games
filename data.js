export const chapters = [
  {
    title: 'Dopis bez odesílatele', location: 'Praha · váš byt', act: 'I. Příjezd', type: 'choice', skill: 'Význam a podmínka', cost: 1,
    paragraphs: [
      'Dopis přišel ve středu. Papír byl suchý, přesto se pod ním na stole vytvořil kruh vody. Rukopis patřil vašemu kolegovi, doktoru Vojtěchu Rybářovi, pohřešovanému už tři měsíce.',
      'Z obálky vypadla jízdenka do Blatin a útržek s instrukcí. Na rubu někdo tak silně vyryl vaše jméno, až se papír protrhl. Rybář se vždy vyjadřoval přesně. I tentokrát na tom patrně záleží.'
    ],
    document: '„Nepřijíždějte, ledaže byste byl ochoten zříci se vlastního jména. Jestliže však přijedete, nevystupujte před poslední stanicí.“',
    prompt: 'Co z dopisu skutečně vyplývá?',
    options: [
      'Ochota vzdát se jména vás zavazuje přijet.',
      'Bez ochoty vzdát se jména nemáte přijet; vystoupit máte až v poslední stanici.',
      'Přijet smíte pouze tehdy, pokud své jméno před cestou zapomenete.',
      'Vystoupit máte v předposlední stanici, pokud si chcete jméno uchovat.'
    ], answer: 1,
    hint: '„Ledaže“ uvádí výjimku ze zákazu. Výjimka něco připouští, ale sama o sobě nic nepřikazuje.',
    explanation: '„Nepřijíždějte, ledaže…“ znamená: přijet lze jen při splnění uvedené podmínky. Ochota není totéž co vykonaný čin a povolení není povinnost. Druhá věta vylučuje všechny dřívější stanice.',
    success: 'Zůstanete sedět, i když průvodčí podruhé oznámí Blatiny. Teprve třetí nástupiště vrhá stín. Vystoupíte do světa, který má alespoň prozatím pevné obrysy.',
    failure: 'Vystoupíte příliš brzy. Vlak projede skrze vás jako studená myšlenka. Když se konečně ocitnete na posledním nástupišti, na jízdence chybí první písmeno vašeho příjmení.',
    reward: 'Jízdenka s pravým názvem', rewardNote: 'Poslední stanice byla jediná skutečná.'
  },
  {
    title: 'Hostinského výhrada', location: 'Blatiny · hostinec U Břehu', act: 'I. Příjezd', type: 'choice', skill: 'Zápor a časová následnost', cost: 1,
    paragraphs: [
      'Hostinský přestane leštit sklenici v okamžiku, kdy vyslovíte Rybářovo jméno. Na stěně visí fotografie návsi. Uprostřed je rybník; uprostřed rybníka stojí stejný hostinec.',
      '„Vy se ptáte, kdo k němu chodil. Já vám řeknu jen to, kdo se vracel.“ Přisune k vám knihu hostů. Všechny podpisy vypadají jako váš, jen jsou rok od roku roztřesenější.'
    ],
    document: '„Netvrdím, že se písař nevrátil. Tvrdím jen, že se nevrátil dřív, než se rozednilo.“',
    prompt: 'Který zápis zachovává obsah hostinského tvrzení bez dalšího domýšlení?',
    options: [
      'Písař se vůbec nevrátil.',
      'Písař se vrátil ještě za tmy.',
      'Písař se vrátil nejdříve za rozbřesku; mohl přijít i později.',
      'Písař se vrátil přesně v okamžiku východu slunce.'
    ], answer: 2,
    hint: 'Zaměřte se na rozsah druhého záporu: popírá dřívější návrat, nikoli návrat jako takový.',
    explanation: 'V tomto svědectví vazba „nevrátil se dřív, než se rozednilo“ klade nejčasnější možný návrat k rozbřesku. Přesný okamžik neurčuje. Úvodní „netvrdím, že…“ navíc nelze zaměňovat za samotné tvrzení o nevrácení.',
    success: 'Počkáte do svítání. Písař skutečně přijde, s bahnem na manžetách. Vloží vám do dlaně klíč od obecního archivu.',
    failure: 'Hledáte písaře v nesprávnou hodinu. U zamčených dveří stojí člověk bez tváře; podá vám klíč a vysloví větu hlasem vaší matky. Skutečný písař ráno popře, že vás kdy viděl.',
    reward: 'Písařovo svědectví', rewardNote: 'Návrat nastal až po rozbřesku.'
  },
  {
    title: 'Komu patří mrtví', location: 'Obecní archiv · přízemí', act: 'II. Pod povrchem', type: 'input', skill: 'Pádová vazba a skloňování', cost: 1,
    paragraphs: [
      'Archiv páchne mokrým vápnem. Kartotéka obsahuje rodné listy lidí, kteří dosud nebyli počati, a úmrtní listy těch, kdo se narodili dvakrát.',
      'Dvířka další skříně nemají zámek, jen mosaznou destičku s nedokončenou větou. Pod ní stojí drobným písmem: „Předložka si pamatuje, co jste vy zapomněl.“'
    ],
    document: '„Přístup byl odepřen všem s výjimkou __________.“\nDoplňte přesně spojení: OBA ZESNULÍ SPRÁVCI. Zachovejte všechna tři slova.',
    prompt: 'Napište celé spojení ve správném pádě.', answer: ['obou zesnulých správců'], displayAnswer: 'obou zesnulých správců', placeholder: 'Tři slova na mosazné destičce…',
    hint: 'Složená předložka „s výjimkou“ řídí druhý pád. Slovo „oba“ má v tomto pádě zvláštní tvar.',
    explanation: '„S výjimkou koho?“ vyžaduje genitiv: obou zesnulých správců. „Oběma“ by byl dativ nebo instrumentál; „obou“ je genitiv či lokál.',
    success: 'Mosaz se pod vašimi prsty zahřeje. Ve skříni naleznete jmenný rejstřík a dvě fotografie správců. Na obou je stejný muž, pokaždé s jiným datem úmrtí.',
    failure: 'Destička přijme chybnou vazbu jako vaše přiznání. V rejstříku se objeví třetí správce: vy. Skříň se otevře, ale datum vedle vašeho jména už někdo začal dopisovat.',
    reward: 'Jmenný rejstřík', rewardNote: 'Správci zemřeli dvakrát. Jména přetrvala.'
  },
  {
    title: 'Co se stalo před vodou', location: 'Obecní archiv · sklep', act: 'II. Pod povrchem', type: 'order', skill: 'Časové vztahy v souvětí', cost: 2,
    paragraphs: [
      'Ve sklepě najdete obecní kroniku z roku 1879. O povodni neobsahuje jedinou přímou zmínku. Zapisovatel se místo toho zabýval zvony, dveřmi a tím, co se za nimi učilo dýchat.',
      'Na protější zdi jsou čtyři kamenné destičky. Jejich stlačením můžete zopakovat sled oné noci. Chybná posloupnost zřejmě zopakuje i něco dalšího.'
    ],
    document: '„Sotva písař zapečetil dveře, ozval se zvon. Ještě před zapečetěním však mlynář spálil seznam. Teprve když zvon dozněl, vystoupila voda na třetí schod.“',
    prompt: 'Sestavte události od nejstarší po nejpozdější. Vybírejte destičky v požadovaném pořadí.',
    options: ['Zvon se ozval a dozněl', 'Voda vystoupila na třetí schod', 'Písař zapečetil dveře', 'Mlynář spálil seznam'], answer: [3, 2, 0, 1],
    hint: '„Ještě před“ posouvá pálení před pečetění. „Sotva“ připojuje zvon těsně po pečetění; „teprve když“ odsouvá vodu až za zvon.',
    explanation: 'Nejprve mlynář spálil seznam, pak písař zapečetil dveře, následně zazněl a dozněl zvon a nakonec stoupla voda. Pořadí vět v kronice není pořadím událostí.',
    success: 'Za zdí se ozve čtvero úderů. Voda ve spárách ustoupí a odhalí plán staré obce. Kostel stojí o celou ulici níže než na současné mapě.',
    failure: 'Voda vystoupí dřív, než dozní zvon. Na jediný nádech se sklep ocitne na dně rybníka. Když voda zmizí, máte v plicích chuť rzi a v kapse kus rozmáčeného plánu.',
    reward: 'Plán zatopené obce', rewardNote: 'Vchod do starého kostela leží pod hrází.'
  },
  {
    title: 'Dům, který má být', location: 'Hráz · opuštěný přívoz', act: 'II. Pod povrchem', type: 'choice', skill: 'Epistemická modalita', cost: 1,
    paragraphs: [
      'Převozník sedí v loďce vytažené na břeh. Za ním se rýsuje dům, který na plánu není. „Tam bydlí ten váš doktor,“ řekne, aniž se podívá vaším směrem.',
      'Když se zeptáte, zda ho uvnitř spatřil, zavrtí hlavou. V zápisníku musíte odlišit svědectví od doslechu. Jinak se vydáte za jistotou, kterou nikdo nemá.'
    ],
    document: '„Rybář prý dosud přebývá v domě pod hrází. Měl tam být už minulou zimu, ale já sám jsem ho tam nikdy neviděl.“',
    prompt: 'Jak spolehlivá je informace o Rybářově pobytu podle tohoto výroku?',
    options: [
      'Převozník osobně potvrzuje současný pobyt i pobyt minulou zimu.',
      'Sloveso „měl“ dokazuje Rybářovu povinnost přebývat v domě.',
      'Převozník výslovně tvrdí, že Rybář v domě nikdy nebyl.',
      'Jde o zprostředkovanou, osobně neověřenou zprávu; minulý pobyt je rovněž podán jako údajný.'
    ], answer: 3,
    hint: '„Prý“ označuje převzatou zprávu. V tomto kontextu také „měl tam být“ vyjadřuje údajnost, nikoli uloženou povinnost.',
    explanation: 'Výrazy „prý“ a kontextové „měl tam být“ signalizují odstup mluvčího od pravdivosti zprávy. To, že někoho neviděl, nedokazuje, že tam dotyčný nebyl.',
    success: 'Místo slepé návštěvy domu požádáte o zdroj zprávy. Převozník vám předá dopis, který sám nikdy neotevřel. Pečeť nese Rybářův skutečný monogram.',
    failure: 'V domě vás přivítá Rybář. Poznáte ho okamžitě, ačkoli jeho tvář tvoří jen náznak tváře ve vlhkém skle. Utečete s dopisem, který vám podá, ještě než se vás zeptá na jméno.',
    reward: 'Nedotčená pečeť', rewardNote: 'Skutečný Rybář užíval jiný znak než jeho dvojník.'
  },
  {
    title: 'Opisovačova lítost', location: 'Dům pod hrází · pracovna', act: 'III. Cizí gramatika', type: 'input', skill: 'Minulá podmínka', cost: 1,
    paragraphs: [
      'Dopis vás zavede do pracovny přístupné ze zadní strany domu. Na stole leží Rybářovy poznámky. Opisoval starý text a změnou jediné slovesné vazby z něj vytvořil pozvání.',
      'Z jeho poslední poznámky zbyl začátek. Psací stroj sám od sebe posune válec. Chce větu, v níž se lítost nemůže vydávat za budoucí slib.'
    ],
    document: '„Kdybych byl býval věděl, co ten opis probudí, __________.“\nDoplňte záporný minulý kondicionál slovesa OPSAT, 1. osoba jednotného čísla, mužský rod. Použijte čtyři slova v pořadí: záporové příčestí BÝT + BYCH + BÝVAL + OPSAT.',
    prompt: 'Doplňte čtyři slova vyjadřující neuskutečněný děj v minulosti.', answer: ['nebyl bych býval opsal'], displayAnswer: 'nebyl bych býval opsal', placeholder: 'Čtyři slova pro něco, co už nelze vzít zpět…',
    hint: 'Začněte slovem „nebyl“. Příklonka „bych“ patří na druhou pozici v doplňované větě. Obě zbývající příčestí mají mužský rod.',
    explanation: 'Požadovaný knižní minulý kondicionál je „nebyl bych býval opsal“. Výslovně označuje neuskutečněnou alternativu v minulosti. Běžnější „neopsal bych“ může podle kontextu mířit i do minulosti, ale nesplňuje zde výslovně zadaný tvar.',
    success: 'Stroj dopíše tečku. Zpod válce vyjede list s poznámkou: „Neodpovídá na význam. Odpovídá na vztah mezi tvary.“ Poprvé máte v ruce pravidlo, ne pověru.',
    failure: 'Stroj se rozběhne. Popíše stránku událostmi, které se teprve stanou, včetně okamžiku vašeho příchodu. Vytrhnete list; poslední řádek vám zůstane vytištěný na dlani.',
    reward: 'Rybářovo pravidlo', rewardNote: 'Rozhodující je vztah mezi tvary, ne jejich zvuk.'
  },
  {
    title: 'Nikdo kromě', location: 'Starý kostel · předsíň', act: 'III. Cizí gramatika', type: 'multi', skill: 'Vyplývání a rozsah záporu', cost: 2,
    paragraphs: [
      'Vchod do starého kostela najdete pod kořeny olše. Uvnitř je sucho. Kapky přesto stoupají od podlahy ke stropu a varhany nasávají vzduch, aniž by vydaly tón.',
      'Dveře do lodi chrání přísežný zápis. Ze čtyř tvrzení smíte přijmout jen ta, která z něj nutně vyplývají. Není tu místo pro pravděpodobnost.'
    ],
    document: '„Nikdo z těch, kdo slyšeli zvon, nezůstal beze změny. Někteří z těch, kdo jej neslyšeli, přesto zešíleli.“',
    prompt: 'Označte všechna tvrzení, která nutně vyplývají ze zápisu.',
    options: [
      'Každý, kdo slyšel zvon, se nějak změnil.',
      'Každý, kdo se změnil, slyšel zvon.',
      'Existoval alespoň jeden člověk, který zvon neslyšel a zešílel.',
      'Každý, kdo slyšel zvon, zešílel.'
    ], answer: [0, 2],
    hint: 'Změna nemusí být šílenství. Implikaci nelze bez dalšího obrátit. „Někteří“ zde zaručuje existenci alespoň jednoho případu.',
    explanation: 'První věta říká slyšel → změnil se, nikoli obráceně a nikoli slyšel → zešílel. Druhá věta výslovně zaručuje alespoň jednoho člověka, který neslyšel, ale zešílel. Platí tedy první a třetí tvrzení.',
    success: 'Odmítnete zaměnit následek za příčinu. Dveře povolí. Za nimi na lavici leží Rybářův úplný překlad, dosud nezasažený vodou.',
    failure: 'Dveře se otevřou na obě strany současně. V jedné lodi stojíte vy, v druhé člověk, který učinil opačný závěr. Než druhá loď zmizí, uvidíte, co se mu děje s ústy.',
    reward: 'Úplný překlad', rewardNote: 'Změna není vždy šílenství. Šílenství nevyžaduje zvon.'
  },
  {
    title: 'Hlas z druhé strany', location: 'Starý kostel · zpovědnice', act: 'III. Cizí gramatika', type: 'choice', skill: 'Podmět a přechodník', cost: 1,
    paragraphs: [
      'Ze zpovědnice se ozve Rybářův hlas. „Nenaučilo se česky. Naučilo se naše chyby.“ Po mřížce klouže ruka, která má o kloub víc, než by měla mít.',
      'Hlas vám přečte větu ze svého posledního zápisu. Potřebujete určit, kdo v ní zůstal u dveří. Věci za mřížkou nikdy nekladou otázku bez důvodu.'
    ],
    document: '„Spatřiv správce, jenž se vracel od hráze, ukryl písař listinu pod kabát a zůstal u dveří.“',
    prompt: 'Kdo podle věty spatřil koho a kdo zůstal u dveří?',
    options: [
      'Správce spatřil písaře; u dveří zůstal správce.',
      'Písař spatřil správce; u dveří zůstal písař.',
      'Písař spatřil správce; u dveří zůstal správce.',
      'Vypravěč spatřil oba muže; kdo zůstal u dveří, nelze určit.'
    ], answer: 1,
    hint: 'Přechodník „spatřiv“ sdílí podmět s přísudkem „ukryl“. Vztažná věta o správci na tom nic nemění.',
    explanation: 'Mužský přechodník minulý „spatřiv“ se vztahuje k podmětu hlavní věty: písaři. Písař ukryl listinu a také zůstal u dveří. Správce je předmět slovesa „spatřit“ a podmět pouze ve vložené vztažné větě.',
    success: '„Tak přece,“ vydechne Rybář. Pod mřížkou vysune listinu. Jeho ruka se na okamžik stane obyčejnou lidskou rukou. „Dovolte mi zůstat podmětem.“',
    failure: 'Hlas si vypůjčí váš omyl. Správce a písař si ve vašich vzpomínkách vymění tváře. Listina vypadne z mřížky sama; poznámku na jejím okraji už nedokážete přečíst.',
    reward: 'Listina se jménem', rewardNote: 'Rybář dosud rozlišuje mezi sebou a tím druhým.'
  },
  {
    title: 'Nedokončený obřad', location: 'Pod oltářem · schodiště', act: 'IV. Co zůstane', type: 'choice', skill: 'Slovesný vid', cost: 2,
    paragraphs: [
      'Schodiště pod oltářem klesá do prostoru většího než celý kostel. Na každém schodu sedí kamenná postava s otevřenou knihou. Všechny knihy jsou rozepsané v téže větě.',
      'Rybářova poznámka varuje, že otvor drží uzavřený pouze probíhající, neukončený děj. Jakmile jej formulace představí jako dovršený celek, pečeť se zlomí. Na čtecím pultu musíte zvolit vhodný zápis.'
    ],
    document: '„Strážce má text předčítat po dobu celého obřadu. Text se nesmí vyčerpat; právě jeho neukončenost udržuje otvor zavřený.“',
    prompt: 'Který zápis zachovává požadovanou nedokonavost děje?',
    options: [
      'Strážce přečetl zaříkání a položil knihu.',
      'Strážce dočetl zaříkání, když se voda pohnula.',
      'Strážce pročítal zaříkání, zatímco voda nehybně stála.',
      'Strážce odříkal zaříkání až do poslední slabiky.'
    ], answer: 2,
    hint: 'Hledejte sloveso, které zobrazuje průběh bez dosaženého konce. Samotný minulý čas neznamená, že je sloveso dokonavé.',
    explanation: '„Pročítal“ je nedokonavé: zachycuje průběh bez tvrzení o dovršení. „Přečetl“, „dočetl“ a „odříkal“ v nabídnutých větách představují ukončený celek. Jde o vid, nikoli o rozdíl mezi minulostí a přítomností.',
    success: 'Kamenné postavy pomalu otočí stránku. Všechny současně, všechny na další začátek. Otevře se cesta k pečeti a vy stále slyšíte svůj vlastní dech.',
    failure: 'Poslední slabika dosedne na kámen. Pod podlahou se pohne cosi tak velkého, že jeho pohyb zaměníte za změnu směru zemské tíže. Dopadnete před pečeť a kniha za vámi zaklapne.',
    reward: 'Neuzavřená formule', rewardNote: 'Trvání je zde pevnější než dokončení.'
  },
  {
    title: 'Oslovit propast', location: 'Pod hladinou · poslední práh', act: 'IV. Co zůstane', type: 'input', skill: 'Vokativ a význam oslovení', cost: 2,
    paragraphs: [
      'Na posledním prahu neleží tvor, nýbrž vztah mezi věcmi. Voda je jeho trpělivost. Kostel je jeho nádech. Vaše jméno je místo, kam by mohlo vstoupit.',
      'Rybářův list stanoví poslední pravidlo: označit ho znamená dát mu tvar. Oslovit ho znamená připustit, že stojí naproti vám — a může tedy zůstat na druhé straně. Musíte napsat oslovení bez jediného slova navíc.'
    ],
    document: 'Název v listině: „MLČENLIVÝ STRÁŽCE CIZÍHO PRAHU“\nPřeveďte celé spojení do 5. pádu jednotného čísla. Výraz „cizího prahu“ zůstává závislým přívlastkem.',
    prompt: 'Napište přesné oslovení ze čtyř slov.', answer: ['mlčenlivý strážce cizího prahu'], displayAnswer: 'Mlčenlivý strážce cizího prahu', placeholder: 'Oslovení na posledním prahu…',
    hint: 'U podstatného jména „strážce“ je vokativ jednotného čísla shodný s nominativem. Ne všechna mužská oslovení mají koncovku -i nebo -e.',
    explanation: 'Správně je „Mlčenlivý strážce cizího prahu“. „Strážce“ se skloňuje podle vzoru soudce; v 5. pádě zůstává „strážce“. Přídavné jméno má také shodný tvar a závislý genitiv „cizího prahu“ se nemění. Zkouška spočívá právě v tom, že někdy je správné tvar nezměnit.',
    success: 'Vyslovíte oslovení. Mezi vámi a hlubinou se poprvé objeví hranice. Z druhé strany k ní někdo přiloží dlaň.',
    failure: 'Zvolené slovo není oslovení, které listina vyžaduje. Hranice se objeví na nesprávném místě: vede středem vašeho vlastního jména.',
    reward: 'Vyslovená hranice', rewardNote: 'Druhá strana dostala oslovení. Vy jste zůstal zde.'
  }
];

export const endings = {
  lost: {
    label: 'ZÁVĚR · ZTRACENÝ PODMĚT', title: 'Někdo se vrátil.',
    paragraphs: ['Ráno vás najdou na nádraží. Na otázky odpovídáte bezchybnou češtinou, ovšem výhradně ve třetí osobě. Když máte říci své jméno, odněkud z dálky zazní zvon.', 'Do Prahy odjede člověk s vaší jízdenkou. Za oknem se v jeho odrazu pohybuje ještě někdo. Obecní kronika toho dne získá nový zápis. Podmět v něm chybí.']
  },
  sealed: {
    label: 'ZÁVĚR · UZAVŘENÝ PRÁH', title: 'Ticho má své meze.',
    paragraphs: ['Rejstřík, překlad i listina si konečně přestanou odporovat. Vyslovíte Rybářovo jméno a on přejde přes práh za vámi. Voda zůstane stát. Poprvé od příjezdu je její nehybnost obyčejná.', 'Ve vlaku do Prahy spolu nemluvíte. Není třeba. Když průvodčí požádá o jízdenky, oba odpovíte vlastním hlasem. Ve vašem zápisníku zůstane jediná prázdná stránka. Rozhodnete se, že ji tak ponecháte.']
  },
  survivor: {
    label: 'ZÁVĚR · NEDOKONALÉ TICHO', title: 'Vaše jméno zůstalo.',
    paragraphs: ['Oslovení udrží hranici. Projdete přes ni sám; chybějící důkazy už nedovolí bezpečně vyvést Rybáře. Za zády uslyšíte, jak někdo velmi pomalu listuje knihou.', 'Vrátíte se do Prahy. Voda ve sklenici občas ztmavne, když hledáte správný výraz. Vaše jméno však stále označuje vás. Prozatím je to dost.']
  },
  open: {
    label: 'ZÁVĚR · OTEVŘENÁ VĚTA', title: 'Hladina pokračuje.',
    paragraphs: ['Dokážete odejít, ale práh zůstane bez správného oslovení. Následující ráno všechny české noviny otisknou stejnou nenápadnou chybu: v jedné větě přibude podmět, který tam předtím nebyl.', 'Nikdo jiný si toho nevšimne. Vy ano. Večer vám přijde dopis bez odesílatele. Tentokrát poznáte vlastní rukopis.']
  }
};

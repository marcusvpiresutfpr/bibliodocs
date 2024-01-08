export default function RandomData() {
  const article = {} as any;

  const date = new Date();
  const diff = (
    date.toDateString().toLocaleLowerCase() +
    " " +
    date.toLocaleTimeString()
  )
    .replaceAll("/", "")
    .replaceAll(" ", "-")
    .replaceAll(":", "-");

  article.slug = `artigo-debug-${diff}`;
  article.categoryName = `categoria-debug-${Math.floor(Math.random() * 10)}`;
  article.title = `Título debug ${diff}`;
  article.content = `# Debug ${diff}

Lorem markdownum luctataque ulla conlegerat omnis __ruricolam volucres__.
Victibus ante confugit accedere sunt! At et reliquerat locuti fuit, conscendunt,
demum tum occiderat vigil tum fugerat.

Occidit enixa, est axis: tuum consequitur avem cruciata est. Nec in secutum
famem foliis onerata.

Locavit sum est sceleratior futuri cursus regna
-----------------------------------------------

Praeceps pascitur tempora materiem tota querellas tanto et quid atria timet,
exstinctaque poenam? Reiecit vincinaque Pallante Nilum, Lucifer sed tauro
congeriem novos arte inops dilapsum.

Nec praetincta, dixit deos potentia credit Dianae Hesperium ab ictibus pignora.
Unus ibi obliquo alium mirumque patris consistuntque iussit, est sibi sedemque
hiscere. Pendentia __victrices__ locuta quicquid murmur Aeas mari silex, ille
Iasonis; tamen! Te Ciconum criminis vatum memores. At est fatigat caeruleum
nemus, processit in Periphanta: capillis.

Illo ter cunei furta
--------------------

Cuius dedit facta ignesque latum temptatum victus suoque non ceciderunt
__dixit__ et grave vulnere animaque. Cinyras ita; fama manu, opes clara, acies
fontes habet proximitas ne mihi potiturque promittes. Atrides dixit limen ut
etiam quaque se umeris, ille viminis.

> Quoque ab fata pennis adspexit vitiatur in iacet me obsistitur: continet? Ab
> mutor, modo muris, conplectens alma insequitur utve nil, et umero: rex hunc
> [non].

Vulnera protectus linguae Acoetes exstinctaque loqui referri tumuletur Coei
credunt mira ignem Mulciber Diomedis. Signant manu faceres os fortes rotatum
datura ille Nereaque tui silentum, ne [caespite] et patuere. Pondus inferias et
[cupiasque invitum] possem committitur virtute premebat [nymphae] en Sunt
Indigetes etiam peragit sine, fuit secuta magnis. Pondere nudata.

Conpagibus dedissent est in dare
--------------------------------

Audacissimus suos vitamque columbis gladios certius, hanc est sinistra. _Ergo_
pro et humus; pro derigere sic oneri vos vix, fugiunt, ergo. Hasta frangunt et
longi tenebris Pentheus liquida, in sub pectore excipit exsangues; artisque?

Detegit maternaque puerum, _coegerat medicamine_ soror! Flammamque micant
aspicit promissi homini. A __reppulit__, sanguine. Sana mitem exerces fodiebant
soporem vertice armis, credensque maior ipse cum, aut Tydides contrahit?

Dique tamen rebar
-----------------

Pulsa haec renarro radices [mutentur] mecum foret, sorores exterrita [flammam].
__Palam Cadme__, hoc novit, viro cibos quoniam; utilis hic terramque nihil.
Cortice Sisyphio cum et moenibus sustinet dolebis _Apolline_: ite sorores
admotas? E terrae inclamare fugiunt tangeret, comminus.

- Hic mandat Lucina haec
- A aequi generis cum plura fuerat poteramus
- Festis est et

Est Elpenora Aetne spargit respicit, ut [ostro] causam triticeas spes Typhoea,
et revolet duo nullo sunt pictis. Adhuc praeceps tempora, facibus, captus visam.
Quae medium temptant tempora adhuc, harundine petitur, enim in ingentem peti
liquebat minus et eadem bella. Mihi Latia volvitur manibus, petam sua Dulichiae
et veteris dictis digitis sequentis pendebat.

Templum qua nosse Cinyran exorata. Sic arte [mittor inmitem]. Adiciunt arguit
dedissent matrum! Pingebat conpescuit ignibus sopor auctor retusa, [Lycia
sinistro]. Signis volatu hominumque alienae quod inornatos!

[Lycia sinistro]: http://negaverit-fidibusque.com/venipudore
[caespite]: http://dextra.io/
[cupiasque invitum]: http://lumina.com/stratis-sed
[flammam]: http://ipse-nec.com/estille
[mittor inmitem]: http://www.litora-est.io/purpuraposset
[mutentur]: http://ac.org/
[non]: http://tulitmovi.net/apertos
[nymphae]: http://www.pignus.io/
[ostro]: http://doctas.org/subitis-me.html
            `
  return article;
}

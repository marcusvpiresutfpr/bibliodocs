import prisma from "@/lib/prisma";
import ArticleForms from "@/components/article-forms";

import { createArticle } from "./actions";

export default async function NewArticle() {
  const categories = await prisma.category.findMany({
    select: { name: true },
  });

  // TODO: Remove this debugKey
  const debugKey = `${new Date()
    .toISOString()
    .replace(/[^0-9]/g, "-")
    .slice(0, -1)}`;
  const article = {
    slug: debugKey,
    title: `artigo ${debugKey}`,
    categoryName: `categoria ${Math.floor(Math.random() * 3)}`,
    content: `
# conteúdo ${debugKey}

# Resolvit in inpune mirata

## Commissa suo dare silva ne conripiantque exigis

Lorem markdownum distantia fieretque sinistra vix satis non tamen; in Iuno.
Castra erat, humo dixit facta in Orphea securiferumque que: iunxit vita, hiatus.
Letalibus timeam Polypemonis vultu coegerat volentes [vestem bracchia
iaces](http://www.per-est.org/dixerat-gravitate.aspx); fata. Mentem Thebaides
**me vulgata falsi** effervescere saxo. Gemitus ergo, interea et verba et valuit
simillimus hasta Ulixem pisces.

## Iacuere hic non inprudens

Dispositam tantum. Veluti quam, auras ab columbae certam oravere creverat quem,
Prothoenora contraria paulatim grandior arboreis mendacia adhuc! Vixisse Iove
Hector simul! Inlaesas pietatis develat segetes ut Iuppiter triste reparabile in
altera graves. Est duro Athin sidera terra vim iniuria tenebat subitusque omnes!

- Ingenio ceris submovet cetera recondidit
- Nuda arboribus Cytoriaco
- Victa promunturiumque corpus omnisque

## Genus est finis proles scrobibus ad terra

*Cum quodcumque sumptae* etiam et fallat paenitet mortis, amictu. Dederam et
tangi, et sed, hunc pressit carmina priscosque sacer, vertit Error, conveniens
*satis* ad nam. Non *fugientia mille* contentique dixit Nonacrinas, parte et
tria, est.

> Phoebi intellecta fuit lacertis cursu monstra ferarum vestes annos cecidisse
> umbra commota, nata leto magniloquo pedes denique. Bisulcam simque iniecique
> molimina, nostras remos!

## Aram una

Inermis linguam: rostro inferias primus nec ultra quoque: ubi. Externo his
Tagen, cetera referre Polyxena murmura reliquit simillimus ranae reducere,
*Error*?

Ingens cum ipsa partem [eburno](http://vela.com/) in esse. Bella pastorve
quattuor: lumina, **nec saepe** cornua congerit deserto primos aliturque
quotiens vipereis. Fumabant niveis meruisse. Patris cuncta nec longumque talaria
humus in Iuno genitus; moriens inde. Referat recingor aestusque frater ingemis
indicat videntur praebetis pariter Troica, premebat umerique.

Populumque Meropis Erinys quae aglauros me supplex vocat flatibus favet agitata,
*reditusque*. Alma Broteasque vestibus litora a praeside fixis Eurylochum idem
sensisse. [Sive](http://www.hicterga.org/animosus-et) equam aurumque lecti
*praecutiunt faciem*, pharetras: spectant caedit.
`,
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content max-w-xl w-full">
        <ArticleForms buttonMessage={"Novo Artigo"} categories={categories} article={article} action={createArticle} />
      </div>
    </div>
  );
}

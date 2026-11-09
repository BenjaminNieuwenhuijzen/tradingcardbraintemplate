# Zo zet je TradingCardBrain op

Reken op ongeveer 20 minuten. Je hoeft nergens een wachtwoord, sleutel of code in te vullen, behalve bij het inloggen op je eigen accounts.

Je hebt nodig: een gratis GitHub account, een gratis Cloudflare account en een openbare collectie op PriceCharting.

## Stap 1: de link naar je collectie

1. Ga naar pricecharting.com en open je collectie.
2. Kijk of het adres bovenin het woord `seller=` bevat.
3. Kopieer het hele adres en bewaar het even.

## Stap 2: maak je eigen kopie

1. Ga naar github.com/BenjaminNieuwenhuijzen/tradingcardbraintemplate en log in.
2. Klik op de groene knop **Use this template** en kies **Create a new repository**.
3. Vul bij **Repository name** in: `mijntradingcardbrain`
4. Kies **Private**.
5. Klik op **Create repository**.

## Stap 3: zet je dashboard online

1. Ga naar dash.cloudflare.com en maak een gratis account of log in.
2. Klik links op **Workers & Pages**.
3. Klik op **Create application**.
4. **Let op:** Cloudflare stelt eerst iets anders voor (Workers). Kies daar geen repository. Zoek onderaan de kleine tekst **Looking to deploy Pages?** en klik op **Get started**.
5. Kies **Import an existing Git repository** en klik op **Get started**.
6. Koppel je GitHub account en kies de repository `mijntradingcardbrain`. Klik op **Begin setup**.
7. Vul bij **Project name** een naam in die nog niet bestaat, bijvoorbeeld `mijntradingcardbrainjan` met je eigen naam erachter.
8. Zet **Framework preset** op **None** en laat **Build command** leeg.
9. Vul bij **Build output directory** in: `site`
10. Klik op **Save and Deploy**.

Zie je een veld **Deploy command** in plaats van **Build output directory**? Dan zit je bij Workers. Ga terug en begin opnieuw bij punt 3. Heb je per ongeluk al een Worker gemaakt, verwijder die dan via **Settings** en dan helemaal onderaan **Delete**, want een Worker kan al je gegevens online zetten.

Je adres wordt iets als `mijntradingcardbrainjan.pages.dev`. Er staat nu nog alleen een wachtpagina. Je prijzen komen er pas na stap 5.

## Stap 4: scherm je dashboard af

Deze stap is verplicht en komt voor het formulier. De prijzen zijn alleen voor jezelf bedoeld.

1. Open in Cloudflare je project onder **Workers & Pages**.
2. Ga naar **Settings** en klik op **Enable access policy**.
3. Klik op **Manage** bij de regel die net is gemaakt.
4. Ga naar **Access**, dan **Applications**, kies je project en klik op **Configure**.
5. Haal bij **Public hostname** het sterretje uit het vak **Subdomain** en klik op **Save**. Geeft dit een foutmelding, pas dan de naam van de regel een beetje aan.
6. Zorg dat bij de regel alleen jouw mailadres staat.
7. Ga terug naar je project, dan **Settings**, en klik nog een keer op **Enable access policy**. Nu zijn ook de voorbeeldversies afgeschermd.
8. Open je adres in een privévenster. Je moet nu om je mailadres gevraagd worden.

## Stap 5: vul het formulier in

1. Ga terug naar je kopie op GitHub en klik bovenaan op **Actions**.
2. Klik links op **TradingCardBrain instellen**.
3. Klik rechts op **Run workflow**.
4. Plak je link uit stap 1 in het eerste vak. Laat de andere vakken staan.
5. Klik op de groene knop **Run workflow**.

Na een paar minuten staat er een groen vinkje bij twee runs. Daarmee is je eerste dashboard gemaakt.

## Stap 6: zet het op je telefoon

1. Open je adres op je telefoon en vul je mailadres en de code uit je mail in.
2. Op een iPhone: tik in Safari op het deelicoon en kies **Zet op beginscherm**.
3. Op Android: tik in Chrome op de drie puntjes en kies **Toevoegen aan startscherm**.

## Als er iets misgaat

* Elke dag om ongeveer 05:17 wordt je dashboard vanzelf bijgewerkt.
* Is de laatste update ouder dan drie dagen, dan zie je een waarschuwing op je dashboard.
* Ging een run niet goed, dan staat de reden bovenaan je dashboard.
* De prijsgeschiedenis komt in porties binnen. De eerste weken worden grafieken en signalen dus elke dag vollediger.

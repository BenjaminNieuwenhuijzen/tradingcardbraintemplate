# Zo zet je TradingCardBrain op

Reken op ongeveer 20 minuten. Je kiest zelf een wachtwoord voor je dashboard. Verder hoef je geen sleutels of codes in te vullen en heb je geen creditcard nodig.

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

Je adres wordt iets als `mijntradingcardbrainjan.pages.dev`. Het adres is nog dicht en meldt dat er geen wachtwoord is. Dat hoort zo.

## Stap 4: kies je wachtwoord

Deze stap is verplicht. De prijzen zijn alleen voor jezelf bedoeld. Zonder wachtwoord blijft je dashboard dicht.

1. Open in Cloudflare je project onder **Workers & Pages**.
2. Ga naar **Settings** en zoek **Variables and Secrets**. Klik op **Add**.
3. Kies bij **Type** de optie **Secret**.
4. Vul bij **Variable name** in: `DASHBOARD_WACHTWOORD`
5. Vul bij **Value** een eigen wachtwoord in van minstens 12 tekens, dat je nergens anders gebruikt. Bewaar het goed.
6. Klik op **Save**.
7. Ga naar **Deployments**, klik bij de bovenste regel op de drie puntjes en kies **Retry deployment**.
8. Wacht een minuut en open je adres. Je ziet nu een inlogscherm. Log in met je wachtwoord.

## Stap 5: vul het formulier in

1. Ga terug naar je kopie op GitHub en klik bovenaan op **Actions**.
2. Klik links op **TradingCardBrain instellen**.
3. Klik rechts op **Run workflow**.
4. Plak je link uit stap 1 in het eerste vak. Laat de andere vakken staan.
5. Klik op de groene knop **Run workflow**.

Na een paar minuten staat er een groen vinkje bij twee runs. Daarmee is je eerste dashboard gemaakt.

## Stap 6: zet het op je telefoon

1. Open je adres op je telefoon en log in met je wachtwoord.
2. Op een iPhone: tik in Safari op het deelicoon en kies **Zet op beginscherm**.
3. Op Android: tik in Chrome op de drie puntjes en kies **Toevoegen aan startscherm**.

## Als er iets misgaat

* Elke dag om ongeveer 05:17 wordt je dashboard vanzelf bijgewerkt.
* Is de laatste update ouder dan drie dagen, dan zie je een waarschuwing op je dashboard.
* Ging een run niet goed, dan staat de reden bovenaan je dashboard.
* De prijsgeschiedenis komt in porties binnen. De eerste weken worden grafieken en signalen dus elke dag vollediger.

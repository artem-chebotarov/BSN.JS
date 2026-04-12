# bsn.js Dokumentation

- Autor: [Artem Chebotarov](https://github.com/artem-chebotarov)
- E-Mail: [artem.tschebotarov@gmail.com](mailto:artem.tschebotarov@gmail.com)
- LinkedIn: [Artem Chebotarov](https://linkedin.com/in/vikargia)
- Datum: 12.04.2026
- Lizenz: Apache 2.0
 
 ---

## Beschreibung

bsn.js (Bootstrap Service Notification) ist ein leichtgewichtiger Wrapper für Bootstrap-Modaldialoge. Dieses Plugin wurde entwickelt, um native Browserfunktionen wie alert, confirm und prompt durch flexiblere und barrierefreie Alternativen zu ersetzen.
Besonderes Merkmal: Diese Klasse wurde mit voller Unterstützung für Screenreader-Software entwickelt. Dies stellt sicher, dass blinde und sehbehinderte Nutzer keine Schwierigkeiten bei der Interaktion mit Ihren Dialogen haben.

---

## Integration und API

Um das Plugin zu integrieren, binden Sie einfach das Skript in Ihre HTML-Seite ein:

```html
<script src="./src/bsn.js"></script>
```

#### Achtung!

Durch das Einbinden des Plugins wird eine globale Variable $gn in Ihrem Projekt registriert. Dieses Format stammt aus dem GiannaFramework. Die Referenz auf das bsn-Plugin wird in $gn.bsn gespeichert. Beachten Sie: Wenn Sie andere GiannaFramework-kompatible Plugins verwenden, sind diese ebenfalls über das $gn.*-Objekt zugänglich.

---

### $gn.bsn.alert()

Diese Methode ermöglicht es Ihnen, eine Benachrichtigung zu senden, die nicht ignoriert werden kann.

#### Beispielaufruf:

```js
$gn.bsn.alert({
    title: "",    // Dialog-Header
    message: "",  // Nachrichtentext
    ok_text: "",  // Beschriftung der Schaltfläche (z. B. "Verstanden")
    app: "",      // Optionales App-Label (z. B. "blog-content")
    ok: () => {}  // Callback, der nach dem Klicken ausgeführt wird
});
```

Diese Methode kann ein Ergebnis aus dem Callback oder undefined zurückgeben.

---

### $gn.bsn.confirm()

Diese Methode fordert eine Bestätigung an. Sie können den Schaltflächen Callbacks zuweisen. Die Methode gibt einen booleschen Wert (boolean) zurück.

#### Beispielaufruf:

```js
let result = await $gn.bsn.confirm({
    title: "",    // Header
    message: "",  // Nachricht
    app: "",      // App- oder Skript-Label
    ok_text: "",  // Beschriftung für "Bestätigen"
    no_text: "",  // Beschriftung für "Ablehnen"
    ok: () => {}, // Bestätigungs-Callback
    no: () => {}  // Ablehnungs-Callback
});
```
 
 ---

### $gn.bsn.prompt()

Diese Methode fordert Daten vom Benutzer an. Sie gibt die eingegebenen Daten oder undefined zurück. Sie können Callbacks für die Bestätigung oder den Abbruch zuweisen.

#### Beispielaufruf:

```js
let value = await $gn.bsn.prompt({
    title: "",    // Header
    message: "",  // Nachricht
    input: "",    // Titel des Eingabefeldes (wichtig für Barrierefreiheit)
    value: "",    // Standardwert im Eingabefeld
    app: "",      // Skript-Label
    ok_text: "",  // Bestätigungs-Button
    no_text: "",  // Abbrechen-Button
    ok: () => {}, // Bestätigungs-Callback
    no: () => {}  // Abbruch-Callback
});
```

---

### $gn.bsn.toast()

Diese Methode zeigt fließende Toast-Benachrichtigungen an.

#### Beispielaufruf:

```js
$gn.bsn.toast({
    title: "",    // Header
    message: "",  // Nachricht
    type: "",     // Visueller Typ (z. B. success, danger, warning, info)
    delay: 5000,  // Zeit bis zum Ausblenden (in ms)
    ok_text: "",  // Button-Beschriftung
    ok: () => {}  // Callback für den Button
});
```

---

## Technische Hinweise

- Keine HTML-Templates erforderlich: Sie müssen keine HTML-Vorlagen für Dialogfenster manuell erstellen. Diese sind bereits in die Klasse integriert.
- Effizientes Rendering: Das Template für jede Methode wird nur einmal zur Webseite hinzugefügt. Danach prüft die Klasse lediglich die Existenz des Templates und aktualisiert den Inhalt.
- Sauberer DOM: Die Klasse überlädt den DOM-Baum nicht mit unnötigen Elementen.
- Lokalisierung: Sie können alle Keys weglassen; in diesem Fall werden die standardmäßigen englischen Labels verwendet, die fest in der Klasse hinterlegt sind.
- Barrierefreiheit: Diese Klasse ist speziell darauf ausgelegt, dass sehbehinderte Nutzer keine Barrieren bei der Fokussteuerung oder beim Auslesen der Inhalte vorfinden.
 
 ---
 
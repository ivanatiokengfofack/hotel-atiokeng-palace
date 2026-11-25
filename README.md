# Hotel Atiokeng Palace

Responsive Hotel- und Restaurantwebsite in deutscher Sprache mit React, JavaScript, HTML5 und CSS3.

## Lokal starten

```bash
npm ci
npm run dev
```

Mit `npm run build` entsteht die statische Website in `dist/`. Die relativen Assetpfade unterstützen das Hosting in einem Unterverzeichnis.

## Buchungsanfragen

Das Formular prüft Pflichtfelder und Reisedaten und erstellt einen kopierbaren Entwurf. Es speichert keine Angaben und versendet selbst keine E-Mails. Für die Übergabe an ein E-Mail-Programm `.env.example` nach `.env.local` kopieren, `VITE_BOOKING_EMAIL` mit der öffentlichen Buchungsadresse belegen und die Website neu bauen. Gäste senden den Entwurf anschließend über ihr E-Mail-Programm.

## Inhalte

Die Fotos sind Symbolbilder von Unsplash und zeigen Beispielmotive. Vor dem offiziellen Einsatz die Bilder durch freigegebene Hotelfotos ersetzen und die Hotel- und Restaurantinformationen ergänzen.

- [Hotelmotiv](https://images.unsplash.com/photo-1566073771259-6a8506099945)
- [Zimmermotiv](https://images.unsplash.com/photo-1611892440504-42a792e24d32)
- [Restaurantmotiv](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4)

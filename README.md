# m165 + m426 -   Sozialnetzwerk für die Schule

Mindestziel vom Projekt ist, einen Message Board mit Benutzern zu erstellen.

Ist das Mindestziel erreicht worden, können weitere Features definiert werden.

## Projektaufteilung

- Projektleiter und Scrum Master: Flavio Köppel
- Product Owner: Noah Bösch
- Entwickler: Esteban Venturello und Tobias Nussbaumer

## Voraussetzungen

| Tool | Mindestversion | Hinweis |
|------|----------------|---------|
| Docker Desktop | aktuell | Muss **gestartet sein**, bevor Schritt 1 ausgeführt wird |
| Node.js | 22 (LTS) | Node 20 funktioniert mit Warnungen; 22 empfohlen |
| Java JDK | 25 | `JAVA_HOME` muss auf JDK 25 zeigen |

**`JAVA_HOME` dauerhaft auf JDK 25 setzen (PowerShell — einmalig):**
```PowerShell
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Eclipse Adoptium\jdk-25.0.2.10-hotspot", "User")
```
Danach PowerShell neu starten. Den genauen Pfad entsprechend der installierten JDK-Version anpassen.

Detaillierte Setup-Dokumentation:
- [Requirements](http://github.com/FKO787/m165-m426/wiki/Requirements)
- [Configuration](https://github.com/FKO787/m165-m426/wiki/Configuration)

## Projekt starten

1. Docker:
```bash
cd ./docker/postgres
docker compose up -d
```
2. Frontend:
```bash
cd ./frontend
npm install
npm start
```
3. Backend:
```bash
cd ./backend
./mvnw.cmd spring-boot:run
```

One-Liner (Benötigt Windows Terminal; Docker Desktop muss bereits laufen)
```PowerShell
wt.exe new-tab -d $PWD.Path PowerShell.exe -c "cd ./docker/postgres \; docker compose up \; Read-Host 'Click Enter to exit...'" `
    `; new-tab -d $PWD.Path PowerShell.exe -c "cd ./frontend \; npm install \; npm start \; Read-Host 'Click Enter to exit...'"  `
    `; new-tab -d $PWD.Path PowerShell.exe -c "cd ./backend \; ./mvnw.cmd spring-boot:run \; Read-Host 'Click Enter to exit...'"
```

## Demo-Zugang

Beim Start des Backends werden automatisch Testnutzer angelegt (Passwort wird bei jedem Neustart zurückgesetzt):

| E-Mail | Passwort |
|--------|----------|
| `max.mustermann@example.org` | `password` |
| `eve@bztf.ch` | `password` |
| `fko@bztf.ch` | `password` |
| `tnu@bztf.ch` | `password` |
| `nbo@bztf.ch` | `password` |

## Sprache

Englisch:
- Für Code (Java, TypeScript, ...)
- Für Kommentare und Beschreibungen im Code
- Für Commit-Messages

Deutsch:
- Für die Webseite und Benutzeransicht
- Für die Dokumentation (Projektbeschreibung, README, Wiki)
- Für GitHub-Issues

## Projektarchitektur

### Backend

- Java 25 (Spring Boot 4 benötigt mindestens Java 25; `JAVA_HOME` muss entsprechend gesetzt sein)
- Spring Boot als Framework
- Maven als Build Tool

### DatenBank

- PostgreSQL

### Frontend

- TypeScript  
- Angular

## Dokumentation

### Setup

- [Requirements](http://github.com/FKO787/m165-m426/wiki/Requirements)
- [Configuration](https://github.com/FKO787/m165-m426/wiki/Configuration)

### Features

- [Anwendungsfälle](FOLGT)

### Konventionen

- [Git Message Guidelines](https://github.com/FKO787/m165-m426/wiki/Git-Message-Guidelines)
- [Projektdokumentation](https://github.com/FKO787/m165-m426/wiki/Projektdokumentation)

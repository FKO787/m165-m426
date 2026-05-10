# m165 + m426 -   Sozialnetzwerk für die Schule

Mindestziel vom Projekt ist, einen Message Board mit Benutzern zu erstellen.

Ist das Mindestziel erreicht worden, können weitere Features definiert werden.

## Projektaufteilung

- Projektleiter und Scrum Master: Flavio Köppel
- Product Owner: Noah Bösch
- Entwickler: Esteban Venturello und Tobias Nussbaumer

## Aufstarten vom Projekt

1. Docker: `cd ./docker/postgres && docker compose up -d`
2. Frontend: `cd ./frontend && npm install && ng serve`
3. Backend: `cd ./backend && ./mvnw.cmd spring-boot:run`

One-Liner (Benötigt Windows Terminal)
```PowerShell
wt.exe new-tab -d $PWD.Path PowerShell.exe -c "cd ./docker/postgres \; docker compose up \; Read-Host 'Click Enter to exit...'" `
    `; new-tab -d $PWD.Path PowerShell.exe -c "cd ./frontend \; npm install \; ng serve \; Read-Host 'Click Enter to exit...'"  `
    `; new-tab -d $PWD.Path PowerShell.exe -c "cd ./backend \; ./mvnw.cmd spring-boot:run \; Read-Host 'Click Enter to exit...'"
```

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

- Java 21 (Java 25 führt zu Probleme)
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

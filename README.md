# Dokumentacja Aplikacji Kalendarz

## 1. Sekcja: Screenshots (Zrzuty Ekranu)

### 1.1 desktop

![2023-11-27 17-19-23](https://github.com/JakubZapadka/Kalendarz/assets/102255945/2e6d4f7c-ab38-4e2a-9520-18ee30ea72f4)

### 1.1 mobile

![2023-11-27 17-22-43](https://github.com/JakubZapadka/Kalendarz/assets/102255945/e4d7ce50-0d9f-42bc-982c-b2d5bf97b631)

## 2. Sekcja: Informacje

### 2.1 Opis

Aplikacja Kalendarz to system umożliwiający zarządzanie wydarzeniami poprzez dodawanie, przeglądanie i edycję informacji o nich. System bazuje na bazie danych SQL do przechowywania danych o wydarzeniach i wykorzystuje język PHP do obsługi logiki i komunikacji.

### 2.2 Funkcjonalności

- Dodawanie nowych wydarzeń z wykorzystaniem formularza.
- Wyświetlanie wydarzeń w widoku tygodniowym.
- Przeglądanie tygodni wstecz i w przód.

## 3. Sekcja: Założenia

Aplikacja została stworzona zgodnie z poniższymi założeniami:

- Użytkownik ma możliwość dodawania wydarzeń poprzez prosty formularz.
- Interfejs użytkownika jest intuicyjny, umożliwiając łatwe przeglądanie i zarządzanie wydarzeniami.
- System korzysta z bazy danych SQL do efektywnego przechowywania danych.

## 4. Sekcja: Użyte Technologie

- **Baza Danych:** MySQL
- **Backend:** PHP
- **Frontend:** HTML, CSS, JavaScript

## 5. Sekcja: View Online

Aplikację Kalendarz możesz obejrzeć online, korzystając z poniższego linku:

[**KZ Kalendarz - View Online**](https://kzkalendarz.000webhostapp.com/)

Dzięki temu linkowi możesz przetestować funkcjonalności kalendarza wydarzeń bez konieczności instalacji lokalnej kopii. Otwórz przeglądarkę internetową i przejdź do powyższego adresu, aby zobaczyć, jak działa aplikacja online. Możesz dodawać, przeglądać i edytować wydarzenia, sprawdzając, czy spełnia Twoje oczekiwania.

## 6. Sekcja: How to Install (Local)

1. Sklonuj repozytorium na swoje lokalne urządzenie.
   ```
   git clone https://github.com/JakubZapadka/Kalendarz
   ```
2. Zaimportuj bazę danych używając pliku `database.sql`.
3. Skonfiguruj plik `env.php` zgodnie z ustawieniami Twojej lokalnej bazy danych.
4. Uruchom aplikację na lokalnym serwerze PHP.
   ```
   php -S localhost:8000
   ```
5. Aplikacja Kalendarz jest teraz dostępna do użytku na Twoim lokalnym środowisku. Otwórz przeglądarkę internetową i przejdź do adresu http://localhost:8000, aby korzystać z kalendarza wydarzeń.

## 7. Sekcja: Treść Poleceń

Aplikacja została stworzona zgodnie z poniższymi poleceniami zadania testowego na rozmowę kwalifikacyjną:
1. Stworzenie tabeli SQL zawierającej informacje o terminie, miejscu, tytule i opisie wydarzenia.✔️
2. Stworzenie strony internetowej opartej na języku PHP obsługującej kalendarz wydarzeń z formularzem do dodawania nowych wydarzeń.✔️
3. Użycie JS do walidacji danych przed przesłaniem formularza, a następnie walidacja danych w PHP przed zapisaniem wydarzenia w bazie danych.✔️
4. Wyświetlanie wydarzeń w widoku tygodniowym z możliwością dodawania i edycji wydarzeń bez konieczności przeładowania strony.✔️

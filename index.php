<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./assets/css/calendar.css">
    <link rel="stylesheet" href="./assets/css/base.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <script src="./assets/js/calendar.js" defer></script>
    <title>Kalendarz</title>
    <style>
      #app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        align-items: center;
        align-content: center;
        background-color: var(--bg-100);
        color: var(--text-100);
      }
      .main_container {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-grow: 1;
        align-items: center;
        gap: 2rem;
      }
      @media only screen and (max-width: 1200px) {
        .main_container{
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <div id="app">
      <?php include "./templates/header.html" ?>
      <div class="main_container">
        <?php include "./templates/add_event.html" ?>
        <?php include "./templates/calendar.html" ?>
      </div>
      <?php include "./templates/footer.html" ?>
    </div>
  </body>
</html>

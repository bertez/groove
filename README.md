grooveApp
=========

Time tracking app developed by [A navalla suíza](http://idc.anavallasuiza.com/) using the superheroic [Angular JS javascript framework](http://angularjs.org/) and the not least awesome [FOL PHP microframework](https://github.com/oscarotero/fol). It also uses MySQL for data persistence and Bootstrap for the UI.


Installation
------------

1. Clone this repository in your webserver root directory (the directory of http://localhost, or similar) 

  ```
  $ git clone git@github.com:bertez/groove.git grooveApp
  ```

2. Move to the previous folder and install the [fol framework](https://github.com/oscarotero/fol) in the subfolder "api" (you will need [composer](http://getcomposer.org/) in your $PATH):

  ```
  $ cd grooveApp
  $ composer create-project fol/fol api
  ```

3. Once fol is installed, you will need to install the rest api app (just hit enter to all questions):

  ```
  $ cd api
  $ composer require fol/rest dev-master
  ```

4. Now, you will need a mysql database. Edit the [api/rest/config/database.example.php](https://github.com/oscarotero/fol-app-rest/blob/master/config/database.example.php) file with your database configuration and save (or rename) as database.php.
5. Create the database using the db.sql file located in root of the repository.

  ```
  $ mysql -u YOUR-MYSQL-USER -p < db.sql
  ```
6. Edit [this variable in js/app.js](https://github.com/bertez/groove/blob/master/js/app.js#L16) to point your api URL.
6. And you are done. Open the app in your browser [http://localhost/grooveApp](http://localhost/grooveApp) and enjoy.

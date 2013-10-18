groove
======

Time tracking app developed by A navalla suíza using the superheroic Angular JS javascript framework and the not least awesome FOL PHP microframework. It also uses MySQL for data persistence and Bootstrap for the UI.


Installation
------------

1. Clone this repository in grooveApp folder

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
  $ mysql -u _your-user_ -p < db.sql
  ```

6. And you are done. Open the app in your browser [http://localhost/grooveApp](http://localhost/grooveApp) and enjoy.

groove
======

Time tracking app developed by A navalla suíza using the superheroic Angular JS javascript framework and the not least awesome FOL PHP microframework. It also uses MySQL for data persistence and Bootstrap for the UI.


Installation
------------

#### 1 - Clone this repository in grooveApp folder

```
$ git clone git@github.com:bertez/groove.git grooveApp
```

#### 2 - Enter in the folder repository and install fol framework in the folder "api" (you need composer):

```
$ cd grooveApp
$ composer create-project fol/fol api
```

#### 3 - Once fol is installed, you need to install the app with the rest api (choose the default settings):

```
$ cd api
$ composer require fol/rest dev-master
```

#### 4 - Now, you need a mysql database. Edit the config/database.example.php file with your database configuration and save (or rename) as database.php.
#### 5 - Create the database using the db.sql file located in the repository root.

```
$ cd ../..
$ mysql -u your-user -p < db.sql
```

#### 6 - Open the app in your browser (http://localhost/grooveApp) and enjoy. 

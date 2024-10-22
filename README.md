# Developing a Point of Sale System using PHP and PostgreSQL
## Starting the System

To start the system, you can run the command bash ./scripts/start.sh in the project root.

To stop the system, run the command bash ./scripts/stop.sh in the project root.

Your system will be available at [localhost](http://localhost)

## Useful Information
System logs are recorded in ``logs/error.log``

If you need to test something within the system and want to see any output, you can use error_log to test, as shown in the file ``src/index.php``

## Database
Any script you develop or items you want to make available in the database can be placed in the SQL file at ``database/init.sql``

To access pgAdmin, you can use the URL [localhost:8080](http://localhost:8080)

email: root@root.com
password: root

## Setting the access
1. Access PGADMIN
2. Expand ``Servers``
3. Expand ``pgsql_desafio``
4. Enter the password ``root``

## Running Commands
1. Access PGADMIN.
2. Expand ``Servers``.
3. Expand ``pgsql_desafio``.
4. Click on ``applicationphp``.
5. Right-click on ``applicationphp``.
6. Select the ``Query Tool`` option.

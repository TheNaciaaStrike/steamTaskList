# steamTaskList
SoftWare for taskList witch could be integrated with stream

##Usage
                    
###Enviroment Table
Enviroment table setup for database login and discord bot
                    
Enviroment  | Value
------------- | -------------
dbUser  | UserName for database (E.g.: postgres )
dbPassword | Password for database User (E.g.: password)
dbHost  | Database host (E.g.: localhost)
dbPort | Port for Database host  (E.g.: 5432)
idleTimeoutMillis  | Time out for Database connection ( E.g.: 50)
dcBot | Discord bot Token  (E.g.:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)

###Tables and definitions
|  Database Table | Desciption  |
| ------------ | ------------ |
|  tasklist |  Table to store Tasks  |
|  users | Store logins and passwords and account type |
|  session | Store login tokens  |

#### tasklist
|  Name |  Type  | not null  | default  | primary key  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  TaskID |  serial  | X  |   nextval |  X  |
|  Platform  |  text  |  X  |    |   |
|  RequestedUser |  text  | X  |    |    |
|  Task  |  text  |  X  |    |   |
|  Completed  |  boolean  |  X  | false  |   |





```bash
npm start
```
## Recomended Use
Use this with Heroku CD/CI make fork request for it to work


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

import peewee

database = peewee.SqliteDatabase("wee.db")

class App(peewee.Model):  
    name = peewee.CharField()
    author = peewee.CharField()
    icon = peewee.CharField()
    url = peewee.CharField()

    class Meta:
        database = database

class Price(peewee.Model):
    app = peewee.ForeignKeyField(App)
    price = peewee.FloatField()
    date = peewee.DateTimeField()

    class Meta:
        database = database

if __name__ == "__main__":
    try:
        App.create_table() 
    except peewee.OperationalError:
        print "App table already exists!"
    try:
        Price.create_table() 
    except peewee.OperationalError:
        print "Price table already exists!"
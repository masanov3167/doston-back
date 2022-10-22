-- Postgres databazni ulaganda docs degan tableniu huddi shu ko'rininshda yaratilishi kerak sabab keyingi querylar huddi shu tablega moslab ketiladi. Agar table huddi shu ko'rinishda bo'lmasa bug kelib chiqadi

CREATE TABLE docs (      
	id serial PRIMARY KEY,
    malaka text,
    studyaddress text,
    fish text,
    number text,
    pass text,
    region text,
    district text,
    tashkilot text,
    info text,
    expert text,
    level text,
    sport text,
    shakl text,
    turi text,
    sportturi text,
    til text,
    pasport json default '{}',
    rasm json default '{}',
    diplom json default '{}',
    inn json default '{}',
    buyruq json default '{}',
    unvon json default '{}'
);
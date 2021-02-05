#!/bin/sh

##################
##################
# Script example #
# to update data #
# from opencovid #
# french source  #
##################
##################
# Script exemple #
# Pour mettre à  #
# jour données   #
# depuis source  #
# open covid fr  #
##################

user=username
pass=password
host=localhost
db=covid

wget https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.csv
comm -3 chiffres-cles.csv chiffres-cles_old.csv > update_chiffres.csv

mysql -u $user -p$pass -h $host $covid << MY_QUERY 
LOAD DATA INFILE '/var/lib/mysql-files/update_chiffres.csv' IGNORE
INTO TABLE cov19_donnees
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
(date,granularite,maille_code,maille_nom,@cas_confirmes,@cas_ehpad,@cas_confirmes_ehpad,@cas_possibles_ehpad,@deces,@deces_ehpad,@reanimation,@hospitalises,@nouvelles_hospitalisations,@nouvelles_reanimations,@gueris,@depistes,source_nom,source_url,source_archive,source_type)
set cas_confirmes = if(@cas_confirmes="", null, @cas_confirmes),
cas_ehpad = if(@cas_ehpad="", null, @cas_ehpad),
cas_confirmes_ehpad = if(@cas_confirmes_ehpad="", null, @cas_confirmes_ehpad),
cas_possibles_ehpad = if(@cas_possibles_ehpad="", null, @cas_possibles_ehpad),
deces = if(@deces="", null, @deces),
deces_ehpad = if(@deces_ehpad="", null, @deces_ehpad),
reanimation = if(@reanimation="", null, @reanimation),
hospitalises = if(@hospitalises="", null, @hospitalises),
nouvelles_hospitalisations = if(@nouvelles_hospitalisations="", null, @nouvelles_hospitalisations),
nouvelles_reanimations = if(@nouvelles_reanimations="", null, @nouvelles_reanimations),
gueris = if(@gueris="", null, @gueris),
depistes = if(@depistes="", null, @depistes);
MY_QUERY

rm chiffres-cles_old.csv
mv chiffres-cles.csv chiffres-cles_old.csv

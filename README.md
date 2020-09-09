# simplon-signin-app
Consigne du projet <br>
A partir d'un google sheet, modéliser une feuille de présence.<br>
A partir de l'appli pouvoir se connecter. <br>
Créer une feuille de présence qui va demander les informations suivantes : <br>
-> Rajouter un logo <br>
-> Rajouter un intitulé <br>
-> Générer un PDF à partir des informations que renvoie Google Sheet qui peut être renouvelé à partir des données qui sont issue du Google Sheet (Stockage à notre niveau)<br>
-> BDD Conseillée : MongoDB<br>

Pour le moment ce qui est fait<br>

-On peut créer un template<br>
-On peut récupérer les données du sheets via le dashboard  pour les enregistrer en base et en même temps choisir un template.<br>
-On peut se connecter/s'inscrire (à sécuriser)<br>
-On peut générer un pdf depuis le dashboard (tableau à revoir) et les données sont insérées de façon statiques. (pour le moment infos étudiants récupérées de la base et insérées dans un nombre de colonnes et lignes prédéfinies)<br>

Et ce qui reste à faire : <br>
-Design qui pour le moment est très très minimaliste :) <br>
-Refactoriser le tout (remplacer les messages Json etc), peut être remplacer certaines pages par un modal <br>
-Sécuriser la connexion <br>
-Ajouter la déconnexion <br>
-Récupérer les données du template dans le controller de création du pdf (createPdf) car pour le moment il y a uniquement les données du Google Sheets<br>
-Rendre les données du tableau dynamique (créer les lignes en fonctions des données récupérées) et harmoniser le tout<br>
-Gérer la conversion du lien  "logo" du sheets en image<br>
-Ajouter la signature<br>

N'hésitez pas à compléter :)


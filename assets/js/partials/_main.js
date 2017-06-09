var viewpoints = ['56e092d8a6179a788c74b618b29801c0','a76306e4f17ed4f79e7e481eb9a1bd06'];
var corpusArgos = ['http://argos2.hypertopic.org/corpus/Vitraux - Bénel',
              'http://argos2.hypertopic.org/corpus/Vitraux%20-%20Dr.%20Krieger',
              'http://argos2.hypertopic.org/corpus/Vitraux%20-%20Recensement'];

var corpusSt = ['http://mais.hypertopic.org/corpus/Vitraux - Bénel',
                'http://steatite.hypertopic.org/corpus/Vitraux%20-%20Dr.%20Krieger',
                'http://steatite.hypertopic.org/corpus/Vitraux%20-%20Recensement']


var constanteSpatial = {
    "Aulnay":"10240,Aulnay",
    "Braux" : "10500,Braux",
    "Église Notre-Dame, Villeneuve-l'Archevêque":"89190, Villeneuve-l'Archevêque",
    "Église Saint-Pierre-ès-Liens, Ervy-le-Châtel":"10130, Ervy-le-Châtel",
    "Chatres": "10510,Chatres",
    "Église Saint-Remi, Troyes":"Place Saint-Rémy, 10000, Troyes",
    "Église Saint-Pierre, Trouans":"10700, Trouans",
    "Moussey": "10800, Moussey",
    "Ormes": "10700, Ormes"

}
        
var loading = function(){
    var pageToLoad = $('div.content').attr('id');
    switch (pageToLoad) {
            case 'courses':
                getTours(viewpoints,corpusArgos);
                break;
            case 'map-page':
                getCourseMap(corpusArgos);
                break;
            case 'explore-page':
                getLocationVitraux(corpusArgos,corpusSt);
                break;
            case 'preview-page':
                getVitrailId();
                break;
            case 'description-page':
                getDescription(viewpoints,corpusSt);
                break;
    }
}
        
var getCourseDuration = function (total_sec) {
    var jour = Math.floor(total_sec /(24*3600));
    total_sec = total_sec - (jour*24*3600);
    var heure = Math.floor(total_sec/3600);
    total_sec = total_sec - (heure*3600);
    var minute = Math.floor(total_sec/60);
    heure = heure + (jour*24);

    return heure+' heures et '+minute+" minutes";
};

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


var uniq = function (a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
};

var getItemText = function (count, sing, plur) {
    return (count === 1) ? sing : plur;
};

var cleanData = function(data){
    return data.filter(function(d){
        return d;
    })
}
    

var requestFactory = function(url,display){
    var p = new Promise(function(resolve,reject){
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(data){
                   (typeof display === "function")? resolve(display(data)) : resolve(data);
                },
            erreur: function(){
                    reject('La requête a échoué');
                }
        });
    });
     return p;
}

$(document).ready(loading)





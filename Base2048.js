(function ($) // début du pluggin
{
    $.fn.game2048 = function () //function game2048 du pluggin
    {
        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generateMap() {
            let table = $('<table></table>');
            for (let y = 0; y < 4; y++) {
                let line = $('<tr></tr>');
                for (let x = 0; x < 4; x++) {
                    let cell = $('<td>0</td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    line.append(cell);
                }
                table.append(line);
            }
            return table;
        }

        // génération d'un certain nombre de cases (argument cases) 
        //aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generateCell(cells) {
            for (let i = 0; i < cells; i++) 
            {
                let empty = false;
                
                while (empty === false) // tant que la case récupéré aléatoirement n'est pas vide
                {
                    let x = Math.floor((Math.random() * 4));
                    let y = Math.floor((Math.random() * 4));
                    var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

                    if (elem[0])
                        empty = true;
                }

                let value = 2 * (Math.floor((Math.random() * 2) + 1));
                if (value === 4 && Math.random() > 0.5)
                    value = 2;


                elem.attr('nbr', value);
                elem.text(value);
            }


        }


        function mouvement(x,y, moveX, moveY)
        {
            let Tuile = $('[x="' + x + '"][y="' + y + '"]');//creation de la variable tuile 
            let nextTuile =$('[x="' + parseInt(x + moveX) + '"][y="' + parseInt(y + moveY) + '"]'); // creation de la variable suivant (remplacant) la tuile

            let value= Tuile.attr("nbr"); //creation de la variable prenant la valeur de la tuile 
            let nextValue = nextTuile.attr("nbr"); // creation de la variable prenant la valeur de la tuile suivante 
            console.log("nextValue");

            if(value ==0 || value == nextValue) // si value est null ou si elle st identique a la suivante
            {
                let newValue = parseInt(Tuile.attr("nbr")) + parseInt(nextTuile.attr("nbr")); // alors on additionne les 2 value je ne met pas de condition else
                console.log("newValue");

                Tuile.attr("nbr", newValue) //tuile prend la valeur de newvalue additionné plus haut
                Tuile.text(newValue); // on affiche en front

                nextTuile.attr("nbr", 0); // la tuile suivante prend la valeur de 0
                nextTuile.text(0); // on affiche coté front

                if(newValue==2048)
                {
                    alert("T'as gagné Narvallo")
                }  

                $('button').click(function()
                {
                    location.reload(true);
                });
            } 
        }
        

        // fonction de gestion des évenements (appuie de touches)
        $('html').keydown(function (event) 
        {
            switch (event['key']) 
            {

                case 'ArrowLeft':
                        console.log("Left");

                        for (let i=0; i<3; i++)
                        {
                            for(let y=0; y<4; y++)
                            {
                                for(let x=0; x<3; x++)
                                    {
                                        mouvement(x, y, 1, 0);                                      
                                    }
                                    
                            } 
                        }
                    generateCell(1)
                break;


                case 'ArrowUp':
                    // insérer algo move up
                    console.log("Up");

                         for (let i=0; i<3; i++)
                        {
                            for(let y=0; y<3; y++)
                            {
                                for(let x=0; x < 4; x++)
                                    {
                                        mouvement(x, y, 0, 1);
                                    }
                            }
                        }
                    generateCell(1)
                    break;


                case 'ArrowRight':
                    // insérer algo move right
                    console.log("Right");

                         for (let i=0; i<3; i++)
                        {
                            for(let y=0; y < 4; y++)
                            {
                                for(let x=1; x < 4; x++)
                                    {
                                        mouvement(x, y, -1, 0);
                                    }
                            }
                        }
                    generateCell(1)    
                    break;


                case 'ArrowDown':
                    // insérer algo move down
                    console.log("Down");
                         for (let i=0; i<3; i++)
                        {
                            for(let y=1; y < 4; y++)
                            {
                                for(let x=0; x < 4; x++)
                                    {
                                        mouvement(x,y,0,-1);
                                    }
                            }
                        }
                    generateCell(1);
                    break;
            }
            
        });
        

        // début du code lancé
        $(this).append(generateMap()); // génération du tableau vide
        generateCell(2); // génération aléatoire de deux cases pleines (2 ou 4)
    }

})(jQuery); // fin du pluggin

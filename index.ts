#! /usr/bin/env node
import inquirer from "inquirer";


let enemies:string[] = ["Skeleton","Zombie","Warrior","Assassin"];
let maxEnemyHealth:number = 75;
let enemyAttackDamage:number = 25;

let health:number = 100;
let attackDamage:number = 50;
let numHealthPotions:number = 3;
let healthPotionHealAmount:number = 30;
let healthPotionDropChance:number = 50;

let running:boolean = true;

console.log("Welcome to the Dungeon!")

GAME:
while(running){
    console.log("-------------------------------------------")
    let enemyHealth: number = Math.floor(Math.random() * maxEnemyHealth);
    let enemy: string = enemies[Math.floor(Math.random() * enemies.length)]
    console.log(`\t# ${enemy} has appeared! #`);

    while(enemyHealth > 0){
        console.log(`\n\t> Your HP: ${health}`);
        console.log(`\t> ${enemy}'s HP: ${enemyHealth}`);
        let startQuestion = await inquirer.prompt(
            {
                name:"action",
                type:"list",
                message:"What would you like to do?",
                choices:['Attack','Drink health potion','Run!']
            }
        );

        if(startQuestion.action === "Attack"){
            let damageDealt:number = Math.floor(Math.random() * attackDamage);
            let damageTaken:number = Math.floor(Math.random() * enemyAttackDamage);
            enemyHealth -= damageDealt
            health -= damageTaken
            console.log(`\n\t> You strike the ${enemy} for ${damageDealt} damage.`)
            console.log(`\t> You recieve ${damageTaken} in retaliation!`);

            if(health<1){
                console.log("\t> You have taken too much damage, you are too weak to go on!")
                break;
            }
        }else if(startQuestion.action === "Drink health potion"){
            if(numHealthPotions > 0){
                health += healthPotionHealAmount;
                numHealthPotions--;
                console.log("\t> You drink a health potion, Healing yourself for " + healthPotionHealAmount + "." 
                            + "\n\t> You now have " + health +" HP."
                            + "\n\t> You have " + numHealthPotions +" health potions left.\n");

            }else{
                console.log("\t> You have no health potions left! Defeat enemies for a chance to get one!")
            }
        }else if(startQuestion.action === "Run!"){
            console.log("\t> You run away from the " + enemy + "!");
            continue GAME;
        }
    }
    if(health<1){
        console.log("> You limp out of the dungeon, weak from battle.");
        break;
    }
    console.log("----------------------------------------------")
    console.log(` # ${enemy} was defeated! # `)
    console.log(` # You have ${health} HP left. # `)
    if((Math.floor(Math.random()*100)) < healthPotionDropChance){
        numHealthPotions++;
        console.log(` # The ${enemy} dropped a health potion! # `)
        console.log(` # You now have ${numHealthPotions} health potion(s). # `)
    }
    console.log("------------------------------------------------")
    let exitContinue = await inquirer.prompt(
        {
            name:"eC",
            type:"list",
            message: "What would you like to do now?",
            choices:['Continue fighting','Exit dungeon']
        }
    );
    if(exitContinue.eC === "Continue fighting"){
        console.log("> You continue on your adventure!")
    }else if(exitContinue.eC === "Exit dungeon"){
        console.log("> You exit the dungeon, successful from the adventures!");
        break
    }
}
console.log("######################");
console.log("# THANKS FOR PLAYING #");
console.log("######################");
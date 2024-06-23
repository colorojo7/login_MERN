import { Command } from "commander";
const program = new Command(); 

export const serverModes={
    production:"production",
    develop:"develop"
}
//Recuerden: 

//1 - Comand, 2 - description, 3 - default value

program 
    .option("--mode <mode>", "working mode", serverModes.production);
program.parse();

export default program; 
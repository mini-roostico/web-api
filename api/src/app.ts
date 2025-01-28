import ServerConfig from "./configs/server.configs";

const app = ServerConfig();

function printInformation() {
    console.log(`
 __       _     _      _    _   
/ _\\_   _| |__ (_) ___| | _| |_ 
\\ \\| | | | '_ \\| |/ _ \\ |/ / __|
_\\ \\ |_| | |_) | |  __/   <| |_ 
\\__/\\__,_|_.__// |\\___|_|\\_\\\\__|
             |__/               
    `)
    console.log("SPE Project - 2024/2025");
    console.log("Authors: Francesco Magnani, Luca Rubboli");
    console.log("Server Running on Port " + PORT);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, printInformation);

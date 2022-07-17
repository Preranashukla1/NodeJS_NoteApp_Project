const fs = require("fs");
const readline = require("readline-sync");
const path = require("path");
const prompt = require("prompt-sync")({ sigint: true });
let folderPathRead = "";
let directoryRead = "";

let dirPath = "";
const folderPath = `${__dirname}`;
let directory = fs.readdirSync(folderPath);
console.log(directory);

if (directory.includes("Files")) {
  dirPath = path.join(__dirname, "Files");  //output: CurrentDirctory/Files
} 
else {
  fs.mkdirSync("Files");
  console.log("Directory Files Made...... \n");
  dirPath = path.join(__dirname, "Files");
}

let input = -1;

do {
  //asking user to enter choice for different functionalities

  console.log(
    "\nGive Your Choice For Function: \n 1.Create Note \n 2.Write Note \n 3.Read Note \n 4.Append Note \n 5.Rename Note File Name"
  );
  console.log(" 6.Delete Note \n 7.Exit ");

  input = parseInt(readline.question("Enter Choice : "));
  let filename = "";
  let content = "";

  switch (input) {

    case 1:
      filename = readline.question("\n Enter Filename: ");

      folderPathRead = `${__dirname}\\Files`; //Output as string

      directoryRead = fs.readdirSync(folderPathRead);

      if (directoryRead.includes(`${filename}`)) {
        console.log(
          "Already exists do you want to recreate with blank space??"
        );
        recreate_choice = readline.question("Y/N: ");
        if (recreate_choice == "Y") {
          fs.writeFileSync(`${dirPath}/${filename}`, "");
          console.log("Recreated File " + filename + " With blank content.");
        } 
        else {
          console.log("Left Unchanged.");
        }
      } 
      else {
        fs.writeFileSync(`${dirPath}/${filename}`, "");
        console.log("\n File Created");
      }
      break;

    case 2:
      filename = readline.question(" \n Enter Filename: ");

      folderPathRead = `${__dirname}\\Files`;

      directoryRead = fs.readdirSync(folderPathRead);

      if (directoryRead.includes(`${filename}`)) {
        console.log(
          "Already exists do you want to replace content with new content??"
        );

        rewrite_choice = readline.question("Y/N: ");
        if (rewrite_choice == "Y") {
          content = readline.question("\n Enter Fresh Content: ");

          fs.writeFileSync(`${dirPath}/${filename}`, `${content}`);

          console.log("Created File " + filename + " With New content.");
        } 
        else {
          console.log("Left Unchanged.");
        }
      } 
      else {
        content = readline.question("\n Enter Fresh Content: ");

        fs.writeFileSync(`${dirPath}/${filename}`, `${content}`);

        console.log("\n File Written.");
      }
      break;

    case 3:
      filename = readline.question("\n Enter Filename: ");

      folderPathRead = `${__dirname}\\Files`;

      directoryRead = fs.readdirSync(folderPathRead);

      if (directoryRead.includes(`${filename}`)) {
        filePath = `${dirPath}\\${filename}`;  //Output String: D:/NODEJS PROJECT/NoteApp/Files/New_note.txt

        let content = fs.readFileSync(filePath, {
          encoding: "utf8",
          flag: "r",
        });

        let Content = content.split("\n");

        console.log("Reading File ...... \n");

        for (let i = 0; i < Content.length; i++) {
          console.log(Content[i]);
        }
        console.log("\n Read Complete");
      } 
      else {
        console.log(
          "\n No Such Note Created. Please Give Your Next Choice......"
        );
      }
      break;

    case 4:
      filename = readline.question("\n Enter Filename: ");

      folderPathRead = `${__dirname}\\Files`;
      directoryRead = fs.readdirSync(folderPathRead);

      if (directoryRead.includes(`${filename}`)) {
        append_content = readline.question("\n Enter New Content To Append: ");

        filePath = `${dirPath}\\${filename}`;

        const content = fs.readFileSync(filePath, {
          encoding: "utf8",
          flag: "r",
        });

        let Content = content.split("\n");

        if (Content.length != 0) {
          console.log("Writing From New Line....");
          fs.appendFileSync(filePath, "\n" + append_content, "utf8");
        } else {
          fs.appendFileSync(filePath, append_content, "utf8");
        }
        console.log("\n Read Complete");
      } else {
        console.log(
          "\n No Such Note Created. Please Give Your Next Choice......"
        );
      }
      break;

    case 5:
      filename = readline.question("\n Enter Filename: ");

      folderPathRead = `${__dirname}\\Files`;
      directoryRead = fs.readdirSync(folderPathRead);

      if (directoryRead.includes(`${filename}`)) {
        new_filename = readline.question("\n Enter New FileName: ");
        filePath = `${dirPath}\\${filename}`;
        new_filePath = `${dirPath}\\${new_filename}`;

        fs.renameSync(filePath, new_filePath);

        console.log("\n" + filename + " Renamed File to " + new_filename);
      } else {
        console.log(
          "\n No Such Note Created. Please Give Your Next Choice......"
        );
      }

      break;

    case 6:
      filename = readline.question("\n Enter Filename: ");

      folderPathRead = `${__dirname}\\Files`;
      directoryRead = fs.readdirSync(folderPathRead);

      if (directoryRead.includes(`${filename}`)) {
        filePath = `${dirPath}\\${filename}`;
        fs.unlinkSync(filePath);
        console.log("Deleted File Named " + filename);
      } else {
        console.log(
          "\n No Such Note Created. Please Give Your Next Choice......"
        );
      }
      break;

    case 7:
      console.log("\n Exiting.....");
      break;

    default:
      console.log("Invalid Input Choice. Choose from Below Given List.");
      break;
  }
} while (input != 7);

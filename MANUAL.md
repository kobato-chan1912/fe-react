## Description
> This is a file-system manager web (It work very similar to the commands on unix systems).

## FUNCTION
1. <code>cr [-p] PATH [DATA]</code>: create a new file **only support folder and text file**
- <code>[-p]</code>: create the missing parent folders
- <code>[DATA]</code>: data in text file
2. <code>cat FILE_PATH</code>: show the content of a file at <code>cat FILE_PATH</code>
3. <code>ls [FOLDER_PATH]</code>: list out all items **directly under** a folder
4. <code>mv PATH FOLDER_PATH</code>: move a file/folder at <code>PATH</code> into the destination <code>FOLDER_PATH</code>
5. <code>rm PATH [PATH2 PATH3...]</code>:  remove files/folders at the specified <code>PATH</code>(s)
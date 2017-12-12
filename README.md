# trello-transmogrifier
Transmogrifies a Trello json export into... something else.

Right now that else is CSV.

## How to transmogrify

1. Go into a Trello board. Open the menu, select "Print & export" and select csv.
2. Run node index <yourfilefromtrello>
3. Save output to a file
4. Create a new Google Sheet, select import and upload your transmogrified file. 
5. Select ; as the separator

Pasting the output into a sheet does not handle multi-line fields properly.
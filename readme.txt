#steps to run the project
1. navigate to ./server folder in terminal/cmd
2. modify db connection string in ./server/config/local.json
3. run npm install command
4. run node index.js (// nodejs project starts listening to requests)


#Logic for similar colleges
Logic to suggest similar colleges is based on the following paramters
1. colege state
2. number of students (+/- 100)
3. courses offered -API returns any college as similar college if that college offers atleast one course offered by the base college along with points 1 and 2 mentioned above(location and no of students validations)
 
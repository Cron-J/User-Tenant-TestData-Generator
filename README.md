User-Tenant TestData Generator
=================================================

The purpose of this app is to generate the test script/database for [User-Tenant project] (https://github.com/Cron-J/User-Tenant) for performance testing.


### Install an app

Run the following command in root directory of an app in command prompt.

###### *Install node packages*

npm install

### Run an app

###### *Run Server*

Run the following command in root directory of an app in command prompt.

node server

You can see the port number in command prompt after sucessfull run

You can change the settings in server/config/config.js file for server and database setting changes.

You can change the test data which is used to generate script in server/config/testData.js

### How to Generate Script

###### *Requires HTTP Request Visualizer and Constructor tool*

I prefer REST CONSOLE [Google crome plugin] (https://chrome.google.com/webstore/detail/rest-console/cokgbflfommojglbmbpenpphppikmonn?hl=en)

URL used to generate data:

Need to call api in sequence given below to generate data, as each entry is dependent on previous

###### //Create activities

POST: /createActivities

###### //Create roles

POST: /createRoles

###### //Create admin

POST: /createAdmin

###### //Create tenants

POST: /createTenants

###### //Create temant admins

POST: /createTenantAdmins

######//Create users

POST: /createUsers


On each successfull post request you will message in command prompt:

Wait until you see success message

You need to wait for few minutes sometime longer (around 5-10 minutes) for Tenants, TenantAdmins and Users

After sucessfull data creation you will see message, which will confirm the data entry

Record Successfully created

Now you can go for next request

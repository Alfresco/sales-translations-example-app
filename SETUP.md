## Setting up Alfresco and Activiti

This document contains instructions that you will need in order to set up Alfresco ECM and Alfresco
Activiti components which the app requires to be running on the server side.

Log in to Activiti as the admin@app.activiti.com user and in the *Identify management* app click *Tenants*. Configure a
new *Alfresco Repository* for the default tenant, which will allow the process to access content stored in the repository.

The tenant should get the ID *1* if it is the first one, if not then you will need to update the reference in the
following two places where it is referenced in the *Translation Process* process

 * In the *Attach* field in the form referenced by the *Request translation* user task
 * In the *Alfresco destination* attribute of the *Publish translation* process step

Create the following users in both Alfresco and Activiti

| Email                   | Last name | Last name | Username                | Password |
|-------------------------|-----------|-----------|-------------------------|----------|
| wilbur@app.activiti.com | Wilbur    | Adams     | wilbur@app.activiti.com | password |
| marcus@app.activiti.com | Marcus    | Roberts   | marcus@app.activiti.com | password |

Create the following user in Alfresco only, with the same password as you used to log in with this user in Activiti

| Email                  | Last name | Last name | Username               |
|------------------------|-----------|-----------|------------------------|
| admin@app.activiti.com | Admin    | Activiti   | admin@app.activiti.com |

Log in to Activiti as each of these three users and using the `Personal` section of the *Profile* or *Identify Management*
apps, add their username and password values, which will allow them to access content in Alfresco.

Log in to Alfresco as the admin@app.activiti.com user and create a new site with the following properties

 * Site name: Sales Collateral
 * Site URL: sales-collateral

After the site is created use the *Add users* button to add the other two users with the *Site Manager* role. Then in
the *Document Library* component, create two folders named *Collateral* and *Translations*.

Now you are ready to import the process. Log into Activiti as the admin@app.activiti.com user. Navigate to *Apps* section of the *Kickstart* app and
click the *Import Process* button to launch the import wizard. Upload the file *Sales App.zip* then click into the app
in order to access the *Publish* function. Once the app is published you must then share it with the other two users in
order to ensure they have access to it.

*Note: should any errors occur when publishing the app, you will need to use the editor in the Processes section of
Kickstart to fix these up, before re-publishing the app. If you cannot find the source of the errors, try removing and
re-applying the user task assignees and re-selecting the folders within the sales-collateral site configured in the
Translation request form Publish translation step.*

Finally, log into Activiti as each of the other two users and check that they have access to the
Sales app from their dashboards.
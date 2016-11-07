# Prerequisites for the Sales Translation App

This Alfresco Application Development Framework (ADF) -based app requires the following:

- An Alfresco Platform Repository, version [5.2.a-EA](https://wiki.alfresco.com/wiki/Community_file_list_201606-EA) or newer
- An Activiti Enterprise installation, version 1.5 or newer
- To enable cross-domain resources, [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) enabled in Alfresco and Activiti, or a reverse proxy such as nginx used to front the application, Alfresco and Activiti under the same IP/port/domain
- [Node.js](https://nodejs.org/en/) JavaScript runtime.
- [npm](https://www.npmjs.com/) package manager for JavaScript.
 

** Configuring Alfresco and Activiti **

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

**Verify that you are running at least node `v5.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

## Installing Alfresco
 
Alfresco comes with installers that will install all the servers, webapps, and tools needed to run Alfresco.

- Download Alfresco Community from this [page](https://wiki.alfresco.com/wiki/Community_file_list_201606-EA).
- Install Alfresco following these [instructions](http://docs.alfresco.com/5.1/concepts/installs-eval-intro.html).

This will install the following Alfresco web applications:

- Alfresco Platform with the Content Repository, which we need so we can access content from the app
- Alfresco Solr, which we need so we can search for content
- Alfresco Share, needed for creating users and groups

### Enable CORS in Alfresco

The web client that we are building with the application development framework will be loaded from a different web server than the Alfresco Platform is running on.
So we need to tell the Alfresco server that any request that comes in from this custom web client should be allowed access 
to the Content Repository. This is done by enabling CORS.

To enable CORS in the Alfresco Platform do **one** of the following:

#### Either, download and install the enable CORS module (recommended)

This is the easiest way, add the [enablecors](https://artifacts.alfresco.com/nexus/service/local/repositories/releases/content/org/alfresco/enablecors/1.0/enablecors-1.0.jar) 
platform module JAR to the `$ALF_INSTALL_DIR/modules/platform` directory and restart the server.

Note. by default the CORS filter that is enabled will allow any orgin.
 
####Or, manually update the `web.xml` file

Modify `$ALF_INSTALL_DIR/tomcat/webapps/alfresco/WEB-INF/web.xml` and uncomment the following section and update
`cors.allowOrigin` to `http://localhost:3000` or `*`:

```
   <filter>
      <filter-name>CORS</filter-name>
      <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
      <init-param>
         <param-name>cors.allowGenericHttpRequests</param-name>
         <param-value>true</param-value>
      </init-param>
      <init-param>
         <param-name>cors.allowOrigin</param-name>
         <param-value>http://localhost:3000</param-value>
      </init-param>
      <init-param>
         <param-name>cors.allowSubdomains</param-name>
         <param-value>true</param-value>
      </init-param>
      <init-param>
         <param-name>cors.supportedMethods</param-name>
         <param-value>GET, HEAD, POST, PUT, DELETE, OPTIONS</param-value>
      </init-param>
      <init-param>
         <param-name>cors.supportedHeaders</param-name>
         <param-value>origin, authorization, x-file-size, x-file-name, content-type, accept, x-file-type</param-value>
      </init-param>
      <init-param>
         <param-name>cors.supportsCredentials</param-name>
         <param-value>true</param-value>
      </init-param>
      <init-param>
         <param-name>cors.maxAge</param-name>
         <param-value>3600</param-value>
      </init-param>
   </filter>
```
When specifying the `cors.allowOrigin` URL make sure to specify the port that will be used by the app, by default this
is 3000 but it may bind to a higher port if port 3000 is already in use.

Then uncomment the following filter mappings:

```
   <filter-mapping>
      <filter-name>CORS</filter-name>
      <url-pattern>/api/*</url-pattern>
      <url-pattern>/service/*</url-pattern>
      <url-pattern>/s/*</url-pattern>
      <url-pattern>/cmisbrowser/*</url-pattern>
   </filter-mapping>
```

## Installing Activiti

Activiti comes with an installer which will install a Tomcat container with the `activiti-app` app installed.

Please ensure that you set Tomcat to run on port 9999, or you will need to configure the Activiti URL in the app.

### Enabling CORS in Activiti

CORS can be enabled in Activiti by over-writing the file `WEB-INF/com/activiti/servlet/WebConfigurer.class` inside the
`activiti-app` webapp.

## Installing Node.js

If you don't have Node.js installed then access this [page](https://nodejs.org/en/download/) and use the appropriate installer for your OS.

Make sure the Node.js version is > 5:

```
$ node -v
v5.12.0
```

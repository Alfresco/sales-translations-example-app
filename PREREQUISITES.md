# Prerequisites for the Sales Translation App

This Alfresco Application Development Framework (ADF) -based app requires the following:

- An Alfresco Platform Repository, version [5.2.a-EA](https://wiki.alfresco.com/wiki/Community_file_list_201606-EA) or newer
- An Activiti Enterprise installation, version 1.5 or newer
- To enable cross-domain resources, [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) enabled in Alfresco and Activiti, or a reverse proxy such as nginx used to front the application, Alfresco and Activiti under the same IP/port/domain
- [Node.js](https://nodejs.org/en/) JavaScript runtime.
- [npm](https://www.npmjs.com/) package manager for JavaScript.

## Installing Node.js

If you don't have Node.js installed then access this [page](https://nodejs.org/en/download/) and use the appropriate installer for your OS.

Make sure the Node.js version is > 5:

```
$ node -v
v5.12.0
```

**Verify that you are running at least node `v5.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.

Older versions will produce errors when you run start the application.

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

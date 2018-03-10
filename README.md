# diary-application
Simple Diary Application using node.js express framework

Building a RESTFUL API with NODE, pure Raw MongoDB query on  Diary Application

For Listing Data I have used ``Jquery DataTables plugin as Server Side Rendering Tables Using Ajax Call``

Used Server side Template Engine as ``pug``

Added Searching Functionality using Jquery.

You can download this repository by using the green ``Clone or Download`` button on the right hand side of this page. This will present you with the option to either clone the repository using Git, or to download it as a zip file.

If you want to download it using git, copy paste the link that is presented to you, then run the following at your terminal:
 ```
https://github.com/Rahul-Barick/diary-application
cd diary-application
npm install
```
After Downloading Run the Each Command From ``queries.txt`` on the terminal or Download the 
[RoboMongo](https://robomongo.org/download) and Insert the command

# Start the server

``nodemon diary-app.js``

Now is a good time to seque into some tooling that will make things much easier when developing Node applications. 
``Nodemon`` is a utility that will monitor for any changes in your source and automatically restart your server.

# Login

Login Route http://localhost:3000/login

# Scalibility of diary application

1. The cluster module can be used to enable load balancing over an environment’s multiple CPU cores. It’s based on the child process module fork method and it basically allows us to ``fork`` the main application process as many times as we have CPU cores. It will then take over and load balance all requests to the main process across all forked processes.

2. The cluster module is Node’s helper for us to implement the cloning scalability strategy, but only on one machine.

 3.cluster module does is simple
    We create a master process and that master process forks a number of worker processes and manages them. Each worker process represents an instance of the application that we want to scale. All incoming requests are handled by the master process, which is the one that decides which worker process should handle an incoming request.

 ![alt text](https://cdn-images-1.medium.com/max/1000/1*C7ICI8d7aAna_zTZvZ64MA.png "Cluster module")
 
 4.The master process’s job is easy because it actually just uses a round-robin algorithm to pick a worker process.
 
 5.The round-robin algorithm distributes the load evenly across all available processes on a rotational basis. The first request is forwarded to the first worker process, the second to the next worker process in the list, and so on. When the end of the list is reached, the algorithm starts again from the beginning.
 
 6.one of the simplest and most used load balancing algorithms.
 
 7. One of the simple benchmark of how many requests this server can handle per second. So we are using [Apache Benchmarking tool](https://httpd.apache.org/docs/2.4/programs/ab.html)
 
 8.Run the command on command line
 ``ab -c200 -t10 http://localhost:3000/`` to each api end point.This command will test-load the server with 200 concurrent connections for 10 seconds.
 
``Important : First start the node server eg:- node diary-application.js then test-load the server as developer perspective``

# Command Line Interface

```
rahul@rahul-HP-Pavilion-15-Notebook-PC:~/diary-application$ ab -c200 -t10 http://localhost:3000/notes/list
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 5000 requests
Completed 10000 requests
Completed 15000 requests
Finished 17409 requests


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /notes/list
Document Length:        49 bytes

Concurrency Level:      200
Time taken for tests:   10.000 seconds
Complete requests:      17409
Failed requests:        0
Non-2xx responses:      17414
Total transferred:      6802577 bytes
HTML transferred:       853281 bytes
Requests per second:    1740.85 [#/sec] (mean)
Time per request:       114.886 [ms] (mean)
Time per request:       0.574 [ms] (mean, across all concurrent requests)
Transfer rate:          664.30 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.3      0      17
Processing:    17  114  12.3    113     188
Waiting:        9  111  11.9    110     185
Total:         29  114  11.7    113     188

Percentage of the requests served within a certain time (ms)
  50%    113
  66%    116
  75%    119
  80%    121
  90%    127
  95%    133
  98%    148
  99%    155
 100%    188 (longest request)

```
On my machine, the single node server was able to handle about ``1740`` requests per second.
as you can see on the terminal ``Requests per second:    1740.85 [#/sec] (mean)``

The results here will be different on different platforms and this is a very simplified test of performance that’s not a 100% accurate, but it will clearly show the difference that a cluster would make in a multi-core environment.

Now we have a reference benchmark, we can scale the application with the cloning strategy using the cluster module



Instructions:

The exercise will have you develop a small iOS application, and is designed to take 2 to 4 hours. You're welcome to use Google, StackOverflow, etc while working on it. The goal is to refactor a very simple Cordova app to a native iOS swift app.  You may use UIKit or SwiftUI- whichever you're most comfortable with. The test app is a single screen that makes an efficient API call to get some recent trail reports and outputs them to the screen. The task is to look at the AngularJS and html code within the app to aid in the refactoring. The app has an XCode project bundled with it that can be built with XCode to view the Cordova app, this is located in the "platforms/ios/" folder. Once you finish it, please zip up your code and email it to us.

The test Cordova app can be cloned from here https://github.com/pinkbike/trailforks-code-challenge-cordova
If the XCode project doesn't build you can follow these steps:
- Delete the platforms/ios folder.
- If you do not have NodeJS installed, install it.
- Install Cordova If you do not already have it installed "sudo npm install -g cordova@10"
https://cordova.apache.org/docs/en/10.x/guide/cli/
- run the following command in the root of the cloned "trailforks-code-challenge-cordova" Github project 
  "cordova platform add ios"
- This will generate a new "platforms/ios" folder, open the Trailforks.xcodeproj inside it.
- In Xcode you may need to change the "scheme" to Trailforks.

Trailforks API docs are here, but looking at the API call in the JS code should be sufficient.

https://www.trailforks.com/about/api/
The API calls require an "app_secret" parameter that is:   CiIb@mH!Gf4JzURC

Please let us know if you have any questions. Within the time given, feel free to add any bonus code.
We're looking forward to hearing from you. 
